import { BlockType, NotionBlock, Unit, TableInfo, TableRow } from "./types"
import nfetch, { Headers as nHeaders } from 'node-fetch'

const fetcher = global.fetch || nfetch
const PolyHeaders = global.Headers || nHeaders

const getPage = async (pageId: string): Promise<{
    recordMap: {
        block: {
            [key: string]: NotionBlock
        }
    }
}> => await (await fetcher("https://www.notion.so/api/v3/loadPageChunk", {
    body: JSON.stringify({
        "pageId": pageId,
        "limit": 50,
        "cursor": {
            "stack": [[{
                "table": "block",
                "id": pageId,
                "index": 0
            }]]
        },
        "chunkNumber": 0,
        "verticalColumns": false
    }),
    headers: new PolyHeaders({
        "content-type": "application/json"
    }),
    method: "POST"
})).json()

const parseStyle = (type: string, attributes: string[][]) => {
    return Object.fromEntries(attributes.map(attribute => [
        ({
            'a': 'link',
            'e': 'latex'
        })[attribute[0] as | 'a'] || attribute[0],
        attribute[1] || true
    ]))
}

const isAvaliable = <T>(d: any): d is T => !!d

export const getPageContent = async (pageId: string): Promise<{
    title: string;
    content: Unit[][]
}> => {
    const fetchedPage = await getPage(pageId)
    const converted = Object.values(fetchedPage.recordMap.block).map(block => {
        if (!block.value) return null

        if (block.value.properties?.title)
            return block.value.properties.title.map(element => ({
                text: element[0],
                properties: element[1] && block?.value?.type && parseStyle(block?.value?.type, element[1]),
                type: block.value?.type as BlockType
            }))

        if (block.value.properties?.source)
            return [{
                text: block.value.properties?.caption?.[0][0] || '',
                type: BlockType.image,
                properties: {
                    src: block.value.properties.source[0][0],
                }
            }]

        return null
    }).filter(row => isAvaliable<Unit[]>(row)) as Unit[][]
    return {
        title: converted[0][0].text,
        content: converted.slice(1)
    }
}

export const convertToMarkdown = (content: Unit[][]) => {
    return content.map(row =>
        row?.map(intend => {
            const decorated = (intend.properties ? (Object.keys(intend.properties).map(key => ({
                i: '_',
                b: '**'
            })[key as | 'i' | 'b'] || '', '')) : []).reduce((acc, current) => (
                current + acc + current
            ),
                intend.text
            )

            if (intend.type === BlockType.image) return `![${intend.text}](${intend?.properties?.src})`;
            if (intend.properties?.latex) return `$LATEX$(${intend.properties.latex})`

            return ({
                text: '',
                header: '# ',
                sub_header: '## ',
                sub_sub_header: '### ',
                quote: '> ',
                numbered_list: '1. ',
                page: '# '
            })[intend.type] + decorated
        }).join('')
    ).join('\n\n')
}

const processArticleTable = (blocks: {
    [key: string]: NotionBlock
}) => Object.values(blocks).slice(2).filter((block) => block.value?.type === BlockType.page).map((block) => ({
    pageId: block.value?.id || '',
    title: block?.value?.properties?.title?.[0][0] || '',
    tags: block?.value?.properties?.["s3#F"]?.[0]?.[0]?.split(',') || [],
})).filter(page => page.pageId)

export const getTableContent = async (info: TableInfo): Promise<TableRow[]> => {
    const collectionData = await (await fetcher("https://www.notion.so/api/v3/queryCollection", {
        body: JSON.stringify({
            "collectionId": info.collectionId,
            "collectionViewId": info.viewId,
            "query": {
                "aggregations": [
                    {
                        "aggregator": "count"
                    }
                ]
            },
            "loader": {
                "type": "table",
                "limit": 50,
                "searchQuery": "",
                "userTimeZone": "Asia/Seoul",
                "loadContentCover": true
            }
        }),
        headers: new PolyHeaders({
            "content-type": "application/json"
        }),
        method: "POST"
    })).json() as {
        recordMap: {
            block?: {
                [key: string]: NotionBlock
            }
        }
    }
    if(!collectionData.recordMap.block) throw new Error("Cannot access article");
    return processArticleTable(collectionData.recordMap.block)
}

export const getTableInfo = async (pageId: string): Promise<TableInfo> => {
    const pageData = await getPage(pageId)
    const tableBlock = (Object.values(pageData.recordMap.block)[0]).value
    if(!tableBlock) throw new Error("Cannot find table")
    const {
        collection_id: collectionId,
        view_ids: [viewId]
    } = tableBlock

    return {
        collectionId,
        viewId
    }
}

export const getArticleWithBriefId = async (tableId: string, briefId: string) => {
    const table = await getTable(tableId)
    const page = table.find(page => page.pageId.startsWith(briefId))
    if(page?.pageId) return {
        ...page,
        content: convertToMarkdown((await getPageContent(page.pageId)).content)
    }
    throw new Error("Cannot find article")
}

export const getTags = async (tableId: string) => {
    return [...new Set((await getTable(tableId)).map(e => e.tags).flat())]
}

export const getArticlesWithTag = async (tableId: string, tag: string) => {
    const table = await getTableInfo(tableId)
    const collectionData = await (await fetcher("https://www.notion.so/api/v3/queryCollection", {
        body: JSON.stringify({
            "collectionId": table.collectionId,
            "collectionViewId": table.viewId,
            "query": {
                "aggregations": [
                    {
                        "aggregator": "count"
                    }
                ],
                "filter": {
                    "operator": "and",
                    "filters": [
                        {
                            "property": "s3#F",
                            "filter": {
                                "operator": "enum_contains",
                                "value": {
                                    "type": "exact",
                                    "value": tag
                                }
                            }
                        }
                    ]
                }
            },
            "loader": {
                "type": "table",
                "limit": 50,
                "searchQuery": "",
                "userTimeZone": "Asia/Seoul",
                "loadContentCover": true
            }
        }),
        headers: new PolyHeaders({
            "content-type": "application/json"
        }),
        method: "POST"
    })).json() as {
        recordMap: {
            block: {
                [key: string]: NotionBlock
            }
        }
    }
    return processArticleTable(collectionData.recordMap.block)
}

export const getTable = async (pageId: string): Promise<TableRow[]> => await getTableContent(await getTableInfo(pageId))
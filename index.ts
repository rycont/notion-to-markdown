interface TableInfo {
    collectionId: string;
    viewId: string;
}

const getPage = async (pageId: string): Promise<{
    recordMap: {
        block: {
            [key: string]: NotionBlock
        }
    }
}> => await (await fetch("https://www.notion.so/api/v3/loadPageChunk", {
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
    headers: new Headers({
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

interface Unit {
    text: string;
    type: BlockType;
    properties: {
        [key: string]: string;
    } | undefined;
}

enum BlockType {
    text = "text",
    image = "image",
    header = "header",
    sub_header = "sub_header",
    sub_sub_header = "sub_sub_header"
}

interface NotionBlock {
    "role": string
    "value": {
        "id": string
        "type": BlockType,
        "created_time": number,
        "last_edited_time": number,
        "parent_id": string
        "parent_table": string,
        properties?: {
            title?: [string, [string[]] | undefined][]
            source?: [string[]]
            caption?: [string[]]
        }
    }
}

const isAvaliable = <T>(d: any): d is T => !!d

const getPageContent = async (pageId: string): Promise<{
    title: string;
    content: Unit[][]
}> => {
    const converted = Object.values((await getPage(pageId)).recordMap.block).map(block => {
        if (!block.value) return null

        if (block.value.properties?.title)
            return block.value.properties.title.map(element => ({
                text: element[0],
                properties: element[1] && parseStyle(block?.value.type, element[1]),
                type: block.value.type as BlockType
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

const convertToMarkdown = (content: Unit[][]) => {
    return content.map(row =>
        row?.map(intend => {
            const decorated = (intend.properties ? (Object.keys(intend.properties).map(key => ({
                i: '__',
                b: '**'
            })[key as | 'i' | 'b'] || '', '')) : []).reduce((acc, current) => (
                current + acc + current
            ),
                intend.text
            )

            if(intend.type === BlockType.image) return `![${intend.text}](${intend?.properties?.src})`;
            if(intend.properties?.latex) return `$LATEX$(${intend.properties.latex})`

            return ({
                text: '',
                header: '#',
                sub_header: '##',
                sub_sub_header: '###',
            })[intend.type] + decorated
        }).join('')
    ).join('\n')
}

const getTableContent = async (info: TableInfo) => {
    const collectionData = await (await fetch("https://www.notion.so/api/v3/queryCollection", {
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
        headers: new Headers({
            "content-type": "application/json"
        }),
        method: "POST"
    })).json()

    return Object.values(collectionData.recordMap.block).slice(2).filter((block: any) => block.value.type === 'page').map((block: any) => ({
        pageId: block?.value?.id,
        title: block?.value?.properties?.title[0][0],
        tags: block?.value?.properties?.["s3#F"]?.[0]?.[0]?.split(',') || [],
    }))
}

const getTableInfo = async (pageId: string): Promise<TableInfo> => {
    const pageData = await getPage(pageId)

    const {
        collection_id: collectionId,
        view_ids: [viewId]
    } = (Object.values(pageData.recordMap.block)[0] as any).value

    return {
        collectionId,
        viewId
    }
}

// getTableInfo("e835bb3c-b921-48da-8143-3b3f1587f9ec").then(info => getTableContent(info)).then(table => getPageContent(table[0].pageId)).then(console.log)
getPageContent("cdcfe852-5254-49da-9da6-54b068ee128d").then(content => console.log(convertToMarkdown(content.content)))

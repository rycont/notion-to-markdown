export interface TableInfo {
    collectionId: string;
    viewId: string;
}

export interface Unit {
    text: string;
    type: BlockType;
    properties: {
        internalLink?: {
            targetPageId?: string;
            icon?: {
                emoji?: string;
                src?: string;
            };
        };
        outlink?: string;
        inlineImage: {
            src: string;
        };
        inlineEquation: string;
    } | undefined;
}

export enum BlockType {
    text = "text",
    image = "image",
    header = "header",
    sub_header = "sub_header",
    sub_sub_header = "sub_sub_header",
    quote = "quote",
    numbered_list = "numbered_list",
    page = "page",
    code = "code",
    callout = "callout",
    collection_view_page = "collection_view_page",
    equation = "equation"
}

export interface NotionBlock {
    role: string;
    value?: {
        id: string;
        type?: BlockType;
        created_time: number;
        last_edited_time: number;
        parent_id: string;
        parent_table: string;
        collection_id: string;
        view_ids: string[];
        properties?: {
            title?: [string, [string[]] | undefined][];
            source?: [string[]];
            caption?: [string[]];
            "s3#F"?: string[][];
        };
        format?: {
            page_icon?: string;
            page_full_width?: boolean;
        }
    }
}

export interface TableRow {
    pageId: string;
    title: string;
    tags: string[];
}

export type TypeRenderer = (intend: Unit, before: string, renderer: Renderer) => string;
export type UnitRenderer = (intend: Unit, before: string) => string;

export const rendererKeys = ["inlineText", "inlineEquation", "equation", "outlink", "italic", "bold", "inlineCode", "internalLink", "inlineImage", "textBlock", "callout", "page", "image", "header", "sub_header", "sub_sub_header", "quote", "numbered_list", "collection_view_page"] as const
export type Renderer = Record<typeof rendererKeys[number], UnitRenderer>

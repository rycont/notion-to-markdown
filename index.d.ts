import { Unit, TableInfo } from "./types";
export declare const getPageContent: (pageId: string) => Promise<{
    title: string;
    content: Unit[][];
}>;
export declare const convertToMarkdown: (content: Unit[][]) => string;
interface TableRow {
    pageId: string;
    title: string;
    tags: string[];
}
export declare const getTableContent: (info: TableInfo) => Promise<TableRow[]>;
export declare const getTableInfo: (pageId: string) => Promise<TableInfo>;
export declare const getArticleWithBriefId: (tableId: string, briefId: string) => Promise<{
    content: string;
    pageId: string;
    title: string;
    tags: string[];
}>;
export declare const getTable: (pageId: string) => Promise<TableRow[]>;
export {};

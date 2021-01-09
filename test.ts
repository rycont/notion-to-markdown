import { getTable, getPageContent, convertToMarkdown, getArticleWithBriefId } from "./index.ts";

// getTable('e835bb3c-b921-48da-8143-3b3f1587f9ec').then(async table => {
//     // console.log(table)
//     console.log('First Article is', table[0].pageId)
//     console.log(table[0].pageId)
//     // console.log(convertToMarkdown((await getPageContent(table[0].pageId)).content))
// })
getArticleWithBriefId('e835bb3c-b921-48da-8143-3b3f1587f9ec', '000f7b53').then(console.log)
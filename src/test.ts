import { getArticlesWithTag, getArticleWithBriefId, getTags } from "./";

// getArticleWithBriefId('e835bb3c-b921-48da-8143-3b3f1587f9ec', '000f7b53').then(console.log)
// getTags('e835bb3c-b921-48da-8143-3b3f1587f9ec').then(console.log)
getArticlesWithTag('e835bb3c-b921-48da-8143-3b3f1587f9ec', '*디자인').then(console.log)
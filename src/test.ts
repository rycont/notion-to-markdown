import { getPageContent, getRenderedPage } from "./";
import { createCustomRenderer } from "./renderers";

// getArticleWithBriefId('e835bb3c-b921-48da-8143-3b3f1587f9ec', '6cef3e40').then(doc => console.log(doc.content))
// getTags('e835bb3c-b921-48da-8143-3b3f1587f9ec').then(console.log)
// getArticlesWithTag('e835bb3c-b921-48da-8143-3b3f1587f9ec', '*디자인').then(console.log)
getRenderedPage('1b0cb44d-a571-4d42-8e2e-80a5c6e5ba02', createCustomRenderer({
  bold: (intend) => `이것은 굵지요`
})).then(e => console.log(e))
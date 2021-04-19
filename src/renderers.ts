import { Renderer, Unit } from "./types";

export const defaultRenderers: Renderer = {
  inlineText(intend, before) {
    return before || intend.text
  },
  inlineEquation(intend, before) {
    return intend.properties ? `$${intend.properties?.inlineEquation}$` : ''
  },
  equation(intend, before) {
    return intend.text ? "$$\n" + intend.text + "\n$$" : ''
  },
  outlink(intend, before) {
    return `[${before || intend.text}](${intend.properties?.outlink || '#'})`;
  },
  italic(intend, before) {
    return `_${before || intend.text}_`
  },
  bold(intend, before) {
    return `**${before || intend.text}**`
  },
  inlineCode(intend, before) {
    return "`" + (before || intend.text) + "`"
  },
  internalLink(intend, before) {
    console.log(intend.properties?.internalLink?.icon)
    return `[${intend.properties?.internalLink?.icon?.emoji || ''}${before || intend.text}](${intend.properties?.internalLink?.targetPageId})`
  },
  inlineImage(intend, before) {
    return `![${before || intend.text}](${intend.properties?.inlineImage.src || '#'})`
  },
  textBlock(intend, before) {
    return before || intend.text
  },
  callout(intend, before) {
    return `> ${before || intend.text}`
  },
  page(intend, before) {
    return before || intend.text
  },
  image(intend, before) {
    return before || intend.text
  },
  header(intend, before) {
    return `# ${before || intend.text}`;
  },
  sub_header(intend, before) {
    return `## ${before || intend.text}`;
  },
  sub_sub_header(intend, before) {
    return `### ${before || intend.text}`;
  },
  quote(intend, before) {
    return `> ${before || intend.text}`
  },
  numbered_list(intend, before) {
    return `1. ${before || intend.text}`
  },
  collection_view_page(intend, before) {
    return before || intend.text
  },
}

export const createCustomRenderer = (customRenderer: Partial<Renderer>) => ({
  ...defaultRenderers,
  ...customRenderer
})

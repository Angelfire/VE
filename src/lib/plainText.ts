import MarkdownIt from "markdown-it"

// `html: true` only so raw HTML is tokenized separately and skipped; nothing is rendered.
const parser = new MarkdownIt({ html: true })

// Turns a Markdown/MDX body into plain text for excerpts: drops MDX import/export
// lines, code blocks and raw HTML, and keeps only the readable inline text.
export function markdownToPlainText(markdown: string): string {
  const source = markdown.replace(/^\s*(import|export)\s.*$/gm, "")
  const words: string[] = []

  for (const token of parser.parse(source, {})) {
    if (token.type !== "inline" || !token.children) continue

    for (const child of token.children) {
      if (child.type === "text" || child.type === "code_inline") {
        words.push(child.content)
      } else if (child.type === "softbreak" || child.type === "hardbreak") {
        words.push(" ")
      }
    }
    words.push(" ")
  }

  return words.join("").replace(/\s+/g, " ").trim()
}

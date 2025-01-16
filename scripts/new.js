import fs from "node:fs"
import path from "node:path"

function getDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function getPostSlug(postTitle) {
  return postTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const HELP_INFO = `Usage: pnpm new <post-title> -c <category> [-m <md|mdx>]

Valid categories: ai, cs, css, js, personal, react

Options:
  -c, --category <category>  Set the category (required)
  -m, --markdown <md|mdx>    Set the file format (default: md)
  -h, --help                 Show this help message

Example:
  pnpm new "Hello World" -c js -m mdx
`
const TARGET_DIR = "./src/content/"

const args = process.argv.slice(2)
if (args.includes("-h") || args.includes("--help")) {
  console.log(HELP_INFO)
  process.exit(0)
}

const categoryIndex = args.findIndex(arg => arg === "-c" || arg === "--category")
if (categoryIndex === -1 || categoryIndex === args.length - 1) {
  console.error("ERROR: Category is required")
  process.exit(1)
}

const markdownIndex = args.findIndex(arg => arg === "-m" || arg === "--markdown")
const fileExtension = markdownIndex !== -1 && args[markdownIndex + 1] === "mdx" ? ".mdx" : ".md"

const postTitle = args.slice(0, categoryIndex).join(" ") || "Untitled"
const validCategories = ["ai", "cs", "css", "js", "personal", "react"]
const category = args[categoryIndex + 1]
if (!validCategories.includes(category)) {
  console.error(`ERROR: Invalid category. Must be one of: ${validCategories.join(", ")}`)
  process.exit(1)
}

const fileName = getPostSlug(postTitle) + fileExtension
const fullPath = path.join(TARGET_DIR, "blog", category, fileName)

console.log("Creating new post:", postTitle)
console.log("Full path:", fullPath)

if (fs.existsSync(fullPath)) {
  console.error(`ERROR: File ${fullPath} already exists`)
  process.exit(1)
}

const content = `---
title: ${postTitle}
slug: "${category}/${getPostSlug(postTitle)}"
pubDate: ${getDate()}
---

Write your description here.

<!--more-->

Write your content here.
`

fs.writeFileSync(fullPath, content)
console.log(`Post "${postTitle}" created successfully`)

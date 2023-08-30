import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

import sanitizeHtml from 'sanitize-html'
import MarkdownIt from "markdown-it"

import { sortMDByDate } from "@/lib"

const parser = new MarkdownIt()

export async function get(context) {
  const posts = await getCollection("blog")
  const sortedPosts = sortMDByDate(posts)
  
  return rss({
    title: "Velocidad de Escape",
    description:
      "Personal blog by Andrés Bedoya. I just want to share some personal things and others related to the headaches that programming produces.",
    site: context.site,
    items: sortedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      content: sanitizeHtml(parser.render(post.body)),
      link: `/${post.slug}`,
    })),
  })
}

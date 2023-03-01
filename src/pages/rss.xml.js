import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function get(context) {
  const posts = await getCollection("blog");

  return rss({
    title: "Velocidad de Escape",
    description:
      "Personal blog by Andrés Bedoya. I just want to share some personal things and others related to the headaches that programming produces.",
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      content: sanitizeHtml(parser.render(post.body)),
      link: `/${post.slug}`,
    })),
  });
}

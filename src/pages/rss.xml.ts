import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function get(context) {
  const posts = await getCollection('blog')

  return rss({
    title: 'Velocidad de Escape',
    description: 'A humble Astronaut’s guide to the stars',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/${post.slug}`,
    })),
  })
}

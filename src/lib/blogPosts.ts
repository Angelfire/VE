import type { CollectionEntry } from "astro:content"

export function sortMDByDate(posts: CollectionEntry<"blog">[] = []) {
  return posts.sort(
    (a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  )
 }

export function getUniqueTags(posts: CollectionEntry<"blog">[] = []) {
  const uniqueTags = new Set<string>()

  posts.forEach((post) => {
    post.data?.tags?.map((tag: string) => uniqueTags.add(tag))
  })

  return Array.from(uniqueTags)
}

export function getUniqueTagsWithCount(posts: CollectionEntry<"blog">[] = []): {
  [key: string]: number
} {
  return posts.reduce((prev, post) => {
    const runningTags: { [key: string]: number } = { ...prev }
    post.data?.tags?.forEach((tag: string) => {
      runningTags[tag] = (runningTags[tag] || 0) + 1
    })

    return runningTags
  }, {})
}

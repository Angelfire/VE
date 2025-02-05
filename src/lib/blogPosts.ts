import type { CollectionEntry } from "astro:content"

export function sortMDByDate(posts: CollectionEntry<"blog" | "short">[] = []) {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}


export function getUniqueTags(posts: CollectionEntry<"blog" | "short">[] = []) {
  const uniqueTags = new Set<string>()

  posts.forEach((post) => {
    post.data?.tags?.map((tag) => uniqueTags.add(tag))
  })

  return Array.from(uniqueTags)
}

export function getUniqueTagsWithCount(posts: CollectionEntry<"blog" | "short">[] = []): {
  [key: string]: number
} {
  return posts.reduce((prev, post) => {
    const runningTags: { [key: string]: number } = { ...prev }
    post.data?.tags?.forEach((tag) => {
      runningTags[tag] = (runningTags[tag] || 0) + 1
    })

    return runningTags
  }, {})
}

import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    tags: z
      .array(z.string())
      .optional()
  }),
})

const shortPosts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    tags: z
      .array(z.string())
      .optional(),
    type: z.enum(['short']),
  }),
})

export const collections = { blog, short: shortPosts }


// export const collections = {
//   blog: defineCollection({
//     schema: z.object({
//       draft: z.boolean().default(false),
//       date: z.date().transform((str) => new Date(str)),
//       title: z.string(),
//       category: z.enum(['food', 'wisdom']),
//       tags: z.array(z.string()).optional(),
//       share: z
//         .object({
//           image: z.string().url().optional(),
//           title: z.string(),
//           description: z.string(),
//         })
//         .strict(),
//     }),
//   }),
// };
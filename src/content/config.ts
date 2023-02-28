import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  // Type-check frontmatter using a schema
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

export const collections = { blog }


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
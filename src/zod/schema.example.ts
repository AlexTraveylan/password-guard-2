import { z } from "zod"

export const ArticleExampleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
  createdAt: z.string().transform((value) => new Date(value)),
  updatedAt: z.string().transform((value) => new Date(value)),
})

export const addPasswordSchema = z.object({
  titre: z.string(),
  login: z.string(),
  password: z.string(),
})

export const simplePasswordSchema = z.object({
  password: z.string(),
})

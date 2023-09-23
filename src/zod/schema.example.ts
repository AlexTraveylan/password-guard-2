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

export const newMasterPasswordSchema = z
  .object({
    email: z.string().email({ message: "L'email n'est pas valide" }),
    master: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/, {
      message: "Le mot de passe doit contenir au moins 15 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
    }),
    confirm: z.string(),
  })
  .refine((data) => data.master === data.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  })

export const checkMasterPasswordSchema = z.object({
  email: z.string().email({ message: "L'email n'est pas valide" }),
  master: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/, {
    message: "Le mot de passe doit contenir au moins 15 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
  }),
})

import z from "zod"

export const UserInsertSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
    username: z.string().min(3)
})

export type UserInsertType = z.infer<typeof UserInsertSchema>


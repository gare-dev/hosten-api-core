import z from "zod"

export const RoleInsertSchema = z.object({
    name: z.string().min(3).max(30)
})

export type RoleInsertType = z.infer<typeof RoleInsertSchema>
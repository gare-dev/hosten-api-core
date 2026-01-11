import z from "zod"

export const UserRoleInsertSchema = z.object({
    userId: z.string().min(1),
    roleId: z.string().min(1)
})

export type UserRoleInsertType = z.infer<typeof UserRoleInsertSchema>
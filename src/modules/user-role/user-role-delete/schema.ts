import z from "zod"

export const UserRoleDeleteSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    roleId: z.string().min(1, "Role ID is required"),
})

export type UserRoleDeleteType = z.infer<typeof UserRoleDeleteSchema>
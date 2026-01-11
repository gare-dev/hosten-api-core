import z from "zod"

export const RolePermissionInsertSchema = z.object({
    roleId: z.string(),
    permissionId: z.string().min(1)
})

export type RolePermissionInsertType = z.infer<typeof RolePermissionInsertSchema>
import z from "zod"

export const RolePermissionDeleteSchema = z.object({
    roleId: z.string().min(1),
    permissionId: z.string().min(1)
})

export type RolePermissionDeleteType = z.infer<typeof RolePermissionDeleteSchema>
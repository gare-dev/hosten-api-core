import z from "zod"

export const ResourceInsertSchema = z.array(z.object({
    action: z.enum(["restart", "stop", "start", "delete", "list", "read", "create", "update", "delete"]),
    resource: z.string().min(3).max(50)
}))

export type ResourceInsertType = z.infer<typeof ResourceInsertSchema>
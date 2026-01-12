import z from "zod"

export const RoleDeleteSchema = z.object({
    id: z.string().min(1, "ID is required"),
})

export type RoleDeleteType = z.infer<typeof RoleDeleteSchema>
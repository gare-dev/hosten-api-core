import z from "zod"

export const RoleInsertSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(30, "Name must be at most 30 characters long"),
    teamId: z.uuid("Invalid team ID format"),
    description: z.string().max(255).optional(),
})

export type RoleInsertType = z.infer<typeof RoleInsertSchema>
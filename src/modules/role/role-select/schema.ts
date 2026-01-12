import z from "zod"

const RoleSelectSchema = z.object({
    id: z.string(),
    role: z.string()
})

export type RoleSelectSchema = z.infer<typeof RoleSelectSchema>

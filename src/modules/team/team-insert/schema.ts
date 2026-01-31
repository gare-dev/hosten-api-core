import z from "zod"

export const TeamInsertSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
})

export type TeamInsertInput = z.infer<typeof TeamInsertSchema>
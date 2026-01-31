import z from "zod"

export const TeamUpdateSchema = z.object({
    name: z.string().min(3).max(50).optional(),
    description: z.string().max(255).optional(),
    avatarUrl: z.string().optional(),
    id: z.string()
})

export type TeamUpdateInput = z.infer<typeof TeamUpdateSchema>;
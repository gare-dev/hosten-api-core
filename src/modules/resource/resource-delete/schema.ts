import z from "zod"

export const ResourceDeleteSchema = z.object({
    id: z.string().min(1, "ID is required")
})

export type ResourceDeleteType = z.infer<typeof ResourceDeleteSchema>
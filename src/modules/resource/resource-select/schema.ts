import z from "zod"

export const ResourceSelectSchema = z.object({
    id: z.string(),
    action: z.string(),
    resource: z.string()
})

export type ResourceSelectType = z.infer<typeof ResourceSelectSchema>
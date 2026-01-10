import z from "zod"

export const ServerInsertSchema = z.object({
    name: z.string().min(1),
    environment: z.enum(["prod", "staging", "dev", "testing"]),
    host: z.string().min(1),
    description: z.string().optional(),
})

export const ServerSchema = z.object({
    name: z.string().min(1),
    environment: z.enum(["prod", "staging", "dev", "testing"]),
    host: z.string().min(1),
    description: z.string().optional(),

    clientId: z.string().min(1,),
    clientSecret: z.string().min(1,),

    isActive: z.boolean().default(true),
})


export type ServerSchemaType = z.infer<typeof ServerSchema>
export type ServerInsertSchemaType = z.infer<typeof ServerInsertSchema>
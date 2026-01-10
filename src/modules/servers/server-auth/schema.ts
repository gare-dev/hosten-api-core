import z from "zod"

export const ServerAuthSchema = z.object({
    clientId: z.string().min(1, "Client ID is required"),
    clientSecret: z.string().min(1, "Client Secret is required"),
})

export type ServerAuthSchemaType = z.infer<typeof ServerAuthSchema>
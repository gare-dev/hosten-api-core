import z from "zod"

export const CommandTypeSchema = z.object({
    type: z.enum(["PM2_LIST", "PM2_START", "PM2_STOP", "PM2_RESTART", "PM2_LOGS"]),
    commandId: z.string(),
    payload: z.object({
        app: z.union([z.string(), z.number()]).optional(),
        script: z.string().optional(),
        options: z.string().optional()
    }).optional(),
    clientId: z.string().min(1, "clientId is required")
})

export type ServerCommandType = z.infer<typeof CommandTypeSchema>;
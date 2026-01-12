import { uptime } from "node:process"
import z from "zod"

export const ServerSelectSchema = z.object({
    connect: z.boolean(),
    name: z.string(),
    environment: z.enum(["prod", "staging", "dev", "testing"]),
    host: z.string(),
    clientId: z.string(),
    lastSeenAt: z.date(),
    metrics: z.object({
        uptime: z.number(),
        memory: z.number(),
        timestamp: z.number(),
    }).optional(),
})
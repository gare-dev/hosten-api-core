import z from "zod"

export const teamInvitationInviteSchema = z.object({
    email: z.string(),
    teamId: z.string(),
    role: z.enum(['member', 'admin', 'viewer']),
    invitedById: z.string(),
})

export type TeamInvitationInviteType = z.infer<typeof teamInvitationInviteSchema>
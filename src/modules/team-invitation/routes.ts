import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { teamInvitationInviteSchema } from "./team-invitation-invite/schema";
import { teamInvitationInvite } from "./team-invitation-invite/use-case";
import { acceptTeamInvitationInvite } from "./team-invitation-accept/use-case";
import { teamInvitationByToken } from "./team-invitation-by-token/use-case";
import { teamInvitationResendEmail } from "./team-invitation-resend-email/use-case";
import { teamInvitationByTeamId } from "./team-invitation-select-by-teamid/use-case";


const teamInvitationRoutes = express.Router();

teamInvitationRoutes.post("/team/:teamId/invitations", async (req: Request, res: Response) => {
    const data = req.body
    const userId = req.userId
    const { teamId } = req.params

    const [schemaError, parsedSchema, schemaCode] = validateSchema(teamInvitationInviteSchema, { ...data, teamId, invitedById: userId })

    if (schemaError) return res.status(schemaCode).json({ error: schemaError });

    const invitation = await teamInvitationInvite({ ...parsedSchema.data, invitedById: userId })

    return res.status(invitation.code).json({ ...invitation.data });
})

teamInvitationRoutes.post("/:token/accept", async (req: Request, res: Response) => {
    const { token } = req.params

    if (!token) return res.status(400).json({ error: 'Invitation token is required.' });

    const invitation = await acceptTeamInvitationInvite(token as string)

    return res.status(invitation.code).json({ ...invitation.data });
})

teamInvitationRoutes.get("/:token", async (req: Request, res: Response) => {
    const { token } = req.params

    if (!token) return res.status(400).json({ error: 'Invitation token is required.' });


    const invitation = await teamInvitationByToken(token as string)

    return res.status(invitation.code).json({ ...invitation.data });
})

teamInvitationRoutes.post("/:teamId/invitations/:invitationId/resend", async (req: Request, res: Response) => {
    const { teamId, invitationId } = req.params

    if (!teamId || !invitationId) return res.status(400).json({ error: 'Team ID and Invitation ID are required.' });


    const invitation = await teamInvitationResendEmail(invitationId as string, teamId as string)

    return res.status(invitation.code).json({ ...invitation.data });
})

teamInvitationRoutes.get("/:teamId/invitations", async (req: Request, res: Response) => {
    const { teamId } = req.params

    if (!teamId) return res.status(400).json({ error: 'Team ID is required.' });

    const invitations = await teamInvitationByTeamId(teamId as string)

    return res.status(invitations.code).json({ ...invitations.data });
})

export default teamInvitationRoutes
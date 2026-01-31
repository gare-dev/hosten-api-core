import { envs } from "../../../shared/config/env";
import { TeamInvitationRepository } from "../../../shared/database/repositories/team-invitation";
import { sendEmail } from "../../../shared/email";
import { teamInvitationEmail } from "../../../shared/email/templates";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { TeamInvitationInviteType } from "./schema";


export async function teamInvitationInvite(data: TeamInvitationInviteType) {
    const { createTeamInvitation, getTeamInvitationByEmailAndTeamId } = TeamInvitationRepository()

    const existingInvitation = await getTeamInvitationByEmailAndTeamId(data.email, data.teamId);

    if (existingInvitation) {
        errorResponse('An active invitation already exists for this email and team.', STATUS_CODES.BAD_REQUEST);
    }

    const token = crypto.randomUUID();

    const newInvitation = await createTeamInvitation(data, token);

    const emailParams = {
        teamName: newInvitation.team.name,
        invitationLink: `${envs.FRONTEND_BASE_URL}/invite/${token}`,
        recipientEmail: data.email,
        inviterName: newInvitation.invitedBy.username,
        inviterEmail: newInvitation.invitedBy.email,
        expiresAt: newInvitation.expiresAt,
    };

    const email = await sendEmail({
        to: data.email,
        subject: teamInvitationEmail.getSubjectLine(emailParams),
        html: teamInvitationEmail.getHtmlEmailTemplate(emailParams),
        text: teamInvitationEmail.getPlainTextEmailTemplate(emailParams),
    })

    if (email) {
        return successResponse(newInvitation, STATUS_CODES.CREATED);
    }

    return errorResponse('Failed to send invitation email.', STATUS_CODES.INTERNAL_SERVER_ERROR);
}
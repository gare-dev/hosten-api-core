import { TeamInvitationRepository } from "../../../shared/database/repositories/team-invitation";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


export async function acceptTeamInvitationInvite(token: string) {
    const { getTeamInvitationByToken, acceptTeamInvitationByToken } = TeamInvitationRepository();

    const invitation = await getTeamInvitationByToken(token);

    if (!invitation) {
        return errorResponse('Invalid or expired invitation token.', STATUS_CODES.BAD_REQUEST);
    }

    const acceptedInvitation = await acceptTeamInvitationByToken(invitation.token);

    return successResponse({ id: acceptedInvitation.id }, STATUS_CODES.OK);
}
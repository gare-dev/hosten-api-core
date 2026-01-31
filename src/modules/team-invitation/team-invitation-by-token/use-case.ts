import { TeamInvitationRepository } from "../../../shared/database/repositories/team-invitation";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


export async function teamInvitationByToken(token: string) {
    const { getTeamInvitationByToken } = TeamInvitationRepository()

    const teamInvitation = await getTeamInvitationByToken(token)

    if (!teamInvitation) {
        return errorResponse('Team invitation not found', STATUS_CODES.NOT_FOUND)
    }

    return successResponse({ data: teamInvitation }, STATUS_CODES.OK)
}
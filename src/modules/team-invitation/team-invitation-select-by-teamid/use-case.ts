import { TeamInvitationRepository } from "../../../shared/database/repositories/team-invitation";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


export async function teamInvitationByTeamId(teamId: string) {
    const { getTeamInvitationsByTeamId } = TeamInvitationRepository()

    const teamInvitations = await getTeamInvitationsByTeamId(teamId)

    if (!teamInvitations) return errorResponse('No invitations found for this team.', STATUS_CODES.NOT_FOUND)

    return successResponse({ data: teamInvitations }, STATUS_CODES.OK)
}
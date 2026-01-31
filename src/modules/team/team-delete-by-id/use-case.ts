import { TeamRepository } from "../../../shared/database/repositories/team";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";

export async function teamDeleteById(teamId: string) {
    const { deleteTeamById, getTeamById } = TeamRepository()

    const existent = await getTeamById(teamId)

    if (!existent) return errorResponse("Team not found", STATUS_CODES.NOT_FOUND)

    await deleteTeamById(teamId)

    return successResponse({}, STATUS_CODES.NO_CONTENT)
}
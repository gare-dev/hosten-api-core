import { TeamRepository } from "../../../shared/database/repositories/team";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


export async function teamSelectByOwnerId(ownerId: string) {


    const { getTeamsByOwnerId } = TeamRepository()

    const teams = await getTeamsByOwnerId(ownerId)

    if (!teams) return errorResponse("No teams found for the given owner ID.", STATUS_CODES.NOT_FOUND)

    return successResponse({ teams }, STATUS_CODES.OK)
}
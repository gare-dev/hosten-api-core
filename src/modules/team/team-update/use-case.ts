import { TeamRepository } from "../../../shared/database/repositories/team";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { TeamUpdateInput } from "./schema";


export async function teamUpdateById(teamId: string, data: Partial<TeamUpdateInput>) {
    const { updateTeamById, getTeamById, getTeamByName } = TeamRepository()

    const existent = await getTeamById(teamId)

    if (!existent) return errorResponse("Team not found", STATUS_CODES.NOT_FOUND)

    if (data.name && data.name !== existent.name) {
        const nameAlreadyExists = await getTeamByName(data.name)
        if (nameAlreadyExists) {
            return errorResponse("Team name already in use", STATUS_CODES.CONFLICT)
        }
    }

    const updatedTeam = await updateTeamById(teamId, data)

    return successResponse(updatedTeam, STATUS_CODES.OK)
}
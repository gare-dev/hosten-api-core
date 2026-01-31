import { TeamMemberRepository } from "../../../shared/database/repositories/team-member";
import {
  errorResponse,
  successResponse,
} from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";

export async function teamSelectByTeamId(teamId: string) {
  const { getTeamMembers } = TeamMemberRepository();

  const teamMembers = await getTeamMembers(teamId);

  if (!teamMembers)
    return errorResponse("Team members not found", STATUS_CODES.NOT_FOUND);

  return successResponse([...teamMembers], STATUS_CODES.OK);
}

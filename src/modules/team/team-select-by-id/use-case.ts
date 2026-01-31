import { TeamRepository } from "../../../shared/database/repositories/team";
import {
  errorResponse,
  successResponse,
} from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";

export async function teamSelectById(teamId: string, currentUserId: string) {
  const { getTeamById } = TeamRepository();

  const team = await getTeamById(teamId, currentUserId);

  if (!team) return errorResponse("Team not found", STATUS_CODES.NOT_FOUND);


  const response = {
    team: {
      id: team.id,
      name: team.name,
      slug: team.slug,
      description: team.description,
      avatarUrl: team.avatarUrl,
      ownerId: team.ownerId,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    },

    members: team.members,

    invitations: team.invitations,
    currentUserRole: team.members.find((m) => m.userId === currentUserId)?.role
      .name,
    currentUserPermissions: team.myPermissions.map((p) => {
      return [p.resource, p.action].join(":");
    }),

    // currentUserRole: team.owner.teamMemberships.find(tm => tm.userId === currentUserId)?.role || "member",
  };

  return successResponse(response, STATUS_CODES.OK);
}

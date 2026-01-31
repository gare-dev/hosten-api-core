import { RoleRepository } from "../../../shared/database/repositories/role";
import { TeamInvitationRepository } from "../../../shared/database/repositories/team-invitation";
import { TeamMemberRepository } from "../../../shared/database/repositories/team-member";
import { UserRepository } from "../../../shared/database/repositories/user";
import {
  errorResponse,
  successResponse,
} from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";

export async function acceptTeamInvitationInvite(token: string) {
  const { getTeamInvitationByToken, acceptTeamInvitationByToken } =
    TeamInvitationRepository();
  const { insertTeamMember } = TeamMemberRepository();
  const { getUserByEmail } = UserRepository();
  const { getRoleIdByNameAndTeamId } = RoleRepository();

  const invitation = await getTeamInvitationByToken(token);

  if (!invitation) {
    return errorResponse(
      "Invalid or expired invitation token.",
      STATUS_CODES.BAD_REQUEST,
    );
  }
  const [acceptedInvitation, userInfo, roleInfo] = await Promise.all([
    acceptTeamInvitationByToken(invitation.token),
    getUserByEmail(invitation.email),
    getRoleIdByNameAndTeamId(invitation.role, invitation.teamId),
  ]);

  await insertTeamMember({
    teamId: acceptedInvitation.teamId,
    userId: userInfo!.id,
    roleId: roleInfo!.id,
  });

  return successResponse(
    {
      team: {
        id: acceptedInvitation.teamId,
        name: acceptedInvitation.team.name,
      },
    },
    STATUS_CODES.OK,
  );
}

import { TeamInsertInput } from "../../../modules/team/team-insert/schema";
import { TeamUpdateInput } from "../../../modules/team/team-update/schema";
import prisma from "../index";

export const TeamRepository = () => {
  const teamInsert = async (
    data: TeamInsertInput,
    ownerId: string,
    slug: string,
  ) => {
    return await prisma.team.create({
      data: { ...data, ownerId, slug },
    });
  };

  const getTeamByName = async (name: string) => {
    return await prisma.team.findFirst({
      where: { name },
    });
  };

  const getTeamById = async (id: string, userId: string) => {
    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        _count: {
          select: { members: true, servers: true },
        },

        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true,
              },
            },
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },

        owner: {
          include: { teamMemberships: true },
        },

        invitations: {
          include: {
            invitedBy: {
              select: {
                id: true,
                email: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!team) return null;

    const myPermissions = team.members.find(
      (member) => member.userId === userId,
    )?.roleId
      ? await prisma.rolePermission.findMany({
          where: {
            roleId: team.members.find((m) => m.userId === userId)!.roleId,
          },
          include: {
            permission: {
              select: {
                id: true,
                action: true,
                resource: true,
                type: true,
                label: true,
              },
            },
          },
        })
      : [];

    return {
      ...team,
      myPermissions: myPermissions.map((p) => p.permission),
    };
  };

  const getTeamsByOwnerId = async (ownerId: string) => {
    return await prisma.team.findMany({
      where: {
        OR: [
          { ownerId: ownerId },
          {
            members: {
              some: {
                userId: ownerId,
              },
            },
          },
        ],
      },
    });
  };

  const deleteTeamById = async (id: string) => {
    return await prisma.team.delete({
      where: { id },
    });
  };

  const updateTeamById = async (id: string, data: Partial<TeamUpdateInput>) => {
    return await prisma.team.update({
      where: { id },
      data: {
        ...data,
        slug: data.name
          ? data.name.toLowerCase().replace(/\s+/g, "-")
          : undefined,
      },
    });
  };

  return {
    teamInsert,
    getTeamByName,
    getTeamById,
    getTeamsByOwnerId,
    deleteTeamById,
    updateTeamById,
  };
};

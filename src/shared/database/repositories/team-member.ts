import prisma from "../index";

export const TeamMemberRepository = () => {
  const teamMemberGetByTeamId = async (teamId: string) => {
    return await prisma.teamMember.findMany({
      where: { teamId },
    });
  };

  const updateTeamMemberById = async (id: string, data: Partial<any>) => {
    return await prisma.teamMember.update({
      where: { id },
      data,
    });
  };

  const deleteTeamMemberById = async (id: string, teamId: string) => {
    return await prisma.teamMember.delete({
      where: { id, teamId },
    });
  };

  const leaveTeamMemberById = async (id: string, teamId: string) => {
    return await prisma.teamMember.delete({
      where: { id, teamId },
    });
  };

  const updateTeamMemberRoleById = async (id: string, roleId: string) => {
    return await prisma.teamMember.update({
      where: { id },
      data: { roleId },
    });
  };

  const getTeamMembers = async (teamId: string) => {
    return await prisma.teamMember.findMany({
      where: { teamId },
      select: {
        id: true,
        teamId: true,
        userId: true,
        joinedAt: true,

        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },

        // role: {
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },

        role: {
          select: {
            permissions: {
              select: {
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
            },
          },
        },
      },
    });
  };

  const insertTeamMember = async (data: {
    roleId: string;
    teamId: string;
    userId: string;
  }) => {
    return await prisma.teamMember.create({
      data,
    });
  };
  return {
    teamMemberGetByTeamId,
    updateTeamMemberById,
    deleteTeamMemberById,
    leaveTeamMemberById,
    updateTeamMemberRoleById,
    getTeamMembers,
    insertTeamMember,
  };
};

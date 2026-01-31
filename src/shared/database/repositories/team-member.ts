import prisma from "../index"


export const TeamMemberRepository = () => {

    const teamMemberGetByTeamId = async (teamId: string) => {
        return await prisma.teamMember.findMany({
            where: { teamId }
        });
    }

    const updateTeamMemberById = async (id: string, data: Partial<any>) => {
        return await prisma.teamMember.update({
            where: { id },
            data
        });
    }

    const deleteTeamMemberById = async (id: string, teamId: string) => {
        return await prisma.teamMember.delete({
            where: { id, teamId }
        });
    }

    const leaveTeamMemberById = async (id: string, teamId: string) => {
        return await prisma.teamMember.delete({
            where: { id, teamId }
        });
    }

    const updateTeamMemberRoleById = async (id: string, role: 'owner' | 'admin' | 'member' | 'viewer') => {
        return await prisma.teamMember.update({
            where: { id },
            data: { role }
        });
    }

    return {
        teamMemberGetByTeamId,
        updateTeamMemberById,
        deleteTeamMemberById,
        leaveTeamMemberById,
        updateTeamMemberRoleById
    }
}
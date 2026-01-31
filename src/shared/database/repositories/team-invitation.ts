import { TeamInvitationInviteType } from "../../../modules/team-invitation/team-invitation-invite/schema";
import prisma from "../index"

export const TeamInvitationRepository = () => {

    const getTeamInvitationsByTeamId = async (teamId: string) => {
        return await prisma.teamInvitation.findMany({
            where: { teamId }
        });
    }

    const createTeamInvitation = async (data: TeamInvitationInviteType, token: string) => {
        return await prisma.teamInvitation.create({
            data: { ...data, token, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
            include: {
                team: {
                    select: {
                        name: true,
                    },
                },
                invitedBy: {
                    select: {
                        username: true,
                        email: true,
                    },
                },
            },
        });
    }

    const deleteTeamInvitationById = async (id: string) => {
        return await prisma.teamInvitation.update({
            data: { status: 'revoked' },
            where: { id }
        });
    }

    const resendTeamInvitationById = async (id: string) => {
        return await prisma.teamInvitation.update({
            data: { expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
            where: { id }
        });
    }

    const getTeamInvitationByToken = async (token: string) => {
        return await prisma.teamInvitation.findFirst({
            where: { token, status: 'pending', expiresAt: { gt: new Date() } }
        });
    }

    const acceptTeamInvitationByToken = async (token: string) => {
        return await prisma.teamInvitation.update({
            data: { status: 'accepted', acceptedAt: new Date() },
            where: { token }
        });
    }

    const getTeamInvitationByEmailAndTeamId = async (email: string, teamId: string) => {
        return await prisma.teamInvitation.findFirst({
            where: { email, teamId, status: 'pending', expiresAt: { gt: new Date() } }
        });
    }

    const getTeamInvitationByTeamIdAndInvitationId = async (teamId: string, invitationId: string) => {
        return await prisma.teamInvitation.findFirst({
            where: { id: invitationId, teamId }
        });
    }

    return {
        getTeamInvitationsByTeamId,
        createTeamInvitation,
        deleteTeamInvitationById,
        resendTeamInvitationById,
        getTeamInvitationByToken,
        acceptTeamInvitationByToken,
        getTeamInvitationByEmailAndTeamId,
        getTeamInvitationByTeamIdAndInvitationId
    }
}
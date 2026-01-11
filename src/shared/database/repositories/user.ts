import { UserInsertType } from "../../../modules/users/user-insert/schema"
import prisma from "../index"

export const UserRepository = () => {
    const userInsert = async (data: UserInsertType) => {
        return await prisma.user.create({
            data: { ...data }
        })
    }

    const getUserByEmail = async (email: string) => {
        return await prisma.user.findFirst({
            where: { email }
        })
    }

    const getUserByUsername = async (username: string) => {
        return await prisma.user.findFirst({
            where: { username }, select: { id: true, username: true, password: true }
        })
    }

    const getPermissionsByUsername = async (username: string) => {
        return await prisma.user.findUnique({
            where: {
                username: username,
            },
            select: {
                roles: {
                    select: {
                        role: {
                            select: {
                                permissions: {
                                    select: {
                                        permission: {
                                            select: {
                                                resource: true,
                                                action: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    return {
        userInsert,
        getUserByEmail,
        getUserByUsername,
        getPermissionsByUsername
    }
}
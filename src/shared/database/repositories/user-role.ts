import { UserRoleInsertType } from "../../../modules/user-role/user-role-insert/schema"
import prisma from "../index"

export const UserRoleRepository = () => {
    const userRoleInsert = async (data: UserRoleInsertType) => {
        return await prisma.userRole.create({
            data: { ...data }
        })
    }

    return {
        userRoleInsert
    }
}
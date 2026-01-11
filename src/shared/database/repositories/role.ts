import { RoleInsertType } from "../../../modules/role/role-insert/schema"
import prisma from "../index"

export const RoleRepository = () => {
    const roleInsert = async (data: RoleInsertType) => {
        return await prisma.role.create({
            data: { ...data }
        })
    }

    return {
        roleInsert
    }
}
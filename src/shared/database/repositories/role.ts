import { id } from "zod/v4/locales"
import { RoleInsertType } from "../../../modules/role/role-insert/schema"
import prisma from "../index"

export const RoleRepository = () => {
    const roleInsert = async (data: RoleInsertType) => {
        return await prisma.role.create({
            data: { ...data }
        })
    }

    const roleSelect = async () => {
        return await prisma.role.findMany()
    }

    const roleDelete = async (id: string) => {
        return await prisma.role.delete({
            where: { id }
        })
    }

    return {
        roleInsert,
        roleSelect,
        roleDelete
    }
}
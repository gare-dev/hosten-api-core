import { RolePermissionInsertType } from "../../../modules/role-permission/role-permission-insert/schema"
import prisma from "../index"

export const RolePermissionRepository = () => {
    const rolePermissionInsert = async (data: RolePermissionInsertType) => {
        return await prisma.rolePermission.create({
            data: { ...data }
        })
    }

    return {
        rolePermissionInsert
    }
}
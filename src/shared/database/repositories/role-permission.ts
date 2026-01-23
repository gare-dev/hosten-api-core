import { RolePermissionInsertType } from "../../../modules/role-permission/role-permission-insert/schema"
import prisma from "../index"
import { RolePermissionDeleteType } from "../../../modules/role-permission/role-permission-delete/schema";

export const RolePermissionRepository = () => {
    const rolePermissionInsert = async (data: RolePermissionInsertType) => {
        return await prisma.rolePermission.create({
            data: { ...data }
        })
    }

    const roleSelect = async () => {
        const permissions = await prisma.permission.findMany({
            include: {
                roles: {
                    select: {
                        roleId: true
                    }
                }
            }
        })

        return permissions.map(permission => ({
            id: permission.id,
            resource: permission.resource,
            action: permission.action,
            roleIds: permission.roles.map(r => r.roleId)
        }))
    }

    const rolePermissionDelete = async (data: RolePermissionDeleteType) => {
        return await prisma.rolePermission.deleteMany({
            where: {
                roleId: data.roleId,
                permissionId: data.permissionId
            }
        })
    }

    return {
        rolePermissionInsert,
        roleSelect,
        rolePermissionDelete
    }
}
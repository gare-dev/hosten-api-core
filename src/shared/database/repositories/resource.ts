
import { get } from "node:http"
import { ResourceInsertType } from "../../../modules/resource/resource-insert/schema"
import prisma from "../index"

export const ResourceRepository = () => {
    const resourceInsert = async (data: ResourceInsertType) => {
        return await prisma.permission.createMany({
            data: [...data],
        })
    }

    const getAllPermissionByTeamId = async (teamId: string) => {
        return await prisma.permission.findMany({
            where: { teamId }
        });
    }


    const resourceSelect = async () => {
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

    const resourceDelete = async (id: string) => {
        return await prisma.permission.delete({
            where: {
                id: id
            }
        })
    }



    return {
        resourceInsert,
        resourceSelect,
        resourceDelete,
        getAllPermissionByTeamId,
    }
}
import { PermissionInsertType } from "../../../modules/permission/permission-insert/schema"
import prisma from "../index"

export const PermissionRepository = () => {
    const permissionInsert = async (data: PermissionInsertType) => {
        return await prisma.permission.create({
            data: { ...data }
        })
    }

    return {
        permissionInsert
    }
}
import { RolePermissionRepository } from "../../../shared/database/repositories/role-permission";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


export async function rolePermissionSelectById() {
    const { roleSelect } = RolePermissionRepository()

    const rolePermissions = await roleSelect()

    return successResponse(rolePermissions, STATUS_CODES.OK)
}
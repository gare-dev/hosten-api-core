import { RolePermissionRepository } from "../../../shared/database/repositories/role-permission";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { RolePermissionDeleteType } from "./schema";


export async function rolePermissionDelete(data: RolePermissionDeleteType) {
    const { rolePermissionDelete } = RolePermissionRepository()

    const rolePermission = await rolePermissionDelete(data);

    return successResponse({ deletedCount: rolePermission.count }, STATUS_CODES.OK);
}
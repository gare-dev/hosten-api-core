import { RolePermissionRepository } from "../../../shared/database/repositories/role-permission";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { RolePermissionInsertType } from "./schema";


export async function rolePermissionInsert(data: RolePermissionInsertType) {
    const { rolePermissionInsert } = RolePermissionRepository()

    const rolePermission = await rolePermissionInsert(data);

    return successResponse({ id: rolePermission.roleId }, STATUS_CODES.CREATED);
}
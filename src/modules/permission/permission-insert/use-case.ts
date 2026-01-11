import { PermissionRepository } from "../../../shared/database/repositories/permission";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { PermissionInsertType } from "./schema";

export async function permissionInsert(data: PermissionInsertType) {
    const { permissionInsert } = PermissionRepository()

    const permission = await permissionInsert(data);

    return successResponse({ id: permission.id, action: permission.action, resource: permission.resource }, STATUS_CODES.CREATED);
}
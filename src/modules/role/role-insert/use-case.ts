import { RoleRepository } from "../../../shared/database/repositories/role";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { RoleInsertType } from "./schema";


export async function roleInsert(data: RoleInsertType) {
    const { roleInsert } = RoleRepository()

    const role = await roleInsert(data);

    return successResponse({ id: role.id, name: role.name }, STATUS_CODES.CREATED);
}
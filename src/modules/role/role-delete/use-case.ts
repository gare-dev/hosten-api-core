import { RoleRepository } from "../../../shared/database/repositories/role";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";

export async function roleDelete(id: string) {
    const { roleDelete } = RoleRepository()

    const role = await roleDelete(id);

    return successResponse({ id: role.id, name: role.name }, STATUS_CODES.OK);
}
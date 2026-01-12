import { RoleRepository } from "../../../shared/database/repositories/role";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


async function roleSelect() {
    const { roleSelect } = RoleRepository()

    const roles = await roleSelect();

    return successResponse(roles, STATUS_CODES.OK);
}

export default roleSelect
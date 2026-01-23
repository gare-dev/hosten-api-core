import { UserRoleRepository } from "../../../shared/database/repositories/user-role";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


export async function userRoleDelete(userId: string, roleId: string) {
    const { userRoleDeleteByIds } = UserRoleRepository()

    const userRole = await userRoleDeleteByIds(userId, roleId)

    return successResponse(userRole, STATUS_CODES.OK)
}
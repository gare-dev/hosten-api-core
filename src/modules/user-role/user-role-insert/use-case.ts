import { UserRoleRepository } from "../../../shared/database/repositories/user-role";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { UserRoleInsertType } from "./schema";

export async function userRoleInsert(data: UserRoleInsertType) {
    const { userRoleInsert } = UserRoleRepository()

    const userRole = await userRoleInsert(data);

    return successResponse({ id: userRole.userId }, STATUS_CODES.CREATED);
}
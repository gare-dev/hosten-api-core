import { UserRepository } from "../../../shared/database/repositories/user";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


export async function userSelect() {
    const { getUsers } = UserRepository()

    const users = await getUsers()

    return successResponse(users, STATUS_CODES.OK)
}
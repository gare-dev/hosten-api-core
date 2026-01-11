import { UserRepository } from "../../../shared/database/repositories/user";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { UserInsertType } from "./schema";
import bcrypt from "bcrypt";

export async function userInsert(data: UserInsertType) {
    const { getUserByEmail, userInsert } = UserRepository()

    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
        return errorResponse("User with this email already exists.", STATUS_CODES.CONFLICT);
    }

    const user = await userInsert({ ...data, password: bcrypt.hashSync(data.password, 12) });

    return successResponse({ id: user.id, email: user.email }, STATUS_CODES.CREATED);
}
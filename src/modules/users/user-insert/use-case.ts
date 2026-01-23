import { envs } from "../../../shared/config/env";
import { UserRepository } from "../../../shared/database/repositories/user";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { UserInsertType } from "./schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export async function userInsert(data: UserInsertType) {
    const { getUserByEmail, userInsert } = UserRepository()

    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
        return errorResponse("User with this email already exists.", STATUS_CODES.CONFLICT);
    }

    const user = await userInsert({ ...data, password: bcrypt.hashSync(data.password, 12) });

    const token = jwt.sign({
        userId: user.id,
        username: user.username,
    }, envs.JWT_TOKEN, { expiresIn: '6h' })


    return successResponse({ id: user.id, email: user.email, token }, STATUS_CODES.CREATED);
}
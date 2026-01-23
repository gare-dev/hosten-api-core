import { UserRepository } from "../../../shared/database/repositories/user";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { UserAuthType } from "./schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { envs } from "../../../shared/config/env";

export async function userAuth(data: UserAuthType) {
    const { getUserByUsername, getPermissionsByUsername } = UserRepository()

    const user = await getUserByUsername(data.username);

    if (!user) {
        return errorResponse("Invalid username or password.", 401);
    }

    const [isPasswordValid, permissions] = await Promise.all([
        bcrypt.compare(data.password, user.password),
        getPermissionsByUsername(data.username)
    ]);

    if (!isPasswordValid) {
        return errorResponse("Invalid username or password.", 401);
    }

    const token = jwt.sign({
        userId: user.id,
        username: user.username,
        permissions: permissions?.roles.flatMap(userRole => userRole?.role.permissions.map(p => `${p.permission.resource}:${p.permission.action}`)) ?? []
    }, envs.JWT_TOKEN, { expiresIn: '6h' })

    return successResponse({ token, permissions: permissions?.roles[0]?.role.permissions.map(p => ({ action: p.permission.action, resource: p.permission.resource })) }, 200);
}

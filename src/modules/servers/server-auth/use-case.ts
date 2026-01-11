import jwt from "jsonwebtoken"
import { ServerRepository } from "../../../shared/database/repositories/server";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { ServerAuthSchemaType } from "./schema";
import bcrypt from "bcrypt";
import { envs } from "../../../shared/config/env";

export async function serverAuth(data: ServerAuthSchemaType) {
    const { serverAuth } = ServerRepository();

    const server = await serverAuth({ ...data });

    if (!server) {
        return errorResponse("Invalid server name or client secret", STATUS_CODES.UNAUTHORIZED);
    }

    const isSecretValid = await bcrypt.compare(data.clientSecret, server.clientSecret);

    if (!isSecretValid) {
        return errorResponse("Invalid server name or client secret", STATUS_CODES.UNAUTHORIZED);
    }

    const token = jwt.sign({ clientId: server.clientId, type: 'agent' }, envs.JWT_TOKEN, { expiresIn: '3m' })

    return successResponse({ message: "Authentication successful", token }, STATUS_CODES.OK);
}
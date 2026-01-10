import { ServerRepository } from "../../../shared/database/repositories/server";
import { ServerInsertSchemaType, ServerSchemaType } from "./schema";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";

export async function serverInsert(data: ServerInsertSchemaType) {
    const { serverInsert, getServerByName } = ServerRepository();

    const existingServer = await getServerByName(data.name);

    if (existingServer) {
        return errorResponse("Server with this name already exists.", STATUS_CODES.CONFLICT);
    }

    const clientSecret = crypto.randomBytes(32).toString("hex");

    const server = await serverInsert({ ...data }, bcrypt.hashSync(clientSecret, 12));

    return successResponse({ clientId: server.clientId, clientSecret }, STATUS_CODES.CREATED);
}
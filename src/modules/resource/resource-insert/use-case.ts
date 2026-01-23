import { ResourceRepository } from "../../../shared/database/repositories/resource";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { ResourceInsertType } from "./schema";

export async function resourceInsert(data: ResourceInsertType) {
    const { resourceInsert } = ResourceRepository()

    const resource = await resourceInsert(data);

    return successResponse(resource, STATUS_CODES.CREATED);
}
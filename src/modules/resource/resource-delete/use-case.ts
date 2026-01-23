import { ResourceRepository } from "../../../shared/database/repositories/resource";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";
import { ResourceDeleteType } from "./schema";


export async function resourceDelete(data: ResourceDeleteType) {
    const { resourceDelete } = ResourceRepository()

    const result = await resourceDelete(data.id)

    return successResponse(result, STATUS_CODES.OK)
}
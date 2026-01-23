import { ResourceRepository } from "../../../shared/database/repositories/resource";
import { successResponse } from "../../../shared/infra/http/api-response";
import { STATUS_CODES } from "../../../shared/infra/http/status-codes";


export async function resourceSelect() {
    const { resourceSelect } = ResourceRepository()

    const resources = await resourceSelect()

    return successResponse({ resources }, STATUS_CODES.OK)
}
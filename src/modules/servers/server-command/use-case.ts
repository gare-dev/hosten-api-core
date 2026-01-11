import { ServerCommandType } from "./schema";
import { ServerCommandGateway } from "../../../shared/helpers/server-command-gateway";
import { ErrorResult, SuccessResult } from "../../../shared/infra/http/api-response";
import { PM2CommandResult } from "../../../shared/types/pm2-command-result";
import type { ErrorStatusCode, SuccessStatusCode } from '../../../shared/infra/http/status-codes';

export class PM2ServerCommand {
    constructor(
        private commandGateway: ServerCommandGateway) { }

    async execute(data: ServerCommandType): Promise<ErrorResult<ErrorStatusCode> | SuccessResult<PM2CommandResult, SuccessStatusCode>> {
        return await this.commandGateway.sendPm2Command(data.clientId, data)
    }
}
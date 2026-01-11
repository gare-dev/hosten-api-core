import { ServerCommandType } from "./schema";
import { ServerCommandGateway } from "../../../shared/helpers/server-command-gateway";

export class PM2ServerCommand {
    constructor(
        private commandGateway: ServerCommandGateway) { }

    async execute(data: ServerCommandType) {
        return await this.commandGateway.sendPm2Command(data.clientId, data);
    }
}
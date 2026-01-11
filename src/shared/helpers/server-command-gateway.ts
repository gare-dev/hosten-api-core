import { ServerCommandType } from "../../modules/servers/server-command/schema";
import { SocketIO } from "../socket";

export class ServerCommandGateway {
    constructor(private socketIO: SocketIO) { }

    async sendPm2Command(
        clientId: string,
        command: ServerCommandType
    ) {
        return await this.socketIO.emitToServer(
            clientId,
            "pm2-command",
            command
        );
    }
}

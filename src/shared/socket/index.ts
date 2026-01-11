import { Server } from "socket.io";
import { httpServer } from "./server";
import { socketAuth } from "../infra/http/middleware/socket-auth";
import { ServerListener, servers } from "./listeners/server-listener";
import { doubleConnection } from "../infra/http/middleware/double-connection";
import { ServerCommandType } from "../../modules/servers/server-command/schema";
import pendingCommands from "../helpers/pending-commands";
import { errorResponse, successResponse, ErrorResult, SuccessResult } from "../infra/http/api-response";
import { PM2CommandResult } from "../types/pm2-command-result";
import type { ErrorStatusCode, SuccessStatusCode } from '../infra/http/status-codes';

export class SocketIO {
    private io: Server

    constructor() {
        this.io = new Server(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true
            }
        })

        this.io.use(socketAuth)
        this.io.use(doubleConnection)

        this.setUpServer()
    }

    private setUpServer() {
        this.io.on("connection", (socket) => {
            const handler = new ServerListener(socket)
            const server = socket.data.server

            handler.registerServer()
            this.serverCommandResult(socket)
            this.registerHeartBeat(socket, handler)
            this.registerDisconnect(socket, handler, server.clientId)
        })
    }

    private registerHeartBeat(socket: any, handler: ServerListener) {
        socket.on("heartbeat", (socket: any) => {
            handler.updateServerStatus(socket);
        });
    }

    private serverCommandResult(socket: any) {
        socket.on("server-command-result", (payload: any) => {
            const pending = pendingCommands.get(payload.commandId);
            if (!pending) return;

            clearTimeout(pending.timeout);
            pending.resolve(payload);
            pendingCommands.delete(payload.commandId);
        });

    }

    private registerDisconnect(socket: any, handler: ServerListener, clientId: string) {
        socket.on("disconnect", () => {
            console.log(`Server ${clientId} disconnected`)
            handler.disconnectServer()
        })
    }

    public async emitToServer(clientId: string, event: string, payload: ServerCommandType): Promise<ErrorResult<ErrorStatusCode> | SuccessResult<PM2CommandResult, SuccessStatusCode>> {
        const server = servers.find(s => s.clientId === clientId);

        if (!server) return errorResponse("Server not connected", 400);

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                pendingCommands.delete(payload.commandId);
                reject(new Error("Command timeout"));
            }, 15_000);

            pendingCommands.set(payload.commandId, {
                resolve: (result: PM2CommandResult) => resolve(successResponse(result, 200)),
                reject,
                timeout
            });

            server?.socket.emit("pm2-command", payload);
        });
    }


}


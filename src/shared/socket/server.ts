import express from "express";
import { createServer } from "http";
import { envs } from "../../shared/config/env"
import { SocketIO } from ".";

const app = express()
export const httpServer = createServer(app)

httpServer.listen(envs.SOCKET_PORT, () => {
    console.log(`Socket server is running on port ${envs.SOCKET_PORT}`);
});

export const SocketServer = new SocketIO()

export default app

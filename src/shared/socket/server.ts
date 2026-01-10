import express from "express";
import { createServer } from "http";
import { envs } from "../../shared/config/env"

const app = express()
export const httpServer = createServer(app)

httpServer.listen(envs.SOCKET_PORT, () => {
    console.log(`Socket server is running on port ${envs.SOCKET_PORT}`);
});

export default app

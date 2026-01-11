import express, { Request, Response } from "express"
import { ServerInsertSchema } from "./server-insert/schema";
import { serverInsert } from "./server-insert/use-case";
import { validateSchema } from "../../shared/helpers/validate-schema";
import { ServerAuthSchema } from "./server-auth/schema";
import { serverAuth } from "./server-auth/use-case";
import { ServerListener } from "../../shared/socket/listeners/server-listener";
import { Socket } from "socket.io";
import { SocketIO } from "../../shared/socket";
import { CommandTypeSchema } from "./server-command/schema";
import { PM2ServerCommand } from "./server-command/use-case";
import { ServerCommandGateway } from "../../shared/helpers/server-command-gateway";
import { SocketServer } from "../../shared/socket/server";

const serverRoutes = express.Router();

serverRoutes.post("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(ServerInsertSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const server = await serverInsert(parsedSchema.data)

    return res.status(server.code).json({ ...server.data });
})

serverRoutes.post("/auth", async (req: Request, res: Response) => {
    const data = req.body

    const [schemaError, parsedSchema, schemaCode] = validateSchema(ServerAuthSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const server = await serverAuth(parsedSchema.data)

    return res.status(server.code).json({ ...server.data });
});

serverRoutes.post("/command", async (req: Request, res: Response) => {
    const data = req.body;
    const commandId = crypto.randomUUID();


    const [schemaError, parsedSchema, schemaCode] = validateSchema(CommandTypeSchema, { ...data, commandId })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const serverCommand = new PM2ServerCommand(new ServerCommandGateway(SocketServer))

    const command = await serverCommand.execute(parsedSchema.data)

    return res.status(200).json({ command });
})
export default serverRoutes
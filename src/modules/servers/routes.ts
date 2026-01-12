import express, { Request, Response } from "express"
import { ServerInsertSchema } from "./server-insert/schema";
import { serverInsert } from "./server-insert/use-case";
import { validateSchema } from "../../shared/helpers/validate-schema";
import { ServerAuthSchema } from "./server-auth/schema";
import { serverAuth } from "./server-auth/use-case";
import { CommandTypeSchema } from "./server-command/schema";
import { PM2ServerCommand } from "./server-command/use-case";
import { ServerCommandGateway } from "../../shared/helpers/server-command-gateway";
import { SocketServer } from "../../shared/socket/server";
import checkPermission from "../../shared/infra/http/middleware/check-permission";
import { serverSelect } from "./server-select/use-case";

const serverRoutes = express.Router();

serverRoutes.post("/", checkPermission, async (req: Request, res: Response) => {
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

serverRoutes.post("/command", checkPermission, async (req: Request, res: Response) => {
    const data = req.body;
    const commandId = crypto.randomUUID();

    const [schemaError, parsedSchema, schemaCode] = validateSchema(CommandTypeSchema, { ...data, commandId })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const serverCommand = new PM2ServerCommand(new ServerCommandGateway(SocketServer))

    const command = await serverCommand.execute(parsedSchema.data)

    return res.status(command.code).json({ ...command.data });
})

serverRoutes.get("/", checkPermission, async (req: Request, res: Response) => {

    const servers = await serverSelect()

    return res.status(servers.code).json({ ...servers.data });

})
export default serverRoutes
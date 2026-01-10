import express, { Request, Response } from "express"
import { ServerInsertSchema } from "./server-insert/schema";
import { serverInsert } from "./server-insert/use-case";
import { validateSchema } from "../../shared/helpers/validate-schema";
import { ServerAuthSchema } from "./server-auth/schema";
import { serverAuth } from "./server-auth/use-case";

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
export default serverRoutes
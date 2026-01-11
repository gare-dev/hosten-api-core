import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { PermissionInsertSchema } from "./permission-insert/schema";
import { permissionInsert } from "./permission-insert/use-case";

const permissionRoutes = express.Router();

permissionRoutes.post("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(PermissionInsertSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const permission = await permissionInsert(parsedSchema.data)

    return res.status(permission.code).json({ ...permission.data });
})

export default permissionRoutes
import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { RoleInsertSchema } from "./role-insert/schema";
import { roleInsert } from "./role-insert/use-case";

const roleRoutes = express.Router();

roleRoutes.post("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(RoleInsertSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const role = await roleInsert(parsedSchema.data)

    return res.status(role.code).json({ ...role.data });
});

export default roleRoutes
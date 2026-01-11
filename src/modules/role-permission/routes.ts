import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { RolePermissionInsertSchema } from "./role-permission-insert/schema";
import { rolePermissionInsert } from "./role-permission-insert/use-case";


const rolePermissionRoutes = express.Router();

rolePermissionRoutes.post("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(RolePermissionInsertSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const rolePermission = await rolePermissionInsert(parsedSchema.data)

    return res.status(rolePermission.code).json({ ...rolePermission.data });
})

export default rolePermissionRoutes
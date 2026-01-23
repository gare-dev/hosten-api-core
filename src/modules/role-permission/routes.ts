import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { RolePermissionInsertSchema } from "./role-permission-insert/schema";
import { rolePermissionInsert } from "./role-permission-insert/use-case";
import { rolePermissionSelectById } from "./role-select/use-case";
import { RolePermissionDeleteSchema } from "./role-permission-delete/schema";
import { rolePermissionDelete } from "./role-permission-delete/use-case";


const rolePermissionRoutes = express.Router();

rolePermissionRoutes.post("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(RolePermissionInsertSchema, { ...data })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const rolePermission = await rolePermissionInsert(parsedSchema.data)

    return res.status(rolePermission.code).json({ ...rolePermission.data });
})

rolePermissionRoutes.get("/role", async (req: Request, res: Response) => {
    const rolePermission = await rolePermissionSelectById()

    return res.status(rolePermission.code).json(rolePermission.data);
})

rolePermissionRoutes.delete("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(RolePermissionDeleteSchema, { ...data })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const rolePermission = await rolePermissionDelete(parsedSchema.data)

    return res.status(rolePermission.code).json({ ...rolePermission.data });
})

export default rolePermissionRoutes
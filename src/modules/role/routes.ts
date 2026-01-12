import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { RoleInsertSchema } from "./role-insert/schema";
import { roleInsert } from "./role-insert/use-case";
import roleSelect from "./role-select/use-case";
import { RoleDeleteSchema } from "./role-delete/schema";
import { roleDelete } from "./role-delete/use-case";

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

roleRoutes.get("/", async (req: Request, res: Response) => {
    const roles = await roleSelect()

    return res.status(roles.code).json({ data: roles.data });
})

roleRoutes.delete("/:id", async (req: Request, res: Response) => {
    const { id: data } = req.params;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(RoleDeleteSchema, { id: data })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const role = await roleDelete(parsedSchema.data.id);

    return res.status(role.code).json({ ...role.data });
})

export default roleRoutes
import express, { Request, Response } from "express"
import { UserRoleInsertSchema } from "./user-role-insert/schema";
import { validateSchema } from "../../shared/helpers/validate-schema";
import { userRoleInsert } from "./user-role-insert/use-case";
import { UserRoleDeleteSchema } from "./user-role-delete/schema";
import { userRoleDelete } from "./user-role-delete/use-case";

const userRoleRoutes = express.Router();

userRoleRoutes.post("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(UserRoleInsertSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const userRole = await userRoleInsert(parsedSchema.data)

    return res.status(userRole.code).json({ ...userRole.data });
})

userRoleRoutes.delete("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(UserRoleDeleteSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const userRole = await userRoleDelete(parsedSchema.data.userId, parsedSchema.data.roleId)

    return res.status(userRole.code).json({ ...userRole.data });
})

export default userRoleRoutes
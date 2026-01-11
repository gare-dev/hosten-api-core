import express, { Request, Response } from "express"
import { UserRoleInsertSchema } from "./user-role-insert/schema";
import { validateSchema } from "../../shared/helpers/validate-schema";
import { userRoleInsert } from "./user-role-insert/use-case";

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


export default userRoleRoutes
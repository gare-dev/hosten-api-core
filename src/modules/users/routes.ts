import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { UserInsertSchema } from "./user-insert/schema";
import { userInsert } from "./user-insert/use-case";
import { UserAuthSchema } from "./user-auth/schema";
import { userAuth } from "./user-auth/use-case";
import checkPermission from "../../shared/infra/http/middleware/check-permission";


const userRoutes = express.Router();

userRoutes.post("/", checkPermission, async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(UserInsertSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const user = await userInsert(parsedSchema.data)

    return res.status(user.code).json({ ...user.data });
})

userRoutes.post("/auth", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(UserAuthSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const user = await userAuth(parsedSchema.data)

    return res.status(user.code).json({ ...user.data });
})

export default userRoutes
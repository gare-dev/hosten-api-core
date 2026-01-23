import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { UserInsertSchema } from "./user-insert/schema";
import { userInsert } from "./user-insert/use-case";
import { UserAuthSchema } from "./user-auth/schema";
import { userAuth } from "./user-auth/use-case";
import checkPermission from "../../shared/infra/http/middleware/check-permission";
import { userSelect } from "./user-select/use-case";


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

    const user = await userAuth(parsedSchema.data) as { code: number; data: { token: string; permissions: Array<{ action: string; resource: string }> } };

    return res.status(user.code).cookie("token", user.data.token, { httpOnly: true, secure: true, sameSite: "none", path: "/" }).json({ ...user.data, token: undefined });
})

userRoutes.delete("/auth", async (req: Request, res: Response) => {
    return res.status(200).cookie("token", null).json({ message: "Logged out successfully" });
})

userRoutes.get("/", checkPermission, async (req: Request, res: Response) => {
    const users = await userSelect();

    return res.status(users.code).json(users);
});

export default userRoutes
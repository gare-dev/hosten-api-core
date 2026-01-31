import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { TeamInsertSchema } from "./team-insert/schema";
import { teamInsert } from "./team-insert/use-case";
import { teamSelectById } from "./team-select-by-id/use-case";
import { TeamSelectByIdSchema } from "./team-select-by-id/schema";
import { teamSelectByOwnerId } from "./team-select-by-ownerid/use-case";
import { teamDeleteById } from "./team-delete-by-id/use-case";
import { teamUpdateById } from "./team-update/use-case";
import { TeamUpdateSchema } from "./team-update/schema";


const teamRoutes = express.Router();

teamRoutes.post("/", async (req: Request, res: Response) => {
    const data = req.body;
    const userId = req.userId

    const [schemaError, parsedSchema, schemaCode] = validateSchema(TeamInsertSchema, { ...data })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const team = await teamInsert(parsedSchema.data, userId)

    return res.status(team.code).json({ ...team.data });
})

teamRoutes.get("/:teamId", async (req: Request, res: Response) => {
    const { teamId } = req.params;
    const currentUserId = req.userId

    const [schemaError, parsedSchema, schemaCode] = validateSchema(TeamSelectByIdSchema, { id: teamId })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const team = await teamSelectById(parsedSchema.data.id, currentUserId)

    return res.status(team.code).json({ data: team.data });
})

teamRoutes.get("/", async (req: Request, res: Response) => {
    const ownerId = req.userId

    const team = await teamSelectByOwnerId(ownerId)

    return res.status(team.code).json(team.data);
})

teamRoutes.delete("/:teamId", async (req: Request, res: Response) => {
    const { teamId } = req.params;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(TeamSelectByIdSchema, { id: teamId })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const team = await teamDeleteById(parsedSchema.data.id)

    return res.status(team.code).json(team.data);

})

teamRoutes.patch("/:teamId", async (req: Request, res: Response) => {
    const { teamId } = req.params;
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(TeamUpdateSchema, { ...data, id: teamId })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const team = await teamUpdateById(parsedSchema.data.id, parsedSchema.data)

    return res.status(team.code).json(team.data);

})
export default teamRoutes
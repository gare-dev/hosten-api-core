import express, { Request, Response } from "express"
import { validateSchema } from "../../shared/helpers/validate-schema";
import { ResourceInsertSchema } from "./resource-insert/schema";
import { resourceInsert } from "./resource-insert/use-case";
import { resourceSelect } from "./resource-select/use-case";
import { ResourceDeleteSchema } from "./resource-delete/schema";
import { resourceDelete } from "./resource-delete/use-case";

const resourceRoutes = express.Router();

resourceRoutes.post("/", async (req: Request, res: Response) => {
    const data = req.body;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(ResourceInsertSchema, data)

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const resource = await resourceInsert(parsedSchema.data)

    return res.status(resource.code).json({ ...resource.data });
})

resourceRoutes.get("/", async (req: Request, res: Response) => {
    const resource = await resourceSelect()

    return res.status(resource.code).json({ ...resource.data });
})

resourceRoutes.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    const [schemaError, parsedSchema, schemaCode] = validateSchema(ResourceDeleteSchema, { id })

    if (schemaError) {
        return res.status(schemaCode).json({ error: schemaError });
    }

    const resource = await resourceDelete(parsedSchema.data)

    return res.status(resource.code).json({ ...resource.data });
})

export default resourceRoutes
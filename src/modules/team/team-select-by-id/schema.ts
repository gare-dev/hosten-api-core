import z from 'zod';

export const TeamSelectByIdSchema = z.object({
    id: z.string(),
});

export type TeamSelectByIdSchemaType = z.infer<typeof TeamSelectByIdSchema>;
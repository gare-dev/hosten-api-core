import z from 'zod';

export const TeamDeleteByIdSchema = z.object({
    id: z.string(),
});

export type TeamDeleteByIdInput = z.infer<typeof TeamDeleteByIdSchema>;
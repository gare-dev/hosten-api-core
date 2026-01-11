import z from "zod";

export const UserAuthSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6).max(100)
});

export type UserAuthType = z.infer<typeof UserAuthSchema>;
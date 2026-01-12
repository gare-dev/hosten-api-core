import z from "zod";

export const UserAuthSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").max(30, "Username must be at most 30 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long"),
});

export type UserAuthType = z.infer<typeof UserAuthSchema>;
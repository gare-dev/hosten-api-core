import { z } from 'zod';

const envsSchema = z.object({
    SOCKET_PORT: z.coerce.number().default(5460),
    TOKEN_KEY: z.string().default('default_token_key'),
    HTTP_PORT: z.coerce.number().default(5450),
    JWT_TOKEN: z.string().default('default_jwt_token'),
})

export const envs = Object.freeze(envsSchema.parse(process.env));
import type { ZodSchema, z } from 'zod';

import { type ErrorStatusCode, STATUS_CODES } from '../infra/http/status-codes';

export const validateSchema = <Schema extends ZodSchema>(
    schema: Schema,
    data: Record<keyof z.infer<Schema>, unknown>
): [null, { data: z.infer<Schema> }] | [{ details: {}[] }, null, code: number] => {
    const result = schema.safeParse(data);

    if (result.error) {
        return [
            {
                details: result.error.issues.map(issue => ({ field: issue.path[0], detail: issue.code, message: issue.message })),
            },
            null,
            STATUS_CODES.BAD_REQUEST
        ];
    }

    return [
        null,
        {
            data: result.data
        }
    ];
};
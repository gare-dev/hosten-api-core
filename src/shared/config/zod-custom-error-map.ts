import { type ZodSchema, z } from 'zod';

type Issue = Parameters<z.ZodErrorMap>[0];
type Field = string | number | undefined;

const DEFAULT_MESSAGE = 'Invalid value';

const getField = (path?: (string | number | symbol)[]): Field => {
    const key = path?.at(-1);
    return typeof key === 'string' || typeof key === 'number' ? key : undefined;
};

const handleInvalidTypeError = (issue: Issue, field: Field) => {
    const { received, expected } = issue as { received?: string; expected?: string };

    if (received === 'undefined') {
        return { message: `The field '${field ?? 'field'}' is required` };
    }

    if (expected === 'string') {
        return { message: `The field '${field ?? 'field'}' should be a string` };
    }

    if (expected === 'number') {
        return { message: `The field '${field ?? 'field'}' should be a number` };
    }

    return { message: DEFAULT_MESSAGE };
};

const handleTooSmallError = (issue: Issue, field: Field) => {
    const { origin, minimum, exact } = issue as { origin?: string; minimum?: number | bigint; exact?: boolean };

    if (origin === 'string') {
        if (exact) {
            return { message: `The field '${field ?? 'field'}' should contain ${minimum} characters` };
        }
        return { message: `The field '${field ?? 'field'}' should contain at least ${minimum} characters` };
    }

    if (origin === 'number' || origin === 'int' || origin === 'bigint') {
        if (exact) {
            return { message: `The field '${field ?? 'field'}' should be greater than ${minimum}` };
        }
        return { message: `The field '${field ?? 'field'}' should be greater or equal to ${minimum}` };
    }

    return { message: DEFAULT_MESSAGE };
};

const handleTooBigError = (issue: Issue, field: Field) => {
    const { origin, maximum, exact } = issue as { origin?: string; maximum?: number | bigint; exact?: boolean };

    if (origin === 'string') {
        if (exact) {
            return { message: `The field '${field ?? 'field'}' should contain ${maximum} characters` };
        }
        return { message: `The field '${field ?? 'field'}' should contain at most ${maximum} characters` };
    }

    if (origin === 'number' || origin === 'int' || origin === 'bigint') {
        if (exact) {
            return { message: `The field '${field ?? 'field'}' should be equal to ${maximum}` };
        }
        return { message: `The field '${field ?? 'field'}' should be less or equal to ${maximum}` };
    }

    return { message: DEFAULT_MESSAGE };
};

const handleInvalidFormatError = (issue: Issue, field: Field) => {
    const { format } = issue as { format?: string };

    if (format === 'email') {
        return { message: `The field '${field ?? 'field'}' should be a valid email` };
    }

    if (format === 'uuid') {
        return { message: `The field '${field ?? 'field'}' should be a valid UUID` };
    }

    return { message: DEFAULT_MESSAGE };
};

export const zodCustomErrorMap = <Schema extends ZodSchema>(
    fields: Array<keyof z.infer<Schema>> = []
): z.ZodErrorMap =>
    (issue) => {
        const currentField = getField(issue.path as (string | number | symbol)[] | undefined);

        const shouldIgnore = currentField !== undefined && (fields as Array<string | number>).includes(currentField);
        if (shouldIgnore) {
            return { message: DEFAULT_MESSAGE };
        }

        switch (issue.code) {
            case 'invalid_type':
                return handleInvalidTypeError(issue, currentField);

            case 'too_small':
                return handleTooSmallError(issue, currentField);

            case 'too_big':
                return handleTooBigError(issue, currentField);

            case 'invalid_format':
                return handleInvalidFormatError(issue, currentField);

            default:
                return { message: DEFAULT_MESSAGE };
        }
    };
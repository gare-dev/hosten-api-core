import type { ErrorStatusCode, SuccessStatusCode } from './status-codes';

type ErrorResult<Code extends ErrorStatusCode> = {
    data: {
        message: string;
    },
    code: Code;
};

type SuccessResult<
    T extends Record<string, unknown> | boolean | unknown[],
    Code extends SuccessStatusCode
> = {

    data: T,
    code: Code
}

export const successResponse = <
    T extends Record<string, unknown> | boolean | unknown[],
    Code extends SuccessStatusCode
>(
    data: T,
    code: Code
): SuccessResult<T, Code> => {
    return {
        data,
        code
    }
};

export const errorResponse = <Code extends ErrorStatusCode>(
    message: string,
    code: Code
): ErrorResult<Code> => {
    return { code, data: { message } };
};

import { Resend } from 'resend';
import { envs } from './env';

export const resend = new Resend(envs.RESEND_API_KEY);

export const emailConfig = {
    from: envs.RESEND_FROM_EMAIL,
} as const;

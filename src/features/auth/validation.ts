import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().trim().min(1, 'Enter your email address').email('Enter a valid email address'),
});
export type EmailFormValues = z.infer<typeof emailSchema>;

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, 'Enter the 6-digit code')
    .regex(/^\d{6}$/, 'Code must be 6 digits'),
});
export type OtpFormValues = z.infer<typeof otpSchema>;

import { z } from 'zod';

export const ValidateLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  type: z.boolean(),
});

import { z } from 'zod';

export const CreateTypeAccountSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string().min(5).max(100),
});

export const UpdateTypeAccountSchema = z.object({
  name: z.string().min(5).max(100).optional(),
  description: z.string().min(5).max(100).optional(),
});

export const DeleteTypeAccountSchema = {
  id: z.number().positive('ID inválido'),
};

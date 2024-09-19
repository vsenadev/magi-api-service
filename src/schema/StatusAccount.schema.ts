import { z } from 'zod';

export const CreateStatusAccountSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string().min(5).max(100),
});

export const UpdateStatusAccountSchema = z.object({
  name: z.string().min(5).max(100).optional(),
  description: z.string().min(5).max(100).optional(),
});

export const DeleteStatusAccountSchema = {
  id: z.number().positive('ID inválido'),
};

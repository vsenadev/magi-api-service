import { z } from 'zod';

export const CreateLockStatusSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string().min(5).max(100),
});

export const UpdateLockStatusSchema = z.object({
  name: z.string().min(5).max(100).optional(),
  description: z.string().min(5).max(100).optional(),
});

export const DeleteLockStatusSchema = {
  id: z.number().positive('ID inválido'),
};

import { z } from 'zod';

export const CreateDeliveryStatusSchema = z.object({
  name: z.string().min(5).max(100),
  description: z.string().min(5).max(100),
});

export const UpdateDeliveryStatusSchema = z.object({
  name: z.string().min(5).max(100).optional(),
  description: z.string().min(5).max(100).optional(),
});

export const DeleteDeliveryStatusSchema = {
  id: z.number().positive('ID inválido'),
};

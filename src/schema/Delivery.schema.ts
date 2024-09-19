import { z } from 'zod';

export const CreateDeliverySchema = z.object({
  name: z.string().min(1).max(255),
  sender: z.number().min(1),
  recipient: z.number().min(1),
  sendDate: z.string(),
  expectedDate: z.string(),
  status_id: z.number().min(1),
  lock_status: z.number().min(1),
  route_id: z.string().min(1).max(255),
  startingAddress: z.number().min(1),
  destination: z.number().min(1),
  products: z.number().min(1),
});

export const UpdateDeliverySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  sender: z.number().min(1).optional(),
  recipient: z.number().min(1).optional(),
  sendDate: z.string().optional(),
  expectedDate: z.string().optional(),
  status_id: z.number().min(1).optional(),
  lock_status: z.number().min(1).optional(),
  route_id: z.string().min(1).max(255).optional(),
  startingAddress: z.number().min(1).optional(),
  destination: z.number().min(1).optional(),
  products: z.number().min(1).optional(),
});

export const DeleteDeliverySchema = {
  id: z.number().positive('ID inválido'),
};

export const ValidateCodeSchema = z.object({
  code: z.number().positive().min(6).max(6),
});

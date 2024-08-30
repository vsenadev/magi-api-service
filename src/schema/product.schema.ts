import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().min(1),
  value: z.number().min(1).max(14).optional(),
  length: z.number().min(1).max(14),
  width: z.number().min(1),
  height: z.number().min(1),
  company_id: z.number().min(1),
});

export const UpdateProductSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    type: z.string().min(1).optional(),
    value: z.number().min(1).max(14).optional(),
    length: z.number().min(1).max(14).optional(),
    width: z.number().min(1).optional(),
    height: z.number().min(1).optional(),
    company_id: z.number().min(1).optional(),
});

export const DeleteProductSchema = {
  id: z.number().positive('ID inválido'),
};

export const ValidateCodeSchema = z.object({
  code: z.number().positive().min(6).max(6),
});

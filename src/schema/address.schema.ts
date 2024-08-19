import { z } from 'zod';

export const CreateAddressSchema = z.object({
  cep: z
    .string()
    .min(9, 'Cep informado inválido')
    .max(9, 'Cep informado inválido'),
  street: z.string().max(255),
  complement: z.string().max(255).optional(),
  city: z.string().min(1).max(255),
  state: z.string().min(1).max(255),
  number: z.string().min(1).max(255),
});

export const UpdateAddressSchema = z.object({
  cep: z
    .string()
    .min(9, 'Cep informado inválido')
    .max(9, 'Cep informado inválido')
    .optional(),
  street: z.string().max(255).optional(),
  complement: z.string().max(255).optional().optional(),
  city: z.string().min(1).max(255).optional(),
  state: z.string().min(1).max(255).optional(),
  number: z.string().min(1).max(255).optional(),
});

export const DeleteAddressSchema = {
  id: z.number().positive('ID inválido'),
};

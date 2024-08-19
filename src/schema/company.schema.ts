import { z } from 'zod';

export const CreateCompanySchema = z.object({
  name: z.string().min(1).max(255),
  picture: z.string().min(1).optional(),
  cnpj: z.string().min(18).max(18),
  password: z.string().min(1),
  area: z.string().min(1),
  email: z.string().email(),
  address_id: z.number().positive(),
  type_id: z.number().positive(),
  status_id: z.number().positive(),
});

export const UpdateCompanySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  picture: z.string().min(1).optional().optional(),
  cnpj: z.string().min(18).max(18).optional(),
  password: z.string().min(1).optional(),
  area: z.string().min(1).optional(),
  email: z.string().email().optional(),
  address_id: z.number().positive().optional(),
  type_id: z.number().positive().optional(),
  status_id: z.number().positive().optional(),
});

export const DeleteCompanySchema = {
  id: z.number().positive('ID inválido'),
};

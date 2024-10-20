import { z } from 'zod';

export const CreateCompanySchema = z.object({
  name: z.string().min(1).max(255),
  picture: z.string().optional(),
  cep: z.string().min(1).max(255).optional(),
  cnpj: z.string().min(18).max(18),
  password: z.string().min(1).optional(),
  area: z.string().min(1),
  email: z.string().email(),
  address_id: z.number().positive().optional(),
  type_id: z.number().positive().optional(),
  status_id: z.number().positive().optional(),
  number: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  street: z.string().min(1).optional(),
  type_account: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
});

export const UpdateCompanySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  picture: z.string().min(1).optional().optional(),
  cnpj: z.string().min(18).max(18).optional(),
  area: z.string().min(1).optional(),
  email: z.string().email().optional(),
  address_id: z.number().positive().optional(),
  type_id: z.number().positive().optional(),
  status_id: z.number().positive().optional(),
});

export const DeleteCompanySchema = {
  id: z.number().positive('ID inválido'),
};

export const ValidateCodeSchema = z.object({
  code: z.number().positive().min(6).max(6),
});

import { z } from 'zod';

export const CreateEmployeeSchema = z.object({
  name: z.string().min(1).max(255),
  company_id: z.number().positive(),
  cpf: z.string().min(11).max(11),
  picture: z.string().optional(),
  password: z.string().min(1).optional(),
  phoneNumber: z.string().min(11).max(11),
  email: z.string().email(),
  status_id: z.number().min(1),
  type_id: z.number().min(1),
});

export const UpdateEmployeeSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  company_id: z.number().positive().optional(),
  cpf: z.string().min(11).max(11).optional(),
  picture: z.string().optional(),
  password: z.string().min(1).optional(),
  phoneNumber: z.string().min(11).max(11).optional(),
  email: z.string().email().optional(),
  status_id: z.number().min(1).optional(),
  type_id: z.number().min(1).optional(),
});

export const DeleteEmployeeSchema = {
  id: z.number().positive('ID inválido'),
};

export const ValidateCodeSchema = z.object({
  code: z.number().positive().min(6).max(6),
});

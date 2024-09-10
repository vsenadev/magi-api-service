import { z } from 'zod';

export const CreateProductDeliverySchema = z.object({
    product_id: z.number().min(1),
    delivery_id: z.number().min(1),
    amount: z.number().min(1),
});

export const UpdateProductDeliverySchema = z.object({
    product_id: z.number().min(1).optional(),
    delivery_id: z.number().min(1).optional(),
    amount: z.number().min(1).optional(),
});

export const DeleteProductDeliverySchema = {
    id: z.number().positive('ID inválido'),
};

export const ValidateCodeSchema = z.object({
    code: z.number().positive().min(6).max(6),
});

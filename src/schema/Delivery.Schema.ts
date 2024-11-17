import { z } from 'zod';

export const CreateDeliverySchema = z.object({
  name: z.string().min(1).max(255),
  sender: z.string().email(),
  recipient: z.string().email(),
  send_date: z.date(),
  expected_date: z.date().optional(),
  route_id: z.string().optional(),
  starting_address: z.number().positive().optional(),
  destination_address: z.number().positive().optional(),
  starting_cep: z.string().min(1).optional(),
  starting_city: z.string().min(1).optional(),
  starting_number: z.number().positive().optional(),
  starting_state: z.string().min(1).optional(),
  starting_street: z.string().min(1).optional(),
  destination_cep: z.string().min(1).optional(),
  destination_city: z.string().min(1).optional(),
  destination_number: z.number().min(1).optional(),
  destination_state: z.string().min(1).optional(),
  destination_street: z.string().min(1).optional(),
  starting_neighborhood: z.string().min(1).optional(),
  destination_neighborhood: z.string().min(1).optional(),
  distance: z.number().positive().optional(),
  pdf: z.any().optional(),
  products: z.array(
    z.object({
      name: z.string().min(1).max(255),
      quantity: z.number().min(1).positive(),
      value: z.number().positive(),
      lenght: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    }),
  ),
  expected_route: z
    .array(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    )
    .optional(),
  traced_route: z
    .array(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    )
    .optional(),
});

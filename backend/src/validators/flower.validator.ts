import { z } from 'zod';

const allowedCharsRegex = /^[A-Za-z0-9 ]+$/;

export const FlowerValidator = z.object({
    id: z.string().optional(),

    name: z.string().regex(allowedCharsRegex, { message: 'String must contain only letters and numbers' }).max(50, { message: '' }).min(5, { message: '' }),

    description: z.string(),
    
    existences: z.number(),
    
    pricePerUnit: z.number(),

    costPerUnit: z.number(),
    
    image: z.string().optional(),
});

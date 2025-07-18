import { z } from 'zod';

const allowedCharsRegex = /^[A-Za-z0-9 ]+$/;

export const FlowerValidator = z.object({

    name: z.string().regex(allowedCharsRegex, { message: 'String must contain only letters and numbers' }).max(50, { message: '' }).min(5, { message: '' }),

    description: z.string().min(5),
    
    existences: z.number().min(10, { message: 'Too small' }),
    
    pricePerUnit: z.number().min(0.99, { message: 'Too small' }),

    costPerUnit: z.number().min(0.10, { message: 'Too small' }),
    
    image: z.string().optional(),
});

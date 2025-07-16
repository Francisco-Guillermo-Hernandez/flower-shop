import { z } from 'zod';

export const OderValidatorValidator = z.object({
    description: z.string(),
    instructions: z.string(),
});

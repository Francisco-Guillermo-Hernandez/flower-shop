import { string, z } from 'zod'

export const DeleteValidator = z.object({
    id: string().min(1, { message: '' })
})
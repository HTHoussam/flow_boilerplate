import { z } from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const playerSchema = z
  .object({
    id: z.number().default(0).optional(),
    firstName: z.string({ required_error: 'required' }),
    lastName: z.string({ required_error: 'required' }),
    salary: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: 'Salary must be a valid number',
      })
      .optional(),
    goals: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: 'Goals must be a valid number',
      })
      .optional(),
    currency: z.string().optional(),
    pictureURl: z
      .object({
        binary: z.any(),
        imageName: z.string(),
        imageType: z.string(),
      })
      .optional(),
  })
  .refine((data) => ['$', 'MAD', '€', '£', 'Fr'].includes(data.currency ?? ''), {
    message: 'Devise inconnue',
  })

export type PlayerSchemaType = z.infer<typeof playerSchema>

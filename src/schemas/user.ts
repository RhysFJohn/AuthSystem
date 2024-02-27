import {z, ZodError} from 'zod'

export const userSchema = z.object({
  firstName: z.string().min(2, {message: "Your Firstname should be at least 2 letters minium"}).max(50),
  lastName: z.string().min(2, {message: "Your Lastname should be at least 2 letters minium"}).max(50),
  email: z.string().email(),
  passwordHash: z.string().min(8),
  image: z.string().url().optional().nullish()
})

export type User = z.infer<typeof userSchema>

export const validateUser = (data: unknown): User => {
  try {
    return userSchema.parse(data)
  } catch (error) {
    if(error instanceof ZodError) {
      const validationErrors = error.errors.map((e) => e.message).join(', ');
      throw new Error(`Validation failed: ${validationErrors}`);
    }
    throw error
  }
}
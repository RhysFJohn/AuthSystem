"use server"

import { validateUser } from "@/schemas/user"
import { createUser } from "../../../../prisma/models/user"

export const signUp = (data: { firstName: string, lastName: string, email: string, passwordHash: string, image?: any } ) => {
  let userData = validateUser(data)

  let user = createUser(userData)

  return user
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { validateUser } from '@/schemas/user'
import { createUser } from '../../../prisma/models/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if ( req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }
  let data = req.body

  console.log(data)
  try {
    const userData = validateUser(req.body)

    const user = await createUser(userData)

    res.status(201).json({ user })
  } catch (err: any) {
    console.log('===================================')
    console.log("Error during sign-up: ", err)
    console.log('===================================')
    return res.status(500).json({ message: "Internal server error", error: err.message })
  }
}
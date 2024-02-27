import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import prisma from '../prisma'

export async function getUserData(email:string) {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user;
  }
}
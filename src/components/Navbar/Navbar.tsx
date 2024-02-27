import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/app/lib/prisma'
import UserDropdown from './UserDropdown'

const Navbar = async () => {

  const session = await getServerSession(authOptions) || null

  return (
    <div className='flex w-full h-12 justify-between items-center p-2 bg-slate-300'>
      <Link href='/' className='text-lg mx-6 '>App</Link>
      <div className="mx-6 justify-between flex w-fit gap-4 items-center">
        {session && session.user?.email ? (
          <>
            <UserDropdown />
            <Link href={'/auth/signout'}>Sign Out</Link>
          </>
        ) : (
          <>
            <Link href={'/auth/signup'}>Sign Up</Link>
            <Link href={'/auth/signin'}>Sign In</Link>
          </>
        )}
      </div>
    </div>
  )
}

async function getUserData(email: string) {
  const session = await getServerSession(authOptions)

  if(session) {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    return user
  }
}

export default Navbar
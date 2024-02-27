import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserData } from '@/app/lib/scripts/functions';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import React from 'react'
import DropdownMenu from './DropdownMenu';

const UserDropdown = async () => {
  const session = (await getServerSession(authOptions)) || null;
  const user = await getUserData(session?.user?.email ?? "");

  return (
    <div>{session && session.user?.email ? (
      <>
        <div className="flex flex-row gap-3 items-center">
        <p>Hi {user?.firstName}</p>
        {user?.image ? (
          <>
            <Image
              src={user?.image}
              alt="User Image"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <DropdownMenu />
          </>
        ) : (
          <>
            <Image
              src="/OIG.jpeg"
              alt="User Image"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <DropdownMenu />
          </>
        )}
      </div>
      </>
    ) : (
      <>
        <p>Hi Guest!</p>
      </>
    )}</div>
  )
}

export default UserDropdown
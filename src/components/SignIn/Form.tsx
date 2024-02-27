"use client"
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Form = () => {
  const router = useRouter()
  const { status } = useSession()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setMessage('Signing in...')
    
    try {
      const signInResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      })

      if(!signInResponse || signInResponse.ok !== true) {
        setMessage('Invalid Credentials')
      } else {
        router.refresh()
      }
    } catch(err) {
      console.log(err)
    }

    setMessage(message);
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.refresh();
      router.push('/', { scroll: false })
    }
  }, [status, router])

  return (
    <div className='flex flex-col gap-4 bg-gray-400 p-4'>
      <div className="flex flex-col w-full items-center">
        <div className="grid grid-cols-2 gap-3 w-1/3">
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Sign In</button>
      </div>
      

      <p>{message}</p>
    </div>
  )
}

export default Form
import React from 'react'
import { Metadata } from 'next'
import { SignUpForm } from '@components'

export const metadata: Metadata = {
  title: 'Sign Up'
}

const SignUp = () => {
  return (
    <div>
      SignUp

      <SignUpForm />
    </div>
  )
}

export default SignUp
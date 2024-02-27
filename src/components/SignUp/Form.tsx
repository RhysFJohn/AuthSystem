"use client"
import { signUp } from '@/app/actions/users/signUp';
import React, { useState } from 'react'

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleChange = (event: any) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    }
  };

  const handleSubmit = async (e: any) => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: passwordHash,
      image: image
    }

    await signUp(data);

    setFirstName('');
    setLastName('');
    setEmail('');
    setPasswordHash('');
    setImage(null);
  }

  return (
    <div  className='flex flex-col gap-4 bg-gray-400 p-4 h-screen items-center'>
      <div className='flex flex-col w-full items-center gap-4'>
        <div className="grid grid-cols-2 gap-3 w-1/3">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstname" value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastname" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <label htmlFor="passwordHash">Password</label>
          <input type="password" name="passwordHash" id="password" value={passwordHash} onChange={(e)=> setPasswordHash(e.target.value)} />
          <label htmlFor="image">Image</label>
          <input type="file" accept='image/*' name="image" id="image" onChange={handleChange} />
        </div>
        <button type="button" onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  )
}

export default Form
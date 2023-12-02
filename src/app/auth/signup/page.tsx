'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("Sign up success", response.data);
      router.push('/auth/signin')
    } catch (error: any) {
      console.log('Sign up failed: ', error.message);
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 5 && user.username.length > 3 && user.password.length > 7) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }

  }, [user])

  return (
    <main className='w-full'>
      <div className='w-80 p-4 rounded-md flex flex-col mx-auto translate-y-20'>
        <h1 className='text-xl mb-3'>{!loading ? "Sign up" : "Registering"}</h1>
        <div className="form flex flex-col items-center">
          <div className="relative flex flex-col mb-4 text-sm w-full">
            <label htmlFor="username" className={'mb-2'}>Username</label>
            <input type="text" id='username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder='Username' className='p-2 rounded-md focus:border-gray-600 focus:outline-none border-gray-300 text-black text-sm' />
          </div>
          <div className="relative flex flex-col mb-4 text-sm w-full">
            <label htmlFor="email" className={'mb-2'}>Email</label>
            <input type="text" id='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' className='p-2 rounded-md focus:border-gray-600 focus:outline-none border-gray-300 text-black text-sm' />
          </div>
          <div className="relative flex flex-col mb-4 text-sm w-full">
            <label htmlFor="password" className={'mb-2'}>Password</label>
            <input type="text" id='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' className='p-2 rounded-md focus:border-gray-600 focus:outline-none border-gray-300 text-black text-sm' />
          </div>
          <button onClick={onSignup} className={buttonDisabled ? 'py-2 px-2 border border-transparent rounded-md mb-4 focus:outline-none focus:border-gray-300 bg-gray-400 text-white !text-sm' : 'py-2 px-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 bg-gray-800 text-white !text-sm'}>Sign up</button>
          <p className='text-sm'>Already have an account? <Link href={'/auth/signin'} className='text-gray-400 text-sm'>Log in</Link></p>
        </div>
      </div>
    </main>
  )
}

export default Signup
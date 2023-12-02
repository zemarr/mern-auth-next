'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signin = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const onSignin = async () => {
        try {  
            setLoading(true)
            const response = await axios.post('/api/users/signin', user)
            console.log('Signin successful', response.data)
            toast.error('Sign in success');
            router.push(`/profile`)
        } catch (error: any) {
            console.log('Sign in failed: ', error.message)
                toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 7) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

        return () => {

        }
    }, [user])


    return (
        <main className='w-full'>
            <div className='w-80 p-4 rounded-md flex flex-col mx-auto translate-y-20'>
                <h1 className='text-xl mb-3'>{!loading ? "Sign in" : "Signing you in..."}</h1>
                <div className="form flex flex-col items-center">
                    <div className="relative flex flex-col mb-4 text-sm w-full">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' className='p-2 rounded-md focus:border-gray-600 focus:outline-none border-gray-300 text-black text-sm' />
                    </div>
                    <div className="relative flex flex-col mb-4 text-sm w-full">
                        <label htmlFor="password">Password</label>
                        <input type="text" id='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' className='p-2 rounded-md focus:border-gray-600 focus:outline-none border-gray-300 text-black text-sm' />
                    </div>
                    <button onClick={onSignin} className={buttonDisabled ? 'py-2 px-2 border border-transparent rounded-md mb-4 focus:outline-none focus:border-gray-300 bg-gray-400 text-white !text-sm' : 'py-2 px-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 bg-gray-800 text-white !text-sm'}>Sign in</button>
                    <p>Don&apos;t have an account? <Link href={'/auth/signup'} className='text-gray-400 text-sm'>Sign up</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Signin
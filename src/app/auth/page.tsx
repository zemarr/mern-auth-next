'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Auth = () => {
    const router = useRouter()

    useEffect(() => {
      setTimeout(() => {
        router.push('/auth/login')
      }, 500);
    }, [router])
    
  return (
    <></>
  )
}

export default Auth
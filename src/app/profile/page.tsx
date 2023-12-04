'use client'

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { authUrls } from '@/helpers/authUrls'

const ProfilePage = () => {
  const urls = { ...authUrls }
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get(`/${urls.be.signOut}`);
      router.push(`/${urls.fe.signIn}`);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <button onClick={logout} className='bg-white text-sm py-2 px-3 text-black rounded-md mt-4'>
        Sign out
      </button>
    </div>
  );
};

export default ProfilePage;
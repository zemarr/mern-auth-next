import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <header className='flex items-center justify-between py-8'>
            <span className="logo block">
                Auth App
            </span>
            <nav>
                <ul className='flex items-center'>
                    <li className='mx-2'>
                        <Link href={'/'}>Home</Link>
                    </li>
                    <li className='mx-2'>
                        <Link href={'/about'}>About</Link>
                    </li>
                    <li className='mx-2'>
                        <Link href={'/auth/signin'}>Sign in</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
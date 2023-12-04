import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authUrls } from '@/helpers/authUrls'


// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
    const urls = { ...authUrls }

    // return NextResponse.redirect(new URL('/home', request.url))
    const path = request.nextUrl.pathname
    const isPublicPath = path === `/${urls.fe.signIn}` || path === `/${urls.fe.signUp}`
    
    const tokenValue = request.cookies.get('token')?.value || ''

    if (isPublicPath && tokenValue) {
        return NextResponse.redirect(new URL(`/`, request.nextUrl))
    }
    if (!isPublicPath && !tokenValue) {
        return NextResponse.redirect(new URL(`/${urls.fe.signIn}`, request.nextUrl))
    }
    
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/profile/:path*', '/auth/signin', '/auth/signup'],
}
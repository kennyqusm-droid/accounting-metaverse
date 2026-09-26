import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Get the user's session from Supabase
  const { data: { user } } = await supabase.auth.getUser()

  // 1. If not logged in and trying to access a restricted area, redirect to login
  if (!user && (request.nextUrl.pathname.startsWith('/course') || request.nextUrl.pathname.startsWith('/campus'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. LECTURER VAULT SECURITY: Block students from accessing /lecturer/*
  if (request.nextUrl.pathname.startsWith('/lecturer')) {
    if (!user || user.app_metadata.global_role !== 'lecturer') {
      return NextResponse.redirect(new URL('/campus', request.url)) // Kick to student hub
    }
  }

  return response
}

export const config = {
  matcher: [
    '/course/:path*',
    '/campus/:path*',
    '/lecturer/:path*'
  ],
}
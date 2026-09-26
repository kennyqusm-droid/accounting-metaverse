import { createBrowserClient } from '@supabase/ssr'

// This pulls the hidden keys from .env.local to establish the secure connection
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
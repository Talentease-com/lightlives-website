import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// This client doesn't use cookies and is intended for server components
// that need to be statically generated
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  )
}

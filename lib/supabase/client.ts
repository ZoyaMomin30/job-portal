// import { noSSR } from "next/dynamic";
// import { createClient } from "@supabase/supabase-js"

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// ! indicates it is not null
// ----------------------------------------------------------------
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// ----------------------------------------------------------------

// import { createBrowserClient } from '@supabase/ssr'

// export function createClient() {
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

//   if (!supabaseUrl || !supabaseKey) {
//     throw new Error('Missing Supabase environment variables')
//   }

//   return createBrowserClient(supabaseUrl, supabaseKey)
// }

// export { createBrowserClient }

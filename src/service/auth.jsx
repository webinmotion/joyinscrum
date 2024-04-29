import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const supabase = createClient(import.meta.env.VITE_BACKEND_URL, import.meta.env.VITE_ANNON_KEY)


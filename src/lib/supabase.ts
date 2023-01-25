import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../../supabase/types";

const supabaseUrl = "https://oqoxtjeiiubmcoxjsdmb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xb3h0amVpaXVibWNveGpzZG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3NjI4ODEsImV4cCI6MTk4ODMzODg4MX0.8C7Sofcof-wKajOloTzPJTLlxSL4SbiVMTlUbm8Yudo";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

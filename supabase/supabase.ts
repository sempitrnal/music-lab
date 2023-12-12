import { createClient } from "@supabase/supabase-js";

const options = {
	auth: {
		localStorage: true,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
	},
};

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, options);

export default supabase;

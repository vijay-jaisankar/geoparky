import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_supabaseURL;
const supabaseKey = process.env.REACT_APP_supabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey,  { multiTab: false });

export default supabase;

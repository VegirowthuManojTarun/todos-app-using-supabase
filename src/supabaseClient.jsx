import { createClient } from "@supabase/supabase-js";
import Cookies from "js-cookie";

const supabaseUrl = "https://ngquhdgmeqywicptbfcv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ncXVoZGdtZXF5d2ljcHRiZmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MDI1MDIsImV4cCI6MjA1MjA3ODUwMn0.Zvp1NpGDq8tJIWsaehUoipO5YjZpAOVBza2pJ5V_4Gw";
const supabase = createClient(supabaseUrl, supabaseKey);



export default supabase;

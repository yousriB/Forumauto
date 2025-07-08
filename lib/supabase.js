// lib/supabase.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gjnnvubibcypgjguryeb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdqbm52dWJpYmN5cGdqZ3VyeWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjIxNDYsImV4cCI6MjA2NzUzODE0Nn0.jqNtLueO0ftZZHRwnDz5xuAS3KATql3AY_dDK3iAthI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";

const supabaseUrl = "https://ccjvmndjidpsspzmebkk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjanZtbmRqaWRwc3Nwem1lYmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNzc4OTcsImV4cCI6MjAyNjg1Mzg5N30.9J-RuqDS0SmxoSoVmqrapmbb1Yjve8viLXsjRsAzMFo";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

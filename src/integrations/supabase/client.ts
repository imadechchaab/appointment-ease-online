// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dpserqlgxtlnuazetoxn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwc2VycWxneHRsbnVhemV0b3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDQzMTAsImV4cCI6MjA2MzA4MDMxMH0.O5e-Y414tb9g2yJfaHPxKimQARijo20XrIMrY5tsmYQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
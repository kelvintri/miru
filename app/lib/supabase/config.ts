import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jvtpkcwsxxlbbptngxiu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dHBrY3dzeHhsYmJwdG5neGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyOTI5NTAsImV4cCI6MjA0Njg2ODk1MH0.3bRWCLx1QGWSxyZbAJcHJyyIWimpVzr9LVDQqdUif-I'

export const supabase = createClient(supabaseUrl, supabaseKey) 
# Enable Supabase Authentication

## Step 1: Enable Email Auth in Supabase
1. Go to https://supabase.com/dashboard/project/zbnlejajrhbceslwflhc/auth/providers
2. Enable **Email** provider
3. Disable email confirmation for now (for faster testing)

## Step 2: Update Database Schema
Run this SQL in Supabase SQL Editor:

```sql
-- Link patients table to Supabase auth
ALTER TABLE patients ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);

-- Link medical_staff table to Supabase auth
ALTER TABLE medical_staff ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
CREATE INDEX IF NOT EXISTS idx_medical_staff_user_id ON medical_staff(user_id);

-- Update RLS policies to use auth
DROP POLICY IF EXISTS "Allow all on patients" ON patients;
CREATE POLICY "Users can view own data" ON patients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own data" ON patients FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert" ON patients FOR INSERT WITH CHECK (true);
```

## Step 3: Benefits
✅ Real authentication with sessions
✅ Automatic session management
✅ Secure password hashing
✅ Email verification (optional)
✅ Password reset
✅ Protected routes
✅ User-specific data access

## Step 4: Code Changes Needed
- Registration: Use `supabase.auth.signUp()`
- Login: Use `supabase.auth.signInWithPassword()`
- Dashboard: Use `supabase.auth.getUser()` to get current user
- Logout: Use `supabase.auth.signOut()`

This is the professional way to do authentication!

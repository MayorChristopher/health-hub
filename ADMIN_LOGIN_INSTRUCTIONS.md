# How to Login as Admin

## Quick Answer

**Admin login is currently UI-only and bypasses authentication.**

### To Access Admin Dashboard:

1. **Go to the landing page:** `http://localhost:5173/`
2. **Click "Admin Access"** button (yellow button in the CTA section)
3. **Enter ANY username and password** (e.g., `admin` / `admin123`)
4. **Click "Login as Admin"**
5. You'll be redirected to `/admin-dashboard`

## Alternative Method

Navigate directly to: `http://localhost:5173/admin-dashboard`

## Why It Works Without Real Authentication

The current `AdminLogin.tsx` has this code:

```typescript
const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Implement admin authentication
  navigate("/admin-dashboard");  // ← Goes directly to dashboard
};
```

**No validation is performed yet.**

## For Production Use

To add real authentication, you need to:

### Step 1: Create Admin Account in Database

Run this SQL in Supabase SQL Editor:

```sql
-- First, install pgcrypto extension if not already installed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create admin account with hashed password
INSERT INTO admins (username, password_hash, full_name, email)
VALUES (
  'admin',
  crypt('YourSecurePassword123', gen_salt('bf')),  -- Change this password
  'System Administrator',
  'admin@healthmr.com'
);
```

### Step 2: Update AdminLogin.tsx

Replace the `handleLogin` function with:

```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    // Query admin with username
    const { data, error } = await supabase
      .rpc('verify_admin_login', {
        p_username: username,
        p_password: password
      });
    
    if (error || !data) {
      toast.error("Invalid credentials");
      return;
    }
    
    // Store session
    localStorage.setItem('admin_session', JSON.stringify(data));
    navigate("/admin-dashboard");
  } catch (error) {
    toast.error("Login failed");
  } finally {
    setLoading(false);
  }
};
```

### Step 3: Create Database Function

```sql
-- Create function to verify admin login
CREATE OR REPLACE FUNCTION verify_admin_login(
  p_username TEXT,
  p_password TEXT
)
RETURNS TABLE (
  id UUID,
  username TEXT,
  full_name TEXT,
  email TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.username,
    a.full_name,
    a.email
  FROM admins a
  WHERE a.username = p_username
    AND a.password_hash = crypt(p_password, a.password_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Current Admin Dashboard Features

Once you access `/admin-dashboard`, you can:

- ✅ View total patients
- ✅ View total staff
- ✅ View total consultations
- ✅ View recent registrations
- ✅ Search patients
- ✅ View patient details
- ✅ Manage medical staff (add/view)

## Staff Login

Similar to admin, staff login is also UI-only:

1. Click "Staff" button on landing page
2. Enter any credentials
3. Access `/medical-dashboard`

## Summary

**For Demo/Testing:**
- Username: `anything`
- Password: `anything`
- Just click login and you're in!

**For Production:**
- Follow the steps above to add real authentication
- Use strong passwords
- Add session management
- Protect routes with authentication checks

---

**Need Help?**
- Email: mayoru24@gmail.com
- GitHub: @MayorChristopher

# Admin & Staff Login Guide

## Current Status

⚠️ **Admin and Staff login are NOT fully functional yet** - they're UI-only and need database integration.

## How to Access (Current Workaround)

### Option 1: Direct Navigation (Temporary)
Since authentication isn't connected yet, you can access dashboards directly:

1. **Admin Dashboard:**
   - Go to: `http://localhost:5173/admin-dashboard`
   - Or click "Admin Access" button on landing page
   - Enter any username/password (not validated yet)

2. **Medical Staff Dashboard:**
   - Go to: `http://localhost:5173/medical-dashboard`
   - Or click "Staff" button on landing page
   - Enter any credentials (not validated yet)

### Option 2: Use Patient Login (Fully Functional)
The only fully working login is **Patient Login**:
- Route: `/patient-login`
- Requires: HealthMR ID + NIN
- Fully connected to database

## What Needs to Be Built

### For Admin Login:
1. Create admin accounts in database
2. Add password hashing
3. Connect login form to Supabase
4. Add session management
5. Protect admin routes

### For Staff Login:
1. Create staff accounts in database
2. Add password hashing
3. Connect login form to Supabase
4. Add role-based access control
5. Protect staff routes

## Database Tables

The tables exist but need data:

### `admins` table:
```sql
- id (UUID)
- username (unique)
- password_hash
- full_name
- email
- created_at
```

### `medical_staff` table:
```sql
- id (UUID)
- staff_id (unique, e.g., STF-2025-000001)
- full_name
- role (doctor, nurse, lab_tech, pharmacist)
- hospital_id
- phone
- email
- password_hash
- is_active
- created_at
```

## Quick Setup (For Testing)

### Step 1: Add Admin to Database

Run this SQL in Supabase SQL Editor:

```sql
-- Create admin account
INSERT INTO admins (username, password_hash, full_name, email)
VALUES (
  'admin',
  '$2a$10$example_hash_here', -- You need to hash the password
  'System Administrator',
  'admin@healthmr.com'
);
```

### Step 2: Add Staff to Database

```sql
-- Create doctor account
INSERT INTO medical_staff (
  staff_id, 
  full_name, 
  role, 
  hospital_id, 
  phone, 
  email, 
  password_hash,
  is_active
)
VALUES (
  'STF-2025-000001',
  'Dr. John Doe',
  'doctor',
  'FMC-UMUAHIA',
  '+234-XXX-XXX-XXXX',
  'doctor@healthmr.com',
  '$2a$10$example_hash_here', -- You need to hash the password
  true
);
```

## Recommended Next Steps

### Priority 1: Make Staff Login Functional
This is more important than admin because staff need to:
- Add consultation records
- Record lab results
- Prescribe medications
- Update patient vitals

### Priority 2: Make Admin Login Functional
Admin needs to:
- Manage staff accounts
- View system statistics
- Manage patients
- System configuration

## Temporary Solution for Demo

For now, to demonstrate the system:

1. **Use Patient Login** (fully functional)
   - Register as patient
   - Login with HealthMR ID + NIN
   - Access all patient features

2. **Access Dashboards Directly** (no auth)
   - Admin: `/admin-dashboard`
   - Staff: `/medical-dashboard`
   - These show UI but can't save data yet

## What Works vs What Doesn't

### ✅ Working:
- Patient registration
- Patient login
- Patient dashboard
- Medical records display
- Lab results (patient can add)
- Health Coach
- Language translation

### ⚠️ Not Working Yet:
- Admin login authentication
- Staff login authentication
- Staff adding consultations
- Staff adding lab results
- Staff prescribing medications
- Admin managing users

## For Production Use

You need to:

1. **Set up authentication:**
   ```typescript
   // Hash passwords with bcrypt
   import bcrypt from 'bcryptjs';
   const hash = await bcrypt.hash(password, 10);
   ```

2. **Connect login forms:**
   ```typescript
   // Verify credentials
   const { data } = await supabase
     .from('admins')
     .select('*')
     .eq('username', username)
     .single();
   
   const valid = await bcrypt.compare(password, data.password_hash);
   ```

3. **Add session management:**
   ```typescript
   // Store session
   localStorage.setItem('admin_session', JSON.stringify(data));
   ```

4. **Protect routes:**
   ```typescript
   // Check auth before rendering
   useEffect(() => {
     const session = localStorage.getItem('admin_session');
     if (!session) navigate('/admin');
   }, []);
   ```

## Quick Demo Script

**For Hackathon/Demo:**

1. Show patient registration ✅
2. Show patient login ✅
3. Show patient dashboard ✅
4. Show Health Coach ✅
5. Show medical records ✅
6. Show lab results ✅
7. Mention: "Staff and admin portals are in development"

## Contact for Help

If you need help setting up admin/staff login:
- Email: mayoru24@gmail.com
- GitHub: @MayorChristopher

---

**Summary:** Patient login works perfectly. Admin and staff login need database integration (coming soon).

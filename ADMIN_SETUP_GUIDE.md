# HealthMR Admin Setup Guide

## 🔐 Secure Admin Account Creation

This guide explains how to create and manage administrator accounts for HealthMR.

---

## Step 1: Run Database Migration

First, create the admins table in your Supabase database:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `admin-table-migration.sql`
4. Copy and paste the SQL code
5. Click **Run** to execute

---

## Step 2: Set Your Secret Setup Key

**CRITICAL SECURITY STEP:**

1. Open `src/pages/AdminSetup.tsx`
2. Find this line (around line 20):
   ```typescript
   const SETUP_SECRET_KEY = 'HEALTHMR_ADMIN_SETUP_2025_SECURE';
   ```
3. **Change it to your own unique secret key** (keep it private!)
   ```typescript
   const SETUP_SECRET_KEY = 'YOUR_UNIQUE_SECRET_KEY_HERE';
   ```
4. **Save this key securely** - you'll need it to create admin accounts

---

## Step 3: Create Your First Admin Account

1. Navigate to: `https://your-app-url.com/admin-setup`
2. Enter your **secret setup key** (the one you set in Step 2)
3. Fill in the admin details:
   - Full Name
   - Email Address
   - Username (for login)
   - Password (minimum 8 characters)
   - Confirm Password
4. Click **Create Admin Account**

---

## Step 4: Login as Admin

1. Go to: `https://your-app-url.com/admin`
2. Enter your username and password
3. Click **Login as Admin**

---

## Admin Capabilities

Once logged in, admins have **full control** over:

### Patient Management
- ✅ View all patient records
- ✅ Edit patient information
- ✅ Delete patient records
- ✅ View complete medical history
- ✅ Monitor provisional vs verified patients

### Staff Management
- ✅ View all medical staff
- ✅ Verify MDCN licenses (approve/reject)
- ✅ Activate/deactivate staff accounts
- ✅ Delete staff members
- ✅ Monitor pending verifications

### System Monitoring
- ✅ View system statistics
- ✅ Track consultations and lab tests
- ✅ Audit trail access
- ✅ Full database access

---

## Security Features

### 1. Secret Key Protection
- Admin accounts can only be created with the secret setup key
- Prevents unauthorized admin creation
- Key is hardcoded in the application (not in database)

### 2. Password Security
- Passwords are hashed using bcrypt (10 rounds)
- Never stored in plain text
- Minimum 8 characters required

### 3. Session Management
- Admin sessions stored in localStorage
- Automatic logout on session expiry
- Protected routes require authentication

### 4. MDCN Verification
- Staff must be verified before accessing patient data
- Admins verify MDCN licenses manually
- Compliance with Medical and Dental Practitioners Act

---

## Important Notes

### ⚠️ Security Warnings

1. **Keep your setup key secret** - Never share it or commit it to public repositories
2. **Use strong passwords** - Minimum 8 characters with mix of letters, numbers, symbols
3. **Limit admin accounts** - Only create accounts for trusted personnel
4. **Regular audits** - Review admin activity logs regularly

### 🔒 After Initial Setup

1. **Disable the setup page** - After creating your admin account, consider removing the `/admin-setup` route from production
2. **Change the setup key** - If compromised, change it immediately
3. **Monitor admin logins** - Track who accesses the admin panel

---

## Troubleshooting

### "Invalid Setup Key" Error
- Double-check you entered the correct secret key
- Verify the key matches what's in `AdminSetup.tsx`

### "Username Taken" Error
- Choose a different username
- Check if admin already exists in database

### "Login Failed" Error
- Verify username and password are correct
- Check if admin account is active (`is_active = true`)
- Ensure database connection is working

### Staff Verification Not Working
- Ensure you're logged in as admin
- Check database permissions for `medical_staff` table
- Verify MDCN number format is correct

---

## Database Schema

### Admins Table Structure

```sql
admins (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
)
```

---

## Support

For issues or questions:
- Email: healthmrmouau@gmail.com
- Phone: +234 912 329 7491

---

## Legal Compliance

Admin accounts must comply with:
- Nigerian Data Protection Regulation (NDPR)
- Medical and Dental Practitioners Act
- Code of Medical Ethics
- Patient confidentiality laws

**Unauthorized access to patient health information is a criminal offense.**

---

Built with ❤️ for Abia State Healthcare

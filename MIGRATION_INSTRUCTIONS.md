# Database Migration Instructions

## ⚠️ IMPORTANT: Read Before Running

This migration adds MDCN verification fields to your database. **It will NOT delete any existing data.**

---

## What This Migration Does

### ✅ SAFE Operations (No Data Loss):
- Adds 4 new columns to `medical_staff` table:
  - `mdcn_number` - MDCN registration number
  - `license_expiry` - License expiration date
  - `verification_notes` - Admin verification notes
  - `verified_at` - Verification timestamp

### ❌ Does NOT Do:
- Delete any staff accounts
- Delete any patient data
- Modify existing columns
- Change existing data

---

## Migration Steps

### Step 1: Backup Your Database (CRITICAL)
```bash
# In Supabase Dashboard:
# 1. Go to Database → Backups
# 2. Create manual backup
# 3. Wait for completion
```

### Step 2: Run Migration Script
1. Open Supabase SQL Editor
2. Copy contents of `mdcn-verification-migration.sql`
3. Paste and click "Run"
4. Check output for success messages

### Step 3: Verify Migration
The script will show:
- Total staff count
- Active staff count
- Pending verification count
- Staff with MDCN numbers

---

## Handling Existing Staff

You have 2 options:

### Option 1: Keep Existing Staff Active (Less Secure)
- Do nothing
- Existing staff remain active
- Only NEW registrations require verification
- **Risk**: Existing staff may not have verified licenses

### Option 2: Require Verification for All (RECOMMENDED)
Run this SQL after migration:
```sql
UPDATE medical_staff 
SET is_active = false 
WHERE verified_at IS NULL;
```
- All staff without MDCN verification are deactivated
- Admin must verify each one
- **Secure**: Ensures all staff have valid licenses

---

## After Migration

### For Admins:
1. Go to `/admin/verify-staff`
2. Verify each pending staff member
3. Check MDCN registration at https://www.mdcn.gov.ng
4. Enter MDCN number and approve

### For Staff:
- If account is inactive: Wait for admin verification
- If account is active: Continue using system normally

---

## Rollback (If Needed)

If something goes wrong, you can remove the new columns:
```sql
ALTER TABLE medical_staff DROP COLUMN IF EXISTS mdcn_number;
ALTER TABLE medical_staff DROP COLUMN IF EXISTS license_expiry;
ALTER TABLE medical_staff DROP COLUMN IF EXISTS verification_notes;
ALTER TABLE medical_staff DROP COLUMN IF EXISTS verified_at;
```

Then restore from backup.

---

## Verification Checklist

Before running migration:
- [ ] Database backup created
- [ ] Backup verified and downloadable
- [ ] Decided on Option 1 or Option 2 for existing staff
- [ ] Admin account ready to verify staff

After running migration:
- [ ] Migration completed without errors
- [ ] Staff count matches expected
- [ ] New columns visible in database
- [ ] Admin can access `/admin/verify-staff`

---

## Support

If you encounter issues:
1. Check Supabase logs for errors
2. Verify backup is available
3. Contact: healthmrmouau@gmail.com

---

**Created**: December 2025  
**Status**: Ready to Deploy  
**Risk Level**: LOW (Safe migration, no data loss)

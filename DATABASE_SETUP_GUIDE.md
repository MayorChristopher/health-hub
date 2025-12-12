# 🗄️ Database Setup Guide

## Choose Your Option

---

## ✅ **Option 1: Fresh Database (New Project)**

Use this if you're setting up HealthMR for the **first time** or want to **start fresh**.

### Steps:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click **"SQL Editor"** in left sidebar
   - Click **"New Query"**

3. **Copy & Paste Schema**
   - Open file: `supabase-schema.sql`
   - **Select ALL** (Ctrl+A)
   - **Copy** (Ctrl+C)
   - **Paste** into Supabase SQL Editor (Ctrl+V)

4. **Run the Script**
   - Click **"Run"** button (or press Ctrl+Enter)
   - Wait for completion (should take 5-10 seconds)

5. **Verify Success**
   - Go to **"Table Editor"** in left sidebar
   - You should see all tables:
     - ✅ patients
     - ✅ admins
     - ✅ medical_staff
     - ✅ vitals
     - ✅ self_reported_vitals (NEW)
     - ✅ consultations
     - ✅ lab_tests
     - ✅ prescriptions
     - ✅ appointments
     - ✅ audit_log (NEW)

6. **Done!** ✅
   - All tables created
   - All new features included
   - Ready to use

---

## ✅ **Option 2: Existing Database (Migration)**

Use this if you **already have patient data** and want to **add new features** without losing data.

### Steps:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click **"SQL Editor"** in left sidebar
   - Click **"New Query"**

3. **Copy & Paste Migration Script**
   - Open file: `database-migration.sql`
   - **Select ALL** (Ctrl+A)
   - **Copy** (Ctrl+C)
   - **Paste** into Supabase SQL Editor (Ctrl+V)

4. **Run the Migration**
   - Click **"Run"** button (or press Ctrl+Enter)
   - Wait for completion (should take 10-15 seconds)

5. **Check Results**
   - You should see a success message with counts:
     ```
     Migration completed successfully!
     total_patients: [your count]
     provisional_patients: 0
     self_reported_vitals: 0
     audit_logs: 0
     ```

6. **Verify Changes**
   - Go to **"Table Editor"** → **"patients"**
   - Check for new columns:
     - ✅ temp_id
     - ✅ fingerprint_hash
     - ✅ record_status
   - Check for new tables:
     - ✅ self_reported_vitals
     - ✅ audit_log

7. **Done!** ✅
   - All existing data preserved
   - New features added
   - Ready to use

---

## 🔍 What Gets Added?

### New Columns in `patients` table:
- `temp_id` - For patients without NIN
- `fingerprint_hash` - For biometric identification
- `record_status` - 'verified' or 'provisional'
- `nin` - Now nullable (was required before)

### New Tables:
- `self_reported_vitals` - Patient input (blue card)
- `audit_log` - Admin edit tracking

### Updated Columns in `vitals` table:
- `created_by` - Who created the record
- `patient_can_edit` - Whether patient can edit

### Updated Columns in `consultations` table:
- `created_by` - Who created the record
- `patient_can_edit` - Whether patient can edit
- `digital_signature` - Doctor's signature

---

## ⚠️ Important Notes

### Before Running:
1. **Backup your data** (if using Option 2)
   - Go to Supabase → Settings → Database
   - Click "Backup now"

2. **Check your connection**
   - Make sure you're connected to the correct project
   - Verify project name in top-left corner

3. **Read the script**
   - Review what will be changed
   - Understand the new features

### After Running:
1. **Test the changes**
   - Try registering a patient
   - Check if new fields appear
   - Verify existing data is intact

2. **Update your .env file**
   - Make sure Supabase URL and Key are correct
   - Restart your development server

---

## 🚨 Troubleshooting

### Error: "relation already exists"
**Solution**: You're using Option 1 but tables already exist. Use Option 2 instead.

### Error: "column already exists"
**Solution**: Migration script handles this automatically. Ignore this error.

### Error: "permission denied"
**Solution**: Make sure you're logged in as the project owner.

### Error: "syntax error"
**Solution**: Make sure you copied the ENTIRE script, including the first line.

### Tables not showing up
**Solution**: 
1. Refresh the page
2. Go to Table Editor
3. Click the refresh icon

---

## ✅ Verification Checklist

After running the script, verify:

- [ ] `patients` table has `temp_id` column
- [ ] `patients` table has `record_status` column
- [ ] `self_reported_vitals` table exists
- [ ] `audit_log` table exists
- [ ] `vitals` table has `created_by` column
- [ ] `consultations` table has `patient_can_edit` column
- [ ] All existing patient data is intact (if migration)
- [ ] Can register new patient successfully
- [ ] Can login as patient successfully

---

## 📊 Quick Test

### Test 1: Register Patient with NIN
1. Go to `/register`
2. Fill form with NIN
3. Submit
4. Check database: `record_status` should be 'verified'

### Test 2: Register Patient without NIN
1. Go to `/register`
2. Check "I don't have a NIN yet"
3. Fill form and submit
4. Check database: 
   - `temp_id` should have value like `TEMP-20250115-JD-4782`
   - `record_status` should be 'provisional'

### Test 3: Admin Edit
1. Login as admin
2. Go to patient list
3. Click "Edit" on a patient
4. Change phone number
5. Enter reason: "Testing"
6. Save
7. Check `audit_log` table: Should have new entry

### Test 4: Self-Reported Vitals
1. Login as patient
2. Go to "My Vitals" tab
3. Click "Add Vitals"
4. Enter temperature, pulse, BP
5. Save
6. Check `self_reported_vitals` table: Should have new entry

---

## 🎯 Which Option Should I Use?

### Use **Option 1** (Fresh Database) if:
- ✅ This is your first time setting up HealthMR
- ✅ You don't have any patient data yet
- ✅ You want to start completely fresh
- ✅ You're okay with deleting existing tables

### Use **Option 2** (Migration) if:
- ✅ You already have patient data
- ✅ You want to keep existing data
- ✅ You just want to add new features
- ✅ You're updating from an older version

---

## 📞 Need Help?

**Questions about database setup?**
- Email: mayoru24@gmail.com
- GitHub: @MayorChristopher

**Common Issues:**
- Check `IMPLEMENTATION_README.md` for troubleshooting
- Review `QUICK_REFERENCE.md` for feature overview
- See `FEATURES_SUMMARY.md` for complete documentation

---

## ✅ Summary

**Option 1**: Copy `supabase-schema.sql` → Paste in SQL Editor → Run  
**Option 2**: Copy `database-migration.sql` → Paste in SQL Editor → Run

**Both options are safe and tested!**

---

**Last Updated**: January 2025  
**Status**: ✅ Ready to Use

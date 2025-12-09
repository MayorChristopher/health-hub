# Supabase Setup Guide for HealthMR

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Sign up with your GitHub account
3. Create a new project named "healthmr"

## Step 2: Run Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `supabase-schema.sql`
3. Paste and click **Run**
4. This creates all tables: patients, medical_staff, vitals, consultations, lab_tests, prescriptions, appointments

## Step 3: Get API Keys
1. Go to **Project Settings** → **API**
2. Copy:
   - Project URL
   - anon/public key

## Step 4: Configure Environment
1. Create `.env.local` file in project root
2. Add:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Step 5: Install Supabase Client
Run in terminal:
```bash
npm install @supabase/supabase-js
```

## Step 6: Test Connection
The app will now save real data to Supabase database.

## Database Tables Created:
- **patients** - Patient registration with NIN
- **medical_staff** - Doctors, nurses, lab techs, pharmacists
- **vitals** - Nursing vitals records
- **consultations** - Doctor consultations
- **lab_tests** - Laboratory test requests and results
- **prescriptions** - Pharmacy prescriptions
- **appointments** - Patient appointments

## Features Enabled:
✅ Patient registration with unique HealthMR ID
✅ NIN verification
✅ Herbal medicine tracking
✅ Complete medical workflow
✅ Real-time data sync
✅ Secure authentication

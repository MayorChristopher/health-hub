-- HealthMR Database Migration Script
-- Run this ONLY if you already have existing tables with data
-- This adds new features without deleting existing data

-- ============================================
-- STEP 1: Update patients table
-- ============================================

-- Add new columns to patients table (if they don't exist)
DO $$ 
BEGIN
  -- Add temp_id column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='patients' AND column_name='temp_id') THEN
    ALTER TABLE patients ADD COLUMN temp_id VARCHAR(50) UNIQUE;
  END IF;

  -- Add fingerprint_hash column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='patients' AND column_name='fingerprint_hash') THEN
    ALTER TABLE patients ADD COLUMN fingerprint_hash TEXT;
  END IF;

  -- Add record_status column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='patients' AND column_name='record_status') THEN
    ALTER TABLE patients ADD COLUMN record_status VARCHAR(20) DEFAULT 'verified';
  END IF;

  -- Make NIN nullable (if it's currently NOT NULL)
  ALTER TABLE patients ALTER COLUMN nin DROP NOT NULL;
END $$;

-- Add constraint (drop first if exists to avoid error)
ALTER TABLE patients DROP CONSTRAINT IF EXISTS check_nin_or_temp;
ALTER TABLE patients ADD CONSTRAINT check_nin_or_temp CHECK (nin IS NOT NULL OR temp_id IS NOT NULL);

-- ============================================
-- STEP 2: Create self_reported_vitals table
-- ============================================

CREATE TABLE IF NOT EXISTS self_reported_vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  temperature DECIMAL(4,1),
  pulse INTEGER,
  blood_pressure VARCHAR(10),
  symptoms TEXT,
  notes TEXT,
  created_by VARCHAR(20) DEFAULT 'PATIENT',
  patient_can_edit BOOLEAN DEFAULT true,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- STEP 3: Create audit_log table
-- ============================================

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admins(id),
  action VARCHAR(50) NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  record_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  reason TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- STEP 4: Update vitals table
-- ============================================

DO $$ 
BEGIN
  -- Add created_by column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='vitals' AND column_name='created_by') THEN
    ALTER TABLE vitals ADD COLUMN created_by VARCHAR(20) DEFAULT 'STAFF';
  END IF;

  -- Add patient_can_edit column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='vitals' AND column_name='patient_can_edit') THEN
    ALTER TABLE vitals ADD COLUMN patient_can_edit BOOLEAN DEFAULT false;
  END IF;
END $$;

-- ============================================
-- STEP 5: Update consultations table
-- ============================================

DO $$ 
BEGIN
  -- Add created_by column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='consultations' AND column_name='created_by') THEN
    ALTER TABLE consultations ADD COLUMN created_by VARCHAR(20) DEFAULT 'DOCTOR';
  END IF;

  -- Add patient_can_edit column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='consultations' AND column_name='patient_can_edit') THEN
    ALTER TABLE consultations ADD COLUMN patient_can_edit BOOLEAN DEFAULT false;
  END IF;

  -- Add digital_signature column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='consultations' AND column_name='digital_signature') THEN
    ALTER TABLE consultations ADD COLUMN digital_signature TEXT;
  END IF;

  -- Add signed_by_staff_id column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='consultations' AND column_name='signed_by_staff_id') THEN
    ALTER TABLE consultations ADD COLUMN signed_by_staff_id UUID REFERENCES medical_staff(id);
  END IF;

  -- Add signed_at column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='consultations' AND column_name='signed_at') THEN
    ALTER TABLE consultations ADD COLUMN signed_at TIMESTAMP;
  END IF;
END $$;

-- ============================================
-- STEP 5B: Update prescriptions table
-- ============================================

DO $$ 
BEGIN
  -- Add signed_by_staff_id column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='prescriptions' AND column_name='signed_by_staff_id') THEN
    ALTER TABLE prescriptions ADD COLUMN signed_by_staff_id UUID REFERENCES medical_staff(id);
  END IF;

  -- Add signed_at column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='prescriptions' AND column_name='signed_at') THEN
    ALTER TABLE prescriptions ADD COLUMN signed_at TIMESTAMP;
  END IF;
END $$;

-- ============================================
-- STEP 6: Enable Row Level Security on new tables
-- ============================================

ALTER TABLE self_reported_vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 7: Create RLS Policies for new tables
-- ============================================

-- Drop policies if they exist (to avoid errors)
DROP POLICY IF EXISTS "Allow all on self_reported_vitals" ON self_reported_vitals;
DROP POLICY IF EXISTS "Allow all on audit_log" ON audit_log;

-- Create new policies
CREATE POLICY "Allow all on self_reported_vitals" ON self_reported_vitals FOR ALL USING (true);
CREATE POLICY "Allow all on audit_log" ON audit_log FOR ALL USING (true);

-- ============================================
-- STEP 8: Add user_id column to patients (if missing)
-- ============================================

DO $$ 
BEGIN
  -- Add user_id column for Supabase Auth integration
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='patients' AND column_name='user_id') THEN
    ALTER TABLE patients ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;
END $$;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Verify migration
SELECT 
  'Migration completed successfully!' as status,
  (SELECT COUNT(*) FROM patients) as total_patients,
  (SELECT COUNT(*) FROM patients WHERE record_status = 'provisional') as provisional_patients,
  (SELECT COUNT(*) FROM self_reported_vitals) as self_reported_vitals,
  (SELECT COUNT(*) FROM audit_log) as audit_logs;

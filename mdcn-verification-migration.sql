-- ============================================
-- MDCN Verification Migration Script
-- Date: December 2025
-- SAFE: This script ONLY ADDS new columns
-- DOES NOT delete or modify existing data
-- ============================================

-- Add MDCN verification columns to medical_staff table
DO $$ 
BEGIN
  -- Add mdcn_number column (stores verified MDCN registration number)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='medical_staff' AND column_name='mdcn_number') THEN
    ALTER TABLE medical_staff ADD COLUMN mdcn_number VARCHAR(50);
    RAISE NOTICE 'Added mdcn_number column';
  ELSE
    RAISE NOTICE 'mdcn_number column already exists';
  END IF;

  -- Add license_expiry column (tracks when medical license expires)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='medical_staff' AND column_name='license_expiry') THEN
    ALTER TABLE medical_staff ADD COLUMN license_expiry DATE;
    RAISE NOTICE 'Added license_expiry column';
  ELSE
    RAISE NOTICE 'license_expiry column already exists';
  END IF;

  -- Add verification_notes column (admin notes during verification)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='medical_staff' AND column_name='verification_notes') THEN
    ALTER TABLE medical_staff ADD COLUMN verification_notes TEXT;
    RAISE NOTICE 'Added verification_notes column';
  ELSE
    RAISE NOTICE 'verification_notes column already exists';
  END IF;

  -- Add verified_at column (timestamp when admin verified)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='medical_staff' AND column_name='verified_at') THEN
    ALTER TABLE medical_staff ADD COLUMN verified_at TIMESTAMP;
    RAISE NOTICE 'Added verified_at column';
  ELSE
    RAISE NOTICE 'verified_at column already exists';
  END IF;
END $$;

-- ============================================
-- IMPORTANT: Handle existing staff accounts
-- ============================================

-- Option 1: Keep existing staff active (if you trust them)
-- No action needed - they remain active

-- Option 2: Require verification for existing staff (RECOMMENDED)
-- Uncomment the line below to require all staff to be re-verified
-- UPDATE medical_staff SET is_active = false WHERE verified_at IS NULL;

-- ============================================
-- Verify migration
-- ============================================

SELECT 
  'Migration completed successfully!' as status,
  (SELECT COUNT(*) FROM medical_staff) as total_staff,
  (SELECT COUNT(*) FROM medical_staff WHERE is_active = true) as active_staff,
  (SELECT COUNT(*) FROM medical_staff WHERE is_active = false) as pending_verification,
  (SELECT COUNT(*) FROM medical_staff WHERE mdcn_number IS NOT NULL) as verified_with_mdcn;

-- ============================================
-- View staff requiring verification
-- ============================================

SELECT 
  staff_id,
  full_name,
  role,
  hospital_id,
  is_active,
  mdcn_number,
  created_at
FROM medical_staff
WHERE mdcn_number IS NULL
ORDER BY created_at DESC;

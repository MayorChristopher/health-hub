-- HealthMR Admin Table Migration
-- Creates the admins table for system administrators

-- ============================================
-- Create admins table
-- ============================================

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- ============================================
-- Enable Row Level Security
-- ============================================

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Create RLS Policy
-- ============================================

DROP POLICY IF EXISTS "Allow all on admins" ON admins;
CREATE POLICY "Allow all on admins" ON admins FOR ALL USING (true);

-- ============================================
-- Create indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- ============================================
-- Verification
-- ============================================

SELECT 
  'Admin table created successfully!' as status,
  (SELECT COUNT(*) FROM admins) as total_admins;

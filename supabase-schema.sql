-- HealthMR Database Schema for Supabase

-- Patients Table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  healthmr_id VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  nin VARCHAR(11) UNIQUE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100),
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) NOT NULL,
  blood_group VARCHAR(5),
  address TEXT NOT NULL,
  state VARCHAR(50) NOT NULL,
  lga VARCHAR(50) NOT NULL,
  occupation VARCHAR(100),
  next_of_kin_name VARCHAR(100) NOT NULL,
  next_of_kin_phone VARCHAR(15) NOT NULL,
  uses_herbal_medicine BOOLEAN DEFAULT false,
  herbal_types TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin Table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Medical Staff Table
CREATE TABLE medical_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL, -- doctor, nurse, lab_tech, pharmacist
  hospital_id VARCHAR(50) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100),
  password_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Vitals Table (Nursing Module)
CREATE TABLE vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  recorded_by UUID REFERENCES medical_staff(id),
  temperature DECIMAL(4,1),
  pulse INTEGER,
  respiration INTEGER,
  blood_pressure VARCHAR(10),
  oxygen_saturation INTEGER,
  symptoms TEXT[],
  notes TEXT,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Consultations Table (Doctor Module)
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES medical_staff(id),
  chief_complaint TEXT NOT NULL,
  diagnosis TEXT,
  treatment_plan TEXT,
  notes TEXT,
  herb_drug_alert BOOLEAN DEFAULT false,
  consultation_date TIMESTAMP DEFAULT NOW()
);

-- Lab Tests Table
CREATE TABLE lab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  requested_by UUID REFERENCES medical_staff(id),
  test_type VARCHAR(100) NOT NULL,
  sample_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, cancelled
  results TEXT,
  notes TEXT,
  requested_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Prescriptions Table (Pharmacy Module)
CREATE TABLE prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  prescribed_by UUID REFERENCES medical_staff(id),
  medication_name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50) NOT NULL,
  frequency VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  instructions TEXT,
  interaction_alert BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'active', -- active, completed, cancelled
  prescribed_at TIMESTAMP DEFAULT NOW()
);

-- Appointments Table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES medical_staff(id),
  appointment_date TIMESTAMP NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_patients_nin ON patients(nin);
CREATE INDEX idx_patients_healthmr_id ON patients(healthmr_id);
CREATE INDEX idx_vitals_patient ON vitals(patient_id);
CREATE INDEX idx_consultations_patient ON consultations(patient_id);
CREATE INDEX idx_lab_tests_patient ON lab_tests(patient_id);
CREATE INDEX idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX idx_admins_username ON admins(username);
CREATE INDEX idx_medical_staff_staff_id ON medical_staff(staff_id);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow all for demo - restrict in production)
CREATE POLICY "Allow all on admins" ON admins FOR ALL USING (true);
CREATE POLICY "Allow all on patients" ON patients FOR ALL USING (true);
CREATE POLICY "Allow all on medical_staff" ON medical_staff FOR ALL USING (true);
CREATE POLICY "Allow all on vitals" ON vitals FOR ALL USING (true);
CREATE POLICY "Allow all on consultations" ON consultations FOR ALL USING (true);
CREATE POLICY "Allow all on lab_tests" ON lab_tests FOR ALL USING (true);
CREATE POLICY "Allow all on prescriptions" ON prescriptions FOR ALL USING (true);
CREATE POLICY "Allow all on appointments" ON appointments FOR ALL USING (true);

-- Function to auto-generate HealthMR ID
CREATE OR REPLACE FUNCTION generate_healthmr_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.healthmr_id := 'HMR-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('healthmr_id_seq')::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sequence for HealthMR ID
CREATE SEQUENCE healthmr_id_seq START 1;

-- Trigger to auto-generate HealthMR ID on patient insert
CREATE TRIGGER set_healthmr_id
BEFORE INSERT ON patients
FOR EACH ROW
WHEN (NEW.healthmr_id IS NULL)
EXECUTE FUNCTION generate_healthmr_id();

-- Function to auto-generate Staff ID
CREATE OR REPLACE FUNCTION generate_staff_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.staff_id := 'STF-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('staff_id_seq')::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sequence for Staff ID
CREATE SEQUENCE staff_id_seq START 1;

-- Trigger to auto-generate Staff ID on medical_staff insert
CREATE TRIGGER set_staff_id
BEFORE INSERT ON medical_staff
FOR EACH ROW
WHEN (NEW.staff_id IS NULL)
EXECUTE FUNCTION generate_staff_id();

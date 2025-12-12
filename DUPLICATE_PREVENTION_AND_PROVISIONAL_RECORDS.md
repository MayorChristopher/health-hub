# Duplicate Prevention & Provisional Records

## 🎯 Overview

HealthMR now implements **two critical features**:
1. **Duplicate Registration Prevention** - Stops patients from registering twice with same NIN
2. **Provisional Registration** - Allows registration without NIN for special cases

---

## ✅ Feature 1: Duplicate Prevention

### Problem Solved
Previously, a patient could register multiple times with the same NIN, creating duplicate records.

### Solution Implemented
- **Frontend Check**: Before registration, system queries database for existing NIN
- **Backend Constraint**: Database has `UNIQUE` constraint on NIN column
- **User Feedback**: Clear error message shows existing HealthMR ID

### How It Works
```typescript
// Check if NIN already exists
const { data: existingPatient } = await supabase
  .from('patients')
  .select('healthmr_id, first_name, last_name')
  .eq('nin', formData.nin)
  .single();

if (existingPatient) {
  // Show error: "This NIN is already registered to [Name] ([HealthMR ID])"
  return;
}
```

### User Experience
**Scenario**: John tries to register with NIN `12345678901` that's already registered.

**Result**:
```
❌ Duplicate Registration Detected
This NIN is already registered to John Doe (HMR-2025-000123). 
Please login instead.
```

---

## ✅ Feature 2: Provisional Registration (No NIN)

### Problem Solved
**Question**: "What about patients without NIN?"
- Infants (too young for NIN)
- Recent immigrants (NIN pending)
- Remote area residents (no access to NIN enrollment)

### Solution Implemented
**Answer**: "We follow national guidelines with Temporary ID system"

### How It Works

#### 1. Patient Checks "I don't have a NIN yet"
- NIN field becomes disabled
- Warning message appears
- System prepares for provisional registration

#### 2. Temporary ID Generation Algorithm
```typescript
// Format: TEMP-YYYYMMDD-INITIALS-RANDOM
// Example: TEMP-20250115-JD-4782

const dobFormatted = "20250115"; // From date of birth
const initials = "JD";           // John Doe
const random = 4782;             // Random 4-digit number

tempId = "TEMP-20250115-JD-4782";
```

#### 3. Record Flagged as Provisional
```sql
record_status = 'provisional'  -- Instead of 'verified'
```

#### 4. Patient Receives Notification
```
✅ Registration Successful!
Your HealthMR ID: HMR-2025-000456 
(PROVISIONAL - Please provide NIN to verify your record)
```

---

## 📊 Database Schema Changes

### Before
```sql
nin VARCHAR(11) UNIQUE NOT NULL  -- Required for all patients
```

### After
```sql
nin VARCHAR(11) UNIQUE,              -- Now nullable
temp_id VARCHAR(50) UNIQUE,          -- For provisional records
fingerprint_hash TEXT,               -- For biometric identification
record_status VARCHAR(20) DEFAULT 'verified',  -- 'verified' or 'provisional'
CONSTRAINT check_nin_or_temp CHECK (nin IS NOT NULL OR temp_id IS NOT NULL)
```

**Key Points**:
- Patient MUST have either NIN or Temp ID (not both null)
- Both NIN and Temp ID are unique (no duplicates)
- Record status tracks verification level

---

## 🏥 Integration with Fingerprint System

### For Patients Without Phone (Future Implementation)

**Scenario**: Elderly patient has no NIN and no phone

**Solution**:
1. Visit nearest clinic
2. Register with fingerprint scanner
3. System generates Temp ID
4. Fingerprint hash stored in `fingerprint_hash` column
5. Patient can access records at any clinic with fingerprint

**Database**:
```sql
INSERT INTO patients (
  temp_id,
  fingerprint_hash,
  record_status,
  ...
) VALUES (
  'TEMP-19450320-MO-8291',
  'SHA256_HASH_OF_FINGERPRINT',
  'provisional',
  ...
);
```

---

## 🔄 Upgrading Provisional to Verified

### When Patient Gets NIN Later

**Process**:
1. Patient visits clinic with new NIN
2. Staff updates record:
```sql
UPDATE patients 
SET 
  nin = '12345678901',
  record_status = 'verified',
  temp_id = NULL,  -- Clear temporary ID
  updated_at = NOW()
WHERE healthmr_id = 'HMR-2025-000456';
```

3. System sends notification:
```
✅ Account Verified!
Your record has been upgraded from provisional to verified status.
```

---

## 📋 Registration Flow Comparison

### Standard Registration (With NIN)
```
1. Enter personal details
2. Enter 11-digit NIN
3. System checks for duplicate NIN ✓
4. If unique → Create verified record
5. Generate HealthMR ID (e.g., HMR-2025-000123)
6. Status: VERIFIED
```

### Provisional Registration (No NIN)
```
1. Enter personal details
2. Check "I don't have a NIN yet"
3. NIN field disabled
4. System generates Temp ID from DOB + Initials
5. Create provisional record
6. Generate HealthMR ID (e.g., HMR-2025-000456)
7. Status: PROVISIONAL
8. Warning: "Please provide NIN later"
```

---

## 🎨 UI Changes

### NIN Field
**Before**:
```tsx
<Input id="nin" required maxLength={11} />
```

**After**:
```tsx
<Input 
  id="nin" 
  required={!formData.hasNoNIN}
  disabled={formData.hasNoNIN}
  placeholder={formData.hasNoNIN ? "NIN not available" : "Enter 11-digit NIN"}
/>

<Checkbox id="hasNoNIN">
  I don't have a NIN yet (infant, recent immigrant, or remote area)
</Checkbox>

{formData.hasNoNIN && (
  <Alert variant="warning">
    ⚠️ Provisional Registration: Your record will be flagged as provisional.
    Please provide your NIN later to verify your account.
  </Alert>
)}
```

---

## 🔒 Security Considerations

### Preventing Abuse

**Problem**: Someone could register multiple times without NIN

**Solution**:
1. **Temp ID is unique** - Can't register twice with same DOB + Initials
2. **Phone number required** - Limits registrations per phone
3. **Fingerprint hash** (future) - Biometric prevents duplicates
4. **Audit trail** - Track all provisional registrations
5. **Admin review** - Flag suspicious provisional accounts

### Monitoring Provisional Accounts

**Admin Dashboard Query**:
```sql
SELECT 
  healthmr_id,
  first_name,
  last_name,
  temp_id,
  created_at,
  DATEDIFF(NOW(), created_at) as days_provisional
FROM patients
WHERE record_status = 'provisional'
ORDER BY created_at DESC;
```

**Alert**: If provisional for >90 days, send reminder to provide NIN

---

## 📊 Statistics & Reporting

### Dashboard Metrics

**Patient Records Overview**:
```
Total Patients: 1,234
├─ Verified (with NIN): 1,180 (95.6%)
└─ Provisional (no NIN): 54 (4.4%)
   ├─ Infants (<1 year): 32
   ├─ Pending NIN: 18
   └─ Other: 4
```

---

## 🎯 Hackathon Demo Script

### Scenario 1: Duplicate Prevention
**Presenter**: "Let me try to register with an existing NIN..."
**System**: ❌ "This NIN is already registered to John Doe (HMR-2025-000123)"
**Presenter**: "Perfect! The system prevents duplicate records."

### Scenario 2: Provisional Registration
**Presenter**: "Now, what if a 2-month-old infant needs registration?"
**Action**: Check "I don't have a NIN yet"
**System**: ✅ "Registration Successful! HMR-2025-000456 (PROVISIONAL)"
**Presenter**: "The system generates a temporary ID and flags the record for later verification."

### Scenario 3: Fingerprint at Clinic (Future)
**Presenter**: "For patients without phones, they can use fingerprint at any clinic."
**Demo**: Show biometric scanner mockup
**Presenter**: "This ensures truly inclusive healthcare access."

---

## 🚀 Next Steps

### Phase 1 (Current) ✅
- [x] Duplicate NIN prevention
- [x] Provisional registration UI
- [x] Temp ID generation algorithm
- [x] Database schema updated

### Phase 2 (Next Sprint)
- [ ] Fingerprint scanner integration
- [ ] NIN verification workflow (upgrade provisional → verified)
- [ ] Admin dashboard for provisional accounts
- [ ] SMS alerts for provisional account reminders

### Phase 3 (Future)
- [ ] USSD integration for checking records
- [ ] Biometric authentication at clinics
- [ ] Automated NIN verification via NIMC API
- [ ] Bulk upgrade of provisional accounts

---

## 📧 Contact

**Questions about implementation?**
- Email: mayoru24@gmail.com
- GitHub: @MayorChristopher

---

**Summary**: HealthMR now prevents duplicate registrations AND supports patients without NIN through a robust provisional registration system with temporary IDs.

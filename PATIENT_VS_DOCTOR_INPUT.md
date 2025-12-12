# Patient vs Doctor Input Differentiation

## 🎯 Purpose

**Legal & Medical Requirement**: Patients must NOT be able to edit medical diagnoses, prescriptions, or clinical notes entered by doctors.

**Why It Matters**:
- Medical liability protection
- Legal compliance
- Prevents tampering with medical records
- Maintains audit trail integrity

---

## 📊 Data Separation

### Patient-Editable Data (Blue)
✅ **Patient CAN edit these**:
- Personal symptoms
- Herbal medicine usage
- Lifestyle information
- Allergies
- Family medical history
- Emergency contacts

### Doctor-Only Data (Green - Read-Only)
🔒 **Patient CANNOT edit these**:
- Diagnosis
- Prescriptions
- Clinical notes
- Lab test orders
- Treatment plans
- Medical recommendations

---

## 🎨 UI Implementation

### Visual Differentiation

#### Patient Input Card
```tsx
<Card className="border-l-4 border-l-blue-500 bg-blue-50">
  <CardHeader>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Badge variant="default" className="bg-blue-500">
          Your Input
        </Badge>
        <h3>Symptoms & Lifestyle</h3>
      </div>
      <Button size="sm" variant="outline">
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <p>Headache, fever for 2 days. Taking agbo daily.</p>
  </CardContent>
</Card>
```

#### Doctor Input Card (Read-Only)
```tsx
<Card className="border-l-4 border-l-green-600 bg-green-50">
  <CardHeader>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Badge variant="default" className="bg-green-600">
          Doctor's Record
        </Badge>
        <h3>Diagnosis & Treatment</h3>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <Lock className="h-4 w-4" />
        <span className="text-sm">Read Only</span>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <p><strong>Diagnosis:</strong> Malaria (Plasmodium falciparum)</p>
      <p><strong>Prescription:</strong> Artemether-Lumefantrine 80/480mg</p>
      <p><strong>Doctor:</strong> Dr. Chukwu Emmanuel (STF-2025-000045)</p>
      <p className="text-xs text-gray-500">Recorded: Jan 15, 2025 at 10:30 AM</p>
    </div>
  </CardContent>
  <CardFooter className="bg-yellow-50 border-t">
    <div className="flex items-start gap-2">
      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
      <p className="text-xs text-yellow-800">
        Medical records are read-only for your safety. Contact your doctor if you have questions.
      </p>
    </div>
  </CardFooter>
</Card>
```

---

## 🗄️ Database Schema

### Consultations Table (Doctor Input)
```sql
CREATE TABLE consultations (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES medical_staff(id),
  
  -- DOCTOR-ONLY FIELDS (Read-only to patient)
  chief_complaint TEXT NOT NULL,
  diagnosis TEXT,
  treatment_plan TEXT,
  clinical_notes TEXT,
  
  -- METADATA
  created_by VARCHAR(20) DEFAULT 'DOCTOR',
  patient_can_edit BOOLEAN DEFAULT false,
  digital_signature TEXT,  -- Doctor's digital signature
  
  consultation_date TIMESTAMP DEFAULT NOW(),
  last_modified TIMESTAMP DEFAULT NOW(),
  modified_by UUID REFERENCES medical_staff(id)
);
```

### Patient Input Table (Patient Editable)
```sql
CREATE TABLE patient_input (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  
  -- PATIENT-EDITABLE FIELDS
  current_symptoms TEXT,
  herbal_medicine_usage TEXT,
  lifestyle_notes TEXT,
  allergies TEXT[],
  family_history TEXT,
  
  -- METADATA
  created_by VARCHAR(20) DEFAULT 'PATIENT',
  patient_can_edit BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT NOW(),
  last_modified TIMESTAMP DEFAULT NOW()
);
```

---

## 🔒 Access Control Logic

### Frontend Enforcement
```typescript
// Check if user can edit this record
const canEdit = (record: MedicalRecord, currentUser: User) => {
  // Doctors can edit their own records
  if (currentUser.role === 'doctor' && record.doctor_id === currentUser.id) {
    return true;
  }
  
  // Patients can only edit patient_input records
  if (currentUser.role === 'patient' && record.created_by === 'PATIENT') {
    return true;
  }
  
  // Admins can edit everything (with audit trail)
  if (currentUser.role === 'admin') {
    return true;
  }
  
  return false;
};

// Render edit button conditionally
{canEdit(record, currentUser) && (
  <Button onClick={handleEdit}>Edit</Button>
)}
```

### Backend Enforcement (API)
```typescript
// API Route: /api/consultations/:id
app.put('/api/consultations/:id', async (req, res) => {
  const { userId, role } = req.user;
  const consultation = await getConsultation(req.params.id);
  
  // CRITICAL: Prevent patients from editing doctor's notes
  if (role === 'patient') {
    return res.status(403).json({
      error: "Forbidden",
      message: "Patients cannot edit medical records created by doctors"
    });
  }
  
  // Only the original doctor or admin can edit
  if (role === 'doctor' && consultation.doctor_id !== userId) {
    return res.status(403).json({
      error: "Forbidden",
      message: "You can only edit your own consultations"
    });
  }
  
  // Proceed with update + audit trail
  await updateConsultation(req.params.id, req.body, userId);
});
```

---

## 📋 Patient Dashboard Layout

### Section 1: Your Health Information (Editable)
```
┌─────────────────────────────────────────────┐
│ 🔵 Your Input                    [Edit]     │
├─────────────────────────────────────────────┤
│ Current Symptoms:                           │
│ • Headache (3 days)                         │
│ • Fever (38.5°C)                            │
│                                             │
│ Herbal Medicine:                            │
│ • Agbo (morning & evening)                  │
│ • Bitter leaf tea                           │
│                                             │
│ Last Updated: Jan 15, 2025 by You          │
└─────────────────────────────────────────────┘
```

### Section 2: Medical Records (Read-Only)
```
┌─────────────────────────────────────────────┐
│ 🟢 Doctor's Record              🔒 Read Only│
├─────────────────────────────────────────────┤
│ Diagnosis: Malaria (P. falciparum)          │
│                                             │
│ Prescription:                               │
│ • Artemether-Lumefantrine 80/480mg          │
│   Dosage: 4 tablets twice daily             │
│   Duration: 3 days                          │
│                                             │
│ ⚠️ Herb-Drug Alert:                         │
│ Agbo may reduce effectiveness of malaria    │
│ medication. Please discontinue during       │
│ treatment.                                  │
│                                             │
│ Doctor: Dr. Chukwu Emmanuel                 │
│ Date: Jan 15, 2025 at 10:30 AM             │
│ Signature: [Digital Signature]              │
│                                             │
│ ⚠️ Medical records are read-only for your   │
│    safety. Contact your doctor if you have  │
│    questions about this diagnosis.          │
└─────────────────────────────────────────────┘
```

---

## 🎯 User Agreement on First Login

### Digital Consent Form
```tsx
<Dialog open={!hasAcceptedTerms}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Medical Records Agreement</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <p className="text-sm">
        Please read and accept the following terms:
      </p>
      
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
        <h4 className="font-semibold">What You Can Do:</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>View all your medical records</li>
          <li>Add your symptoms and health information</li>
          <li>Update your herbal medicine usage</li>
          <li>Edit your personal details</li>
        </ul>
        
        <h4 className="font-semibold mt-4">What You Cannot Do:</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Edit diagnoses made by doctors</li>
          <li>Modify prescriptions</li>
          <li>Change clinical notes</li>
          <li>Alter lab results</li>
        </ul>
      </div>
      
      <div className="flex items-start gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="text-sm">
          I understand that medical records entered by healthcare 
          professionals are read-only for my safety and legal compliance.
        </Label>
      </div>
    </div>
    
    <DialogFooter>
      <Button onClick={handleAcceptTerms}>
        I Agree & Continue
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 🔍 Audit Trail

### Track All Access & Modifications
```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  user_role VARCHAR(20) NOT NULL,
  action VARCHAR(50) NOT NULL,  -- 'view', 'edit', 'delete', 'attempt_edit'
  record_type VARCHAR(50) NOT NULL,  -- 'consultation', 'prescription', etc.
  record_id UUID NOT NULL,
  success BOOLEAN DEFAULT true,
  failure_reason TEXT,
  ip_address VARCHAR(45),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Example: Patient tries to edit doctor's note
INSERT INTO audit_log (
  user_id, 
  user_role, 
  action, 
  record_type, 
  record_id, 
  success, 
  failure_reason
) VALUES (
  'patient-uuid',
  'patient',
  'attempt_edit',
  'consultation',
  'consultation-uuid',
  false,
  'Patients cannot edit doctor consultations'
);
```

---

## 🚨 Security Alerts

### Suspicious Activity Detection
```typescript
// Alert admin if patient attempts to edit doctor records
const detectSuspiciousActivity = async (userId: string) => {
  const attempts = await supabase
    .from('audit_log')
    .select('*')
    .eq('user_id', userId)
    .eq('action', 'attempt_edit')
    .eq('success', false)
    .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000)); // Last 24h
  
  if (attempts.length > 5) {
    // Send alert to admin
    await sendAdminAlert({
      type: 'suspicious_activity',
      userId,
      message: `Patient attempted to edit doctor records ${attempts.length} times in 24h`
    });
  }
};
```

---

## 📱 Mobile App Considerations

### Touch Gestures
- **Patient Input Cards**: Swipe right to edit
- **Doctor Records**: Swipe disabled, show lock icon on attempt

### Visual Feedback
```tsx
<Card 
  onTouchStart={handleTouch}
  className={canEdit ? "cursor-pointer" : "cursor-not-allowed"}
>
  {!canEdit && (
    <div className="absolute inset-0 bg-gray-900/5 pointer-events-none" />
  )}
</Card>
```

---

## 🎯 Hackathon Demo Script

### Demo Flow

**1. Login as Patient**
```
Presenter: "Let me login as a patient..."
[Shows patient dashboard]
```

**2. Show Patient Input (Editable)**
```
Presenter: "Here I can add my symptoms..."
[Clicks Edit button on blue card]
[Updates symptoms]
[Saves successfully]
Presenter: "Perfect! I can edit my own health information."
```

**3. Attempt to Edit Doctor's Record**
```
Presenter: "Now, what if I try to edit the doctor's diagnosis?"
[Clicks on green card - no Edit button visible]
[Shows lock icon]
Presenter: "Notice there's no edit button. The record is read-only."
```

**4. Show Agreement Dialog**
```
Presenter: "On first login, patients must agree to these terms..."
[Shows agreement dialog]
Presenter: "This ensures legal compliance and patient safety."
```

---

## ✅ Implementation Checklist

### Phase 1 (Current Sprint) - 3 hours
- [ ] Add `created_by` and `patient_can_edit` columns to tables
- [ ] Create visual badges (blue for patient, green for doctor)
- [ ] Disable edit buttons on doctor records
- [ ] Add lock icon to read-only cards
- [ ] Show warning message on doctor records

### Phase 2 (Next Sprint) - 1 week
- [ ] Implement agreement dialog on first login
- [ ] Add audit trail logging
- [ ] Backend API access control
- [ ] Suspicious activity detection
- [ ] Admin dashboard for audit logs

### Phase 3 (Future) - 2 weeks
- [ ] Digital signature for doctors
- [ ] Patient acknowledgment system
- [ ] Emergency override with fingerprint
- [ ] Mobile app gesture controls

---

## 📧 Contact

**Questions about implementation?**
- Email: mayoru24@gmail.com
- GitHub: @MayorChristopher

---

**Summary**: Clear visual differentiation between patient-editable (blue) and doctor-only (green) records with robust access control and audit trails.

# 🚀 Quick Admin Reference Card

## 📋 Setup Checklist

### 1️⃣ Database Setup
```bash
# Run this SQL in Supabase SQL Editor:
File: admin-table-migration.sql
```

### 2️⃣ Set Your Secret Key
```typescript
// File: src/pages/AdminSetup.tsx (Line 20)
const SETUP_SECRET_KEY = 'YOUR_SECRET_KEY_HERE';
```
**⚠️ KEEP THIS SECRET! Write it down somewhere safe!**

### 3️⃣ Create Admin Account
```
URL: /admin-setup
Enter: Your secret key + admin details
```

### 4️⃣ Login
```
URL: /admin
Username: (what you created)
Password: (what you created)
```

---

## 🎯 Admin Powers

### Patient Management
| Action | How |
|--------|-----|
| View All Patients | Admin Dashboard → Patients Tab |
| View Medical Record | Click "View" button |
| Edit Patient Info | Click "Edit" button |
| Delete Patient | Click red trash icon |

### Staff Management
| Action | How |
|--------|-----|
| Verify New Staff | Click "Verify Pending Staff" button |
| Approve Staff | Enter MDCN number → Click "Approve & Activate" |
| Reject Staff | Click "Reject" in verification dialog |
| Deactivate Staff | Click "Deactivate" button |
| Delete Staff | Click red trash icon |

---

## 🔐 Your Secret Setup Key

**Write it here (keep this paper safe!):**

```
┌─────────────────────────────────────────┐
│                                         │
│  My Secret Key:                         │
│  _____________________________________  │
│                                         │
│  Created: ___/___/2025                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🆘 Quick Fixes

### Problem: Can't create admin account
**Solution:** Check your secret key matches the one in `AdminSetup.tsx`

### Problem: Staff verification not working
**Solution:** 
1. Make sure you're logged in as admin
2. Check you entered MDCN number
3. Refresh the page

### Problem: "Anonymous sign-ins disabled" error
**Solution:** This is for patient registration, not admin. Ignore it.

---

## 📞 Emergency Contact

**Email:** healthmrmouau@gmail.com  
**Phone:** +234 912 329 7491

---

## ⚡ Quick Commands

### View System Stats
```
Admin Dashboard → Top cards show:
- Total Patients
- Medical Staff
- Consultations
- Lab Tests
```

### Search Patients
```
Type in search box: Name, HealthMR ID, or NIN
```

### Search Staff
```
Type in search box: Name, Staff ID, or Role
```

---

## 🎨 New Features Added

✅ **Health Coach Dashboard** - Personalized health guidance for patients  
✅ **Emergency Access** - Fingerprint-based emergency medical info  
✅ **Secure Admin Setup** - Secret key protection  
✅ **Full Patient Control** - View, edit, delete  
✅ **Full Staff Control** - Verify, activate, deactivate, delete  
✅ **MDCN Verification** - Legal compliance for staff approval  

---

**Remember:** With great power comes great responsibility! 🦸‍♂️

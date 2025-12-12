import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus, Copy, CheckCircle, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import bcrypt from "bcryptjs";

const StaffRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [registeredId, setRegisteredId] = useState("");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    hospitalId: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Hash password
      const passwordHash = await bcrypt.hash(formData.password, 10);

      // Insert staff record
      const { data, error } = await supabase
        .from("medical_staff")
        .insert({
          full_name: formData.fullName,
          role: formData.role,
          hospital_id: formData.hospitalId,
          phone: formData.phone,
          email: formData.email,
          password_hash: passwordHash,
          is_active: false,
        })
        .select()
        .single();

      if (error) throw error;

      setLoading(false);
      setRegisteredId(data.staff_id);
      setShowIdModal(true);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <img src="/logo.png" alt="HealthMR" className="h-10" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Staff Registration</h1>
          <p className="text-gray-600">Register as a healthcare provider to access the system</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Dr. Adaeze Nwosu"
              />
            </div>

            <div>
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="lab_tech">Laboratory Technician</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hospitalId">Hospital/Facility ID *</Label>
              <Input
                id="hospitalId"
                required
                value={formData.hospitalId}
                onChange={(e) => setFormData({ ...formData, hospitalId: e.target.value })}
                placeholder="e.g., FMC-UMUAHIA"
              />
              <p className="text-xs text-gray-500 mt-1">Contact your hospital administrator for this ID</p>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234-XXX-XXX-XXXX"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="doctor@hospital.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimum 8 characters"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Verification Required:</strong> After registration, you will receive a unique Staff ID. 
                Your account requires admin verification of your medical license (MDCN registration) before activation. 
                This is mandatory under the Medical and Dental Practitioners Act. You will be notified once approved.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="button" variant="outline" onClick={() => navigate("/")} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-medical-green hover:bg-medical-dark">
                <UserPlus className="h-4 w-4 mr-2" />
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/staff-login")}
                className="text-medical-green hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        </Card>
      </div>

      {/* ID Display Modal */}
      <Dialog open={showIdModal} onOpenChange={(open) => !open && navigate("/staff-login")}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Registration Submitted!
            </DialogTitle>
            <DialogDescription className="text-base">
              Your Staff ID has been generated. Save this ID - you'll need it to login.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Your Staff ID</p>
              <p className="text-3xl font-bold text-green-700 mb-4">{registeredId}</p>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(registeredId);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full"
                variant="outline"
              >
                {copied ? (
                  <><CheckCircle className="h-4 w-4 mr-2" /> Copied!</>
                ) : (
                  <><Copy className="h-4 w-4 mr-2" /> Copy ID</>
                )}
              </Button>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-bold mb-1">Admin Verification Required</p>
                  <p>Your account requires admin verification of your MDCN license before you can login. You will be notified once approved.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>ℹ️ Note:</strong> Write down or screenshot this ID. You cannot recover it if lost.
              </p>
            </div>

            <Button
              onClick={() => navigate("/staff-login")}
              className="w-full bg-medical-green hover:bg-medical-dark"
            >
              Go to Login Page
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffRegistration;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Shield } from "lucide-react";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staffId: "",
    password: "",
    role: "",
    hospitalId: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement staff authentication with Supabase
    navigate("/medical-dashboard");
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

      <div className="max-w-md mx-auto px-6 py-8">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-medical-green" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Medical Staff Login</h1>
            <p className="text-gray-600 text-sm mt-2">Secure access for healthcare providers</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="staffId">Staff ID *</Label>
              <Input 
                id="staffId" 
                placeholder="STF-2025-000001"
                value={formData.staffId} 
                onChange={(e) => setFormData({...formData, staffId: e.target.value})} 
                required 
              />
              <p className="text-xs text-gray-500 mt-1">Provided by hospital administration</p>
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <Input 
                id="password" 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>

            <div>
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="lab_tech">Laboratory Technician</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hospitalId">Hospital/Facility ID *</Label>
              <Input 
                id="hospitalId" 
                placeholder="e.g., FMC-UMUAHIA"
                value={formData.hospitalId} 
                onChange={(e) => setFormData({...formData, hospitalId: e.target.value})} 
                required 
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-medical-green hover:bg-medical-dark"
              disabled={!formData.staffId || !formData.password || !formData.role || !formData.hospitalId}
            >
              Login to Portal
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Don't have credentials?{" "}
              <span className="text-medical-green cursor-pointer hover:underline">
                Contact your hospital administrator
              </span>
            </p>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-gray-700">
              <strong>Security Notice:</strong> All login attempts are logged and monitored. Unauthorized access is prohibited.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StaffLogin;

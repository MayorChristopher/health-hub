import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";
import bcrypt from "bcryptjs";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    staffId: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Find staff by staff_id
      const { data: staff, error } = await supabase
        .from("medical_staff")
        .select("*")
        .eq("staff_id", formData.staffId)
        .single();

      if (error || !staff) {
        toast({
          title: "Login Failed",
          description: "Invalid Staff ID or password",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Check if account is active
      if (!staff.is_active) {
        toast({
          title: "Account Pending Verification",
          description: "Your account is awaiting admin verification of your medical license (MDCN registration). Contact administrator for status.",
          variant: "destructive",
          duration: 10000,
        });
        setLoading(false);
        return;
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(formData.password, staff.password_hash);

      if (!passwordMatch) {
        toast({
          title: "Login Failed",
          description: "Invalid Staff ID or password",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Update last login
      await supabase
        .from("medical_staff")
        .update({ last_login: new Date().toISOString() })
        .eq("id", staff.id);

      // Store session
      localStorage.setItem("staff_session", JSON.stringify({
        id: staff.id,
        staff_id: staff.staff_id,
        full_name: staff.full_name,
        role: staff.role,
        hospital_id: staff.hospital_id,
      }));

      toast({
        title: "Login Successful",
        description: `Welcome back, ${staff.full_name}!`,
      });

      navigate("/medical-dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
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



            <Button 
              type="submit" 
              className="w-full bg-medical-green hover:bg-medical-dark"
              disabled={loading || !formData.staffId || !formData.password}
            >
              {loading ? "Logging in..." : "Login to Portal"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/staff-registration")}
                className="text-medical-green hover:underline font-medium"
              >
                Register here
              </button>
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

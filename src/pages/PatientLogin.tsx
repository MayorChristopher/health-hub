import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [healthmrId, setHealthmrId] = useState("");
  const [nin, setNin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Find patient by HealthMR ID and NIN
    const { data: patient, error: findError } = await supabase
      .from('patients')
      .select('*')
      .eq('healthmr_id', healthmrId)
      .eq('nin', nin)
      .single();

    if (findError || !patient) {
      setLoading(false);
      toast({
        title: "Login Failed",
        description: "Invalid HealthMR ID or NIN",
        variant: "destructive"
      });
      return;
    }

    // Sign in with their email and auto-generated password
    const { error } = await supabase.auth.signInWithPassword({
      email: patient.email,
      password: nin + "@HealthMR",
    });

    if (error) {
      setLoading(false);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: `Welcome back, ${patient.first_name}!`,
    });
    navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center mb-8">
          <img src="/logo.png" alt="HealthMR" className="h-14 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Patient Login</h1>
          <p className="text-gray-600 text-sm mt-2">Access your medical records</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="healthmrId">HealthMR ID</Label>
            <Input 
              id="healthmrId" 
              placeholder="HMR-2025-000001"
              value={healthmrId} 
              onChange={(e) => setHealthmrId(e.target.value)} 
              required 
            />
            <p className="text-xs text-gray-500 mt-1">Found on your registration confirmation</p>
          </div>
          <div>
            <Label htmlFor="nin">National Identification Number (NIN)</Label>
            <Input 
              id="nin" 
              maxLength={11}
              placeholder="12345678901"
              value={nin} 
              onChange={(e) => setNin(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-medical-green hover:bg-medical-dark">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} className="text-medical-green cursor-pointer hover:underline font-medium">
              Register here
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PatientLogin;

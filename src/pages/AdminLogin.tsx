import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import bcrypt from "bcryptjs";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch admin by username
      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !admin) {
        toast({
          title: 'Login Failed',
          description: 'Invalid username or password',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, admin.password_hash);
      if (!passwordMatch) {
        toast({
          title: 'Login Failed',
          description: 'Invalid username or password',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Store admin session
      localStorage.setItem('admin_session', JSON.stringify({
        id: admin.id,
        username: admin.username,
        fullName: admin.full_name,
        role: admin.role || 'admin',
      }));

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${admin.full_name}`,
      });

      navigate("/admin-dashboard");
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center mb-8">
          <img src="/logo.png" alt="HealthMR" className="h-14 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 text-sm mt-2">Manage HealthMR System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-medical-green hover:bg-medical-dark"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            First time setup?{' '}
            <button
              type="button"
              onClick={() => navigate('/admin-setup')}
              className="text-medical-green hover:underline"
            >
              Create Admin Account
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;

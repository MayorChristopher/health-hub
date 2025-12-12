import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import bcrypt from 'bcryptjs';

export default function AdminSetup() {
  const navigate = useNavigate();
  const [setupKey, setSetupKey] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
  });

  // CRITICAL: Change this secret key to your own unique value
  const SETUP_SECRET_KEY = 'HMR-ADMIN-01';

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verify setup key
    if (setupKey !== SETUP_SECRET_KEY) {
      toast({
        title: 'Invalid Setup Key',
        description: 'You are not authorized to create admin accounts',
        variant: 'destructive',
      });
      return;
    }

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Weak Password',
        description: 'Password must be at least 8 characters',
        variant: 'destructive',
      });
      return;
    }

    // Check if admin already exists
    const { data: existing } = await supabase
      .from('admins')
      .select('id')
      .eq('username', formData.username)
      .single();

    if (existing) {
      toast({
        title: 'Username Taken',
        description: 'This username already exists',
        variant: 'destructive',
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Create admin account
    const { error } = await supabase.from('admins').insert({
      username: formData.username,
      password_hash: hashedPassword,
      full_name: formData.fullName,
      email: formData.email,
    });

    if (error) {
      toast({
        title: 'Setup Failed',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Admin Account Created',
      description: 'You can now login with your credentials',
    });

    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Setup</h1>
          <p className="text-sm text-gray-600 mt-2">Create your administrator account</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
            <p className="text-xs text-yellow-800">
              This page should only be accessed once during initial setup. 
              The setup key is required to prevent unauthorized admin creation.
            </p>
          </div>
        </div>

        <form onSubmit={handleSetup} className="space-y-4">
          <div>
            <Label htmlFor="setupKey">Setup Secret Key *</Label>
            <Input
              id="setupKey"
              type="password"
              placeholder="Enter setup secret key"
              value={setupKey}
              onChange={(e) => setSetupKey(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Contact system administrator for the setup key
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@healthmr.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
            Create Admin Account
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => navigate('/admin')}
          >
            Back to Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import bcrypt from 'bcryptjs';

export default function AdminCreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    role: 'admin',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if logged in as admin
    const session = localStorage.getItem('admin_session');
    if (!session) {
      toast({ title: 'Unauthorized', description: 'Please login first', variant: 'destructive' });
      navigate('/admin');
      return;
    }

    // Check if username exists
    const { data: existing } = await supabase
      .from('admins')
      .select('id')
      .eq('username', formData.username)
      .single();

    if (existing) {
      toast({ title: 'Username Taken', description: 'Choose a different username', variant: 'destructive' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Create admin
    const { error } = await supabase.from('admins').insert({
      username: formData.username,
      password_hash: hashedPassword,
      full_name: formData.fullName,
      email: formData.email,
      role: formData.role,
    });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: '✅ Admin Created', description: `${formData.fullName} can now login` });
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin-dashboard')} className="mb-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Create Admin Account</h1>
          <p className="text-sm text-gray-600 mt-2">Add a new administrator</p>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <Label>Full Name *</Label>
            <Input
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              placeholder="admin@healthmr.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Username *</Label>
            <Input
              placeholder="Choose username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Password *</Label>
            <Input
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
            />
          </div>

          <div>
            <Label>Role *</Label>
            <select
              className="w-full border rounded-md p-2"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <Button type="submit" className="w-full bg-medical-green hover:bg-medical-dark">
            Create Admin Account
          </Button>
        </form>
      </Card>
    </div>
  );
}

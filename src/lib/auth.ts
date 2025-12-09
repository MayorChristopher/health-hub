import { supabase } from './supabase';

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getPatientData = async (userId: string) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const logout = async () => {
  await supabase.auth.signOut();
};

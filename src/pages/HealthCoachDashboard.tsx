import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Apple, CheckCircle, XCircle, Calendar, Phone, FileText, Fingerprint } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function HealthCoachDashboard() {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<any>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    loadPatientData();
  }, []);

  const loadPatientData = async () => {
    const patientId = localStorage.getItem('patientId');
    if (!patientId) {
      navigate('/');
      return;
    }

    const { data } = await supabase
      .from('patients')
      .select('*, consultations(*), prescriptions(*)')
      .eq('id', patientId)
      .single();

    setPatientData(data);
  };

  const exercises = [
    { name: 'Morning Walk', duration: '30 min', icon: '🚶' },
    { name: 'Stretching', duration: '10 min', icon: '🧘' },
    { name: 'Light Cardio', duration: '15 min', icon: '💪' },
  ];

  const meals = [
    { type: 'Breakfast', meal: 'Oatmeal with fruits', icon: '🥣' },
    { type: 'Lunch', meal: 'Grilled fish with vegetables', icon: '🐟' },
    { type: 'Dinner', meal: 'Brown rice with chicken', icon: '🍚' },
  ];

  const tips = [
    { type: 'do', text: 'Drink 2L water daily' },
    { type: 'do', text: 'Take medication on time' },
    { type: 'dont', text: 'Skip breakfast' },
    { type: 'dont', text: 'Consume excess salt' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFD700] to-yellow-400 px-6 pt-8 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-gray-700">{greeting},</p>
            <h1 className="text-2xl font-bold text-gray-900">
              {patientData?.full_name?.split(' ')[0] || 'User'}
            </h1>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-xl">👤</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-1">Tailored guidance based on your medical history</p>
      </div>

      {/* Scrollable Content */}
      <div className="px-4 py-6 space-y-4">
        
        {/* Emergency Access Card */}
        <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-red-700 flex items-center gap-2">
              <Fingerprint className="w-5 h-5" />
              Emergency Access
            </h2>
          </div>
          <p className="text-sm text-red-600 mb-3">
            Quick fingerprint access for emergency situations
          </p>
          <button 
            onClick={() => navigate('/emergency-access')}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Enable Emergency Mode
          </button>
        </div>

        {/* Exercise Plan Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-lg font-bold text-gray-900">Recommended Exercises</h2>
          </div>
          <div className="space-y-3">
            {exercises.map((ex, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ex.icon}</span>
                  <span className="font-medium text-gray-800">{ex.name}</span>
                </div>
                <span className="text-sm text-gray-600 font-semibold">{ex.duration}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-[#FFD700] text-gray-900 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition">
            Start Workout
          </button>
        </div>

        {/* Diet Plan Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Apple className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900">Diet Plan</h2>
          </div>
          <div className="space-y-3">
            {meals.map((meal, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-2xl">{meal.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800">{meal.type}</p>
                  <p className="text-sm text-gray-600">{meal.meal}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
            View Full Diet Plan
          </button>
        </div>

        {/* Daily Health Tips Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Daily Health Tips</h2>
          <div className="space-y-2">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                {tip.type === 'do' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-800">
                  <span className="font-semibold">{tip.type === 'do' ? 'Do:' : "Don't:"}</span> {tip.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tests Card */}
        <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Next Check-Up</h2>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <p className="text-sm text-gray-600">Blood Pressure Check</p>
            <p className="text-lg font-bold text-gray-900 mt-1">January 15, 2025</p>
            <p className="text-sm text-blue-600 mt-2">📍 MOUAU Health Center</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 flex gap-3">
        <button 
          onClick={() => navigate('/patient-record/' + localStorage.getItem('patientId'))}
          className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition"
        >
          <FileText className="w-4 h-4" />
          Medical Summary
        </button>
        <button 
          onClick={() => window.location.href = 'tel:+2349123297491'}
          className="flex-1 bg-[#FFD700] text-gray-900 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
        >
          <Phone className="w-4 h-4" />
          Contact Doctor
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, Calendar, Phone, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HealthCoach = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [patientData, setPatientData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/patient-login');
      return;
    }

    const { data: patient } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (patient) {
      setPatientData(patient);
      generateRecommendations(patient);
    }
  };

  const generateRecommendations = (patient: any) => {
    const age = new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear();
    
    const exercises = [
      { name: "Brisk Walking", sets: "3 sets", duration: "30 mins", icon: "🚶" },
      { name: "Light Stretching", sets: "2 sets", duration: "10 mins", icon: "🧘" },
      { name: "Chair Squats", sets: "3 sets", duration: "15 reps", icon: "💪" },
    ];

    const diet = [
      { meal: "Breakfast", food: "Oatmeal with Fruits", icon: "🥣" },
      { meal: "Lunch", food: "Grilled Chicken Salad", icon: "🥗" },
      { meal: "Dinner", food: "Fish with Steamed Vegetables", icon: "🐟" },
    ];

    const tips = [
      { text: "Drink 8 glasses of water", type: "positive", icon: "✓" },
      { text: "Monitor blood pressure", type: "positive", icon: "✓" },
      { text: "Avoid sugary drinks", type: "negative", icon: "✗" },
      { text: "Limit salt intake", type: "negative", icon: "✗" },
    ];

    setRecommendations({ exercises, diet, tips });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/patient-dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-medical-dark">Your Health Coach</h1>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Greeting */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Good Morning, {patientData?.first_name || 'Patient'}</h2>
          <p className="text-sm text-gray-600 mt-1">Tailored guidance based on your medical history</p>
        </div>

        {/* Recommended Exercises */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Exercises</h3>
          <div className="space-y-3">
            {recommendations?.exercises.map((exercise: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{exercise.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{exercise.name}</p>
                    <p className="text-xs text-gray-600">{exercise.sets}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-medical-green">{exercise.duration}</span>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
            Start Workout
          </Button>
        </Card>

        {/* Today's Diet Plan */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Diet Plan</h3>
          <div className="space-y-3">
            {recommendations?.diet.map((meal: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">{meal.icon}</span>
                <div>
                  <p className="text-xs text-gray-600">{meal.meal}</p>
                  <p className="font-semibold text-gray-900">{meal.food}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 border-yellow-400 text-gray-900 hover:bg-yellow-50">
            View Full Diet Plan
          </Button>
        </Card>

        {/* Daily Health Tips */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Health Tips</h3>
          <div className="space-y-2">
            {recommendations?.tips.map((tip: any, idx: number) => (
              <div 
                key={idx} 
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  tip.type === 'positive' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <span className={`text-sm font-bold ${
                  tip.type === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {tip.icon}
                </span>
                <p className={`text-sm ${
                  tip.type === 'positive' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Reminders */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Reminders</h3>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-8 w-8 text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Annual Check-Up</p>
              <p className="text-xs text-gray-600">15th October 2024</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/patient-dashboard")}>
            <FileText className="h-4 w-4" />
            Medical Summary
          </Button>
          <Button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900">
            <Phone className="h-4 w-4" />
            Contact Doctor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthCoach;

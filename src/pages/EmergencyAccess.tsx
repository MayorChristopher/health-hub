import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, AlertTriangle, Phone, MapPin, Heart } from 'lucide-react';

export default function EmergencyAccess() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleFingerprintScan = () => {
    setScanning(true);
    
    // Simulate fingerprint scan (in production, use Web Authentication API)
    setTimeout(() => {
      setScanning(false);
      setVerified(true);
    }, 2000);
  };

  const emergencyContacts = [
    { name: 'Emergency Hotline', number: '112', icon: '🚨' },
    { name: 'MOUAU Health Center', number: '+234 912 329 7491', icon: '🏥' },
    { name: 'Ambulance Service', number: '199', icon: '🚑' },
  ];

  const nearestHospitals = [
    { name: 'MOUAU Health Center', distance: '0.5 km', time: '2 min' },
    { name: 'Federal Medical Centre Umuahia', distance: '8 km', time: '15 min' },
    { name: 'Abia State University Teaching Hospital', distance: '12 km', time: '20 min' },
  ];

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <div className="bg-red-600 px-6 pt-8 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Emergency Access</h1>
        </div>
        <p className="text-sm text-red-100">Quick access to critical medical information</p>
      </div>

      <div className="px-4 py-6 space-y-4">
        
        {/* Fingerprint Scanner */}
        {!verified ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="mb-6">
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
                scanning ? 'bg-red-100 animate-pulse' : 'bg-gray-100'
              }`}>
                <Fingerprint className={`w-20 h-20 ${scanning ? 'text-red-600' : 'text-gray-400'}`} />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {scanning ? 'Scanning...' : 'Place Your Finger'}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {scanning ? 'Verifying your identity' : 'Touch the sensor to access emergency medical records'}
            </p>
            
            {!scanning && (
              <button 
                onClick={handleFingerprintScan}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition"
              >
                Scan Fingerprint
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Verified - Show Emergency Info */}
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <h3 className="font-bold text-green-800">Identity Verified</h3>
              </div>
              <p className="text-sm text-green-700">Emergency access granted</p>
            </div>

            {/* Critical Medical Info */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-gray-900">Critical Medical Info</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-xs text-gray-600">Blood Type</p>
                  <p className="text-lg font-bold text-gray-900">O+</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-xs text-gray-600">Allergies</p>
                  <p className="text-sm font-semibold text-red-700">Penicillin, Peanuts</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-xs text-gray-600">Current Medications</p>
                  <p className="text-sm text-gray-800">Lisinopril 10mg (daily)</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-xs text-gray-600">Medical Conditions</p>
                  <p className="text-sm text-gray-800">Hypertension, Type 2 Diabetes</p>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-gray-900">Emergency Contacts</h2>
              </div>
              <div className="space-y-2">
                {emergencyContacts.map((contact, i) => (
                  <a
                    key={i}
                    href={`tel:${contact.number}`}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{contact.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.number}</p>
                      </div>
                    </div>
                    <Phone className="w-5 h-5 text-red-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nearest Hospitals */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Nearest Hospitals</h2>
              </div>
              <div className="space-y-2">
                {nearestHospitals.map((hospital, i) => (
                  <div key={i} className="p-4 bg-blue-50 rounded-xl">
                    <p className="font-semibold text-gray-900">{hospital.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">📍 {hospital.distance}</span>
                      <span className="text-sm text-gray-600">🕐 {hospital.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Back Button */}
        <button 
          onClick={() => navigate('/health-coach')}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          Back to Health Coach
        </button>
      </div>
    </div>
  );
}

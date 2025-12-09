import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileContainer from "@/components/health/MobileContainer";
import MobileHeader from "@/components/health/MobileHeader";
import HealthInput from "@/components/health/HealthInput";
import HealthButton from "@/components/health/HealthButton";
import PageTransition from "@/components/health/PageTransition";

const HospitalAccess = () => {
  const navigate = useNavigate();
  const [hospitalId, setHospitalId] = useState("");
  const [accessPin, setAccessPin] = useState("");

  const handleContinue = () => {
    if (hospitalId && accessPin) {
      navigate("/hospital-verify");
    }
  };

  return (
    <MobileContainer>
      <PageTransition>
        <MobileHeader />

        <div className="bg-card px-6 py-8 -mt-6 rounded-t-3xl relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold text-primary mb-2">Hospital Portal</h1>
            <p className="text-muted-foreground text-sm">
              Verified Medical Access Only
            </p>
          </motion.div>

          <div className="space-y-4 mb-6">
            <HealthInput
              placeholder="Hospital ID"
              value={hospitalId}
              onChange={setHospitalId}
            />
            <HealthInput
              placeholder="Access Pin"
              value={accessPin}
              onChange={setAccessPin}
              type="password"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground mb-6"
          >
            <span className="text-primary cursor-pointer hover:underline">
              Retrieve my Hospital ID & Pin
            </span>
          </motion.p>

          <HealthButton
            variant="primary"
            onClick={handleContinue}
            disabled={!hospitalId || !accessPin}
          >
            Continue
          </HealthButton>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-muted-foreground text-center mt-4"
          >
            Your identity will be verified for your protection.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-muted-foreground text-center mt-8"
          >
            By continuing you agree to HealthMR's{" "}
            <span className="text-primary underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-primary underline cursor-pointer">Privacy Policy</span>
          </motion.p>
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default HospitalAccess;
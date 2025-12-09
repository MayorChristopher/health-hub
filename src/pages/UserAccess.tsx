import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileContainer from "@/components/health/MobileContainer";
import MobileHeader from "@/components/health/MobileHeader";
import HealthInput from "@/components/health/HealthInput";
import HealthButton from "@/components/health/HealthButton";
import PageTransition from "@/components/health/PageTransition";

const UserAccess = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nin, setNin] = useState("");

  const handleContinue = () => {
    if (name && nin) {
      navigate("/verify");
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
            <h1 className="text-2xl font-bold text-primary mb-2">Welcome to HealthID</h1>
            <p className="text-muted-foreground text-sm">
              Securely access your health information
            </p>
          </motion.div>

          <div className="space-y-4 mb-6">
            <HealthInput
              placeholder="Enter Name"
              value={name}
              onChange={setName}
            />
            <HealthInput
              placeholder="Enter NIN"
              value={nin}
              onChange={setNin}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground mb-6"
          >
            <span className="text-primary cursor-pointer hover:underline">
              How can I get my NIN?
            </span>
          </motion.p>

          <HealthButton
            variant="primary"
            onClick={handleContinue}
            disabled={!name || !nin}
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
            By continuing you agree to CampusGuide+'s{" "}
            <span className="text-primary underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-primary underline cursor-pointer">Privacy Policy</span>
          </motion.p>
        </div>
      </PageTransition>
    </MobileContainer>
  );
};

export default UserAccess;
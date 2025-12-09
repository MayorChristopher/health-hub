import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileContainer from "@/components/health/MobileContainer";
import HealthLogo from "@/components/health/HealthLogo";
import HealthButton from "@/components/health/HealthButton";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="h-full flex flex-col min-h-[680px]">
        {/* Green top section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="health-gradient flex-1 flex flex-col items-center justify-center px-6"
          style={{ minHeight: "340px" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <HealthLogo variant="light" size="lg" />
          </motion.div>
        </motion.div>

        {/* White bottom section */}
        <div className="bg-card px-6 py-8 flex flex-col items-center rounded-t-3xl -mt-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-center mb-10"
          >
            Instant Access to Your Medical Life
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full space-y-3"
          >
            <HealthButton variant="primary" onClick={() => navigate("/user-access")}>
              User Access
            </HealthButton>
            <HealthButton variant="outline" onClick={() => navigate("/hospital-access")}>
              Hospital Access
            </HealthButton>
          </motion.div>

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
      </div>
    </MobileContainer>
  );
};

export default Welcome;
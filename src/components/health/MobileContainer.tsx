import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MobileContainerProps {
  children: ReactNode;
}

const MobileContainer = ({ children }: MobileContainerProps) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[380px] bg-card rounded-3xl shadow-mobile overflow-hidden relative border border-border/50"
        style={{ minHeight: "680px" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MobileContainer;
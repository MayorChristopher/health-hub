import { ReactNode } from "react";
import { motion } from "framer-motion";

interface HealthButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
}

const HealthButton = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  fullWidth = true,
  type = "button",
}: HealthButtonProps) => {
  const baseClasses =
    "py-4 px-6 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2";

  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-soft",
    outline:
      "bg-card border-2 border-primary text-primary hover:bg-primary/5 active:scale-[0.98]",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass}`}
    >
      {children}
    </motion.button>
  );
};

export default HealthButton;
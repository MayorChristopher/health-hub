import { motion } from "framer-motion";

interface HealthInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: React.ReactNode;
}

const HealthInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
}: HealthInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mobile-input ${icon ? "pl-12" : ""}`}
      />
    </motion.div>
  );
};

export default HealthInput;
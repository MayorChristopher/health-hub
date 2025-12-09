const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12"
  };

  return (
    <div className="flex items-center gap-3">
      <svg className={sizes[size]} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="15" width="15" height="10" rx="2" fill="#d4a017"/>
        <rect x="25" y="15" width="15" height="10" rx="2" fill="#d4a017"/>
        <rect x="15" y="0" width="10" height="15" rx="2" fill="#0AA15F"/>
        <rect x="15" y="25" width="10" height="15" rx="2" fill="#0AA15F"/>
        <circle cx="20" cy="20" r="6" fill="white"/>
        <path d="M20 17c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#0AA15F"/>
      </svg>
      <div>
        <h1 className="text-xl font-bold text-medical-green leading-none">HealthMR</h1>
        {size !== "sm" && <p className="text-xs text-gray-500">Medical Records</p>}
      </div>
    </div>
  );
};

export default Logo;

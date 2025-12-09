import { useLanguage } from "@/context/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-gray-600" />
      <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ig">Igbo</SelectItem>
          <SelectItem value="ha">Hausa</SelectItem>
          <SelectItem value="yo">Yoruba</SelectItem>
          <SelectItem value="pcm">Pidgin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

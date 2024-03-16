import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "lucide-react";

const ToggleTheme = () => {
  const { setTheme } = useTheme();

  return (
    <Button variant="default" size="icon">
      <SunIcon
        className="h-[1.2rem] w-[1.2rem] z-50 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme("dark")}
      />
      <MoonIcon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme("light")}
      />
    </Button>
  );
};
export default ToggleTheme;

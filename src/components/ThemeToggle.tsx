import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Link
      to="#"
      onClick={toggleTheme}
      className={cn(
        "flex items-center space-x-2 px-2 py-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      )}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span>Theme</span>
    </Link>
  );
};

export default ThemeToggle;

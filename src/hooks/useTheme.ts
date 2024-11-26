import useReactivity from "./useReactivity";
import { getCurrentTheme, setCurrentTheme } from "@/models/settings";

export const useTheme = () => {
  const theme = useReactivity(() => getCurrentTheme());
  console.log("current theme", theme);
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
  };

  return { theme, toggleTheme };
};

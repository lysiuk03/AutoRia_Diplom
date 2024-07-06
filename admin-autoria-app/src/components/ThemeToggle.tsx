import { IconMoon, IconSun } from "@tabler/icons-react";
import { useThemeProvider } from "utils/contexts/ThemeContext.tsx";

const ThemeToggle = () => {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <div>
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="sr-only"
        checked={currentTheme === "light"}
        onChange={() => changeCurrentTheme(currentTheme === "light" ? "dark" : "light")}
      />
      <label
        className="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
        htmlFor="light-switch"
      >
        <IconSun className="w-5 h-5 dark:hidden" />
        <IconMoon className="w-5 h-5 hidden dark:block" />
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
};

export default ThemeToggle;

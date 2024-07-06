import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  currentTheme: string;
  changeCurrentTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: "light",
  changeCurrentTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const persistedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState<string>(persistedTheme || "light");

  const changeCurrentTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add("[&_*]:!transition-none");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }

    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 1);

    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  return <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeProvider = () => useContext(ThemeContext);

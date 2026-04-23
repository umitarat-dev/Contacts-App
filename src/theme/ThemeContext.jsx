/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
);

  const toggleTheme = () => {
    setMode((prev) => {
        const next = prev === "light" ? "dark" : "light";
        localStorage.setItem("theme", next);
        return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#000000",
            secondary: mode === "dark" ? "#b0b0b0" : "#555555",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};


// export default ThemeContextProvider;
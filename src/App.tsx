import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const { darkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <>
      <button onClick={toggleTheme}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>

      <LandingPage />
    </>
  )
}
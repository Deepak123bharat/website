import React, { useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

// public/index.html sets data-theme before React loads (saved choice, else
// dark), so the page never flashes the wrong theme.
const currentTheme = () =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(currentTheme);
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // Storage can be blocked (e.g. private mode); the theme still applies.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`app__theme-toggle ${isDark ? "is-dark" : ""}`}
      onClick={toggleTheme}
    >
      <span className="app__theme-toggle-knob" aria-hidden="true" />
      <HiOutlineSun className="app__theme-toggle-sun" aria-hidden="true" />
      <HiOutlineMoon className="app__theme-toggle-moon" aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;

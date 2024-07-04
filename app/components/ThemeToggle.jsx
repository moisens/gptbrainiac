"use client";

import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const themes = {
  corporate: "corporate",
  dark: "dark",
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.corporate);

  const toggleTheme = () => {
    const newTheme =
      theme === themes.corporate ? themes.dark : themes.corporate;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
      {theme === "corporate" ? (
        <BsMoonFill className="w-4 h-4" />
      ) : (
        <BsSunFill className="w-4 h-4" />
      )}
    </button>
  );
};

export default ThemeToggle;

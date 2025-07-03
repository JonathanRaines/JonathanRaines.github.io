// Theme switching functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Function to set the theme
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update button text based on current theme
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☼" : "☾";
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  };

  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  // Add event listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  // Listen for system preference changes
  prefersDarkScheme.addEventListener("change", (e) => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      setTheme(e.matches ? "dark" : "light");
    }
  });
});

(function () {
  "use strict";

  var storageKey = "site-theme";
  var root = document.documentElement;

  function preferredTheme() {
    try {
      return window.localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
    } catch (error) {
      return "light";
    }
  }

  function applyTheme(theme, savePreference) {
    root.setAttribute("data-theme", theme);
    var button = document.querySelector(".theme-toggle");
    if (button) {
      var isDark = theme === "dark";
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      button.title = isDark ? "Switch to light mode" : "Switch to dark mode";
      button.querySelector(".theme-toggle__icon").textContent = isDark ? "☀" : "☾";
    }
    if (savePreference) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch (error) {
        // Keep the selected theme for this page even when storage is unavailable.
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(preferredTheme(), false);
    var button = document.querySelector(".theme-toggle");
    if (!button) return;

    button.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  });
}());

/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

/**
* Utility function to update the theme setting on the html tag
*/
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}



const themeSwitch = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
themeSwitch.checked = currentThemeSetting === "light";
updateThemeOnHtmlEl({ theme: currentThemeSetting });


themeSwitch.addEventListener("change", (event) => {
  const newTheme = themeSwitch.checked ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateThemeOnHtmlEl({ theme: newTheme });
  currentThemeSetting = newTheme;
}); 
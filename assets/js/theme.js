const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";

const themes = {
  LIGHT: "light",
  DARK: "dark",
};

initTheme();

function initTheme() {
  setTheme(savedTheme());
}

function toggleTheme() {
  const theme = getTheme();
  const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}

function savedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === themes.LIGHT || saved === themes.DARK) return saved;
  return themes.DARK;
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(value) {
  document.documentElement.setAttribute(THEME_ATTR, value);
}

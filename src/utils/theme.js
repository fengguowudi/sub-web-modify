const DARK_THEME = "dark-mode";
const LIGHT_THEME = "light-mode";
const STORAGE_KEY = "localTheme";

const setTheme = (theme) => {
  document.body.setAttribute("class", theme);
};

const getSystemTheme = () => {
  const darkMode =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  const lightMode =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)");

  if (darkMode && darkMode.matches) {
    return DARK_THEME;
  }

  if (lightMode && lightMode.matches) {
    return LIGHT_THEME;
  }

  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? DARK_THEME : LIGHT_THEME;
};

export const applyPreferredTheme = () => {
  const localTheme = window.localStorage.getItem(STORAGE_KEY);
  const theme = localTheme || getSystemTheme();
  setTheme(theme);
  return theme;
};

export const toggleTheme = () => {
  const currentTheme =
    document.body.className === DARK_THEME ? DARK_THEME : LIGHT_THEME;
  const nextTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  setTheme(nextTheme);
  window.localStorage.setItem(STORAGE_KEY, nextTheme);
  return nextTheme;
};

export const watchSystemTheme = (callback) => {
  const darkMedia =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  const lightMedia =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)");

  if (!darkMedia || !lightMedia) {
    return () => {};
  }

  const handler = (event) => {
    const localTheme = window.localStorage.getItem(STORAGE_KEY);
    if (!localTheme && event.matches) {
      callback();
    }
  };

  if (typeof darkMedia.addEventListener === "function") {
    darkMedia.addEventListener("change", handler);
    lightMedia.addEventListener("change", handler);

    return () => {
      darkMedia.removeEventListener("change", handler);
      lightMedia.removeEventListener("change", handler);
    };
  }

  darkMedia.addListener(handler);
  lightMedia.addListener(handler);

  return () => {
    darkMedia.removeListener(handler);
    lightMedia.removeListener(handler);
  };
};

/* Tiny theme switcher — runs before paint
   Themes must exist in tailwind.config daisyUI:
   - 'bbb-default' (light)
   - 'bbb-default-dark' (dark)
*/
(() => {
  try {
    const KEY = "bbb.theme";               // optional user preference key
    const saved = localStorage.getItem(KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Your DaisyUI theme ids
    // - bbb-default     : light
    // - bbb-default-dark: dark
    const theme = saved || (prefersDark ? "bbb-default-dark" : "bbb-default");

    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme.endsWith("-dark") ? "dark" : "light";
  } catch (e) {
    // non-blocking on any error
  }
})();

(function () {
  var LIGHT = 'bbb-default';
  var DARK  = 'bbb-default-dark';
  var KEY   = 'bbb.theme'; // optional user override: 'light' | 'dark' | 'system'

  function applyThemeName(name) {
    var html = document.documentElement;
    if (html.getAttribute('data-theme') !== name) {
      html.setAttribute('data-theme', name);
    }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function compute() {
    var pref = null;
    try { pref = localStorage.getItem(KEY); } catch (e) {}
    if (pref === 'light') return LIGHT;
    if (pref === 'dark')  return DARK;
    // system or null -> follow system
    return systemPrefersDark() ? DARK : LIGHT;
  }

  // initial
  applyThemeName(compute());

  // keep in sync with system when no explicit override or when 'system'
  var mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  if (mql) {
    var handler = function () {
      var pref = null;
      try { pref = localStorage.getItem(KEY); } catch (e) {}
      if (!pref || pref === 'system') applyThemeName(mql.matches ? DARK : LIGHT);
    };
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else mql.addListener(handler);
  }

  // expose a tiny API for future toggles
  window.bbbTheme = {
    set: function (mode) { // 'light' | 'dark' | 'system'
      try {
        if (mode) localStorage.setItem(KEY, mode);
        else localStorage.removeItem(KEY);
      } catch (e) {}
      applyThemeName(compute());
    },
    get: function () {
      try { return localStorage.getItem(KEY) || 'system'; } catch (e) { return 'system'; }
    }
  };
})();

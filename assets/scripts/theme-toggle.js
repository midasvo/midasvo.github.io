// Light/dark theme toggle. Without a stored choice the site follows the
// system (prefers-color-scheme). A click forces the opposite theme via
// data-theme on <html>; picking the theme the system already prefers clears
// the stored choice, so the site goes back to following the system.
// The inline script in head.html applies a stored choice before first paint.
(function () {
  var KEY = 'theme';
  // Keep in sync with --bg in _sass/_tokens.scss and the metas in head.html.
  var COLORS = { light: '#ffffff', dark: '#0f172a' };

  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function systemTheme() {
    return media && media.matches ? 'dark' : 'light';
  }

  function valid(theme) {
    return theme === 'light' || theme === 'dark' ? theme : null;
  }

  function stored() {
    try {
      return valid(localStorage.getItem(KEY));
    } catch (e) {
      return null;
    }
  }

  function store(theme) {
    try {
      if (theme) localStorage.setItem(KEY, theme);
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }

  function current() {
    return valid(root.getAttribute('data-theme')) || systemTheme();
  }

  function updateButton() {
    if (!button) return;
    var label = 'Switch to ' + (current() === 'dark' ? 'light' : 'dark') + ' theme';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }

  // forced: 'light', 'dark' or null (follow the system).
  function apply(forced) {
    if (forced) root.setAttribute('data-theme', forced);
    else root.removeAttribute('data-theme');

    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) {
      var isDarkMeta = (metas[i].getAttribute('media') || '').indexOf('dark') !== -1;
      metas[i].setAttribute('content', COLORS[forced || (isDarkMeta ? 'dark' : 'light')]);
    }
    var scheme = document.querySelector('meta[name="color-scheme"]');
    if (scheme) scheme.setAttribute('content', forced || 'light dark');

    updateButton();
  }

  if (button) {
    button.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      var forced = next === systemTheme() ? null : next;
      store(forced);
      apply(forced);
    });
  }

  // Follow live system changes. With a stored choice the page stays put, but
  // the button label still has to be right.
  if (media) {
    var onSystemChange = function () {
      apply(stored());
    };
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  // Keep other open tabs in step.
  window.addEventListener('storage', function (e) {
    if (e.key === KEY || e.key === null) apply(stored());
  });

  apply(stored());
})();

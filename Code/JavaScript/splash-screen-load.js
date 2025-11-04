window.onload = handleSplashRedirect();

async function handleSplashRedirect() {
  // Read durations from CSS custom properties, with JS fallbacks
  function readMsVar(name, fallbackMs) {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!val) return fallbackMs;
    if (val.endsWith('ms')) return parseFloat(val);
    if (val.endsWith('s')) return parseFloat(val) * 1000;
    const n = parseFloat(val); return isNaN(n) ? fallbackMs : n;
  }
  const MIN_DISPLAY_TIME = readMsVar('--splash-min-duration', 1500);
  const FADE_DURATION = readMsVar('--page-fade-duration', 800);
  const startTime = Date.now();

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Controlla se esiste il cookie rememberMe=true
  function hasRememberMeCookie() {
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .some(c => c.startsWith('rememberMe=') && c.split('=')[1] === 'true');
  }

  const hasRememberMe = hasRememberMeCookie();
  const hasSession = sessionStorage.length > 0;

  // Determina la pagina di destinazione
  const target = hasRememberMe || hasSession
    ? './pages/main-page.html'
    : './pages/login.html';

  // Attende che il tempo minimo sia trascorso
  const elapsed = Date.now() - startTime;
  if (elapsed < MIN_DISPLAY_TIME) {
    await wait(MIN_DISPLAY_TIME - elapsed);
  }

  // Fade-out dello splash
  const splash = document.getElementById('main-body');
  splash.style.transition = `opacity ${FADE_DURATION}ms ease`;
  splash.style.opacity = '0';
  await wait(FADE_DURATION);

  // Carica la nuova pagina dentro il body
  try {
    const response = await fetch(target, { cache: 'reload' });
    if (!response.ok) throw new Error('Errore nel caricamento della pagina');
    const html = await response.text();

    // Rimpiazza il contenuto del body
    document.open();
    document.write(html);
    document.close();

    // Fade-in della nuova pagina (se il CSS lo consente)
    document.body.style.opacity = '0';
    document.body.style.transition = `opacity ${FADE_DURATION}ms ease`;
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  } catch (err) {
    console.error('Errore nel caricamento della pagina:', err);
    window.location.href = target; // fallback
  }
}

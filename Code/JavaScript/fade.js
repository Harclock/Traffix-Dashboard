window.addEventListener("beforeunload", function () {
  document.body.classList.add("page-out");

  if ('startViewTransition' in document) {
    addEventListener('click', async (e) => {
      const a = e.target.closest('a');
      if (!a || a.target || a.origin !== location.origin) return;
      e.preventDefault();
      const url = a.href;
      document.startViewTransition(async () => {
        const res = await fetch(url, { cache: 'reload', credentials: 'same-origin' });
        const html = await res.text();
        document.open(); document.write(html); document.close();
      });
    }, { capture: true });
  }
});
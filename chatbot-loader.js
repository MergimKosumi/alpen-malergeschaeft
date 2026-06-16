(() => {
  if (window.__alpenEnhancementsLoaded) return;
  window.__alpenEnhancementsLoaded = true;

  if (!document.querySelector('link[href="chatbot.css"]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'chatbot.css';
    document.head.appendChild(stylesheet);
  }

  const loadScript = (src, onload) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      if (onload) onload();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    if (onload) script.addEventListener('load', onload, { once: true });
    document.head.appendChild(script);
  };

  loadScript('branding-cleanup.js', () => loadScript('chatbot.js'));
})();

(() => {
  function cleanVisibleBranding() {
    document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href.includes('webador') || href.includes('jwwb.nl')) {
        link.remove();
      }
    });

    if (!document.querySelector('link[data-alpen-favicon]')) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/svg+xml';
      favicon.href = 'favicon.svg';
      favicon.setAttribute('data-alpen-favicon', 'true');
      document.head.appendChild(favicon);
    }

    document.querySelectorAll('a, small, span, div').forEach(element => {
      if (element.children.length > 0) return;
      const text = (element.textContent || '').trim().toLowerCase();
      if (text === 'webador' || text === 'jouwweb' || text === 'powered by webador') {
        element.hidden = true;
        element.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanVisibleBranding, { once: true });
  } else {
    cleanVisibleBranding();
  }
})();

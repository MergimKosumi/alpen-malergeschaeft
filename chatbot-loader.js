(() => {
  if (window.__alpenEnhancementsLoaded) return;
  window.__alpenEnhancementsLoaded = true;

  const ensureStylesheet = (href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
  };

  const loadScript = (src, onload) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      if (onload) onload();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    if (onload) script.addEventListener("load", onload, { once: true });
    document.head.appendChild(script);
  };

  function addLogo() {
    document.body.classList.add("alpen-redesign");

    const desktopHeader = document.querySelector(".jw-header-logo");
    if (desktopHeader && !desktopHeader.querySelector(".alpen-header-mark")) {
      const image = document.createElement("img");
      image.className = "alpen-header-mark";
      image.src = "assets/brand/alpen-logo-official-mark.svg";
      image.alt = "Alpen Malergeschäft GmbH";
      desktopHeader.prepend(image);
    }

    const mobileHeader = document.querySelector(".jw-mobile-header-content");
    if (mobileHeader && !mobileHeader.querySelector(".alpen-mobile-mark")) {
      const image = document.createElement("img");
      image.className = "alpen-mobile-mark";
      image.src = "assets/brand/alpen-logo-official-mark.svg";
      image.alt = "Alpen Malergeschäft GmbH";
      mobileHeader.prepend(image);
    }
  }

  ensureStylesheet("chatbot.css");
  ensureStylesheet("alpen-redesign.css?v=20260906");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addLogo, { once: true });
  } else {
    addLogo();
  }

  setTimeout(addLogo, 500);

  loadScript("branding-cleanup.js", () => loadScript("chatbot.js"));
})();

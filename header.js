(() => {
  const stylesheet = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .find((link) => link.getAttribute("href")?.includes("styles.css"));
  if (stylesheet) {
    const stylesheetUrl = new URL(stylesheet.href, window.location.href);
    stylesheetUrl.searchParams.set("v", "20260922-6");
    stylesheet.href = stylesheetUrl.href;
  }

  const header = document.querySelector(".site-header");
  if (!header) return;

  // All pages ship the same navigation markup; do not replace it at runtime.
  const toggle = header.querySelector(".nav-toggle");
  const menu = header.querySelector(".main-nav");
  const label = header.querySelector(".hamburger");
  if (toggle && menu && label) {
    menu.id = "main-navigation";
    toggle.setAttribute("aria-controls", menu.id);
    const syncMenu = () => {
      toggle.setAttribute("aria-expanded", String(toggle.checked));
      toggle.setAttribute("aria-label", toggle.checked ? "Menü schließen" : "Menü öffnen");
    };
    toggle.addEventListener("change", syncMenu);
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) { toggle.checked = false; syncMenu(); }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.checked) {
        toggle.checked = false; syncMenu(); toggle.focus();
      }
    });
    window.matchMedia("(max-width: 1100px)").addEventListener("change", () => {
      toggle.checked = false; syncMenu();
    });
    syncMenu();
  }

  let compact = false;
  let ticking = false;

  const updateHeader = () => {
    const scrollPosition = window.scrollY;
    if (!compact && scrollPosition > 52) compact = true;
    if (compact && scrollPosition < 12) compact = false;
    header.classList.toggle("header-compact", compact);
    ticking = false;
  };

  const requestHeaderUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeader);
  };

  updateHeader();
  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
})();

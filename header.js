(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  // All pages ship the same navigation markup; do not replace it at runtime.
  const toggle = header.querySelector(".nav-toggle");
  const menu = header.querySelector(".main-nav");
  const label = header.querySelector(".hamburger");
  const serviceToggle = header.querySelector(".service-toggle");
  const serviceGroup = header.querySelector(".nav-service");
  // Highlight the current section without changing the shared navigation markup.
  const currentPath = window.location.pathname.replace(/index\.html$/, "");
  menu?.querySelectorAll("a[href]").forEach((link) => {
    const url = new URL(link.href);
    if (url.pathname === currentPath && !url.hash) link.setAttribute("aria-current", "page");
  });
  const closeServices = () => {
    serviceGroup?.classList.remove("services-open");
    serviceToggle?.setAttribute("aria-expanded", "false");
  };
  serviceToggle?.addEventListener("click", () => {
    const expanded = serviceToggle.getAttribute("aria-expanded") !== "true";
    serviceToggle.setAttribute("aria-expanded", String(expanded));
    serviceGroup.classList.toggle("services-open", expanded);
  });
  if (toggle && menu && label) {
    menu.id = "main-navigation";
    toggle.setAttribute("aria-controls", menu.id);
    const syncMenu = () => {
      if (!toggle.checked) closeServices();
      toggle.setAttribute("aria-expanded", String(toggle.checked));
      toggle.setAttribute("aria-label", toggle.checked ? "Menü schließen" : "Menü öffnen");
    };
    toggle.addEventListener("change", syncMenu);
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) { toggle.checked = false; syncMenu(); }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !toggle.checked && serviceGroup?.contains(document.activeElement)) {
        closeServices();
        serviceGroup.nextElementSibling?.focus();
      }
      if (event.key === "Escape" && toggle.checked) {
        if (serviceToggle?.getAttribute("aria-expanded") === "true") {
          closeServices(); serviceToggle.focus(); return;
        }
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

  // Content stays visible without JavaScript and with reduced motion enabled.
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!motionPreference.matches && "IntersectionObserver" in window) {
    const blocks = document.querySelectorAll(".wb-welcome-copy, .wb-welcome-contact, .wb-heading, .wb-services > a, .wb-feature > div, .wb-points > article, .wb-project-grid > a");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("wb-enter");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    blocks.forEach((block) => observer.observe(block));
    motionPreference.addEventListener("change", (event) => {
      if (event.matches) observer.disconnect();
    });
  }
})();

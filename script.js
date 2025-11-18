AOS.init();

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-item");
  const main = document.getElementById("main-content");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  // Mobile menu toggle functions
  function toggleSidebar() {
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "";
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  async function loadPage(page) {
    try {
      const res = await fetch(page);
      const html = await res.text();
      main.innerHTML = html;
      AOS.refresh(); // re-init animations
      window.scrollTo(0, 0);
      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    } catch (err) {
      main.innerHTML = `<div class="text-red-400 text-center mt-10">Error loading ${page}</div>`;
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      if (link.dataset.page) {
        loadPage(link.dataset.page);
      }
    });
  });

  // Close sidebar when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeSidebar();
    }
  });

  // Load default dashboard page
  loadPage("pages/home.html");
});

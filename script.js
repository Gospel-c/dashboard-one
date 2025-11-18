AOS.init();

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const main = document.getElementById("main-content");

  async function loadPage(page) {
    try {
      const res = await fetch(page);
      const html = await res.text();
      main.innerHTML = html;
      AOS.refresh(); // re-init animations
      window.scrollTo(0, 0);
    } catch (err) {
      main.innerHTML = `<div class="text-red-400 text-center mt-10">Error loading ${page}</div>`;
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      loadPage(link.dataset.page);
    });
  });

  // Load default dashboard page
  loadPage("pages/home.html");
});

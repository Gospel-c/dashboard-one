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

  // Initialize profile modal functionality
  function initProfileModal() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const editProfileForm = document.getElementById('editProfileForm');

    if (!editProfileBtn || !editProfileModal) return;

    function openModal() {
      editProfileModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      editProfileModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Add event listeners
    editProfileBtn.addEventListener('click', openModal);

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    editProfileModal.addEventListener('click', (e) => {
      if (e.target === editProfileModal) {
        closeModal();
      }
    });

    // Handle form submission
    if (editProfileForm) {
      editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        closeModal();
      });
    }

    // Close modal on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && editProfileModal.classList.contains('active')) {
        closeModal();
      }
    };
    document.addEventListener('keydown', escapeHandler);
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
      // Initialize profile modal if on profile page
      if (page.includes('profile.html')) {
        setTimeout(initProfileModal, 100);
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

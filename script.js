(() => {
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolioGrid');
  const searchInput = document.getElementById('searchProject');
  const viewBtns = document.querySelectorAll('.view-btn');
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');
  const yearSpan = document.getElementById('year');

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  hamburger?.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
  });
  drawerClose?.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('.drawer-menu a').forEach(a => {
    a.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    });
  });

  const THEME_KEY = 'fathan_theme';
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(THEME_KEY);
  function applyTheme(t) {
    if (t === 'light') {
      htmlRoot.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = "<i class='bx bx-moon'></i>";
    } else {
      htmlRoot.removeAttribute('data-theme');
      themeToggle.innerHTML = "<i class='bx bx-sun'></i>";
    }
  }
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  themeToggle?.addEventListener('click', () => {
    const current = htmlRoot.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
    });
  });

  function filterProjects(filter) {
    const cards = Array.from(portfolioGrid.querySelectorAll('.project-card'));
    cards.forEach(card => {
      const type = card.dataset.type || 'all';
      const show = (filter === 'all') || (type === filter);
      card.style.display = show ? '' : 'none';
    });
  }
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects(btn.dataset.filter);
    });
  });

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const cards = Array.from(portfolioGrid.querySelectorAll('.project-card'));
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      card.style.display = (title.includes(q)) ? '' : 'none';
    });
  });

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.title;
      const desc = btn.dataset.desc;
      const img = btn.dataset.img;
      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'flex';
    });
  });
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    modalImg.src = '';
  }
  modalClose?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('revealed');
        observer.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  modal?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('a, button, input, textarea');
      if (focusable.length === 0) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      alert('Form akan membuka aplikasi email. Atau gunakan email langsung: your.email@example.com');
    });
  }

  document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  const status = document.getElementById("formStatus");

  status.textContent = "Sending...";
  status.className = "form-status sending";

  setTimeout(() => {
    status.textContent = "Message sent successfully! 🎉";
    status.className = "form-status success";
  }, 1500);
});


})();

// Navigation Bar & Mobile Sandwich Menu Drawer

export function renderNavbar(activePage = 'home') {
  const header = document.getElementById('site-header');
  if (!header) return;

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'preview', label: '3D Preview', href: '#preview', badge: 'Interactive' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'about', label: 'About Craft', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18 sm:h-20">
        <!-- Logo & Brand Name -->
        <a href="#home" class="group flex items-center gap-3 py-2 transition-transform hover:scale-[1.02]">
          <div class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-wood flex items-center justify-center shadow-md border-2 border-wood-light group-hover:rotate-6 transition-transform overflow-hidden p-1">
            <img src="/assets/Logo_basic_white.png" alt="PetEmbro Logo" class="w-full h-full object-contain drop-shadow-sm" />
          </div>
          <div class="flex flex-col">
            <span class="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-wood-dark group-hover:text-terracotta transition-colors">
              PetEmbro<span class="text-terracotta">.</span>
            </span>
            <span class="text-[10px] sm:text-[11px] uppercase tracking-widest text-stone-500 font-medium -mt-1">
              Handcrafted Portraits
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center space-x-1 lg:space-x-3">
          ${navLinks.map(link => {
            const isActive = activePage === link.id;
            return `
              <a href="${link.href}" 
                class="relative px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-terracotta-dark font-semibold bg-terracotta/10 shadow-sm' 
                    : 'text-stone-700 hover:text-wood-dark hover:bg-linen-200/70'
                }">
                ${link.label}
                ${link.badge ? `<span class="text-[10px] font-bold uppercase tracking-wider bg-terracotta text-white px-2 py-0.5 rounded-full animate-pulse">${link.badge}</span>` : ''}
                ${isActive ? `<span class="absolute bottom-1 left-3 right-3 h-[2px] bg-terracotta rounded-full"></span>` : ''}
              </a>
            `;
          }).join('')}
        </nav>

        <!-- Right Side: Sandwich Menu Button -->
        <div class="flex items-center gap-3">
          <!-- Sandwich / Hamburger Button (Upper Right Corner) -->
          <button id="sandwich-menu-btn" aria-label="Open Navigation Menu" class="p-2.5 rounded-xl bg-linen-200 hover:bg-linen-300 text-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/50">
            <svg id="hamburger-icon" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  renderDrawer(navLinks, activePage);
  bindDrawerEvents();
}

function renderDrawer(navLinks, activePage) {
  const drawerContainer = document.getElementById('drawer-menu-container');
  if (!drawerContainer) return;

  drawerContainer.innerHTML = `
    <!-- Backdrop overlay -->
    <div id="drawer-backdrop" class="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300"></div>

    <!-- Slide-out Drawer from Right -->
    <aside id="drawer-sidebar" class="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-linen-100 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-out border-l border-linen-300 flex flex-col justify-between overflow-y-auto">
      <div>
        <!-- Drawer Header -->
        <div class="p-5 flex items-center justify-between border-b border-linen-300 bg-linen-200/50">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-wood flex items-center justify-center shadow border-2 border-wood-light overflow-hidden p-1">
              <img src="/assets/Logo_basic_white.png" alt="PetEmbro Logo" class="w-full h-full object-contain" />
            </div>
            <span class="font-serif text-xl font-bold text-wood-dark">PetEmbro</span>
          </div>
          <button id="drawer-close-btn" aria-label="Close Navigation Menu" class="p-2 rounded-lg hover:bg-linen-300 text-stone-700 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Stitch separator line -->
        <div class="h-1 w-full stitch-line"></div>

        <!-- Navigation Links -->
        <div class="px-4 py-6 space-y-2">
          ${navLinks.map(link => {
            const isActive = activePage === link.id;
            return `
              <a href="${link.href}" class="drawer-nav-item flex items-center justify-between px-4 py-3 rounded-xl font-medium text-base transition-all ${
                isActive 
                  ? 'bg-terracotta text-white font-semibold shadow' 
                  : 'text-stone-700 hover:bg-linen-200 hover:text-wood-dark'
              }">
                <div class="flex items-center gap-3">
                  <span class="w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-terracotta'}"></span>
                  <span>${link.label}</span>
                </div>
                ${link.badge ? `<span class="text-xs bg-white text-terracotta font-bold px-2 py-0.5 rounded-full">${link.badge}</span>` : ''}
              </a>
            `;
          }).join('')}
        </div>

        <!-- Quick 3D Preview Highlight in Drawer -->
        <div class="mx-4 p-4 rounded-2xl bg-linen-200 border stitch-border-dashed text-center">
          <p class="font-serif font-semibold text-stone-800 text-base mb-1">Check on a Real Photo</p>
          <p class="text-xs text-stone-600 mb-3">Upload your pet's photo and preview it live on our 3D wooden keychain hoop!</p>
          <a href="#preview" class="drawer-nav-item inline-flex items-center justify-center w-full py-2.5 px-4 bg-terracotta text-white rounded-full font-medium text-sm hover:bg-terracotta-dark transition shadow">
            Launch 3D Customizer
          </a>
        </div>
      </div>

      <!-- Drawer Footer with Contact & Socials -->
      <div class="p-5 border-t border-linen-300 bg-linen-200/40">
        <p class="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Connect with PetEmbro</p>
        <div class="flex items-center gap-3 mb-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-linen-300/80 hover:bg-terracotta hover:text-white flex items-center justify-center transition-colors text-stone-700" title="Instagram">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-linen-300/80 hover:bg-terracotta hover:text-white flex items-center justify-center transition-colors text-stone-700" title="TikTok">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.27-.27.5-.57.7-.89V9.58a8.28 8.28 0 0 0 5.03 1.68v-3.4c-.001-.39-.001-.78 0-1.17z"/></svg>
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-linen-300/80 hover:bg-terracotta hover:text-white flex items-center justify-center transition-colors text-stone-700" title="Pinterest">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.03-.94-.06-2.39.05-3.42l1.24-5.26s-.31-.63-.31-1.57c0-1.47.85-2.57 1.91-2.57.9 0 1.34.68 1.34 1.49 0 .91-.58 2.27-.88 3.53-.25 1.06.53 1.92 1.58 1.92 1.89 0 3.35-2 3.35-4.88 0-2.55-1.83-4.34-4.45-4.34-3.03 0-4.81 2.28-4.81 4.63 0 .92.35 1.9.79 2.43.09.11.1.2.07.31l-.29 1.19c-.05.19-.16.23-.37.14-1.37-.64-2.22-2.64-2.22-4.25 0-3.46 2.52-6.64 7.27-6.64 3.82 0 6.78 2.72 6.78 6.35 0 3.79-2.39 6.84-5.71 6.84-1.12 0-2.17-.58-2.53-1.26l-.69 2.62c-.25.96-.92 2.16-1.37 2.9A12 12 0 1 0 12 0z"/></svg>
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-linen-300/80 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-stone-700" title="WhatsApp Direct">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.3-1.68 1.35-.45.05-1.02.07-3.32-.88-2.78-1.15-4.57-3.97-4.71-4.16-.14-.19-1.14-1.52-1.14-2.89s.73-2.05.99-2.33c.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.3.49-.15.17-.31.39-.45.52-.15.15-.31.32-.13.62.17.3 1.05 1.73 2.25 2.8 1.55 1.38 2.86 1.8 3.26 2 .4.2.64.17.88-.1.24-.28 1.03-1.2 1.3-1.62.28-.41.55-.35.93-.21.38.14 2.42 1.14 2.83 1.35.41.21.68.31.78.48.1.18.1.98-.14 1.66z"/></svg>
          </a>
        </div>
        <p class="text-[11px] text-stone-500">© 2026 PetEmbro. Handcrafted with love.</p>
      </div>
    </aside>
  `;
}

function bindDrawerEvents() {
  const sandwichBtn = document.getElementById('sandwich-menu-btn');
  const drawerSidebar = document.getElementById('drawer-sidebar');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    drawerSidebar?.classList.remove('translate-x-full');
    drawerBackdrop?.classList.remove('pointer-events-none');
    drawerBackdrop?.classList.add('opacity-100');
    document.body.classList.add('overflow-hidden');
  }

  function closeDrawer() {
    drawerSidebar?.classList.add('translate-x-full');
    drawerBackdrop?.classList.remove('opacity-100');
    drawerBackdrop?.classList.add('pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  }

  sandwichBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-nav-item').forEach(item => {
    item.addEventListener('click', closeDrawer);
  });
}

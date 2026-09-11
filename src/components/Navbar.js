// Navigation Bar & Mobile Sandwich Menu Drawer

import { getSiteContent, getSocialLinks } from '../services/contentStore.js';
import { getSocialIconSvg } from '../utils/socialIcons.js';

export function renderNavbar(activePage = 'home') {
  const header = document.getElementById('site-header');
  if (!header) return;

  const content = getSiteContent();

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'preview', label: '3D Preview', href: '#preview', badge: 'Interactive' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'about', label: 'About Craft', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  header.innerHTML = `
    <!-- Top Running Stitch Accent Border with Solid Linen Background -->
    <div class="h-1.5 w-full stitch-line"></div>

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
            <span data-content-key="brand.tagline" class="text-[10px] sm:text-[11px] uppercase tracking-widest text-stone-500 font-medium -mt-1">
              ${content.brand.tagline}
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

  renderDrawer(navLinks, activePage, content);
  bindDrawerEvents();
}

function renderDrawer(navLinks, activePage, content) {
  const drawerContainer = document.getElementById('drawer-menu-container');
  if (!drawerContainer) return;

  const socials = (content && content.socials) ? content.socials : {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    pinterest: 'https://pinterest.com',
    whatsapp: 'https://wa.me/'
  };

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
        <div class="flex items-center flex-wrap gap-2.5 mb-4" data-socials-group>
          ${getSocialLinks().map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-linen-300/80 hover:bg-terracotta hover:text-white flex items-center justify-center transition-colors text-stone-700" title="${link.label || link.platform}">
              ${getSocialIconSvg(link.platform)}
            </a>
          `).join('')}
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

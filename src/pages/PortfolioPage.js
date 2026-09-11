// Portfolio / Gallery Page with Featured Header and Lightbox Modal
import { getSiteContent, getRandomFeaturedArtwork } from '../services/contentStore.js';

export function renderPortfolioPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const content = getSiteContent();
  const portfolioItems = content.portfolioItems && content.portfolioItems.length > 0
    ? content.portfolioItems
    : [];

  const featuredData = getRandomFeaturedArtwork();
  const featuredItem = featuredData.item;

  root.innerHTML = `
    <div class="min-h-screen bg-linen-weave py-8 sm:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Top Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-widest mb-2">
            <span class="w-2 h-2 rounded-full bg-terracotta"></span>
            Handcrafted Gallery
          </div>
          <h1 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Client Keepsake Portfolio
          </h1>
          <p class="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Explore our finished handcrafted embroidery works. Click on any piece to view high-resolution details and stitch specifications.
          </p>
        </div>

        ${featuredItem ? `
        <!-- FEATURED HERO SHOWCASE (Large Header Image) -->
        <div class="bg-linen-100 rounded-3xl p-6 sm:p-10 shadow-xl border stitch-border-dashed mb-16 overflow-hidden" data-portfolio-id="${featuredItem.id}">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <!-- Large Main Showcase Image -->
            <div class="lg:col-span-7 relative group cursor-pointer portfolio-thumbnail" data-item-id="${featuredItem.id}">
              <div class="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-linen-200 relative">
                <img src="${featuredItem.image}" alt="${featuredItem.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="px-4 py-2 rounded-full bg-white/90 text-stone-900 font-semibold text-xs shadow">Click to view full size</span>
                </div>
              </div>
              <div class="absolute top-4 left-4 bg-wood-dark text-linen-100 px-3 py-1 rounded-full text-xs font-semibold shadow">
                Featured Artwork
              </div>
            </div>

            <!-- Showcase Information -->
            <div class="lg:col-span-5 space-y-4">
              <div class="inline-flex items-center gap-2 text-xs font-bold text-wood-medium uppercase tracking-wider">
                ${featuredItem.categoryLabel || 'Miniature Keepsake'}
              </div>
              <h2 class="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                ${featuredItem.name}
              </h2>
              <p class="text-sm font-semibold text-terracotta">
                ${featuredItem.additionalInfo || featuredItem.breed || ''}
              </p>
              <p class="text-stone-600 text-sm leading-relaxed">
                ${featuredItem.caption}
              </p>

              <div class="grid grid-cols-2 gap-4 py-4 border-y border-linen-300 text-xs">
                <div>
                  <span class="text-stone-500 block uppercase">Dimensions</span>
                  <span class="font-semibold text-stone-800">${featuredItem.size}</span>
                </div>
                <div>
                  <span class="text-stone-500 block uppercase">Stitch Time</span>
                  <span class="font-semibold text-stone-800">${featuredItem.hours}</span>
                </div>
              </div>

              <div class="flex items-center gap-3 pt-2">
                <a href="#preview" class="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs sm:text-sm shadow transition">
                  Preview Your Pet in 3D
                </a>
                <button class="portfolio-thumbnail px-5 py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-800 font-medium text-xs sm:text-sm transition" data-item-id="${featuredItem.id}">
                  Enlarge Photo
                </button>
              </div>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- CATEGORY FILTER TABS -->
        <div class="flex items-center justify-center flex-wrap gap-2 mb-10" id="filter-tabs">
          <button data-filter="all" class="filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-wood-dark text-white shadow-sm transition">All Pieces</button>
          <button data-filter="keychains" class="filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-linen-200 text-stone-700 hover:bg-linen-300 transition">Keychains</button>
          <button data-filter="dogs" class="filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-linen-200 text-stone-700 hover:bg-linen-300 transition">Dogs</button>
          <button data-filter="cats" class="filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-linen-200 text-stone-700 hover:bg-linen-300 transition">Cats</button>
          <button data-filter="special" class="filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-linen-200 text-stone-700 hover:bg-linen-300 transition">Small Pets & Bunnies</button>
          <button data-filter="memorial" class="filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-linen-200 text-stone-700 hover:bg-linen-300 transition">Memorials</button>
          <button data-filter="others" class="filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-linen-200 text-stone-700 hover:bg-linen-300 transition">Others</button>
        </div>

        <!-- GALLERY GRID OF SMALLER IMAGES (Click to enlarge in Lightbox) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="portfolio-grid">
          ${portfolioItems.map(item => `
            <div class="portfolio-card bg-linen-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-linen-300 group flex flex-col justify-between" data-category="${item.category}" data-portfolio-id="${item.id}">
              <!-- Clickable Image for Lightbox -->
              <div class="portfolio-thumbnail relative aspect-square overflow-hidden cursor-pointer bg-linen-200" data-item-id="${item.id}">
                <img src="${item.image}" alt="${item.name} embroidery" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div class="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
                  </span>
                </div>
                <div class="absolute bottom-2 left-2 bg-stone-900/70 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-medium">
                  ${item.categoryLabel}
                </div>
                ${item.featured ? `
                  <div class="absolute top-2 right-2 bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full text-[10px] font-bold shadow flex items-center gap-1 z-10" title="Featured in header showcase rotation">
                    <span>★</span> Featured
                  </div>
                ` : ''}
              </div>

              <!-- Card Details -->
              <div class="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <h3 class="font-serif font-bold text-stone-900 text-base group-hover:text-terracotta transition-colors">${item.name}</h3>
                    <span class="text-xs text-stone-500">${item.size}</span>
                  </div>
                  <p class="text-xs text-terracotta font-medium mb-2">${item.additionalInfo || item.breed || ''}</p>
                  <p class="text-xs text-stone-600 line-clamp-2">${item.caption}</p>
                </div>
                <div class="mt-3 pt-2 border-t border-linen-300 flex items-center justify-between text-[11px] text-stone-500">
                  <span>⏱ ${item.hours}</span>
                  <button class="portfolio-thumbnail text-terracotta font-semibold hover:underline" data-item-id="${item.id}">
                    Enlarge Photo →
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    </div>
  `;

  bindPortfolioEvents(portfolioItems);
}

function bindPortfolioEvents(portfolioItems) {
  // 1. Lightbox Handler
  document.querySelectorAll('.portfolio-thumbnail').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.itemId, 10);
      const item = portfolioItems.find(p => p.id === id);
      if (item) {
        openLightbox(item);
      }
    });
  });

  // 2. Category Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = 'filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-linen-200 text-stone-700 hover:bg-linen-300 transition';
      });
      btn.className = 'filter-tab-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-wood-dark text-white shadow-sm transition';

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

function openLightbox(item) {
  const container = document.getElementById('lightbox-container');
  if (!container) return;

  container.innerHTML = `
    <div id="lightbox-backdrop" class="fixed inset-0 z-50 bg-stone-900/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 opacity-0 transition-opacity duration-300">
      <div class="relative max-w-4xl w-full bg-linen-100 rounded-3xl overflow-hidden shadow-2xl border border-linen-300 flex flex-col md:flex-row transform scale-95 transition-transform duration-300" id="lightbox-panel">
        <!-- Close Button -->
        <button id="lightbox-close-btn" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white flex items-center justify-center transition">
          ✕
        </button>

        <!-- Big Image Display -->
        <div class="md:w-3/5 bg-black flex items-center justify-center overflow-hidden max-h-[70vh]">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain" />
        </div>

        <!-- Information Sidebar -->
        <div class="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-linen-100">
          <div>
            <span class="text-xs font-bold text-terracotta uppercase tracking-wider">${item.categoryLabel}</span>
            <h2 class="font-serif text-3xl font-bold text-stone-900 mt-1">${item.name}</h2>
            <p class="text-sm font-medium text-stone-600 mb-4">${item.additionalInfo || item.breed || ''}</p>
            <p class="text-stone-700 text-sm leading-relaxed mb-6">${item.caption}</p>

            <div class="bg-linen-200/60 p-4 rounded-2xl border border-linen-300 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-stone-500">Hoop Dimensions:</span>
                <span class="font-semibold text-stone-800">${item.size}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-500">Stitch Time:</span>
                <span class="font-semibold text-stone-800">${item.hours}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-500">Fabric:</span>
                <span class="font-semibold text-stone-800">100% Organic Linen</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-500">Thread:</span>
                <span class="font-semibold text-stone-800">DMC Stranded Cotton</span>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-linen-300 flex flex-col gap-2">
            <a href="#preview" class="w-full py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm text-center shadow transition">
              Preview Your Pet in 3D
            </a>
            <a href="#contact" class="w-full py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-800 font-medium text-xs text-center border border-linen-300 transition">
              Commission Similar Piece
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  const backdrop = document.getElementById('lightbox-backdrop');
  const panel = document.getElementById('lightbox-panel');
  const closeBtn = document.getElementById('lightbox-close-btn');

  setTimeout(() => {
    backdrop?.classList.remove('opacity-0');
    panel?.classList.remove('scale-95');
  }, 20);

  function close() {
    backdrop?.classList.add('opacity-0');
    panel?.classList.add('scale-95');
    setTimeout(() => {
      container.innerHTML = '';
    }, 250);
  }

  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
}

// Visual Site Customizer Engine for PetEmbro
// Enables in-place text editing, portfolio CRUD, social links modal, export & reset

import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { playPageStitchAnimation } from './components/StitchAnimation.js';

import { renderHomePage } from './pages/HomePage.js';
import { renderPreviewPage } from './pages/PreviewPage.js';
import { renderPortfolioPage } from './pages/PortfolioPage.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderContactPage } from './pages/ContactPage.js';

import {
  getSiteContent,
  updateContentField,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  reorderPortfolioItems,
  getCommissionCategories,
  saveCommissionCategories,
  addCommissionCategory,
  deleteCommissionCategory,
  updateCommissionCategory,
  getFaqs,
  addFaq,
  deleteFaq,
  updateFaq,
  getSocialLinks,
  saveSocialLinks,
  addSocialLink,
  deleteSocialLink,
  resetSiteContent,
  exportContentFile
} from './services/contentStore.js';

import { SOCIAL_PLATFORMS, getSocialIconSvg } from './utils/socialIcons.js';

class PetEmbroCustomizer {
  constructor() {
    this.currentRoute = 'home';
    this.init();
  }

  init() {
    // 1. Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());

    // 2. Initial route resolution
    this.handleRoute();

    // 3. Render footer
    renderFooter();

    // 4. Setup top toolbar buttons
    this.bindToolbarEvents();

    // 5. Setup tip dismiss
    document.getElementById('btn-close-tip')?.addEventListener('click', () => {
      document.getElementById('customizer-tip')?.remove();
    });

    // 6. Listen for footer edit socials button
    document.addEventListener('click', (e) => {
      if (e.target.closest('#footer-edit-socials-btn') || e.target.closest('.customizer-socials-trigger')) {
        e.preventDefault();
        this.openSocialsModal();
      }
      if (e.target.closest('.btn-manage-commission-categories') || e.target.closest('#btn-customizer-categories')) {
        e.preventDefault();
        this.openCommissionCategoriesModal();
      }
    });
  }

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validRoutes = ['home', 'preview', 'portfolio', 'about', 'contact'];
    const route = validRoutes.includes(hash) ? hash : 'home';
    this.currentRoute = route;

    // Update active nav button in customizer top bar
    document.querySelectorAll('.customizer-nav-btn').forEach(btn => {
      if (btn.dataset.route === route) {
        btn.className = 'customizer-nav-btn px-2.5 py-1 rounded-lg bg-terracotta text-white font-semibold transition';
      } else {
        btn.className = 'customizer-nav-btn px-2.5 py-1 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition';
      }
    });

    // 1. Render Navigation Bar
    renderNavbar(route);

    // 2. Play page transition
    playPageStitchAnimation(route);

    // 3. Render page
    switch (route) {
      case 'home':
        renderHomePage();
        break;
      case 'preview':
        renderPreviewPage();
        break;
      case 'portfolio':
        renderPortfolioPage();
        break;
      case 'about':
        renderAboutPage();
        break;
      case 'contact':
        renderContactPage();
        break;
      default:
        renderHomePage();
    }

    // 4. Apply customizer hooks (contenteditable, image replacers, edit overlays, etc.)
    setTimeout(() => {
      this.applyTextEditableBindings();
      this.applyImageReplacerBindings();
      if (route === 'portfolio') {
        this.injectPortfolioEditorControls();
      }
      if (route === 'about') {
        this.injectAboutFaqControls();
      }
    }, 50);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Hook all [data-image-key] elements with interactive hover replace button
  applyImageReplacerBindings() {
    const images = document.querySelectorAll('[data-image-key]');
    images.forEach(img => {
      const parent = img.parentElement;
      if (!parent || parent.querySelector('.customizer-img-badge')) return;

      // Ensure parent has relative positioning
      if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }

      const imgKey = img.dataset.imageKey;
      const badge = document.createElement('label');
      badge.className = 'customizer-img-badge absolute top-3 right-3 z-30 px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-terracotta text-white text-[11px] font-semibold shadow-xl border border-linen-300/40 cursor-pointer flex items-center gap-1.5 transition transform hover:scale-105';
      badge.innerHTML = `
        <span>📷</span>
        <span>Replace Photo</span>
        <input type="file" accept="image/*" class="hidden customizer-inline-img-input" data-img-key="${imgKey}" />
      `;

      parent.appendChild(badge);

      const fileInput = badge.querySelector('.customizer-inline-img-input');
      fileInput?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          updateContentField(imgKey, reader.result);
          img.src = reader.result;
          this.showToast(`Updated image for "${imgKey}"`);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  // Hook all [data-content-key] elements with contenteditable and auto-save
  applyTextEditableBindings() {
    const editables = document.querySelectorAll('[data-content-key]');
    editables.forEach(el => {
      el.contentEditable = 'true';
      el.spellcheck = false;
      el.classList.add('customizer-editable');

      // Title hint
      const key = el.dataset.contentKey;
      el.title = `Click to edit (${key})`;

      // Save on blur
      el.onblur = () => {
        const newVal = el.innerText.trim();
        updateContentField(key, newVal);
        this.showToast(`Saved "${key}"`);
      };

      // Prevent navigating if user clicks on an editable link
      el.onclick = (e) => {
        if (el.tagName === 'A') {
          e.preventDefault();
        }
      };
    });
  }

  // Portfolio additions: "+ Add Portfolio Item" & card action overlays
  injectPortfolioEditorControls() {
    const content = getSiteContent();
    const items = content.portfolioItems || [];

    // 1. Inject "+ Add Artwork" bar above category filter or gallery
    const filterTabs = document.getElementById('filter-tabs');
    if (filterTabs && !document.getElementById('customizer-add-artwork-bar')) {
      const addBar = document.createElement('div');
      addBar.id = 'customizer-add-artwork-bar';
      addBar.className = 'flex flex-col items-center gap-2 mb-8';
      addBar.innerHTML = `
        <button id="btn-add-portfolio-item" class="px-6 py-3 rounded-full bg-wood-dark hover:bg-wood text-white font-semibold text-sm shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-wood-light">
          <span class="text-lg">➕</span>
          <span>Add New Portfolio Artwork</span>
        </button>
        <p class="text-xs text-stone-600 flex items-center gap-1.5 bg-linen-200/80 px-3 py-1 rounded-full border border-linen-300">
          <span class="text-stone-400 font-mono font-bold">⠿</span> Drag and drop cards to reorder your portfolio gallery
        </p>
      `;
      filterTabs.parentNode.insertBefore(addBar, filterTabs);

      document.getElementById('btn-add-portfolio-item')?.addEventListener('click', () => {
        this.openPortfolioModal();
      });
    }

    // 2. Inject action overlays on all grid cards
    document.querySelectorAll('.portfolio-card').forEach(card => {
      const itemId = parseInt(card.dataset.portfolioId, 10);
      if (!itemId || card.querySelector('.customizer-card-actions')) return;

      const item = items.find(p => p.id === itemId);
      if (!item) return;

      const actions = document.createElement('div');
      actions.className = 'customizer-card-actions flex items-center justify-between gap-1 p-2 bg-stone-900/95 backdrop-blur text-white text-[11px] border-b border-linen-300 select-none';
      actions.innerHTML = `
        <button class="px-2 py-1 rounded ${item.featured ? 'bg-amber-600 hover:bg-amber-500 text-white font-bold' : 'bg-stone-800 hover:bg-stone-700 text-stone-300'} transition flex items-center gap-1 btn-toggle-featured flex-shrink-0" data-item-id="${itemId}" title="${item.featured ? 'Marked as Featured in Header Showcase (Click to unfeature)' : 'Click to feature in Header Showcase'}">
          <span>${item.featured ? '★ Featured' : '☆ Feature'}</span>
        </button>
        <div class="flex items-center gap-1 flex-shrink-0">
          <label class="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer transition flex items-center gap-1" title="Replace photo">
            <span>📷</span>
            <span class="hidden sm:inline">Photo</span>
            <input type="file" accept="image/*" class="hidden customizer-replace-photo-input" data-item-id="${itemId}">
          </label>
          <button class="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition flex items-center gap-1 btn-edit-portfolio" data-item-id="${itemId}" title="Edit text and specifications">
            <span>✏️</span>
            <span class="hidden sm:inline">Edit</span>
          </button>
          <button class="px-2 py-1 rounded bg-red-900/80 hover:bg-red-800 text-white transition flex items-center gap-1 btn-delete-portfolio" data-item-id="${itemId}" title="Delete artwork">
            <span>🗑️</span>
          </button>
        </div>
      `;

      card.prepend(actions);

      // Drag and drop setup for easy reordering
      card.setAttribute('draggable', 'true');
      card.classList.add('transition-all', 'duration-200');

      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', String(itemId));
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('opacity-40', 'border-dashed', 'border-terracotta');
        window._customizerDraggingId = itemId;
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('opacity-40', 'border-dashed', 'border-terracotta');
        document.querySelectorAll('.portfolio-card').forEach(c => {
          c.classList.remove('ring-4', 'ring-terracotta/60', 'scale-[1.02]');
        });
        window._customizerDraggingId = null;
      });

      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (window._customizerDraggingId && window._customizerDraggingId !== itemId) {
          card.classList.add('ring-4', 'ring-terracotta/60', 'scale-[1.02]');
        }
      });

      card.addEventListener('dragleave', () => {
        card.classList.remove('ring-4', 'ring-terracotta/60', 'scale-[1.02]');
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('ring-4', 'ring-terracotta/60', 'scale-[1.02]');
        const sourceId = parseInt(e.dataTransfer.getData('text/plain') || window._customizerDraggingId, 10);
        if (sourceId && sourceId !== itemId) {
          const success = reorderPortfolioItems(sourceId, itemId);
          if (success) {
            this.showToast(`Updated portfolio gallery order!`);
            this.handleRoute();
          }
        }
      });

      // Handle 1-click featured toggle
      actions.querySelector('.btn-toggle-featured')?.addEventListener('click', () => {
        const newFeatured = !item.featured;
        updatePortfolioItem(itemId, { featured: newFeatured });
        this.showToast(newFeatured ? `⭐ "${item.name}" added to Featured Showcase rotation!` : `Removed "${item.name}" from showcase rotation.`);
        this.handleRoute();
      });

      // Handle file replacement
      const fileInput = actions.querySelector('.customizer-replace-photo-input');
      fileInput?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          updatePortfolioItem(itemId, { image: reader.result });
          this.showToast(`Updated photo for "${item.name}"`);
          this.handleRoute();
        };
        reader.readAsDataURL(file);
      });

      // Handle edit
      actions.querySelector('.btn-edit-portfolio')?.addEventListener('click', () => {
        this.openPortfolioModal(item);
      });

      // Handle delete
      actions.querySelector('.btn-delete-portfolio')?.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete "${item.name}" from your portfolio?`)) {
          deletePortfolioItem(itemId);
          this.showToast(`Deleted "${item.name}"`);
          this.handleRoute();
        }
      });
    });
  }

  // Modal for adding or editing a portfolio item
  openPortfolioModal(existingItem = null) {
    const isEdit = Boolean(existingItem);
    const container = document.getElementById('customizer-modal-container');
    if (!container) return;

    container.innerHTML = `
      <div id="portfolio-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-linen-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-6">
            <h3 class="font-serif text-2xl font-bold text-stone-900">
              ${isEdit ? 'Edit Portfolio Artwork' : 'Add New Portfolio Artwork'}
            </h3>
            <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
          </div>

          <form id="portfolio-item-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Name *</label>
              <input type="text" name="name" required value="${existingItem?.name || ''}" placeholder="e.g. Buster" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Additional Info *</label>
                <input type="text" name="additionalInfo" value="${existingItem?.additionalInfo || existingItem?.breed || ''}" placeholder="e.g. French Bulldog, Memorial, or Custom Details" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
              </div>
              <div>
                <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Category *</label>
                <select name="category" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none">
                  <option value="keychains" ${existingItem?.category === 'keychains' ? 'selected' : ''}>Keychains</option>
                  <option value="dogs" ${existingItem?.category === 'dogs' ? 'selected' : ''}>Dogs</option>
                  <option value="cats" ${existingItem?.category === 'cats' ? 'selected' : ''}>Cats</option>
                  <option value="special" ${existingItem?.category === 'special' ? 'selected' : ''}>Small Pets & Bunnies</option>
                  <option value="memorial" ${existingItem?.category === 'memorial' ? 'selected' : ''}>Memorials</option>
                  <option value="others" ${existingItem?.category === 'others' ? 'selected' : ''}>Others</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Dimensions *</label>
                <input type="text" name="size" value="${existingItem?.size || '1.8" Beechwood Hoop'}" placeholder='e.g. 1.8" Beechwood Hoop' class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
              </div>
              <div>
                <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Stitch Time *</label>
                <input type="text" name="hours" value="${existingItem?.hours || '14 Hours'}" placeholder="e.g. 14 Hours" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
              </div>
            </div>

            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Artwork Photo</label>
              <div class="flex items-center gap-3">
                <input type="file" id="modal-photo-file" accept="image/*" class="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-terracotta file:text-white hover:file:bg-terracotta-dark" />
              </div>
              <p class="text-[11px] text-stone-500 mt-1">Or provide image URL:</p>
              <input type="text" id="modal-photo-url" name="image" value="${existingItem?.image || ''}" placeholder="https://... or /assets/..." class="w-full px-3.5 py-2 rounded-xl bg-white border border-linen-300 text-stone-900 text-xs focus:ring-2 focus:ring-terracotta/40 outline-none mt-1" />
            </div>

            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Description / Caption *</label>
              <textarea name="caption" rows="3" required placeholder="Describe the thread colors, stitches, and pet details..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none">${existingItem?.caption || ''}</textarea>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <input type="checkbox" id="modal-featured-checkbox" name="featured" ${existingItem?.featured ? 'checked' : ''} class="w-4 h-4 rounded text-terracotta focus:ring-terracotta" />
              <label for="modal-featured-checkbox" class="font-medium text-stone-800">Set as Featured Artwork in Header Showcase</label>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-linen-300">
              <button type="button" id="modal-cancel-btn" class="px-5 py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 font-semibold text-xs transition">Cancel</button>
              <button type="submit" class="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs shadow transition">
                ${isEdit ? 'Save Changes' : 'Add to Portfolio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const form = document.getElementById('portfolio-item-form');
    const photoFileInput = document.getElementById('modal-photo-file');
    const photoUrlInput = document.getElementById('modal-photo-url');

    // Handle file selection preview into URL field
    photoFileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          photoUrlInput.value = reader.result;
        };
        reader.readAsDataURL(file);
      }
    });

    const closeModal = () => { container.innerHTML = ''; };
    document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
    document.getElementById('modal-cancel-btn')?.addEventListener('click', closeModal);

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const cat = formData.get('category');
      const catLabels = {
        keychains: 'Miniature Keychain',
        dogs: 'Wall Hoop (Dogs)',
        cats: 'Wall Hoop (Cats)',
        special: 'Wall Hoop (Small Pets)',
        memorial: 'Memorial Keepsake',
        others: 'Other Creations'
      };

      const addInfo = formData.get('additionalInfo') || '';
      const itemData = {
        name: formData.get('name'),
        breed: addInfo,
        additionalInfo: addInfo,
        category: cat,
        categoryLabel: catLabels[cat] || 'Handcrafted Keepsake',
        size: formData.get('size'),
        hours: formData.get('hours'),
        image: photoUrlInput.value.trim() || '/assets/keychain_ref.png',
        caption: formData.get('caption'),
        featured: formData.get('featured') === 'on'
      };

      if (isEdit) {
        updatePortfolioItem(existingItem.id, itemData);
        this.showToast(`Updated "${itemData.name}"`);
      } else {
        addPortfolioItem(itemData);
        this.showToast(`Added "${itemData.name}" to portfolio`);
      }

      closeModal();
      this.handleRoute();
    });
  }

  // Social Links Modal with full CRUD (Add, Edit, Remove)
  openSocialsModal() {
    const container = document.getElementById('customizer-modal-container');
    if (!container) return;

    const renderModalContent = () => {
      const links = getSocialLinks();
      const content = getSiteContent();
      const contact = content.contact || {};

      container.innerHTML = `
        <div id="socials-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-linen-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-5">
              <div>
                <h3 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <span>🔗</span> Manage Social Media Links
                </h3>
                <p class="text-xs text-stone-600 mt-0.5">Add, remove, or edit your social profiles. Updates appear in Navbar & Footer instantly.</p>
              </div>
              <button id="socials-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
            </div>

            <!-- Current Links List -->
            <div class="space-y-3 mb-6">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700">Active Social Profiles (${links.length})</p>
              ${links.length === 0 ? `
                <div class="p-4 rounded-xl bg-linen-200 text-center text-xs text-stone-600">
                  No social profiles active. Add one below!
                </div>
              ` : links.map((link, idx) => `
                <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-linen-300 shadow-sm" data-social-index="${idx}">
                  <div class="w-9 h-9 rounded-xl bg-linen-200 text-stone-800 flex items-center justify-center flex-shrink-0">
                    ${getSocialIconSvg(link.platform)}
                  </div>
                  <div class="flex-grow">
                    <span class="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-1">${link.label || link.platform}</span>
                    <input type="url" class="social-url-input w-full px-3 py-1.5 rounded-lg bg-linen-50 border border-linen-300 text-stone-900 text-xs focus:ring-2 focus:ring-terracotta/40 outline-none" value="${link.url}" placeholder="https://..." data-link-id="${link.id}" />
                  </div>
                  <button type="button" class="btn-remove-social p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition flex-shrink-0" data-link-id="${link.id}" title="Remove this social link">
                    🗑️
                  </button>
                </div>
              `).join('')}
            </div>

            <!-- Add New Social Link Form -->
            <div class="p-4 rounded-2xl bg-linen-200/80 border border-linen-300 mb-6 space-y-3">
              <p class="text-xs font-bold uppercase tracking-wider text-wood-dark flex items-center gap-1.5">
                <span>➕</span> Add New Social Network
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select id="new-social-platform" class="px-3 py-2 rounded-xl bg-white border border-linen-300 text-xs text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none">
                  ${SOCIAL_PLATFORMS.map(p => `
                    <option value="${p.id}" data-default-url="${p.defaultUrl}">${p.label}</option>
                  `).join('')}
                </select>
                <div class="sm:col-span-2 flex gap-2">
                  <input type="url" id="new-social-url" placeholder="https://..." class="flex-grow px-3 py-2 rounded-xl bg-white border border-linen-300 text-xs text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none" />
                  <button type="button" id="btn-add-social-submit" class="px-4 py-2 rounded-xl bg-wood-dark hover:bg-wood text-white font-semibold text-xs shadow transition flex-shrink-0">
                    Add
                  </button>
                </div>
              </div>
            </div>

            <!-- WhatsApp Direct Information -->
            <div class="pt-4 border-t border-linen-300 mb-6 space-y-3">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700">WhatsApp Contact</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="block font-medium text-stone-600 mb-1">Display Phone Number</label>
                  <input type="text" id="social-whatsapp-phone" value="${contact.whatsapp || ''}" placeholder="+1 (555) 382-7638" class="w-full px-3 py-2 rounded-xl bg-white border border-linen-300 text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none" />
                </div>
                <div>
                  <label class="block font-medium text-stone-600 mb-1">WhatsApp Chat URL</label>
                  <input type="url" id="social-whatsapp-url" value="${contact.whatsappUrl || ''}" placeholder="https://wa.me/..." class="w-full px-3 py-2 rounded-xl bg-white border border-linen-300 text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none" />
                </div>
              </div>
            </div>

            <!-- Modal Action Buttons -->
            <div class="pt-4 flex items-center justify-end gap-3 border-t border-linen-300">
              <button type="button" id="socials-cancel-btn" class="px-5 py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 font-semibold text-xs transition">Close</button>
              <button type="button" id="socials-save-btn" class="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs shadow transition">Save All Changes</button>
            </div>
          </div>
        </div>
      `;

      // Set default URL for selected platform
      const selectEl = document.getElementById('new-social-platform');
      const urlInput = document.getElementById('new-social-url');
      if (selectEl && urlInput) {
        urlInput.value = selectEl.options[selectEl.selectedIndex]?.dataset.defaultUrl || 'https://';
        selectEl.onchange = () => {
          urlInput.value = selectEl.options[selectEl.selectedIndex]?.dataset.defaultUrl || 'https://';
        };
      }

      // Close handlers
      const closeModal = () => { container.innerHTML = ''; };
      document.getElementById('socials-close-btn')?.addEventListener('click', closeModal);
      document.getElementById('socials-cancel-btn')?.addEventListener('click', closeModal);

      // Handle adding new social link
      document.getElementById('btn-add-social-submit')?.addEventListener('click', () => {
        const platform = selectEl.value;
        const selectedOption = selectEl.options[selectEl.selectedIndex];
        const label = selectedOption.text;
        const url = urlInput.value.trim() || 'https://';

        addSocialLink({ platform, label, url });
        this.showToast(`Added ${label}`);
        renderNavbar(this.currentRoute);
        renderFooter();
        if (this.currentRoute === 'contact') renderContactPage();
        renderModalContent();
      });

      // Handle removing a link
      document.querySelectorAll('.btn-remove-social').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.linkId;
          deleteSocialLink(id);
          this.showToast('Removed social link');
          renderNavbar(this.currentRoute);
          renderFooter();
          if (this.currentRoute === 'contact') renderContactPage();
          renderModalContent();
        });
      });

      // Handle Save All Changes
      document.getElementById('socials-save-btn')?.addEventListener('click', () => {
        // Gather updated URLs
        const currentLinks = getSocialLinks();
        document.querySelectorAll('.social-url-input').forEach(inp => {
          const id = inp.dataset.linkId;
          const found = currentLinks.find(l => l.id === id);
          if (found) {
            found.url = inp.value.trim();
          }
        });
        saveSocialLinks(currentLinks);

        // Update WhatsApp details
        const waPhone = document.getElementById('social-whatsapp-phone')?.value.trim();
        const waUrl = document.getElementById('social-whatsapp-url')?.value.trim();
        if (waPhone !== undefined) updateContentField('contact.whatsapp', waPhone);
        if (waUrl !== undefined) updateContentField('contact.whatsappUrl', waUrl);

        this.showToast('All social links saved successfully');
        closeModal();
        renderNavbar(this.currentRoute);
        renderFooter();
        if (this.currentRoute === 'contact') this.handleRoute();
      });
    };

    renderModalContent();
  }

  // Commission Categories Modal (Add, Edit, Remove products in the inquiry form)
  openCommissionCategoriesModal() {
    const container = document.getElementById('customizer-modal-container');
    if (!container) return;

    const renderModalContent = () => {
      const categories = getCommissionCategories();

      container.innerHTML = `
        <div id="categories-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-linen-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-5">
              <div>
                <h3 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <span>🛍️</span> Commission Products & Categories
                </h3>
                <p class="text-xs text-stone-600 mt-0.5">Customize the product formats and options clients select when commissioning an artwork.</p>
              </div>
              <button id="categories-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
            </div>

            <!-- Existing Categories List -->
            <div class="space-y-2.5 mb-6">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700">Active Form Options (${categories.length})</p>
              ${categories.length === 0 ? `
                <div class="p-4 rounded-xl bg-linen-200 text-center text-xs text-stone-600">
                  No categories currently set. Add your first product below!
                </div>
              ` : categories.map((cat, idx) => `
                <div class="flex items-center gap-2 p-2 rounded-2xl bg-white border border-linen-300 shadow-sm" data-category-id="${cat.id}">
                  <span class="w-6 h-6 rounded-full bg-linen-200 text-stone-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0">${idx + 1}</span>
                  <input type="text" class="category-edit-input flex-grow text-xs font-medium text-stone-900 bg-transparent outline-none focus:ring-1 focus:ring-terracotta rounded px-2 py-1" value="${cat.label}" data-category-id="${cat.id}" placeholder="Product name..." />
                  <button type="button" class="btn-delete-category p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 text-sm transition" data-category-id="${cat.id}" title="Remove this option">
                    🗑️
                  </button>
                </div>
              `).join('')}
            </div>

            <!-- Add New Category Form -->
            <div class="p-4 rounded-2xl bg-linen-200/80 border border-linen-300 mb-6">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">➕ Add New Category / Product</p>
              <form id="add-category-form" class="flex gap-2">
                <input type="text" id="new-category-input" required placeholder="e.g. Embroidered Denim Jacket, Tote Bag, etc." class="flex-grow px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-xs focus:ring-2 focus:ring-terracotta/40 outline-none" />
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs transition shadow flex-shrink-0">
                  Add
                </button>
              </form>
            </div>

            <!-- Footer / Done Button -->
            <div class="pt-4 border-t border-linen-300 flex items-center justify-between">
              <span class="text-[11px] text-stone-500">Auto-saves to inquiry dropdown</span>
              <button id="categories-done-btn" class="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-terracotta text-white font-semibold text-xs shadow transition">
                Done & Apply Changes
              </button>
            </div>
          </div>
        </div>
      `;

      // Close handlers
      const closeModal = () => {
        container.innerHTML = '';
        this.handleRoute(); // re-render to update dropdowns in view
      };
      document.getElementById('categories-close-btn')?.addEventListener('click', closeModal);
      document.getElementById('categories-done-btn')?.addEventListener('click', closeModal);

      // Add category
      document.getElementById('add-category-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('new-category-input');
        const val = input?.value.trim();
        if (val) {
          addCommissionCategory(val);
          this.showToast(`Added "${val}" to commission products!`);
          renderModalContent();
        }
      });

      // Edit category inline
      container.querySelectorAll('.category-edit-input').forEach(inp => {
        inp.addEventListener('change', (e) => {
          const id = e.target.dataset.categoryId;
          const val = e.target.value.trim();
          if (val) {
            updateCommissionCategory(id, val);
            this.showToast(`Updated product name`);
          }
        });
      });

      // Delete category
      container.querySelectorAll('.btn-delete-category').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.categoryId;
          deleteCommissionCategory(id);
          this.showToast(`Removed product category`);
          renderModalContent();
        });
      });
    };

    renderModalContent();
  }

  // Inject controls for FAQ section on About page
  injectAboutFaqControls() {
    // 1. Hook the "+ Add FAQ" button in the FAQ section header
    const addBtn = document.getElementById('btn-add-faq');
    if (addBtn && !addBtn.dataset.bound) {
      addBtn.dataset.bound = 'true';
      addBtn.addEventListener('click', () => {
        this.openFaqModal();
      });
    }

    // 2. Hook in-place contenteditable on question and answer texts
    document.querySelectorAll('.faq-question-text, .faq-answer-text').forEach(el => {
      el.contentEditable = 'true';
      el.spellcheck = false;
      el.classList.add('customizer-editable');
      const field = el.dataset.faqField;
      const faqId = el.dataset.faqId;
      el.title = `Click to edit ${field}`;

      el.onblur = () => {
        const newVal = el.innerText.trim();
        if (newVal) {
          updateFaq(faqId, field, newVal);
          this.showToast(`Updated FAQ ${field}`);
        }
      };
    });

    // 3. Hook edit button on each FAQ card
    document.querySelectorAll('.btn-edit-faq').forEach(btn => {
      btn.addEventListener('click', () => {
        const faqId = btn.dataset.faqId;
        const faqs = getFaqs();
        const faq = faqs.find(f => String(f.id) === String(faqId));
        if (faq) {
          this.openFaqModal(faq);
        }
      });
    });

    // 4. Hook delete button on each FAQ card
    document.querySelectorAll('.btn-delete-faq').forEach(btn => {
      btn.addEventListener('click', () => {
        const faqId = btn.dataset.faqId;
        const faqs = getFaqs();
        const faq = faqs.find(f => String(f.id) === String(faqId));
        const preview = faq ? faq.question : 'this FAQ';
        if (confirm(`Are you sure you want to delete "${preview}"?`)) {
          deleteFaq(faqId);
          this.showToast(`Deleted FAQ`);
          this.handleRoute();
        }
      });
    });
  }

  // Modal for adding or editing a single FAQ
  openFaqModal(existingFaq = null) {
    const isEdit = Boolean(existingFaq);
    const container = document.getElementById('customizer-modal-container');
    if (!container) return;

    container.innerHTML = `
      <div id="faq-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-linen-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-6">
            <h3 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
              <span>❓</span> ${isEdit ? 'Edit FAQ' : 'Add New FAQ'}
            </h3>
            <button id="faq-modal-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
          </div>

          <form id="faq-item-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Question *</label>
              <input type="text" name="question" required value="${existingFaq?.question || ''}" placeholder="e.g. Can you embroider two pets on one hoop?" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
            </div>

            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Answer *</label>
              <textarea name="answer" rows="4" required placeholder="Write the helpful response here..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none leading-relaxed">${existingFaq?.answer || ''}</textarea>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-linen-300">
              <button type="button" id="faq-modal-cancel-btn" class="px-5 py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 font-semibold text-xs transition">Cancel</button>
              <button type="submit" class="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs shadow transition">${isEdit ? 'Save Changes' : 'Add FAQ'}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeModal = () => { container.innerHTML = ''; };
    document.getElementById('faq-modal-close-btn')?.addEventListener('click', closeModal);
    document.getElementById('faq-modal-cancel-btn')?.addEventListener('click', closeModal);

    document.getElementById('faq-item-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const question = form.question.value.trim();
      const answer = form.answer.value.trim();

      if (!question || !answer) return;

      if (isEdit) {
        updateFaq(existingFaq.id, 'question', question);
        updateFaq(existingFaq.id, 'answer', answer);
        this.showToast('FAQ updated successfully!');
      } else {
        addFaq(question, answer);
        this.showToast('Added new FAQ item!');
      }

      closeModal();
      this.handleRoute();
    });
  }

  // Manage all FAQs modal (triggered from top toolbar button ❓ FAQs)
  openFaqManagerModal() {
    const container = document.getElementById('customizer-modal-container');
    if (!container) return;

    const renderModalContent = () => {
      const faqs = getFaqs();

      container.innerHTML = `
        <div id="faqs-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-linen-100 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-5">
              <div>
                <h3 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <span>❓</span> Manage All FAQs
                </h3>
                <p class="text-xs text-stone-600 mt-0.5">Add, edit, or remove questions in your Keepsake Care Guide & FAQ section.</p>
              </div>
              <button id="faqs-mgr-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
            </div>

            <!-- Existing FAQs List -->
            <div class="space-y-3 mb-6">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700">Current Questions (${faqs.length})</p>
              ${faqs.length === 0 ? `
                <div class="p-4 rounded-xl bg-linen-200 text-center text-xs text-stone-600">
                  No FAQs currently added. Create your first question below!
                </div>
              ` : faqs.map((faq, idx) => `
                <div class="p-3.5 rounded-2xl bg-white border border-linen-300 shadow-sm space-y-2" data-faq-id="${faq.id}">
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-center gap-2 flex-grow">
                      <span class="w-5 h-5 rounded-full bg-linen-200 text-stone-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">${idx + 1}</span>
                      <input type="text" class="faq-mgr-question flex-grow text-xs font-bold text-stone-900 bg-transparent outline-none focus:ring-1 focus:ring-terracotta rounded px-2 py-0.5" value="${faq.question}" data-faq-id="${faq.id}" placeholder="Question..." />
                    </div>
                    <button type="button" class="btn-delete-faq-mgr p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 text-sm transition flex-shrink-0" data-faq-id="${faq.id}" title="Remove this FAQ">
                      🗑️
                    </button>
                  </div>
                  <textarea class="faq-mgr-answer w-full text-xs text-stone-600 bg-linen-50 border border-linen-200 rounded-xl p-2 outline-none focus:ring-1 focus:ring-terracotta resize-none" rows="2" data-faq-id="${faq.id}" placeholder="Answer...">${faq.answer}</textarea>
                </div>
              `).join('')}
            </div>

            <!-- Add New FAQ Quick Form -->
            <div class="p-4 rounded-2xl bg-linen-200/80 border border-linen-300 mb-6 space-y-2.5">
              <p class="text-xs font-bold uppercase tracking-wider text-wood-dark flex items-center gap-1.5">
                <span>➕</span> Add New Question
              </p>
              <form id="faq-mgr-add-form" class="space-y-2">
                <input type="text" id="new-faq-q" required placeholder="Question (e.g. Can you ship internationally?)" class="w-full px-3 py-2 rounded-xl bg-white border border-linen-300 text-xs text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none" />
                <textarea id="new-faq-a" required placeholder="Answer details..." rows="2" class="w-full px-3 py-2 rounded-xl bg-white border border-linen-300 text-xs text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none"></textarea>
                <div class="flex justify-end">
                  <button type="submit" class="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs transition shadow">
                    Add FAQ
                  </button>
                </div>
              </form>
            </div>

            <!-- Footer / Done Button -->
            <div class="pt-4 border-t border-linen-300 flex items-center justify-between">
              <span class="text-[11px] text-stone-500">Auto-saves to About & Care guide</span>
              <button id="faqs-mgr-done-btn" class="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-terracotta text-white font-semibold text-xs shadow transition">
                Done & Close
              </button>
            </div>
          </div>
        </div>
      `;

      const closeModal = () => {
        container.innerHTML = '';
        this.handleRoute();
      };
      document.getElementById('faqs-mgr-close-btn')?.addEventListener('click', closeModal);
      document.getElementById('faqs-mgr-done-btn')?.addEventListener('click', closeModal);

      // Add FAQ
      document.getElementById('faq-mgr-add-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const qInput = document.getElementById('new-faq-q');
        const aInput = document.getElementById('new-faq-a');
        const q = qInput?.value.trim();
        const a = aInput?.value.trim();
        if (q && a) {
          addFaq(q, a);
          this.showToast(`Added new FAQ!`);
          renderModalContent();
        }
      });

      // Update question on change
      container.querySelectorAll('.faq-mgr-question').forEach(inp => {
        inp.addEventListener('change', (e) => {
          const id = e.target.dataset.faqId;
          const val = e.target.value.trim();
          if (val) {
            updateFaq(id, 'question', val);
            this.showToast(`Updated FAQ question`);
          }
        });
      });

      // Update answer on change
      container.querySelectorAll('.faq-mgr-answer').forEach(inp => {
        inp.addEventListener('change', (e) => {
          const id = e.target.dataset.faqId;
          const val = e.target.value.trim();
          if (val) {
            updateFaq(id, 'answer', val);
            this.showToast(`Updated FAQ answer`);
          }
        });
      });

      // Delete FAQ
      container.querySelectorAll('.btn-delete-faq-mgr').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.faqId;
          deleteFaq(id);
          this.showToast(`Removed FAQ`);
          renderModalContent();
        });
      });
    };

    renderModalContent();
  }

  // Setup toolbar handlers
  bindToolbarEvents() {
    // 1. Edit Socials
    document.getElementById('btn-edit-socials')?.addEventListener('click', () => {
      this.openSocialsModal();
    });

    // 2. Edit Categories / Products
    document.getElementById('btn-customizer-categories')?.addEventListener('click', () => {
      this.openCommissionCategoriesModal();
    });

    // 3. Manage FAQs
    document.getElementById('btn-customizer-faqs')?.addEventListener('click', () => {
      this.openFaqManagerModal();
    });

    // 4. Export JSON
    document.getElementById('btn-export-content')?.addEventListener('click', () => {
      exportContentFile();
      this.showToast('Downloaded siteContent.json');
    });

    // 5. Reset Defaults
    document.getElementById('btn-reset-content')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all content, texts, and portfolio artworks back to defaults?')) {
        resetSiteContent();
        this.showToast('Reset all content to defaults');
        this.handleRoute();
        renderFooter();
      }
    });
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-stone-900 text-linen-100 px-4 py-2.5 rounded-2xl shadow-2xl border border-stone-700 text-xs flex items-center gap-2.5 transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto';
    toast.innerHTML = `
      <span class="text-emerald-400 text-sm">✓</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 30);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Initialize Customizer on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new PetEmbroCustomizer();
});

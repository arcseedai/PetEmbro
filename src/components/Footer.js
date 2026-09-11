import { getSiteContent } from '../services/contentStore.js';

export function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const content = getSiteContent();
  const brand = content.brand || {};
  const contact = content.contact || {};
  const socials = content.socials || {};

  footer.innerHTML = `
    <!-- Top Running Stitch Accent -->
    <div class="h-1 w-full stitch-line"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Col 1: Brand & Philosophy -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-wood flex items-center justify-center shadow border-2 border-wood-light overflow-hidden p-1">
              <img src="/assets/Logo_basic_white.png" alt="PetEmbro Logo" class="w-full h-full object-contain" />
            </div>
            <span class="font-serif text-2xl font-bold text-wood-dark tracking-tight" data-content-key="brand.name">${brand.name || 'PetEmbro'}</span>
          </div>
          <p class="text-stone-600 text-sm leading-relaxed" data-content-key="brand.description">
            ${brand.description || 'Preserving the spirit, eyes, and warmth of your beloved companion through miniature single-strand cotton embroidery hoops and keychains.'}
          </p>
          <div class="flex items-center gap-2 text-xs font-semibold text-terracotta uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
            Accepting custom commissions
          </div>
        </div>

        <!-- Col 2: Navigation & Quick Links -->
        <div class="space-y-3">
          <h4 class="font-serif font-bold text-stone-900 text-lg">Explore</h4>
          <ul class="space-y-2 text-sm text-stone-600">
            <li><a href="#home" class="hover:text-terracotta transition-colors flex items-center gap-2"><span class="text-terracotta">›</span> Home & Craft Story</a></li>
            <li><a href="#preview" class="hover:text-terracotta transition-colors flex items-center gap-2"><span class="text-terracotta">›</span> 3D Keepsake Previewer</a></li>
            <li><a href="#portfolio" class="hover:text-terracotta transition-colors flex items-center gap-2"><span class="text-terracotta">›</span> Client Portfolio & Gallery</a></li>
            <li><a href="#about" class="hover:text-terracotta transition-colors flex items-center gap-2"><span class="text-terracotta">›</span> The Artisan's Journey</a></li>
            <li><a href="#contact" class="hover:text-terracotta transition-colors flex items-center gap-2"><span class="text-terracotta">›</span> Commissions & Inquiries</a></li>
          </ul>
        </div>

        <!-- Col 3: Direct Contact Information -->
        <div class="space-y-3">
          <h4 class="font-serif font-bold text-stone-900 text-lg">Direct Contact</h4>
          <div class="space-y-2.5 text-sm text-stone-600">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="font-medium text-stone-800">Email Studio</p>
                <a href="mailto:${contact.email || 'orders@petembro.com'}" class="hover:text-terracotta transition" data-content-key="contact.email">${contact.email || 'orders@petembro.com'}</a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.3-1.68 1.35-.45.05-1.02.07-3.32-.88-2.78-1.15-4.57-3.97-4.71-4.16-.14-.19-1.14-1.52-1.14-2.89s.73-2.05.99-2.33c.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.19-.15.31-.3.49-.15.17-.31.39-.45.52-.15.15-.31.32-.13.62.17.3 1.05 1.73 2.25 2.8 1.55 1.38 2.86 1.8 3.26 2 .4.2.64.17.88-.1.24-.28 1.03-1.2 1.3-1.62.28-.41.55-.35.93-.21.38.14 2.42 1.14 2.83 1.35.41.21.68.31.78.48.1.18.1.98-.14 1.66z"/>
              </svg>
              <div>
                <p class="font-medium text-stone-800">WhatsApp Chat</p>
                <a href="${socials.whatsapp || 'https://wa.me/'}" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-700 transition" data-content-key="contact.whatsapp">${contact.whatsapp || '+1 (555) 382-7638'}</a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-wood-medium flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-medium text-stone-800">Studio Location</p>
                <p class="text-stone-500" data-content-key="contact.location">${contact.location || 'Handmade & shipped worldwide with tracked delivery.'}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 4: Follow Along & Socials -->
        <div class="space-y-4">
          <h4 class="font-serif font-bold text-stone-900 text-lg">Social Media</h4>
          <p class="text-sm text-stone-600">Watch behind-the-scenes stitching time-lapses and new customer reveals daily!</p>
          <div class="flex items-center gap-2.5">
            <a href="${socials.instagram || 'https://instagram.com'}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-100 hover:bg-terracotta hover:text-white flex items-center justify-center text-stone-700 transition shadow-sm hover:shadow active:scale-95" title="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="${socials.tiktok || 'https://tiktok.com'}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-100 hover:bg-stone-900 hover:text-white flex items-center justify-center text-stone-700 transition shadow-sm hover:shadow active:scale-95" title="TikTok">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.27-.27.5-.57.7-.89V9.58a8.28 8.28 0 0 0 5.03 1.68v-3.4c-.001-.39-.001-.78 0-1.17z"/></svg>
            </a>
            <a href="${socials.pinterest || 'https://pinterest.com'}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-100 hover:bg-red-700 hover:text-white flex items-center justify-center text-stone-700 transition shadow-sm hover:shadow active:scale-95" title="Pinterest">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.03-.94-.06-2.39.05-3.42l1.24-5.26s-.31-.63-.31-1.57c0-1.47.85-2.57 1.91-2.57.9 0 1.34.68 1.34 1.49 0 .91-.58 2.27-.88 3.53-.25 1.06.53 1.92 1.58 1.92 1.89 0 3.35-2 3.35-4.88 0-2.55-1.83-4.34-4.45-4.34-3.03 0-4.81 2.28-4.81 4.63 0 .92.35 1.9.79 2.43.09.11.1.2.07.31l-.29 1.19c-.05.19-.16.23-.37.14-1.37-.64-2.22-2.64-2.22-4.25 0-3.46 2.52-6.64 7.27-6.64 3.82 0 6.78 2.72 6.78 6.35 0 3.79-2.39 6.84-5.71 6.84-1.12 0-2.17-.58-2.53-1.26l-.69 2.62c-.25.96-.92 2.16-1.37 2.9A12 12 0 1 0 12 0z"/></svg>
            </a>
            <a href="${socials.facebook || 'https://facebook.com'}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-stone-700 transition shadow-sm hover:shadow active:scale-95" title="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <p class="text-xs text-stone-500 italic">Follow @petembro_crafts on social media</p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-6 border-t border-linen-300 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <p>© 2026 PetEmbro Studios. All rights reserved. Handcrafted custom miniature embroidery.</p>
        <div class="flex items-center gap-6">
          <a href="#about" class="hover:text-terracotta transition">Care Guide</a>
          <a href="#contact" class="hover:text-terracotta transition">Privacy & Commission Terms</a>
          <a href="#preview" class="text-terracotta font-medium hover:underline">Launch 3D Previewer</a>
        </div>
      </div>
    </div>
  `;
}

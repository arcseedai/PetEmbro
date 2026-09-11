import { getSiteContent, getSocialLinks } from '../services/contentStore.js';
import { getSocialIconSvg } from '../utils/socialIcons.js';

export function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const content = getSiteContent();
  const brand = content.brand || {};
  const contact = content.contact || {};
  const footerContent = content.footer || {};
  const socialLinks = getSocialLinks();

  footer.innerHTML = `
    <!-- Top Running Stitch Accent -->
    <div class="h-1 w-full stitch-line"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Col 1: Brand & Philosophy -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-wood flex items-center justify-center shadow border-2 border-wood-light overflow-hidden p-1">
              <img src="./assets/Logo_basic_white.png" alt="PetEmbro Logo" class="w-full h-full object-contain" />
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
                <a href="${contact.whatsappUrl || 'https://wa.me/'}" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-700 transition" data-content-key="contact.whatsapp">${contact.whatsapp || '+1 (555) 382-7638'}</a>
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
        <div class="space-y-4" id="footer-social-col">
          <div class="flex items-center justify-between">
            <h4 class="font-serif font-bold text-stone-900 text-lg" data-content-key="footer.socialTitle">${footerContent.socialTitle || 'Social Media'}</h4>
            <button id="footer-edit-socials-btn" class="customizer-socials-trigger text-[11px] px-2.5 py-1 rounded-lg bg-linen-300 hover:bg-terracotta hover:text-white text-stone-700 transition font-medium flex items-center gap-1 shadow-sm" title="Edit, add, or remove social media links">
              <span>✏️</span> Edit
            </button>
          </div>
          <p class="text-sm text-stone-600" data-content-key="footer.socialDesc">${footerContent.socialDesc || 'Watch behind-the-scenes stitching time-lapses and new customer reveals daily!'}</p>
          
          <!-- Dynamic Social Icons -->
          <div class="flex items-center flex-wrap gap-2.5" id="footer-social-icons-row">
            ${socialLinks.map(link => `
              <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-100 hover:bg-terracotta hover:text-white flex items-center justify-center text-stone-700 transition shadow-sm hover:shadow active:scale-95" title="${link.label || link.platform}">
                ${getSocialIconSvg(link.platform)}
              </a>
            `).join('')}
          </div>
          
          <p class="text-xs text-stone-500 italic" data-content-key="footer.socialHandle">${footerContent.socialHandle || 'Follow @petembro_crafts on social media'}</p>
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

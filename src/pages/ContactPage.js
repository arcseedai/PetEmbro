// Contact & Commission Inquiries Page
import { getSiteContent } from '../services/contentStore.js';

export function renderContactPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const content = getSiteContent();
  const contact = content.contact || {};
  const socials = content.socials || {};

  root.innerHTML = `
    <div class="min-h-screen bg-linen-weave py-8 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-widest mb-2">
            <span class="w-2 h-2 rounded-full bg-terracotta"></span>
            <span data-content-key="contact.badge">${contact.badge || 'Direct Inquiries'}</span>
          </div>
          <h1 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight" data-content-key="contact.headline">
            ${contact.headline || "Let's Talk About Your Pet"}
          </h1>
          <p class="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed" data-content-key="contact.subheadline">
            ${contact.subheadline || 'Have questions about an upcoming gift, memorial keepsake, or custom sizing? Send a message and our artisan will get back to you within 24 hours.'}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Contact Details & Social Media (5 Cols) -->
          <div class="lg:col-span-5 space-y-6">
            
            <div class="bg-linen-100 rounded-3xl p-6 sm:p-8 shadow-md border stitch-border-dashed space-y-6">
              <h3 class="font-serif text-xl font-bold text-stone-900">Studio Information</h3>

              <div class="space-y-4 text-sm text-stone-700">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✉️
                  </div>
                  <div>
                    <p class="font-bold text-stone-900">Email Studio</p>
                    <a href="mailto:${contact.email || 'hello@petembro.com'}" class="text-terracotta hover:underline" data-content-key="contact.email">${contact.email || 'hello@petembro.com'}</a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    💬
                  </div>
                  <div>
                    <p class="font-bold text-stone-900">WhatsApp Direct Chat</p>
                    <a href="${socials.whatsapp || 'https://wa.me/'}" target="_blank" rel="noopener noreferrer" class="text-emerald-700 hover:underline" data-content-key="contact.whatsapp">${contact.whatsapp || '+1 (555) 382-7638'}</a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-wood/20 text-wood-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                    ⏱️
                  </div>
                  <div>
                    <p class="font-bold text-stone-900">Studio Hours</p>
                    <p class="text-xs text-stone-600" data-content-key="contact.hours">${contact.hours || 'Mon – Fri: 9:00 AM – 6:00 PM (EST)'}</p>
                    <p class="text-xs text-stone-600" data-content-key="contact.location">${contact.location || 'Montréal & Burlington • Worldwide Shipping'}</p>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="pt-4 border-t border-linen-300">
                <p class="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">Follow Along & Share</p>
                <div class="flex items-center gap-2">
                  <a href="${socials.instagram || 'https://instagram.com'}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-200 hover:bg-terracotta hover:text-white flex items-center justify-center text-stone-700 transition" title="Instagram">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="${socials.tiktok || 'https://tiktok.com'}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-200 hover:bg-stone-900 hover:text-white flex items-center justify-center text-stone-700 transition" title="TikTok">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.27-.27.5-.57.7-.89V9.58a8.28 8.28 0 0 0 5.03 1.68v-3.4c-.001-.39-.001-.78 0-1.17z"/></svg>
                  </a>
                  <a href="${socials.pinterest || 'https://pinterest.com'}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-200 hover:bg-red-700 hover:text-white flex items-center justify-center text-stone-700 transition" title="Pinterest">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.03-.94-.06-2.39.05-3.42l1.24-5.26s-.31-.63-.31-1.57c0-1.47.85-2.57 1.91-2.57.9 0 1.34.68 1.34 1.49 0 .91-.58 2.27-.88 3.53-.25 1.06.53 1.92 1.58 1.92 1.89 0 3.35-2 3.35-4.88 0-2.55-1.83-4.34-4.45-4.34-3.03 0-4.81 2.28-4.81 4.63 0 .92.35 1.9.79 2.43.09.11.1.2.07.31l-.29 1.19c-.05.19-.16.23-.37.14-1.37-.64-2.22-2.64-2.22-4.25 0-3.46 2.52-6.64 7.27-6.64 3.82 0 6.78 2.72 6.78 6.35 0 3.79-2.39 6.84-5.71 6.84-1.12 0-2.17-.58-2.53-1.26l-.69 2.62c-.25.96-.92 2.16-1.37 2.9A12 12 0 1 0 12 0z"/></svg>
                  </a>
                  <a href="${socials.facebook || 'https://facebook.com'}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-200 hover:bg-blue-600 hover:text-white flex items-center justify-center text-stone-700 transition" title="Facebook">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Quick 3D Callout Card -->
            <div class="bg-linen-200/80 p-5 rounded-2xl border border-linen-300">
              <p class="font-serif font-bold text-stone-900 mb-1">Want to test your photo first?</p>
              <p class="text-xs text-stone-600 mb-3">Our 3D keychain customizer allows you to see the embroidery texture in real-time before placing an order.</p>
              <a href="#preview" class="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:underline">
                <span>Launch 3D Customizer</span>
                <span>→</span>
              </a>
            </div>

          </div>

          <!-- Main Contact Form (7 Cols) -->
          <div class="lg:col-span-7 bg-linen-100 rounded-3xl p-6 sm:p-10 shadow-xl border stitch-border-dashed">
            <h3 class="font-serif text-2xl font-bold text-stone-900 mb-6">Send an Inquiry</h3>

            <form id="contact-full-form" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Your Full Name *</label>
                  <input type="text" name="name" required placeholder="Elena Rostova" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Your Email *</label>
                  <input type="email" name="email" required placeholder="name@domain.com" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Pet's Name & Species *</label>
                  <input type="text" name="pet_info" required placeholder="e.g. Toby, British Shorthair" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Desired Keepsake Format</label>
                  <select name="keepsake_format" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none">
                    <option value="keychain">Miniature Keychain Hoop (1.8")</option>
                    <option value="wall-4">Framed Wall Hoop (4")</option>
                    <option value="wall-5">Framed Wall Hoop (5")</option>
                    <option value="wall-6">Framed Wall Hoop (6" Deluxe)</option>
                    <option value="memorial">Memorial with Golden Halo</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Message / Inscription Notes</label>
                <textarea name="message" rows="4" placeholder="Tell us about special markings, preferred hoop wood tone, or gift deadline..." class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none"></textarea>
              </div>

              <div class="pt-2 flex items-center justify-between">
                <p class="text-xs text-stone-500">🔒 Free worldwide tracked shipping on all custom orders.</p>
                <button type="submit" class="px-8 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm shadow-md hover:shadow transition active:scale-95">
                  Submit Commission
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  `;

  bindContactEvents();
}

function bindContactEvents() {
  const form = document.getElementById('contact-full-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    alert(`Thank you, ${name}! Your commission inquiry has been submitted. Elena will review your request and get back to you shortly.`);
    form.reset();
  });
}

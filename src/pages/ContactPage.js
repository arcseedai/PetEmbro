// Contact & Commission Inquiries Page
import { getSiteContent, getCommissionCategories, getSocialLinks } from '../services/contentStore.js';
import { getSocialIconSvg } from '../utils/socialIcons.js';

export function renderContactPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const content = getSiteContent();
  const contact = content.contact || {};
  const socials = content.socials || {};
  const inquiry = content.inquiry || {};
  const categories = getCommissionCategories();
  const socialLinks = getSocialLinks();

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
                    <a href="${contact.whatsappUrl || socials.whatsapp || 'https://wa.me/'}" target="_blank" rel="noopener noreferrer" class="text-emerald-700 hover:underline" data-content-key="contact.whatsapp">${contact.whatsapp || '+1 (555) 382-7638'}</a>
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
              <div class="pt-4 border-t border-linen-300" id="contact-social-section">
                <div class="flex items-center justify-between mb-3">
                  <p class="text-xs font-bold uppercase tracking-wider text-stone-600">Follow Along & Share</p>
                  <button type="button" class="customizer-socials-trigger text-[11px] px-2.5 py-1 rounded-lg bg-linen-300 hover:bg-terracotta hover:text-white text-stone-700 transition font-medium flex items-center gap-1 shadow-sm" title="Edit, add, or remove social media links">
                    <span>✏️</span> Edit Socials
                  </button>
                </div>
                <div class="flex items-center flex-wrap gap-2.5">
                  ${socialLinks.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-linen-200 hover:bg-terracotta hover:text-white flex items-center justify-center text-stone-700 transition shadow-sm hover:shadow active:scale-95" title="${link.label || link.platform}">
                      ${getSocialIconSvg(link.platform)}
                    </a>
                  `).join('')}
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
            <h3 class="font-serif text-2xl font-bold text-stone-900 mb-6" data-content-key="inquiry.title">
              ${inquiry.title || 'Send an Inquiry'}
            </h3>

            <form id="contact-full-form" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    <span data-content-key="inquiry.nameLabel">${inquiry.nameLabel || 'Your Full Name'}</span> *
                  </label>
                  <input type="text" name="name" required placeholder="${inquiry.namePlaceholder || 'Elena Rostova'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    <span data-content-key="inquiry.emailLabel">${inquiry.emailLabel || 'Your Email'}</span> *
                  </label>
                  <input type="email" name="email" required placeholder="${inquiry.emailPlaceholder || 'name@domain.com'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    <span data-content-key="inquiry.subjectLabel">${inquiry.subjectLabel || "Pet's Name & Species"}</span> *
                  </label>
                  <input type="text" name="pet_info" required placeholder="${inquiry.subjectPlaceholder || 'e.g. Toby, British Shorthair'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none" />
                </div>
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                      <span data-content-key="inquiry.formatLabel">${inquiry.formatLabel || 'Desired Keepsake Format / Product'}</span>
                    </label>
                    <button type="button" class="btn-manage-commission-categories text-[11px] font-semibold text-terracotta hover:underline flex items-center gap-1" title="Add, edit or delete product categories">
                      <span>✏️</span> Edit Products
                    </button>
                  </div>
                  <select name="keepsake_format" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none">
                    ${categories.map(c => `
                      <option value="${c.id}">${c.label}</option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  <span data-content-key="inquiry.detailsLabel">${inquiry.detailsLabel || 'Message / Inscription Notes'}</span>
                </label>
                <textarea name="message" rows="4" placeholder="${inquiry.detailsPlaceholder || 'Tell us about special markings, preferred hoop wood tone, or gift deadline...'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none"></textarea>
              </div>

              <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-xs text-stone-500" data-content-key="inquiry.note">
                  ${inquiry.note || '🔒 Free worldwide tracked shipping on all custom orders.'}
                </p>
                <button type="submit" class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm shadow-md hover:shadow transition active:scale-95">
                  <span data-content-key="inquiry.buttonText">${inquiry.buttonText || 'Submit Commission'}</span>
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

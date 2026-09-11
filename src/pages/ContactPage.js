// Contact & Commission Inquiries Page
import { getSiteContent, getCommissionCategories, getSocialLinks } from '../services/contentStore.js';
import { getSocialIconSvg } from '../utils/socialIcons.js';
import { sendInquiry } from '../services/formService.js';
import { downscaleImage, dataUrlToFile, formatFileSize } from '../utils/imageDownscaler.js';

export function renderContactPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const content = getSiteContent();
  const contact = content.contact || {};
  const socials = content.socials || {};
  const inquiry = content.inquiry || {};
  const categories = getCommissionCategories();
  const socialLinks = getSocialLinks();

  const attachedPreviewThumb = sessionStorage.getItem('petembro_attached_preview') || '';
  const attachedPreviewStyle = sessionStorage.getItem('petembro_attached_style') || 'Silk Thread-Painting';
  const hasAttachedPreview = Boolean(attachedPreviewThumb);

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
                  <input type="text" name="name" required placeholder="${inquiry.namePlaceholder || 'e.g. Sarah Jenkins'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:ring-2 focus:ring-terracotta/40 focus:outline-none" />
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

              <!-- Photo Attachments Section (Up to 3 Photos with Auto-Downscaler) -->
              <div class="p-4 rounded-2xl bg-linen-200/70 border border-linen-300 space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                      Reference Pet Photos (Up to 3)
                    </label>
                    <p class="text-[11px] text-stone-500">
                      Large camera photos are automatically downscaled for fast delivery.
                    </p>
                  </div>
                  <span id="photo-count-badge" class="text-xs font-semibold text-stone-600 bg-white px-2.5 py-1 rounded-lg border border-linen-300 shadow-xs">
                    0 / 3 added
                  </span>
                </div>

                <input type="file" id="contact-photo-upload" accept="image/jpeg,image/png,image/webp,image/heic,image/*" multiple class="hidden" />

                <!-- Add Photos Trigger Button -->
                <button type="button" id="btn-trigger-contact-photos" class="w-full py-3 px-4 rounded-xl border-2 border-dashed border-linen-400 hover:border-terracotta bg-white hover:bg-linen-100 text-stone-700 font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95">
                  <svg class="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Click to Choose Pet Photo(s)</span>
                </button>

                <!-- Processing / Downscaler Indicator -->
                <div id="photos-optimizing-indicator" class="hidden py-2 px-3 rounded-xl bg-linen-300/60 text-stone-700 text-xs flex items-center gap-2">
                  <svg class="animate-spin h-3.5 w-3.5 text-terracotta" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span id="optimizing-text">Optimizing images...</span>
                </div>

                <!-- Thumbnails Grid -->
                <div id="photos-thumbnail-grid" class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 empty:hidden"></div>
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
  const submitBtn = form?.querySelector('button[type="submit"]');
  const originalBtnContent = submitBtn?.innerHTML || 'Submit Commission';

  let uploadedPhotos = []; // array of { file, blob, previewUrl, fileName, originalSize, downscaledSize, is3DPreview }
  const attachedPreviewDataUrl = sessionStorage.getItem('petembro_attached_preview') || null;
  const attachedPreviewStyle = sessionStorage.getItem('petembro_attached_style') || 'Silk Thread-Painting';

  // If arriving from 3D customizer, initialize the 3D design as Photo 1 of 3
  if (attachedPreviewDataUrl) {
    try {
      const previewFile = dataUrlToFile(attachedPreviewDataUrl, 'custom_3d_keepsake_preview.jpg');
      uploadedPhotos.push({
        file: previewFile,
        blob: previewFile,
        previewUrl: attachedPreviewDataUrl,
        fileName: `3D Keepsake (${attachedPreviewStyle}).jpg`,
        originalSize: previewFile.size,
        downscaledSize: previewFile.size,
        is3DPreview: true
      });
    } catch (e) {
      console.warn('Could not initialize 3D preview file:', e);
    }
  }

  // Reference Photos Upload & Auto-Downscaler
  const photoInput = document.getElementById('contact-photo-upload');
  const triggerBtn = document.getElementById('btn-trigger-contact-photos');
  const grid = document.getElementById('photos-thumbnail-grid');
  const countBadge = document.getElementById('photo-count-badge');
  const indicator = document.getElementById('photos-optimizing-indicator');
  const optText = document.getElementById('optimizing-text');

  triggerBtn?.addEventListener('click', () => {
    photoInput?.click();
  });

  function renderThumbnails() {
    if (!grid) return;

    if (countBadge) {
      countBadge.textContent = `${uploadedPhotos.length} / 3 added`;
    }

    if (triggerBtn) {
      if (uploadedPhotos.length >= 3) {
        triggerBtn.classList.add('hidden');
      } else {
        triggerBtn.classList.remove('hidden');
      }
    }

    grid.innerHTML = uploadedPhotos.map((item, idx) => `
      <div class="relative group p-2 rounded-xl bg-white border border-linen-300 flex items-center gap-2.5 shadow-sm">
        <img src="${item.previewUrl}" alt="Pet Reference" class="w-12 h-12 rounded-lg object-cover border border-linen-200 flex-shrink-0" />
        <div class="flex-1 min-w-0 pr-6">
          <div class="flex items-center gap-1.5">
            <p class="text-[11px] font-bold text-stone-800 truncate" title="${item.fileName}">${item.fileName}</p>
            ${item.is3DPreview ? '<span class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-terracotta/15 text-terracotta flex-shrink-0">3D Preview</span>' : ''}
          </div>
          <p class="text-[10px] text-emerald-700 font-medium">
            ${formatFileSize(item.downscaledSize)}
            <span class="text-stone-400 font-normal">(${formatFileSize(item.originalSize)})</span>
          </p>
        </div>
        <button type="button" data-index="${idx}" class="btn-remove-photo absolute top-2 right-2 w-5 h-5 rounded-full bg-linen-200 hover:bg-rose-500 hover:text-white text-stone-600 text-xs font-bold flex items-center justify-center transition cursor-pointer" title="Remove this photo">
          ✕
        </button>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-remove-photo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.index, 10);
        const removed = uploadedPhotos[idx];
        if (removed && removed.is3DPreview) {
          sessionStorage.removeItem('petembro_attached_preview');
          sessionStorage.removeItem('petembro_attached_style');
        }
        uploadedPhotos.splice(idx, 1);
        renderThumbnails();
      });
    });
  }

  // Render initial items (e.g. 3D preview if present)
  renderThumbnails();

  photoInput?.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = 3 - uploadedPhotos.length;
    if (remaining <= 0) {
      alert('You can upload a maximum of 3 reference photos.');
      photoInput.value = '';
      return;
    }

    const filesToProcess = files.slice(0, remaining);
    if (indicator) indicator.classList.remove('hidden');

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      if (optText) optText.textContent = `Optimizing photo ${i + 1} of ${filesToProcess.length}...`;
      try {
        const optimized = await downscaleImage(file, 1600, 1600, 0.82);
        uploadedPhotos.push(optimized);
      } catch (err) {
        console.warn('Could not downscale image, using original:', err);
        uploadedPhotos.push({
          file: file,
          blob: file,
          previewUrl: URL.createObjectURL(file),
          fileName: file.name,
          originalSize: file.size,
          downscaledSize: file.size
        });
      }
    }

    if (indicator) indicator.classList.add('hidden');
    photoInput.value = '';
    renderThumbnails();
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name') || 'Friend';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Sending Inquiry & Photos...</span>
        </span>
      `;
    }

    // Attach all photos (including 3D preview if present)
    uploadedPhotos.forEach((photo, idx) => {
      formData.append('attachment', photo.file, photo.fileName);
      formData.append(`attachment_${idx + 1}`, photo.file, photo.fileName);
    });

    const result = await sendInquiry(formData, 'Contact Page Inquiry');

    if (result.success) {
      sessionStorage.removeItem('petembro_attached_preview');
      sessionStorage.removeItem('petembro_attached_style');
      uploadedPhotos = [];

      form.innerHTML = `
        <div class="p-8 rounded-3xl bg-linen-200/80 border border-linen-300 text-center space-y-4">
          <div class="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-bold shadow-sm">
            ✓
          </div>
          <h4 class="font-serif text-2xl font-bold text-stone-900">Inquiry Received, ${name}!</h4>
          <p class="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
            Your commission details and photos have been sent directly to our email inbox. ${getSiteContent().about?.artistName || 'Iryna'} will review your pet photos and reply within 24 hours.
          </p>
          <div class="pt-2">
            <button type="button" id="btn-reset-contact-form" class="px-6 py-2.5 rounded-full bg-wood-dark hover:bg-wood text-white font-semibold text-xs transition">
              Send Another Message
            </button>
          </div>
        </div>
      `;

      document.getElementById('btn-reset-contact-form')?.addEventListener('click', () => {
        renderContactPage();
      });
    } else {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
      alert(`There was an issue sending your message: ${result.message || 'Please try again'}. You can also email us directly at hello@petembro.com`);
    }
  });
}

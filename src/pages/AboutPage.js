// About Me / The Artisan & Craft Story Page
import { getSiteContent, getFaqs } from '../services/contentStore.js';

export function renderAboutPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const content = getSiteContent();
  const about = content.about || {};
  const faqs = getFaqs();

  root.innerHTML = `
    <div class="min-h-screen bg-linen-weave py-8 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 text-wood-medium text-xs font-bold uppercase tracking-widest mb-2">
            <span class="w-2 h-2 rounded-full bg-wood"></span>
            <span data-content-key="about.badge">${about.badge || 'The Artisan Behind PetEmbro'}</span>
          </div>
          <h1 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight" data-content-key="about.headline">
            ${about.headline || 'Handcrafted with Thread, Needle & Devotion'}
          </h1>
          <p class="mt-3 text-stone-600 text-base font-light leading-relaxed" data-content-key="about.subheadline">
            ${about.subheadline || 'Welcome to my studio! I create miniature textile heirlooms that honor the bond we share with our animal companions.'}
          </p>
        </div>

        <!-- Story & Artisan Section -->
        <div class="bg-linen-100 rounded-3xl p-6 sm:p-12 shadow-xl border stitch-border-dashed mb-16">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            <!-- Artisan Photo & Studio Badge -->
            <div class="md:col-span-5 relative group">
              <div class="rounded-2xl overflow-hidden shadow-lg border-2 border-linen-300 aspect-[4/5] bg-linen-200">
                <img src="${about.artisanImage || './assets/keychain_ref.png'}" data-image-key="about.artisanImage" alt="PetEmbro Studio in Hand" class="w-full h-full object-cover" />
              </div>
              <div class="absolute -bottom-4 -right-4 bg-wood-dark text-linen-100 p-3 rounded-2xl shadow-lg text-xs">
                <p class="font-serif font-bold text-sm" data-content-key="about.artistName">${about.artistName || 'Elena Rostova'}</p>
                <p class="text-[10px] text-stone-300" data-content-key="about.artistRole">${about.artistRole || 'Fiber Artist & Founder'}</p>
              </div>
            </div>

            <!-- Narrative -->
            <div class="md:col-span-7 space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base font-light">
              <h2 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900" data-content-key="about.quote">
                ${about.quote || '"Pets Aren\'t Just Pets — They\'re Family."'}
              </h2>
              <p data-content-key="about.p1">
                ${about.p1 || 'PetEmbro began three years ago when I wanted to keep my rescue dog close to me during long travels. I experimented with micro-embroidery techniques, shrinking complex needlework into a pocket-sized wooden hoop keychain.'}
              </p>
              <p data-content-key="about.p2">
                ${about.p2 || 'When fellow dog parents stopped me in the park asking if I could stitch their puppies, I realized how meaningful a physical, tactile portrait could be compared to a digital photo tucked away in a smartphone.'}
              </p>
              <p data-content-key="about.p3">
                ${about.p3 || 'Today, every single PetEmbro piece is hand-stitched by me in my sunlit studio. No automated machines, no shortcuts — just needle, French knots, single-strand blending, and endless patience.'}
              </p>

              <div class="pt-4 flex flex-wrap items-center gap-3">
                <a href="#preview" class="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs sm:text-sm shadow transition">
                  Preview Your Pet Now
                </a>
                <a href="#contact" class="px-6 py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-800 font-medium text-xs sm:text-sm transition">
                  Get in Touch
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- Materials Breakdown -->
        <div class="mb-16">
          <div class="text-center max-w-xl mx-auto mb-10">
            <h3 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900" data-content-key="about.materialsTitle">
              ${about.materialsTitle || 'Our Sacred Materials'}
            </h3>
            <p class="text-stone-600 text-sm mt-1" data-content-key="about.materialsSubtitle">
              ${about.materialsSubtitle || 'We source only sustainable, archive-grade natural materials designed to last generations.'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-linen-100 p-6 rounded-2xl border border-linen-300 shadow-sm text-center">
              <div class="w-12 h-12 mx-auto rounded-full bg-wood/20 text-wood-dark flex items-center justify-center font-serif text-xl font-bold mb-3" data-content-key="about.mat1Icon">${about.mat1Icon || '🌿'}</div>
              <h4 class="font-serif font-bold text-base text-stone-900 mb-1" data-content-key="about.mat1Title">
                ${about.mat1Title || '100% Organic Linen'}
              </h4>
              <p class="text-xs text-stone-600 leading-relaxed" data-content-key="about.mat1Desc">
                ${about.mat1Desc || 'Unbleached European flax linen. Strong, tear-resistant, and naturally textured with an artisanal oatmeal grain.'}
              </p>
            </div>

            <div class="bg-linen-100 p-6 rounded-2xl border border-linen-300 shadow-sm text-center">
              <div class="w-12 h-12 mx-auto rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center font-serif text-xl font-bold mb-3" data-content-key="about.mat2Icon">${about.mat2Icon || '🧵'}</div>
              <h4 class="font-serif font-bold text-base text-stone-900 mb-1" data-content-key="about.mat2Title">
                ${about.mat2Title || 'DMC French Cotton Floss'}
              </h4>
              <p class="text-xs text-stone-600 leading-relaxed" data-content-key="about.mat2Desc">
                ${about.mat2Desc || 'Colorfast, double-mercerized 100% Egyptian cotton thread. Resists UV fading and retains its vibrant sheen for decades.'}
              </p>
            </div>

            <div class="bg-linen-100 p-6 rounded-2xl border border-linen-300 shadow-sm text-center">
              <div class="w-12 h-12 mx-auto rounded-full bg-stone-300 text-stone-800 flex items-center justify-center font-serif text-xl font-bold mb-3" data-content-key="about.mat3Icon">${about.mat3Icon || '🪵'}</div>
              <h4 class="font-serif font-bold text-base text-stone-900 mb-1" data-content-key="about.mat3Title">
                ${about.mat3Title || 'Beech & Walnut Hoops'}
              </h4>
              <p class="text-xs text-stone-600 leading-relaxed" data-content-key="about.mat3Desc">
                ${about.mat3Desc || 'Sustainably harvested hardwood frames, laser cut for smooth precision and hand-polished with organic beeswax.'}
              </p>
            </div>
          </div>
        </div>

        <!-- Care Guide FAQ -->
        <div class="bg-linen-100 rounded-3xl p-6 sm:p-10 shadow-md border stitch-border-dashed" id="faq-section-container">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-linen-300 pb-4">
            <div class="text-center sm:text-left">
              <h3 class="font-serif text-2xl font-bold text-stone-900" data-content-key="about.faqTitle">
                ${about.faqTitle || 'Keepsake Care Guide'}
              </h3>
              <p class="text-xs text-stone-500 mt-1">Frequently asked questions & heirloom care instructions</p>
            </div>
            <button type="button" id="btn-add-faq" class="px-4 py-2 rounded-full bg-wood-dark hover:bg-wood text-white text-xs font-semibold shadow transition flex items-center gap-1.5 flex-shrink-0" title="Add a new FAQ question and answer">
              <span>➕</span>
              <span>Add FAQ</span>
            </button>
          </div>

          <div class="space-y-4 max-w-2xl mx-auto text-sm text-stone-700" id="faq-list-container">
            ${faqs.map(faq => `
              <div class="faq-card p-4 rounded-xl bg-linen-200/50 border border-linen-300 relative group transition hover:border-linen-400" data-faq-id="${faq.id}">
                <div class="flex items-start justify-between gap-2">
                  <p class="font-bold text-stone-900 mb-1 flex-grow faq-question-text" data-faq-field="question" data-faq-id="${faq.id}">
                    ${faq.question}
                  </p>
                  <div class="faq-actions flex items-center gap-1 opacity-80 group-hover:opacity-100 flex-shrink-0">
                    <button type="button" class="btn-edit-faq p-1 text-stone-400 hover:text-stone-700 rounded transition" data-faq-id="${faq.id}" title="Edit question & answer">
                      ✏️
                    </button>
                    <button type="button" class="btn-delete-faq p-1 text-stone-400 hover:text-red-600 rounded transition" data-faq-id="${faq.id}" title="Delete this FAQ">
                      🗑️
                    </button>
                  </div>
                </div>
                <p class="text-xs text-stone-600 faq-answer-text leading-relaxed mt-1" data-faq-field="answer" data-faq-id="${faq.id}">
                  ${faq.answer}
                </p>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

// Home / Index Page with Parallax Scrolling & Stop Points
import { getSiteContent, getRandomFeaturedArtwork, getCommissionCategories } from '../services/contentStore.js';

export function renderHomePage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const content = getSiteContent();
  const hero = content.hero || {};
  const craft = content.craftStory || {};
  const sp1 = content.stopPoint1 || {};
  const sp2 = content.stopPoint2 || {};
  const inquiry = content.inquiry || {};
  const categories = getCommissionCategories();

  // Randomly select one of the marked featured artworks from portfolio
  const featuredData = getRandomFeaturedArtwork();
  const featuredArt = featuredData.item;
  const pool = featuredData.pool || [];
  let currentFeaturedIndex = featuredData.index;

  const displayImage = featuredArt.image || hero.featuredImage || '/assets/keychain_ref.png';
  const additional = featuredArt.additionalInfo || featuredArt.breed || '';
  const displayName = featuredArt.name
    ? (additional ? `${featuredArt.name} (${additional})` : featuredArt.name)
    : (hero.featuredName || 'Rocky the Boxer');
  const displayDesc = featuredArt.categoryLabel || featuredArt.size || hero.featuredDesc || 'Miniature Wooden Hoop Keychain';
  const poolCount = featuredData.totalFeatured;

  root.innerHTML = `
    <!-- 1. HERO SECTION -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-linen-weave pt-12 pb-20">
      <!-- Decorative stitched circles in background -->
      <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full border-2 border-dashed border-wood/20 pointer-events-none animate-spin-slow"></div>
      <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border-2 border-dashed border-terracotta/20 pointer-events-none"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <!-- Floating Needle Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linen-200 border border-linen-300 text-wood-dark text-xs sm:text-sm font-medium mb-6 shadow-sm animate-gentle-hover">
          <svg class="w-4 h-4 text-terracotta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9" stroke-dasharray="3 2" />
            <path d="M16 6 L8 18" stroke-width="2" />
          </svg>
          <span data-content-key="hero.badge">${hero.badge || 'Handcrafted Miniature Pet Embroidery'}</span>
        </div>

        <!-- Main Title with Embroidered Style -->
        <h1 class="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
          <span data-content-key="hero.titleLine1">${hero.titleLine1 || 'Every Stitch Tells Your'}</span> <br class="hidden sm:inline" />
          <span class="text-terracotta italic relative inline-block">
            <span data-content-key="hero.titleHighlight">${hero.titleHighlight || "Pet's True Story"}</span>
            <svg class="absolute -bottom-2 left-0 w-full h-3 text-terracotta/40" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0,8 Q25,0 50,8 T100,8" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="4 2"/>
            </svg>
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-base sm:text-xl text-stone-600 font-light leading-relaxed mb-10" data-content-key="hero.subtitle">
          ${hero.subtitle || 'Transform your beloved furry family member into an heirloom wooden keychain or framed hoop. Hand-embroidered thread by thread on pure natural linen.'}
        </p>

        <!-- CTA Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#preview" class="w-full sm:w-auto px-8 py-4 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0">
            <svg class="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span data-content-key="hero.ctaPrimary">${hero.ctaPrimary || 'Preview on 3D Keychain'}</span>
          </a>

          <a href="#portfolio" class="w-full sm:w-auto px-8 py-4 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-800 font-semibold text-base border border-linen-400/80 transition-all flex items-center justify-center gap-2">
            <span data-content-key="hero.ctaSecondary">${hero.ctaSecondary || 'Explore Portfolio'}</span>
        </div>
      </div>

      <!-- Full-Width Featured Artworks Continuous Sliding Showcase Banner -->
      <div class="mt-14 w-full relative" id="hero-featured-showcase">
        <!-- Marquee Slider Container with Soft Edge Fading -->
        <div class="featured-marquee-container py-4">
          <div class="featured-marquee-track">
            ${(() => {
              // Determine the items to display: use marked featured artworks (or all portfolio items if none marked)
              let itemsList = pool.length > 0 ? pool : [featuredArt];
              // Ensure at least 4-8 items for smooth, continuous looping by repeating the set
              let repeatedList = [...itemsList];
              while (repeatedList.length < 8) {
                repeatedList = repeatedList.concat(itemsList);
              }
              // Double the repeated set for seamless 50% translation infinite loop
              const fullLoop = repeatedList.concat(repeatedList);

              return fullLoop.map((item, idx) => {
                const itemAdd = item.additionalInfo || item.breed || '';
                const itemTitle = item.name ? (itemAdd ? `${item.name} (${itemAdd})` : item.name) : 'Keepsake';
                const itemSub = item.categoryLabel || item.size || 'Miniature Hoop';

                return `
                  <div class="w-64 sm:w-80 md:w-96 lg:w-[380px] flex-shrink-0 group/card text-left transition transform hover:-translate-y-1.5 duration-300">
                    <div class="p-3.5 sm:p-4 bg-white/95 backdrop-blur rounded-3xl shadow-xl hover:shadow-2xl border border-linen-300">
                      <div class="relative overflow-hidden rounded-2xl aspect-[4/5] bg-linen-200">
                        <img src="${item.image || '/assets/keychain_ref.png'}" alt="${itemTitle}" class="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500" loading="lazy" />
                        <div class="absolute bottom-3 left-3 right-3 p-3 bg-stone-900/90 backdrop-blur-md rounded-2xl text-white flex items-center justify-between gap-2 shadow-lg">
                          <div class="truncate mr-1">
                            <p class="font-serif font-bold text-sm sm:text-base text-amber-100 truncate">${itemTitle}</p>
                            <p class="text-[11px] sm:text-xs text-linen-300 truncate">${itemSub}</p>
                          </div>
                          <a href="#preview" class="text-xs sm:text-sm bg-terracotta hover:bg-terracotta-dark px-3.5 py-1.5 rounded-full font-semibold transition flex-shrink-0 shadow">
                            3D View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('');
            })()}
          </div>
        </div>

        <!-- Subtle Bottom Indicator Badge -->
        <div class="flex items-center justify-center mt-4 gap-2">
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-linen-200/90 border border-linen-300 text-stone-600 text-xs font-medium shadow-sm">
            <span class="text-needle-gold text-sm">★</span>
            <span>${pool.length > 1 ? `${pool.length} Featured Keepsakes in rotation` : '100% Hand-Stitched Heirloom Keepsakes'}</span>
            <span class="text-stone-400 font-mono text-[10px] ml-1">⏸ Hover to pause</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. PARALLAX STOP POINT 1: The Craft of Miniature Needlework -->
    <section class="relative py-24 sm:py-32 bg-stone-900 text-linen-100 overflow-hidden" id="stop-point-1">
      <!-- Parallax Background Layer -->
      <div class="absolute inset-0 opacity-20 bg-cover bg-center parallax-bg" style="background-image: radial-gradient(#C49A6C 1px, transparent 1px); background-size: 24px 24px;"></div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 text-terracotta-light text-xs font-bold uppercase tracking-widest">
              <span class="w-2 h-2 rounded-full bg-terracotta"></span>
              <span data-content-key="stopPoint1.badge">${sp1.badge || 'Stop Point 01 • Master Craftsmanship'}</span>
            </div>
            <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              <span data-content-key="stopPoint1.title">${sp1.title || 'Single-Strand Precision,'}</span> <br />
              <span class="text-terracotta-light italic" data-content-key="stopPoint1.titleHighlight">${sp1.titleHighlight || 'Thread by Patient Thread'}</span>
            </h2>
            <p class="text-stone-300 text-base sm:text-lg leading-relaxed font-light" data-content-key="stopPoint1.description">
              ${sp1.description || "Unlike machine embroidery, each PetEmbro piece uses single strands of fine DMC cotton thread. We micro-layer up to 30 distinct hues to recreate the authentic texture of your pet's fur, the wet shine of their nose, and that unmistakable sparkle in their eyes."}
            </p>
            <div class="grid grid-cols-2 gap-6 pt-4 border-t border-stone-800">
              <div>
                <p class="font-serif text-3xl sm:text-4xl font-bold text-wood-light" data-content-key="stopPoint1.stat1Number">${sp1.stat1Number || '14+ Hrs'}</p>
                <p class="text-xs text-stone-400 mt-1 uppercase tracking-wider" data-content-key="stopPoint1.stat1Label">${sp1.stat1Label || 'Per Miniature Portrait'}</p>
              </div>
              <div>
                <p class="font-serif text-3xl sm:text-4xl font-bold text-terracotta-light" data-content-key="stopPoint1.stat2Number">${sp1.stat2Number || '450+'}</p>
                <p class="text-xs text-stone-400 mt-1 uppercase tracking-wider" data-content-key="stopPoint1.stat2Label">${sp1.stat2Label || 'DMC Floss Color Shades'}</p>
              </div>
            </div>
            <div>
              <a href="#about" class="inline-flex items-center gap-2 text-sm font-semibold text-terracotta-light hover:text-white transition">
                <span data-content-key="stopPoint1.linkText">${sp1.linkText || 'Read more about our materials & process →'}</span>
              </a>
            </div>
          </div>

          <div class="relative">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 p-2 bg-stone-800/60 group">
              <img src="${sp1.image || '/assets/keychain_ref.png'}" data-image-key="stopPoint1.image" alt="Close-up hand embroidery details" class="w-full rounded-2xl object-cover" />
            </div>
            <!-- Floating quote card -->
            <div class="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-linen-100 text-stone-800 p-5 rounded-2xl shadow-xl max-w-xs border border-linen-300 hidden sm:block">
              <p class="text-xs italic text-stone-700" data-content-key="stopPoint1.quote">${sp1.quote || '"When I opened the box and saw my dog\'s soulful eyes captured in thread, I was moved to tears. Truly an heirloom."'}</p>
              <p class="text-[11px] font-bold text-wood-dark mt-2" data-content-key="stopPoint1.author">${sp1.author || '— Sarah M. & Charlie'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. PARALLAX STOP POINT 2: Keepsake Keychains & Wall Hoops -->
    <section class="py-24 sm:py-32 bg-linen-200/90 relative overflow-hidden" id="stop-point-2">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 text-wood-medium text-xs font-bold uppercase tracking-widest mb-3">
            <span class="w-2 h-2 rounded-full bg-wood"></span>
            <span data-content-key="stopPoint2.badge">${sp2.badge || 'Stop Point 02 • Formats & Materials'}</span>
          </div>
          <h2 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight" data-content-key="stopPoint2.title">
            ${sp2.title || 'Carry Their Love Everywhere'}
          </h2>
          <p class="mt-4 text-stone-600 text-base sm:text-lg font-light" data-content-key="stopPoint2.subtitle">
            ${sp2.subtitle || 'Designed for durability and timeless elegance. Available in lightweight pocket keychains or stunning wall frames.'}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <!-- Card 1: Miniature Keychain -->
          <div class="bg-linen-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow border stitch-border-dashed flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-wood/20 text-wood-dark flex items-center justify-center font-serif text-2xl font-bold mb-6" data-content-key="stopPoint2.card1Icon">
                ${sp2.card1Icon || '🗝️'}
              </div>
              <h3 class="font-serif text-2xl font-bold text-stone-900 mb-2" data-content-key="stopPoint2.card1Title">${sp2.card1Title || 'Miniature Wooden Keychain'}</h3>
              <p class="text-stone-600 text-sm leading-relaxed mb-6" data-content-key="stopPoint2.card1Desc">
                ${sp2.card1Desc || 'Our signature creation! A 1.8-inch circular natural beechwood frame, protected with a water-resistant fabric sealer, linked with stainless steel chains and split keyring.'}
              </p>
              <ul class="space-y-2 text-sm text-stone-700 mb-8">
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> <span data-content-key="stopPoint2.card1Bullet1">${sp2.card1Bullet1 || 'Beech / Oak laser-cut hoop (lightweight)'}</span></li>
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> <span data-content-key="stopPoint2.card1Bullet2">${sp2.card1Bullet2 || 'Heavy-duty stainless steel split ring'}</span></li>
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> <span data-content-key="stopPoint2.card1Bullet3">${sp2.card1Bullet3 || 'Double-sealed linen fabric protection'}</span></li>
              </ul>
            </div>
            <a href="#preview" class="w-full py-3.5 px-6 rounded-full bg-wood-dark hover:bg-wood text-white font-semibold text-sm text-center transition flex items-center justify-center gap-2">
              <span data-content-key="stopPoint2.card1BtnText">${sp2.card1BtnText || "Test with Your Pet's Photo →"}</span>
            </a>
          </div>

          <!-- Card 2: Framed Wall Hoops -->
          <div class="bg-linen-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow border stitch-border-dashed flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center font-serif text-2xl font-bold mb-6" data-content-key="stopPoint2.card2Icon">
                ${sp2.card2Icon || '🖼️'}
              </div>
              <h3 class="font-serif text-2xl font-bold text-stone-900 mb-2" data-content-key="stopPoint2.card2Title">${sp2.card2Title || 'Bespoke Framed Wall Hoops'}</h3>
              <p class="text-stone-600 text-sm leading-relaxed mb-6" data-content-key="stopPoint2.card2Desc">
                ${sp2.card2Desc || 'Available in 4-inch, 5-inch, and 6-inch bamboo embroidery hoops. Includes brass tightening screw, hanging loop, and custom engraved pet nameplate option.'}
              </p>
              <ul class="space-y-2 text-sm text-stone-700 mb-8">
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> <span data-content-key="stopPoint2.card2Bullet1">${sp2.card2Bullet1 || 'Full chest or multi-pet portraits'}</span></li>
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> <span data-content-key="stopPoint2.card2Bullet2">${sp2.card2Bullet2 || 'Embroidered botanical floral wreaths'}</span></li>
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> <span data-content-key="stopPoint2.card2Bullet3">${sp2.card2Bullet3 || 'Ready to mount on wall or desk easel'}</span></li>
              </ul>
            </div>
            <a href="#portfolio" class="w-full py-3.5 px-6 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-900 font-semibold text-sm text-center border border-linen-400 transition">
              <span data-content-key="stopPoint2.card2BtnText">${sp2.card2BtnText || 'View Wall Hoop Gallery'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. PARALLAX STOP POINT 3: How It Works -->
    <section class="py-24 sm:py-32 bg-linen-100 relative" id="stop-point-3">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-widest mb-3">
            <span class="w-2 h-2 rounded-full bg-terracotta"></span>
            <span data-content-key="craftStory.badge">${craft.badge || 'Stop Point 03 • The Commission Journey'}</span>
          </div>
          <h2 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight" data-content-key="craftStory.title">
            ${craft.title || 'How Your Keepsake Comes to Life'}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="relative p-6 rounded-2xl bg-linen-200/60 border border-linen-300 flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-terracotta text-white font-serif font-bold text-xl flex items-center justify-center shadow-md mb-4">
              1
            </div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-2" data-content-key="craftStory.step1Title">${craft.step1Title || 'Send Your Favorite Photo'}</h3>
            <p class="text-stone-600 text-sm leading-relaxed" data-content-key="craftStory.step1Desc">
              ${craft.step1Desc || 'Upload a clear smartphone photo in our 3D previewer. We verify eye clarity and fur lighting with you before stitching.'}
            </p>
          </div>

          <!-- Step 2 -->
          <div class="relative p-6 rounded-2xl bg-linen-200/60 border border-linen-300 flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-wood-medium text-white font-serif font-bold text-xl flex items-center justify-center shadow-md mb-4">
              2
            </div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-2" data-content-key="craftStory.step2Title">${craft.step2Title || 'Thread Palette Matching'}</h3>
            <p class="text-stone-600 text-sm leading-relaxed" data-content-key="craftStory.step2Desc">
              ${craft.step2Desc || 'We hand-select 20–30 DMC stranded cotton floss colors and send you a digital stitch proof for your personal approval.'}
            </p>
          </div>

          <!-- Step 3 -->
          <div class="relative p-6 rounded-2xl bg-linen-200/60 border border-linen-300 flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-wood-dark text-white font-serif font-bold text-xl flex items-center justify-center shadow-md mb-4">
              3
            </div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-2" data-content-key="craftStory.step3Title">${craft.step3Title || 'Hand-Stitched & Shipped'}</h3>
            <p class="text-stone-600 text-sm leading-relaxed" data-content-key="craftStory.step3Desc">
              ${craft.step3Desc || 'Crafted in our studio with delicate micro-needlework, packaged in an eco-friendly gift box with tracked global shipping.'}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. BOTTOM INQUIRY & CONTACT FORM SECTION -->
    <section class="py-20 sm:py-28 bg-linen-200 border-t border-linen-300" id="home-contact">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="inline-block w-8 h-1 bg-terracotta rounded-full mb-3"></span>
          <h2 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight" data-content-key="inquiry.title">
            ${inquiry.title || 'Reserve Your Custom Commission'}
          </h2>
          <p class="mt-3 text-stone-600 text-base font-light" data-content-key="inquiry.subtitle">
            ${inquiry.subtitle || 'Due to the handcrafted nature, we only accept 15 custom pet commissions per month. Send your inquiry below!'}
          </p>
        </div>

        <!-- Contact Form Card -->
        <div class="bg-linen-100 rounded-3xl p-6 sm:p-10 shadow-xl border stitch-border-dashed">
          <form id="home-inquiry-form" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  <span data-content-key="inquiry.nameLabel">${inquiry.nameLabel || 'Your Name'}</span> *
                </label>
                <input type="text" name="name" required placeholder="${inquiry.namePlaceholder || 'e.g. Eleanor Vance'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
              </div>
              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  <span data-content-key="inquiry.emailLabel">${inquiry.emailLabel || 'Email Address'}</span> *
                </label>
                <input type="email" name="email" required placeholder="${inquiry.emailPlaceholder || 'eleanor@example.com'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  <span data-content-key="inquiry.subjectLabel">${inquiry.subjectLabel || "Pet's Name & Details"}</span> *
                </label>
                <input type="text" name="pet_details" required placeholder="${inquiry.subjectPlaceholder || 'e.g. Buster, Golden Retriever'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    <span data-content-key="inquiry.formatLabel">${inquiry.formatLabel || 'Keepsake Format / Product'}</span> *
                  </label>
                  <button type="button" class="btn-manage-commission-categories text-[11px] font-semibold text-terracotta hover:underline flex items-center gap-1" title="Add, edit or delete product categories">
                    <span>✏️</span> Edit Products
                  </button>
                </div>
                <select name="format" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40">
                  ${categories.map(c => `
                    <option value="${c.id}">${c.label}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                <span data-content-key="inquiry.detailsLabel">${inquiry.detailsLabel || 'Tell Us About Your Pet & Special Details'}</span>
              </label>
              <textarea name="message" rows="4" placeholder="${inquiry.detailsPlaceholder || 'Any distinctive markings, personality traits, or date needed by...'}" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40"></textarea>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p class="text-xs text-stone-500" data-content-key="inquiry.note">
                ${inquiry.note || '🔒 We reply within 24 hours with timeline and photo tips.'}
              </p>
              <button type="submit" class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm shadow-md hover:shadow transition active:scale-95">
                <span data-content-key="inquiry.buttonText">${inquiry.buttonText || 'Send Commission Inquiry'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  bindHomeEvents(pool, currentFeaturedIndex);
}

function bindHomeEvents(pool = [], initialIndex = 0) {
  let currentIndex = initialIndex;

  // Hero showcase interactive shuffle button
  const shuffleBtn = document.getElementById('hero-shuffle-btn');
  if (shuffleBtn && pool.length > 1) {
    shuffleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % pool.length;
      const nextItem = pool[currentIndex];

      const imgEl = document.getElementById('hero-featured-img');
      const nameEl = document.getElementById('hero-featured-name');
      const descEl = document.getElementById('hero-featured-desc');
      const counterEl = document.getElementById('hero-featured-counter');

      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = nextItem.image || '/assets/keychain_ref.png';
          imgEl.alt = `${nextItem.name} Keepsake`;
          imgEl.style.opacity = '1';
        }, 150);
      }
      if (nameEl) {
        const addInfo = nextItem.additionalInfo || nextItem.breed || '';
        nameEl.textContent = addInfo ? `${nextItem.name} (${addInfo})` : nextItem.name;
      }
      if (descEl) {
        descEl.textContent = nextItem.categoryLabel || nextItem.size || 'Miniature Keepsake';
      }
      if (counterEl) {
        counterEl.textContent = `${currentIndex + 1}/${pool.length}`;
      }
    });
  }

  const form = document.getElementById('home-inquiry-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const pet = formData.get('pet_details');

    // Display celebratory feedback
    showToast(`Thank you ${name}! Your inquiry for ${pet} has been received. We will email you shortly.`);
    form.reset();
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-stone-900 text-linen-100 px-5 py-3 rounded-2xl shadow-2xl border border-linen-300 text-sm flex items-center gap-3 transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto';
  toast.innerHTML = `
    <span class="text-emerald-400 text-base">✓</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 50);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

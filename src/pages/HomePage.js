// Home / Index Page with Parallax Scrolling & Stop Points

export function renderHomePage() {
  const root = document.getElementById('app-root');
  if (!root) return;

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
          <span>Handcrafted Miniature Pet Embroidery</span>
        </div>

        <!-- Main Title with Embroidered Style -->
        <h1 class="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
          Every Stitch Tells Your <br class="hidden sm:inline" />
          <span class="text-terracotta italic relative inline-block">
            Pet's True Story
            <svg class="absolute -bottom-2 left-0 w-full h-3 text-terracotta/40" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0,8 Q25,0 50,8 T100,8" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="4 2"/>
            </svg>
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-base sm:text-xl text-stone-600 font-light leading-relaxed mb-10">
          Transform your beloved furry family member into an heirloom wooden keychain or framed hoop. Hand-embroidered thread by thread on pure natural linen.
        </p>

        <!-- CTA Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#preview" class="w-full sm:w-auto px-8 py-4 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0">
            <svg class="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span>Preview on 3D Keychain</span>
          </a>

          <a href="#portfolio" class="w-full sm:w-auto px-8 py-4 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-800 font-semibold text-base border border-linen-400/80 transition-all flex items-center justify-center gap-2">
            <span>Explore Portfolio</span>
            <span class="text-terracotta">→</span>
          </a>
        </div>

        <!-- Featured Reference Keychain Preview Float -->
        <div class="mt-14 max-w-sm sm:max-w-md mx-auto relative group">
          <div class="p-3 bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-linen-300 transform group-hover:scale-[1.02] transition-transform duration-300">
            <div class="relative overflow-hidden rounded-2xl aspect-[4/5] bg-linen-200">
              <img src="/assets/keychain_ref.png" alt="Handcrafted Boxer Dog Embroidery Keychain" class="w-full h-full object-cover object-center" />
              <div class="absolute bottom-3 left-3 right-3 p-3 bg-stone-900/80 backdrop-blur-md rounded-xl text-white text-left flex items-center justify-between">
                <div>
                  <p class="font-serif font-bold text-sm">Rocky the Boxer</p>
                  <p class="text-[11px] text-linen-300">Miniature Wooden Hoop Keychain</p>
                </div>
                <a href="#preview" class="text-xs bg-terracotta hover:bg-terracotta-dark px-3 py-1.5 rounded-full font-medium transition">Try 3D View</a>
              </div>
            </div>
          </div>
          <!-- Craft Guarantee Badge -->
          <div class="absolute -bottom-4 -right-4 bg-wood-dark text-linen-100 px-4 py-2 rounded-2xl shadow-lg border-2 border-linen-100 flex items-center gap-2 text-xs font-semibold">
            <span class="text-needle-gold text-base">★</span> 100% Hand-Stitched
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
              Stop Point 01 • Master Craftsmanship
            </div>
            <h2 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Single-Strand Precision, <br />
              <span class="text-terracotta-light italic">Thread by Patient Thread</span>
            </h2>
            <p class="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Unlike machine embroidery, each PetEmbro piece uses single strands of fine DMC cotton thread. We micro-layer up to 30 distinct hues to recreate the authentic texture of your pet's fur, the wet shine of their nose, and that unmistakable sparkle in their eyes.
            </p>
            <div class="grid grid-cols-2 gap-6 pt-4 border-t border-stone-800">
              <div>
                <p class="font-serif text-3xl sm:text-4xl font-bold text-wood-light">14+ Hrs</p>
                <p class="text-xs text-stone-400 mt-1 uppercase tracking-wider">Per Miniature Portrait</p>
              </div>
              <div>
                <p class="font-serif text-3xl sm:text-4xl font-bold text-terracotta-light">450+</p>
                <p class="text-xs text-stone-400 mt-1 uppercase tracking-wider">DMC Floss Color Shades</p>
              </div>
            </div>
            <div>
              <a href="#about" class="inline-flex items-center gap-2 text-sm font-semibold text-terracotta-light hover:text-white transition">
                <span>Read more about our materials & process</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div class="relative">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 p-2 bg-stone-800/60">
              <img src="/assets/keychain_ref.png" alt="Close-up hand embroidery details" class="w-full rounded-2xl object-cover" />
            </div>
            <!-- Floating quote card -->
            <div class="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-linen-100 text-stone-800 p-5 rounded-2xl shadow-xl max-w-xs border border-linen-300 hidden sm:block">
              <p class="text-xs italic text-stone-700">"When I opened the box and saw my dog's soulful eyes captured in thread, I was moved to tears. Truly an heirloom."</p>
              <p class="text-[11px] font-bold text-wood-dark mt-2">— Sarah M. & Charlie</p>
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
            Stop Point 02 • Formats & Materials
          </div>
          <h2 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Carry Their Love Everywhere
          </h2>
          <p class="mt-4 text-stone-600 text-base sm:text-lg font-light">
            Designed for durability and timeless elegance. Available in lightweight pocket keychains or stunning wall frames.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <!-- Card 1: Miniature Keychain -->
          <div class="bg-linen-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow border stitch-border-dashed flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-wood/20 text-wood-dark flex items-center justify-center font-serif text-2xl font-bold mb-6">
                🗝️
              </div>
              <h3 class="font-serif text-2xl font-bold text-stone-900 mb-2">Miniature Wooden Keychain</h3>
              <p class="text-stone-600 text-sm leading-relaxed mb-6">
                Our signature creation! A 1.8-inch circular natural beechwood frame, protected with a water-resistant fabric sealer, linked with stainless steel chains and split keyring.
              </p>
              <ul class="space-y-2 text-sm text-stone-700 mb-8">
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> Beech / Oak laser-cut hoop (lightweight)</li>
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> Heavy-duty stainless steel split ring</li>
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> Double-sealed linen fabric protection</li>
              </ul>
            </div>
            <a href="#preview" class="w-full py-3.5 px-6 rounded-full bg-wood-dark hover:bg-wood text-white font-semibold text-sm text-center transition flex items-center justify-center gap-2">
              <span>Test with Your Pet's Photo</span>
              <span>→</span>
            </a>
          </div>

          <!-- Card 2: Framed Wall Hoops -->
          <div class="bg-linen-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow border stitch-border-dashed flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center font-serif text-2xl font-bold mb-6">
                🖼️
              </div>
              <h3 class="font-serif text-2xl font-bold text-stone-900 mb-2">Bespoke Framed Wall Hoops</h3>
              <p class="text-stone-600 text-sm leading-relaxed mb-6">
                Available in 4-inch, 5-inch, and 6-inch bamboo embroidery hoops. Includes brass tightening screw, hanging loop, and custom engraved pet nameplate option.
              </p>
              <ul class="space-y-2 text-sm text-stone-700 mb-8">
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> Full chest or multi-pet portraits</li>
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> Embroidered botanical floral wreaths</li>
                <li class="flex items-center gap-2"><span class="text-terracotta">✓</span> Ready to mount on wall or desk easel</li>
              </ul>
            </div>
            <a href="#portfolio" class="w-full py-3.5 px-6 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-900 font-semibold text-sm text-center border border-linen-400 transition">
              View Wall Hoop Gallery
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
            Stop Point 03 • The Commission Journey
          </div>
          <h2 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            How Your Keepsake Comes to Life
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="relative p-6 rounded-2xl bg-linen-200/60 border border-linen-300 flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-terracotta text-white font-serif font-bold text-xl flex items-center justify-center shadow-md mb-4">
              1
            </div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-2">Send Your Favorite Photo</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              Upload a clear smartphone photo in our 3D previewer. We verify eye clarity and fur lighting with you before stitching.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="relative p-6 rounded-2xl bg-linen-200/60 border border-linen-300 flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-wood-medium text-white font-serif font-bold text-xl flex items-center justify-center shadow-md mb-4">
              2
            </div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-2">Thread Palette Matching</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              We hand-select 20–30 DMC stranded cotton floss colors and send you a digital stitch proof for your personal approval.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="relative p-6 rounded-2xl bg-linen-200/60 border border-linen-300 flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-wood-dark text-white font-serif font-bold text-xl flex items-center justify-center shadow-md mb-4">
              3
            </div>
            <h3 class="font-serif text-xl font-bold text-stone-900 mb-2">Hand-Stitched & Shipped</h3>
            <p class="text-stone-600 text-sm leading-relaxed">
              Crafted in our studio with delicate micro-needlework, packaged in an eco-friendly gift box with tracked global shipping.
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
          <h2 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Reserve Your Custom Commission
          </h2>
          <p class="mt-3 text-stone-600 text-base font-light">
            Due to the handcrafted nature, we only accept 15 custom pet commissions per month. Send your inquiry below!
          </p>
        </div>

        <!-- Contact Form Card -->
        <div class="bg-linen-100 rounded-3xl p-6 sm:p-10 shadow-xl border stitch-border-dashed">
          <form id="home-inquiry-form" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Your Name *</label>
                <input type="text" name="name" required placeholder="e.g. Eleanor Vance" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
              </div>
              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Email Address *</label>
                <input type="email" name="email" required placeholder="eleanor@example.com" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Pet's Name & Breed *</label>
                <input type="text" name="pet_details" required placeholder="e.g. Buster, Golden Retriever" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
              </div>
              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Keepsake Format *</label>
                <select name="format" class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40">
                  <option value="keychain">Miniature Wooden Keychain Hoop (1.8")</option>
                  <option value="wall-4">Framed Wall Hoop (4-inch)</option>
                  <option value="wall-6">Framed Wall Hoop (6-inch Deluxe)</option>
                  <option value="gift-voucher">Custom Gift Certificate</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Tell Us About Your Pet & Special Details</label>
              <textarea name="message" rows="4" placeholder="Any distinctive markings, personality traits, or date needed by..." class="w-full px-4 py-3 rounded-xl bg-white border border-linen-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40"></textarea>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p class="text-xs text-stone-500">🔒 We reply within 24 hours with timeline and photo tips.</p>
              <button type="submit" class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm shadow-md hover:shadow transition active:scale-95">
                Send Commission Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  bindHomeEvents();
}

function bindHomeEvents() {
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

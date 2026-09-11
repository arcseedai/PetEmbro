// About Me / The Artisan & Craft Story Page

export function renderAboutPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="min-h-screen bg-linen-weave py-8 sm:py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 text-wood-medium text-xs font-bold uppercase tracking-widest mb-2">
            <span class="w-2 h-2 rounded-full bg-wood"></span>
            The Artisan Behind PetEmbro
          </div>
          <h1 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Handcrafted with Thread, Needle & Devotion
          </h1>
          <p class="mt-3 text-stone-600 text-base font-light leading-relaxed">
            Welcome to my studio! I create miniature textile heirlooms that honor the bond we share with our animal companions.
          </p>
        </div>

        <!-- Story & Artisan Section -->
        <div class="bg-linen-100 rounded-3xl p-6 sm:p-12 shadow-xl border stitch-border-dashed mb-16">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            <!-- Artisan Photo & Studio Badge -->
            <div class="md:col-span-5 relative">
              <div class="rounded-2xl overflow-hidden shadow-lg border-2 border-linen-300 aspect-[4/5] bg-linen-200">
                <img src="/assets/keychain_ref.png" alt="PetEmbro Studio in Hand" class="w-full h-full object-cover" />
              </div>
              <div class="absolute -bottom-4 -right-4 bg-wood-dark text-linen-100 p-3 rounded-2xl shadow-lg text-xs">
                <p class="font-serif font-bold text-sm">Elena Rostova</p>
                <p class="text-[10px] text-stone-300">Fiber Artist & Founder</p>
              </div>
            </div>

            <!-- Narrative -->
            <div class="md:col-span-7 space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base font-light">
              <h2 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                "Pets Aren't Just Pets — They're Family."
              </h2>
              <p>
                PetEmbro began three years ago when I wanted to keep my rescue dog close to me during long travels. I experimented with micro-embroidery techniques, shrinking complex needlework into a pocket-sized wooden hoop keychain.
              </p>
              <p>
                When fellow dog parents stopped me in the park asking if I could stitch their puppies, I realized how meaningful a physical, tactile portrait could be compared to a digital photo tucked away in a smartphone.
              </p>
              <p>
                Today, every single PetEmbro piece is hand-stitched by me in my sunlit studio. No automated machines, no shortcuts — just needle, French knots, single-strand blending, and endless patience.
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
            <h3 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Our Sacred Materials</h3>
            <p class="text-stone-600 text-sm mt-1">We source only sustainable, archive-grade natural materials designed to last generations.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-linen-100 p-6 rounded-2xl border border-linen-300 shadow-sm text-center">
              <div class="w-12 h-12 mx-auto rounded-full bg-wood/20 text-wood-dark flex items-center justify-center font-serif text-xl font-bold mb-3">🌿</div>
              <h4 class="font-serif font-bold text-base text-stone-900 mb-1">100% Organic Linen</h4>
              <p class="text-xs text-stone-600 leading-relaxed">Unbleached European flax linen. Strong, tear-resistant, and naturally textured with an artisanal oatmeal grain.</p>
            </div>

            <div class="bg-linen-100 p-6 rounded-2xl border border-linen-300 shadow-sm text-center">
              <div class="w-12 h-12 mx-auto rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center font-serif text-xl font-bold mb-3">🧵</div>
              <h4 class="font-serif font-bold text-base text-stone-900 mb-1">DMC French Cotton Floss</h4>
              <p class="text-xs text-stone-600 leading-relaxed">Colorfast, double-mercerized 100% Egyptian cotton thread. Resists UV fading and retains its vibrant sheen for decades.</p>
            </div>

            <div class="bg-linen-100 p-6 rounded-2xl border border-linen-300 shadow-sm text-center">
              <div class="w-12 h-12 mx-auto rounded-full bg-stone-300 text-stone-800 flex items-center justify-center font-serif text-xl font-bold mb-3">🪵</div>
              <h4 class="font-serif font-bold text-base text-stone-900 mb-1">Beech & Walnut Hoops</h4>
              <p class="text-xs text-stone-600 leading-relaxed">Sustainably harvested hardwood frames, laser cut for smooth precision and hand-polished with organic beeswax.</p>
            </div>
          </div>
        </div>

        <!-- Care Guide FAQ -->
        <div class="bg-linen-100 rounded-3xl p-6 sm:p-10 shadow-md border stitch-border-dashed">
          <h3 class="font-serif text-2xl font-bold text-stone-900 mb-6 text-center">Keepsake Care Guide</h3>
          <div class="space-y-4 max-w-2xl mx-auto text-sm text-stone-700">
            <div class="p-4 rounded-xl bg-linen-200/50 border border-linen-300">
              <p class="font-bold text-stone-900 mb-1">Are the keychains water-resistant?</p>
              <p class="text-xs text-stone-600">Yes! Each finished embroidery disc receives two micro-coats of archival textile sealant to protect against light rain, hand moisture, and dust.</p>
            </div>
            <div class="p-4 rounded-xl bg-linen-200/50 border border-linen-300">
              <p class="font-bold text-stone-900 mb-1">How do I clean my embroidery?</p>
              <p class="text-xs text-stone-600">If dust accumulates over time, gently brush the stitches with a soft dry makeup brush or clean toothbrush. Avoid submersion in water or harsh detergents.</p>
            </div>
            <div class="p-4 rounded-xl bg-linen-200/50 border border-linen-300">
              <p class="font-bold text-stone-900 mb-1">How long does a custom piece take?</p>
              <p class="text-xs text-stone-600">Standard production takes 7 to 12 business days before dispatch. Rush commission slots are available upon request.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

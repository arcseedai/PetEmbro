// Stitch Animation Module
// Creates dynamic needle-and-thread embroidery animations when navigating pages

export function playPageStitchAnimation(titleText = 'PetEmbro') {
  const container = document.getElementById('stitch-anim-overlay');
  if (!container) return;

  // Render temporary overlay with needle & thread running stitch
  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="absolute inset-0 flex items-center justify-center bg-linen-100/70 backdrop-blur-[2px] transition-opacity duration-500" id="stitch-curtain">
      <div class="relative flex flex-col items-center">
        <!-- Floating Embroidery Hoop Frame with Needle -->
        <div class="relative w-28 h-28 sm:w-36 sm:h-36">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Wooden Outer Hoop -->
            <circle cx="50" cy="50" r="44" fill="none" stroke="#C49A6C" stroke-width="5" stroke-dasharray="4 2" />
            <!-- Inner Fabric Disc -->
            <circle cx="50" cy="50" r="40" fill="#FAF6F0" />
            <!-- Decorative Cross Stitches -->
            <g stroke="#C25D43" stroke-width="1.8" stroke-linecap="round">
              <line x1="45" y1="45" x2="55" y2="55" class="stitch-item-1 opacity-0" />
              <line x1="55" y1="45" x2="45" y2="55" class="stitch-item-1 opacity-0" />

              <line x1="32" y1="50" x2="40" y2="50" class="stitch-item-2 opacity-0" />
              <line x1="36" y1="46" x2="36" y2="54" class="stitch-item-2 opacity-0" />

              <line x1="60" y1="50" x2="68" y2="50" class="stitch-item-3 opacity-0" />
              <line x1="64" y1="46" x2="64" y2="54" class="stitch-item-3 opacity-0" />
            </g>

            <!-- Animated Needle following a curved thread loop -->
            <path id="stitch-thread-path" d="M20,65 C35,25 65,25 80,65" fill="none" stroke="#C25D43" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round" />
          </svg>

          <!-- Golden/Silver Needle Element -->
          <div id="flying-needle" class="absolute top-2 left-2 w-8 h-8 pointer-events-none transition-transform duration-700 ease-in-out transform -rotate-45">
            <svg viewBox="0 0 24 24" fill="none" class="w-full h-full filter drop-shadow">
              <!-- Needle body -->
              <path d="M22 2L9.5 14.5" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round" />
              <!-- Eye of needle -->
              <circle cx="21" cy="3" r="1" fill="#FFFFFF" />
              <!-- Red Thread trailing -->
              <path d="M21 3 C23 6 18 8 20 12" stroke="#C25D43" stroke-width="1.5" stroke-dasharray="2 1" />
            </svg>
          </div>
        </div>

        <!-- Text being "embroidered" -->
        <div class="mt-3 text-center">
          <p class="font-serif text-lg sm:text-xl font-semibold text-wood-dark tracking-wider flex items-center gap-1">
            <span class="inline-block animate-pulse text-terracotta">✦</span>
            Stitching view...
          </p>
        </div>
      </div>
    </div>
  `;

  // Animate the needle across the hoop
  const needle = document.getElementById('flying-needle');
  const curtain = document.getElementById('stitch-curtain');

  setTimeout(() => {
    if (needle) {
      needle.style.transform = 'translate(60px, 45px) rotate(15deg)';
    }
    document.querySelectorAll('.stitch-item-1, .stitch-item-2, .stitch-item-3').forEach((el, idx) => {
      setTimeout(() => {
        el.classList.remove('opacity-0');
        el.classList.add('opacity-100');
      }, (idx + 1) * 150);
    });
  }, 100);

  // Fade out cleanly
  setTimeout(() => {
    if (curtain) {
      curtain.classList.add('opacity-0');
    }
    setTimeout(() => {
      container.classList.add('hidden');
      container.innerHTML = '';
    }, 450);
  }, 750);
}

// Inline decorative stitch effect for headers
export function createStitchHeader(title, subtitle = '') {
  return `
    <div class="relative inline-block my-2 text-center">
      <div class="flex items-center justify-center gap-3 mb-2">
        <span class="h-[2px] w-12 sm:w-16 stitch-line opacity-80"></span>
        <svg class="w-5 h-5 text-terracotta animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="8" stroke-dasharray="3 3"/>
          <path d="m12 8 2 4-4 2 2-6z" fill="currentColor"/>
        </svg>
        <span class="h-[2px] w-12 sm:w-16 stitch-line opacity-80"></span>
      </div>
      <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
        ${title}
      </h2>
      ${subtitle ? `<p class="mt-3 text-stone-600 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">${subtitle}</p>` : ''}
    </div>
  `;
}

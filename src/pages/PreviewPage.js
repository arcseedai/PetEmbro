// "Check How It Will Look Like" - 3D Interactive Keychain Previewer Page
// Includes real-time fine-tuning studio for size, thickness, strength, blend, shadows, and sheen, with one-click settings copying

import { Keychain3DViewer } from '../components/Keychain3D.js';
import { EmbroideryFilterEngine } from '../components/EmbroideryFilter.js';
import { getAiSegmentedData, createCutoutFromMask } from '../services/aiBackgroundRemover.js';

let activeViewer = null;

export function renderPreviewPage() {
  if (activeViewer) {
    activeViewer.destroy();
    activeViewer = null;
  }

  const root = document.getElementById('app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="min-h-screen bg-linen-weave py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Top Announcement Message -->
        <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wood/15 text-wood-dark text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3">
            <span class="w-2 h-2 rounded-full bg-terracotta animate-ping"></span>
            Check On A Real Photo
          </div>
          <h1 class="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            See Your Pet in Our 3D Miniature Keepsake
          </h1>
          <p class="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Tune stitch size, thread thickness, strength, shadows, and photo blending live. Copy your preferred values with one click!
          </p>
        </div>

        <!-- Main Interactive Workspace (Grid: 3D Stage + Control Studio) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT: 3D Keychain Viewer Stage (7 Cols) -->
          <div class="lg:col-span-7 bg-linen-100 rounded-3xl p-4 sm:p-6 shadow-xl border border-linen-300 relative flex flex-col items-center">
            
            <!-- 3D Canvas Stage Container -->
            <div id="three-keychain-container" style="min-height: 420px; height: 520px;" class="w-full relative rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-gradient-to-b from-linen-200/50 to-linen-300/40">
              <!-- Loading Spinner Placeholder -->
              <div id="canvas-loader" class="absolute inset-0 flex flex-col items-center justify-center text-stone-600">
                <div class="w-10 h-10 border-4 border-wood border-t-transparent rounded-full animate-spin mb-3"></div>
                <p class="text-sm font-medium">Assembling 3D Keychain...</p>
              </div>
            </div>

            <!-- Floating Overlay Helpers inside the 3D stage -->
            <div class="w-full mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-linen-300/70">
              <div class="flex items-center gap-1.5 text-xs text-stone-500">
                <svg class="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span>Centered on frame origin • Drag to tilt • Scroll wheel to zoom</span>
              </div>

              <!-- Action Toolbar: Zoom In/Out, Reset, Snapshot -->
              <div class="flex items-center gap-2">
                <button id="btn-zoom-in-3d" title="Zoom closer to embroidery frame" class="w-8 h-8 rounded-lg bg-linen-200 hover:bg-wood hover:text-white text-stone-700 font-bold text-sm transition flex items-center justify-center shadow-sm">
                  +
                </button>
                <button id="btn-zoom-out-3d" title="Zoom out to see full chain" class="w-8 h-8 rounded-lg bg-linen-200 hover:bg-wood hover:text-white text-stone-700 font-bold text-sm transition flex items-center justify-center shadow-sm">
                  −
                </button>
                <button id="btn-reset-view" class="px-3 py-1.5 rounded-lg bg-linen-200 hover:bg-linen-300 text-stone-700 text-xs font-semibold transition flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                  </svg>
                  Reset
                </button>
                <button id="btn-take-snapshot" class="px-3.5 py-1.5 rounded-lg bg-wood-dark hover:bg-wood text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  Save Photo
                </button>
              </div>
            </div>

          </div>

          <!-- RIGHT: Photo Upload & Filter Customization Studio (5 Cols) -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Step 1: Upload / Choose Photo Card -->
            <div id="step1-card" class="bg-linen-100 rounded-3xl p-5 sm:p-6 shadow-md border stitch-border-dashed transition-all duration-300">
              
              <!-- Collapsed summary view (active after photo is chosen so Step 2 moves up right below 3D element) -->
              <div id="step1-collapsed" class="hidden items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-sans font-bold shadow-sm">✓</span>
                  <div>
                    <span class="text-xs font-bold text-stone-900 block" id="step1-loaded-title">Photo Selected</span>
                    <span class="text-[11px] text-stone-500 block">Step 2 Pan & Crop ready below</span>
                  </div>
                </div>
                <button type="button" id="btn-reopen-upload" class="px-3 py-1.5 rounded-xl bg-linen-200 hover:bg-terracotta hover:text-white text-stone-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-sm active:scale-95">
                  <span>Change Photo</span>
                  <span>↺</span>
                </button>
              </div>

              <!-- Expanded upload controls -->
              <div id="step1-expanded">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                    Upload Your Pet's Photo
                  </h3>
                </div>

                <input type="file" id="file-input" accept="image/*" class="hidden" />

                <button type="button" id="btn-trigger-upload" class="w-full py-3.5 px-6 rounded-2xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Click Here to Choose Photo / Camera</span>
                </button>

                <!-- Quick Demo Samples -->
                <div class="mt-3">
                  <p class="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Or test with a sample pet:</p>
                  <div class="grid grid-cols-2 gap-2">
                    <button data-sample="cat" class="sample-pet-btn text-xs py-2 px-3 rounded-xl bg-linen-200 hover:bg-linen-300 font-medium text-stone-800 border border-linen-300 text-center transition flex items-center justify-center gap-1.5">
                      <span class="text-base">🐱</span>
                      <span>Milo (Cat)</span>
                    </button>
                    <button data-sample="golden" class="sample-pet-btn text-xs py-2 px-3 rounded-xl bg-linen-200 hover:bg-linen-300 font-medium text-stone-800 border border-linen-300 text-center transition flex items-center justify-center gap-1.5">
                      <span class="text-base">🐕</span>
                      <span>Bella (Golden)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Full-Range Pan & Zoom Card -->
            <div class="bg-linen-100 rounded-3xl p-6 shadow-md border stitch-border-dashed space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-wood text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                  Crop & Full-Range Pan
                </h3>
                <button id="btn-reset-pan-zoom" class="text-xs text-terracotta hover:underline font-semibold">
                  Reset Center
                </button>
              </div>

              <div>
                <div class="flex justify-between text-xs font-medium text-stone-700 mb-1">
                  <span>Photo Zoom</span>
                  <span id="zoom-val">1.2x</span>
                </div>
                <input type="range" id="zoom-slider" min="0.5" max="4.0" step="0.05" value="1.2" class="w-full accent-terracotta cursor-pointer" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <div class="flex justify-between text-[11px] font-medium text-stone-600 mb-1">
                    <span>Pan X</span>
                    <span id="pan-x-val">0px</span>
                  </div>
                  <input type="range" id="pan-x-slider" min="-700" max="700" step="5" value="0" class="w-full accent-wood cursor-pointer" />
                </div>
                <div>
                  <div class="flex justify-between text-[11px] font-medium text-stone-600 mb-1">
                    <span>Pan Y</span>
                    <span id="pan-y-val">0px</span>
                  </div>
                  <input type="range" id="pan-y-slider" min="-700" max="700" step="5" value="0" class="w-full accent-wood cursor-pointer" />
                </div>
              </div>

              <!-- Background Isolation with AI -->
              <div class="p-3.5 rounded-2xl bg-linen-200/70 border border-linen-300 space-y-2">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <span class="text-terracotta">✨</span> AI Subject Isolation
                    </span>
                    <p class="text-[11px] text-stone-500">Auto-detects pet contour; protects eyes, face, and fur details.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="toggle-bg-removal" class="sr-only peer" />
                    <div class="w-8 h-4 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-terracotta"></div>
                  </label>
                </div>
                <!-- AI Loading Progress Feedback -->
                <div id="ai-loading-box" class="hidden mt-2 p-2.5 rounded-xl bg-white/90 border border-linen-300 text-xs shadow-inner">
                  <div class="flex items-center justify-between mb-1.5">
                    <span id="ai-status-text" class="text-[11px] font-semibold text-wood-dark flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
                      <span>AI Model analyzing pet...</span>
                    </span>
                    <span id="ai-percent-text" class="text-[10px] text-stone-600 font-mono font-bold">0%</span>
                  </div>
                  <div class="w-full bg-linen-300 h-2 rounded-full overflow-hidden">
                    <div id="ai-progress-fill" class="bg-terracotta h-full w-0 transition-all duration-200 rounded-full"></div>
                  </div>
                </div>

                <!-- Refine Cutout Button (Appears when cutout is active) -->
                <div id="refine-cutout-container" class="hidden pt-1.5 border-t border-linen-300/80 mt-2">
                  <button type="button" id="btn-open-refine-brush" class="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-linen-100 text-stone-800 text-xs font-semibold border border-linen-300 shadow-sm flex items-center justify-center gap-2 transition hover:border-terracotta active:scale-95 cursor-pointer">
                    <svg class="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Fine-Tune & Brush Cutout Area</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 3: CHOOSE NEEDLEWORK STYLE -->
            <div class="bg-linen-100 rounded-3xl p-6 shadow-md border stitch-border-dashed space-y-5">
              <div class="flex items-center justify-between">
                <h3 class="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                  Choose Needlework Style
                </h3>
              </div>

              <!-- Filter Mode Switcher -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button data-style="fur" class="filter-style-btn py-2.5 px-3 rounded-xl text-xs font-bold border-2 border-terracotta bg-terracotta/10 text-terracotta-dark text-center shadow-sm transition active:scale-95">
                  🪡 Thread-Paint
                </button>
                <button data-style="cross" class="filter-style-btn py-2.5 px-3 rounded-xl text-xs font-medium border border-linen-300 hover:bg-linen-200 text-stone-700 text-center transition active:scale-95">
                  ✖ Cross-Stitch
                </button>
                <button data-style="tent" class="filter-style-btn py-2.5 px-3 rounded-xl text-xs font-medium border border-linen-300 hover:bg-linen-200 text-stone-700 text-center transition active:scale-95">
                  ╱ Needlepoint
                </button>
                <button data-style="photo" class="filter-style-btn py-2.5 px-3 rounded-xl text-xs font-medium border border-linen-300 hover:bg-linen-200 text-stone-700 text-center transition active:scale-95">
                  🖼 Original Photo
                </button>
              </div>

              <!-- Style Description & Features Card -->
              <div id="style-desc-card" class="p-4 rounded-2xl bg-linen-200/70 border border-linen-300 text-xs text-stone-700 space-y-1.5">
                <p id="style-desc-title" class="font-serif font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  🪡 Silk Thread-Painting
                </p>
                <p id="style-desc-text" class="text-stone-600">
                  Delicate layered silk embroidery with organic directional fur flow and subtle sheen.
                </p>
              </div>

              <!-- Order / Commission Action -->
              <button type="button" id="btn-proceed-commission" class="block text-center w-full py-3.5 px-6 rounded-full bg-wood-dark hover:bg-wood text-white font-semibold text-sm transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer">
                Proceed to Commission with This Image →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>

    <!-- Brush Fine-Tune Modal -->
    <div id="refine-modal" class="fixed inset-0 z-50 bg-stone-900/75 backdrop-blur-sm hidden flex items-center justify-center p-3 sm:p-6">
      <div class="bg-linen-100 rounded-3xl shadow-2xl border border-linen-300 max-w-3xl w-full flex flex-col max-h-[92vh] overflow-hidden">
        <!-- Header -->
        <div class="p-4 sm:p-5 border-b border-linen-300 flex items-center justify-between bg-linen-200/60">
          <div>
            <h3 class="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>🖌️</span> Fine-Tune Pet Cutout
            </h3>
            <p class="text-xs text-stone-600 mt-0.5">Use the brush to add back missed ears/paws or erase extra background.</p>
          </div>
          <button id="btn-close-refine-modal" class="w-8 h-8 rounded-full bg-linen-300 hover:bg-linen-400 text-stone-700 flex items-center justify-center text-sm font-bold transition">
            ✕
          </button>
        </div>

        <!-- Brush Toolbar -->
        <div class="px-4 py-3 bg-linen-200/40 border-b border-linen-300 flex flex-wrap items-center justify-between gap-3">
          <!-- Mode Toggle -->
          <div class="flex items-center gap-1.5" id="brush-mode-group">
            <button id="btn-brush-restore" class="px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-emerald-600 bg-emerald-50 text-emerald-800 flex items-center gap-1.5 shadow-sm transition">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Keep / Restore</span>
            </button>
            <button id="btn-brush-erase" class="px-3 py-1.5 rounded-xl text-xs font-medium border border-linen-300 hover:bg-white text-stone-700 flex items-center gap-1.5 transition">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Erase Background</span>
            </button>
          </div>

          <!-- Brush Size Slider -->
          <div class="flex items-center gap-2 text-xs">
            <span class="font-medium text-stone-600">Brush Size:</span>
            <input type="range" id="brush-size-slider" min="6" max="90" value="28" class="w-24 sm:w-36 accent-terracotta cursor-pointer" />
            <span id="brush-size-val" class="font-mono text-[11px] text-stone-600 w-8">28px</span>
          </div>

          <!-- Undo -->
          <button id="btn-brush-undo" class="px-3 py-1.5 rounded-lg bg-white border border-linen-300 text-stone-700 text-xs font-semibold hover:bg-linen-200 transition flex items-center gap-1.5 shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a5 5 0 015 5v2a5 5 0 01-5 5H6" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6L3 10l4 4" />
            </svg>
            <span>Undo</span>
          </button>
        </div>

        <!-- Canvas Stage -->
        <div class="flex-1 p-4 overflow-auto flex items-center justify-center bg-stone-900/10 min-h-[300px] max-h-[55vh]">
          <div id="refine-canvas-wrapper" class="relative shadow-md rounded-2xl overflow-hidden border border-stone-300 select-none bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]">
            <canvas id="refine-editor-canvas" class="block max-w-full max-h-[50vh] object-contain cursor-crosshair touch-none"></canvas>
          </div>
        </div>

        <!-- Helper hint + Footer -->
        <div class="px-4 py-3 bg-linen-200/70 border-t border-linen-300 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-[11px] text-stone-500">
            <span class="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>Red tinted areas will be removed; clear areas are kept.</span>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-cancel-refine" class="px-4 py-2 rounded-xl border border-linen-400 bg-white hover:bg-linen-200 text-stone-700 text-xs font-semibold transition">
              Cancel
            </button>
            <button id="btn-save-refine" class="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold shadow-md transition flex items-center gap-1.5">
              <span>Apply to Keepsake</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  initPreviewLogic();
}

function initPreviewLogic() {
  const container = document.getElementById('three-keychain-container');
  if (!container) return;

  if (activeViewer) {
    activeViewer.destroy();
    activeViewer = null;
  }

  const viewer = new Keychain3DViewer(container);
  activeViewer = viewer;
  const filterEngine = new EmbroideryFilterEngine();

  let currentImage = new Image();
  currentImage.crossOrigin = 'anonymous';
  let currentCutoutImage = null;
  let currentMaskCanvas = null;
  let workingMaskCanvas = null;
  let maskHistory = [];

  currentImage.onload = () => {
    applyFilterTo3D();
  };
  currentImage.src = './assets/preset_extracted.jpg';

  // AI Loading UI Helpers
  function showAiLoading(show) {
    const box = document.getElementById('ai-loading-box');
    if (box) {
      if (show) box.classList.remove('hidden');
      else box.classList.add('hidden');
    }
  }

  function updateAiProgress(text, pct) {
    const statusEl = document.getElementById('ai-status-text');
    const pctEl = document.getElementById('ai-percent-text');
    const fillEl = document.getElementById('ai-progress-fill');
    if (statusEl && text) {
      statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span><span>${text}</span>`;
    }
    if (pctEl) pctEl.textContent = `${pct}%`;
    if (fillEl) fillEl.style.width = `${pct}%`;
  }

  // Embroidery Style Presets (Includes user's exact preset values)
  const stylePresets = {
    fur: {
      zoom: 0.85,
      offsetX: 45,
      offsetY: 45,
      removeBg: false,
      bgTolerance: 10,
      filterMode: "fur",
      gridSize: 10,
      threadThickness: 2.4,
      stitchStrength: 0.65,
      photoBlend: 0,
      shadowStrength: 0.05,
      sheenStrength: 0.1,
      colorQuantize: 15,
      fabricWeaveStrength: 0.15,
      furLength: 9,
      furAngle: 0.3,
      tentAngle: 45
    },
    cross: {
      zoom: 0.85,
      offsetX: 45,
      offsetY: 45,
      removeBg: false,
      bgTolerance: 10,
      filterMode: "cross",
      gridSize: 7,
      threadThickness: 3.2,
      stitchStrength: 0.55,
      photoBlend: 0,
      shadowStrength: 0.25,
      sheenStrength: 0,
      colorQuantize: 15,
      fabricWeaveStrength: 0,
      furLength: 8,
      furAngle: 0.3,
      tentAngle: 45
    },
    tent: {
      zoom: 0.85,
      offsetX: 45,
      offsetY: 45,
      removeBg: false,
      bgTolerance: 10,
      filterMode: "tent",
      gridSize: 6,
      threadThickness: 4.4,
      stitchStrength: 0.45,
      photoBlend: 0,
      shadowStrength: 0,
      sheenStrength: 0,
      colorQuantize: 15,
      fabricWeaveStrength: 0,
      furLength: 8,
      furAngle: 0.3,
      tentAngle: 5
    },
    photo: {
      zoom: 1.0,
      offsetX: 0,
      offsetY: 0,
      removeBg: false,
      bgTolerance: 10,
      filterMode: "photo",
      gridSize: 10,
      threadThickness: 2.4,
      stitchStrength: 1.0,
      photoBlend: 0,
      shadowStrength: 0,
      sheenStrength: 0,
      colorQuantize: 0,
      fabricWeaveStrength: 0,
      furLength: 8,
      furAngle: 0.3,
      tentAngle: 45
    }
  };

  const styleDescriptions = {
    fur: {
      title: "🪡 Silk Thread-Painting",
      text: "Delicate layered silk embroidery with organic directional fur flow and subtle sheen."
    },
    cross: {
      title: "✖ Authentic Cross-Stitch",
      text: "Handcrafted 3D layered cotton floss with crossing knots and textured stitch relief."
    },
    tent: {
      title: "╱ Continental Needlepoint",
      text: "Dense European tapestry stitch with plump 4.4px diagonal wool/cotton ribs."
    },
    photo: {
      title: "🖼 Original Photo",
      text: "Pure unmodified photo with clean hoop framing and background cutout support."
    }
  };

  function updateStyleDescription(mode) {
    const titleEl = document.getElementById('style-desc-title');
    const textEl = document.getElementById('style-desc-text');
    const info = styleDescriptions[mode] || styleDescriptions.fur;
    if (titleEl) titleEl.textContent = info.title;
    if (textEl) textEl.textContent = info.text;
  }

  // Master Settings Object initialized with user's Thread-Painting values
  let currentSettings = { ...stylePresets.fur };

  function syncSlidersFromSettings() {
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomVal = document.getElementById('zoom-val');
    if (zoomSlider) zoomSlider.value = currentSettings.zoom;
    if (zoomVal) zoomVal.textContent = `${currentSettings.zoom.toFixed(2)}x`;

    const panXSlider = document.getElementById('pan-x-slider');
    const panXVal = document.getElementById('pan-x-val');
    if (panXSlider) panXSlider.value = currentSettings.offsetX;
    if (panXVal) panXVal.textContent = `${currentSettings.offsetX}px`;

    const panYSlider = document.getElementById('pan-y-slider');
    const panYVal = document.getElementById('pan-y-val');
    if (panYSlider) panYSlider.value = currentSettings.offsetY;
    if (panYVal) panYVal.textContent = `${currentSettings.offsetY}px`;

    const toggleBg = document.getElementById('toggle-bg-removal');
    if (toggleBg) toggleBg.checked = currentSettings.removeBg;

    updateStyleDescription(currentSettings.filterMode);
  }

  async function applyFilterTo3D() {
    if (!currentImage || !currentImage.complete) return;

    let imgToProcess = currentImage;
    const refineContainer = document.getElementById('refine-cutout-container');

    if (currentSettings.removeBg) {
      if (!currentCutoutImage) {
        showAiLoading(true);
        updateAiProgress('Starting AI subject isolation...', 15);
        try {
          const segData = await getAiSegmentedData(currentImage, (statusText, pct) => {
            updateAiProgress(statusText, pct);
          });
          if (segData) {
            currentCutoutImage = segData.cutoutImg;
            currentMaskCanvas = segData.maskCanvas;
          }
        } catch (err) {
          console.error('AI background removal error:', err);
          currentCutoutImage = null;
          currentMaskCanvas = null;
        } finally {
          showAiLoading(false);
        }
      }
      if (currentCutoutImage) {
        imgToProcess = currentCutoutImage;
      }
      if (refineContainer && currentMaskCanvas) {
        refineContainer.classList.remove('hidden');
      }
    } else {
      if (refineContainer) {
        refineContainer.classList.add('hidden');
      }
    }

    const filteredCanvas = filterEngine.processImage(imgToProcess, currentSettings);
    viewer.updateEmbroideryTexture(filteredCanvas);
  }

  // Display initial settings
  syncSlidersFromSettings();

  // 1. File Upload & Collapsible Controls
  const fileInput = document.getElementById('file-input');
  const triggerBtn = document.getElementById('btn-trigger-upload');
  const btnReopen = document.getElementById('btn-reopen-upload');

  function collapseStep1(petName = 'Photo Selected') {
    const collapsed = document.getElementById('step1-collapsed');
    const expanded = document.getElementById('step1-expanded');
    const titleEl = document.getElementById('step1-loaded-title');
    if (collapsed && expanded) {
      collapsed.classList.remove('hidden');
      collapsed.classList.add('flex');
      expanded.classList.add('hidden');
      if (titleEl) titleEl.textContent = `✓ ${petName}`;
    }
  }

  function expandStep1() {
    const collapsed = document.getElementById('step1-collapsed');
    const expanded = document.getElementById('step1-expanded');
    if (collapsed && expanded) {
      collapsed.classList.add('hidden');
      collapsed.classList.remove('flex');
      expanded.classList.remove('hidden');
    }
  }

  triggerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput?.click();
  });

  btnReopen?.addEventListener('click', () => {
    expandStep1();
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      loadFile(e.target.files[0]);
    }
  });

  function loadFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        currentImage = img;
        currentCutoutImage = null;
        currentMaskCanvas = null;
        document.getElementById('refine-cutout-container')?.classList.add('hidden');
        collapseStep1(file.name ? file.name.substring(0, 20) : 'Photo Uploaded');
        applyFilterTo3D();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  // 2. Demo Sample Pets
  document.querySelectorAll('.sample-pet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sample = btn.dataset.sample;
      currentCutoutImage = null;
      currentMaskCanvas = null;
      document.getElementById('refine-cutout-container')?.classList.add('hidden');
      collapseStep1(sample === 'cat' ? 'Milo (Cat)' : 'Bella (Golden)');
      if (sample === 'boxer') {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          currentImage = img;
          applyFilterTo3D();
        };
        img.src = './assets/keychain_ref.png';
      } else if (sample === 'cat') {
        createSamplePetImage('cat');
      } else if (sample === 'golden') {
        createSamplePetImage('golden');
      }
    });
  });

  function createSamplePetImage(petType) {
    const c = document.createElement('canvas');
    c.width = 600;
    c.height = 600;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#C2B8A3';
    ctx.fillRect(0, 0, 600, 600);
    ctx.save();
    ctx.translate(300, 310);

    if (petType === 'cat') {
      ctx.fillStyle = '#654321'; ctx.beginPath(); ctx.arc(0, 0, 160, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-130, -100); ctx.lineTo(-160, -210); ctx.lineTo(-50, -150); ctx.fill();
      ctx.beginPath(); ctx.moveTo(130, -100); ctx.lineTo(160, -210); ctx.lineTo(50, -150); ctx.fill();
      ctx.fillStyle = '#E8DEC8'; ctx.beginPath(); ctx.arc(0, 45, 75, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#2A9D8F'; ctx.beginPath();
      ctx.ellipse(-60, -20, 20, 30, 0, 0, Math.PI * 2);
      ctx.ellipse(60, -20, 20, 30, 0, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#DEB887'; ctx.beginPath(); ctx.arc(0, 0, 170, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#C68B59'; ctx.beginPath();
      ctx.ellipse(-160, 20, 45, 120, 0.2, 0, Math.PI * 2);
      ctx.ellipse(160, 20, 45, 120, -0.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#F5DEB3'; ctx.beginPath(); ctx.ellipse(0, 45, 85, 65, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(0, 25, 26, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    const img = new Image();
    img.onload = () => {
      currentImage = img;
      currentCutoutImage = null;
      currentMaskCanvas = null;
      document.getElementById('refine-cutout-container')?.classList.add('hidden');
      applyFilterTo3D();
    };
    img.src = c.toDataURL();
  }

  // 3. Pan & Zoom Sliders
  const zoomSlider = document.getElementById('zoom-slider');
  const zoomVal = document.getElementById('zoom-val');
  zoomSlider?.addEventListener('input', (e) => {
    currentSettings.zoom = parseFloat(e.target.value);
    if (zoomVal) zoomVal.textContent = `${currentSettings.zoom.toFixed(1)}x`;
    applyFilterTo3D();
  });

  const panXSlider = document.getElementById('pan-x-slider');
  const panXVal = document.getElementById('pan-x-val');
  panXSlider?.addEventListener('input', (e) => {
    currentSettings.offsetX = parseFloat(e.target.value);
    if (panXVal) panXVal.textContent = `${currentSettings.offsetX}px`;
    applyFilterTo3D();
  });

  const panYSlider = document.getElementById('pan-y-slider');
  const panYVal = document.getElementById('pan-y-val');
  panYSlider?.addEventListener('input', (e) => {
    currentSettings.offsetY = parseFloat(e.target.value);
    if (panYVal) panYVal.textContent = `${currentSettings.offsetY}px`;
    applyFilterTo3D();
  });

  document.getElementById('btn-reset-pan-zoom')?.addEventListener('click', () => {
    currentSettings.zoom = 1.2;
    currentSettings.offsetX = 0;
    currentSettings.offsetY = 0;
    if (zoomSlider) zoomSlider.value = "1.2";
    if (zoomVal) zoomVal.textContent = "1.2x";
    if (panXSlider) panXSlider.value = "0";
    if (panXVal) panXVal.textContent = "0px";
    if (panYSlider) panYSlider.value = "0";
    if (panYVal) panYVal.textContent = "0px";
    applyFilterTo3D();
  });

  const toggleBg = document.getElementById('toggle-bg-removal');
  toggleBg?.addEventListener('change', async (e) => {
    currentSettings.removeBg = e.target.checked;
    await applyFilterTo3D();
  });

  // Filter Mode Switcher
  const filterBtns = document.querySelectorAll('.filter-style-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = 'filter-style-btn py-2.5 px-3 rounded-xl text-xs font-medium border border-linen-300 hover:bg-linen-200 text-stone-700 text-center transition active:scale-95';
      });
      btn.className = 'filter-style-btn py-2.5 px-3 rounded-xl text-xs font-bold border-2 border-terracotta bg-terracotta/10 text-terracotta-dark text-center shadow-sm transition active:scale-95';
      const style = btn.dataset.style;
      if (stylePresets[style]) {
        // Keep current pan/zoom & bg removal setting while loading style preset
        const curZoom = currentSettings.zoom;
        const curOffX = currentSettings.offsetX;
        const curOffY = currentSettings.offsetY;
        const curBg = currentSettings.removeBg;

        currentSettings = { ...stylePresets[style] };
        currentSettings.zoom = curZoom;
        currentSettings.offsetX = curOffX;
        currentSettings.offsetY = curOffY;
        currentSettings.removeBg = curBg;

        syncSlidersFromSettings();
      } else {
        currentSettings.filterMode = style;
        updateStyleDescription(style);
      }

      applyFilterTo3D();
    });
  });

  // 4. 3D Viewer Zoom In / Out Buttons
  document.getElementById('btn-zoom-in-3d')?.addEventListener('click', () => {
    viewer.zoomIn();
  });

  document.getElementById('btn-zoom-out-3d')?.addEventListener('click', () => {
    viewer.zoomOut();
  });

  // Wood Finish Switcher
  document.querySelectorAll('.wood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wood-btn').forEach(b => {
        b.className = 'wood-btn flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border border-linen-300 hover:bg-white text-stone-700';
      });
      btn.className = 'wood-btn flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border-2 border-wood bg-white text-wood-dark shadow-sm';
      viewer.setWoodFinish(btn.dataset.wood);
    });
  });

  // Metal Finish Switcher
  document.querySelectorAll('.metal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.metal-btn').forEach(b => {
        b.className = 'metal-btn flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border border-linen-300 hover:bg-white text-stone-700';
      });
      btn.className = 'metal-btn flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border-2 border-stone-400 bg-white text-stone-800 shadow-sm';
      viewer.setMetalFinish(btn.dataset.metal);
    });
  });

  // Reset & Snapshot
  document.getElementById('btn-reset-view')?.addEventListener('click', () => {
    viewer.resetView();
  });

  document.getElementById('btn-take-snapshot')?.addEventListener('click', () => {
    const dataUrl = viewer.captureSnapshot();
    const link = document.createElement('a');
    link.download = 'PetEmbro-3D-Keepsake-Preview.png';
    link.href = dataUrl;
    link.click();
  });

  // Proceed to Commission with This Image button handler
  document.getElementById('btn-proceed-commission')?.addEventListener('click', () => {
    try {
      const dataUrl = viewer.captureSnapshot();
      if (dataUrl) {
        sessionStorage.setItem('petembro_attached_preview', dataUrl);
      }
    } catch (e) {
      console.warn('Could not capture snapshot for commission form', e);
    }
    const styleTitle = styleDescriptions[currentSettings.filterMode]?.title || 'Silk Thread-Painting';
    sessionStorage.setItem('petembro_attached_style', styleTitle);
    window.location.hash = '#contact';
  });

  // -------------------------------------------------------------
  // 5. Fine-Tune Brush Modal Logic
  // -------------------------------------------------------------
  const refineModal = document.getElementById('refine-modal');
  const btnOpenRefine = document.getElementById('btn-open-refine-brush');
  const btnCloseRefine = document.getElementById('btn-close-refine-modal');
  const btnCancelRefine = document.getElementById('btn-cancel-refine');
  const btnSaveRefine = document.getElementById('btn-save-refine');
  const btnRestoreMode = document.getElementById('btn-brush-restore');
  const btnEraseMode = document.getElementById('btn-brush-erase');
  const brushSizeSlider = document.getElementById('brush-size-slider');
  const brushSizeVal = document.getElementById('brush-size-val');
  const btnBrushUndo = document.getElementById('btn-brush-undo');
  const editorCanvas = document.getElementById('refine-editor-canvas');

  let brushMode = 'restore'; // 'restore' | 'erase'
  let brushSize = 28;
  let isBrushing = false;
  let overlayCanvas = null;

  function pushHistoryState() {
    if (!workingMaskCanvas) return;
    const ctx = workingMaskCanvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, workingMaskCanvas.width, workingMaskCanvas.height);
    maskHistory.push(imgData);
    if (maskHistory.length > 15) {
      maskHistory.shift();
    }
  }

  function setBrushMode(mode) {
    brushMode = mode;
    if (mode === 'restore') {
      if (btnRestoreMode) btnRestoreMode.className = 'px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-emerald-600 bg-emerald-50 text-emerald-800 flex items-center gap-1.5 shadow-sm transition';
      if (btnEraseMode) btnEraseMode.className = 'px-3 py-1.5 rounded-xl text-xs font-medium border border-linen-300 hover:bg-white text-stone-700 flex items-center gap-1.5 transition';
    } else {
      if (btnEraseMode) btnEraseMode.className = 'px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-rose-500 bg-rose-50 text-rose-800 flex items-center gap-1.5 shadow-sm transition';
      if (btnRestoreMode) btnRestoreMode.className = 'px-3 py-1.5 rounded-xl text-xs font-medium border border-linen-300 hover:bg-white text-stone-700 flex items-center gap-1.5 transition';
    }
  }

  btnRestoreMode?.addEventListener('click', () => setBrushMode('restore'));
  btnEraseMode?.addEventListener('click', () => setBrushMode('erase'));

  brushSizeSlider?.addEventListener('input', (e) => {
    brushSize = parseInt(e.target.value, 10);
    if (brushSizeVal) brushSizeVal.textContent = `${brushSize}px`;
  });

  btnBrushUndo?.addEventListener('click', () => {
    if (maskHistory.length > 1) {
      maskHistory.pop(); // remove current state
      const prevState = maskHistory[maskHistory.length - 1];
      const ctx = workingMaskCanvas.getContext('2d');
      ctx.putImageData(prevState, 0, 0);
      drawEditor(0, 0, false);
    }
  });

  function openRefineModal() {
    if (!currentImage || !currentMaskCanvas || !editorCanvas) return;

    const imgW = currentImage.naturalWidth || currentImage.width;
    const imgH = currentImage.naturalHeight || currentImage.height;

    // Create a working clone of currentMaskCanvas
    workingMaskCanvas = document.createElement('canvas');
    workingMaskCanvas.width = imgW;
    workingMaskCanvas.height = imgH;
    const wCtx = workingMaskCanvas.getContext('2d');
    wCtx.drawImage(currentMaskCanvas, 0, 0, imgW, imgH);

    // Prepare temp overlay buffer
    overlayCanvas = document.createElement('canvas');
    overlayCanvas.width = imgW;
    overlayCanvas.height = imgH;

    // Setup editor canvas dimensions
    editorCanvas.width = imgW;
    editorCanvas.height = imgH;

    // Setup history
    maskHistory = [];
    pushHistoryState();

    setBrushMode('restore');
    refineModal?.classList.remove('hidden');
    drawEditor(0, 0, false);
  }

  function closeRefineModal() {
    refineModal?.classList.add('hidden');
    isBrushing = false;
  }

  btnOpenRefine?.addEventListener('click', openRefineModal);
  btnCloseRefine?.addEventListener('click', closeRefineModal);
  btnCancelRefine?.addEventListener('click', closeRefineModal);

  btnSaveRefine?.addEventListener('click', async () => {
    if (!workingMaskCanvas || !currentImage) return;

    const originalText = btnSaveRefine.innerHTML;
    btnSaveRefine.innerHTML = `<span>Applying...</span>`;
    btnSaveRefine.disabled = true;

    try {
      currentCutoutImage = await createCutoutFromMask(currentImage, workingMaskCanvas);
      
      // Update master currentMaskCanvas
      currentMaskCanvas = document.createElement('canvas');
      currentMaskCanvas.width = workingMaskCanvas.width;
      currentMaskCanvas.height = workingMaskCanvas.height;
      currentMaskCanvas.getContext('2d').drawImage(workingMaskCanvas, 0, 0);

      closeRefineModal();
      applyFilterTo3D();
    } catch (err) {
      console.error('Failed applying custom mask:', err);
    } finally {
      btnSaveRefine.innerHTML = originalText;
      btnSaveRefine.disabled = false;
    }
  });

  function drawEditor(cursorX = 0, cursorY = 0, showCursor = false) {
    if (!editorCanvas || !currentImage || !workingMaskCanvas || !overlayCanvas) return;
    const ctx = editorCanvas.getContext('2d');
    const w = editorCanvas.width;
    const h = editorCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw base photo
    ctx.drawImage(currentImage, 0, 0, w, h);

    // 2. Build red tint over background areas (where workingMask has no alpha)
    const oCtx = overlayCanvas.getContext('2d');
    oCtx.clearRect(0, 0, w, h);
    oCtx.fillStyle = 'rgba(239, 68, 68, 0.44)'; // translucent red
    oCtx.fillRect(0, 0, w, h);
    oCtx.globalCompositeOperation = 'destination-out';
    oCtx.drawImage(workingMaskCanvas, 0, 0, w, h);
    oCtx.globalCompositeOperation = 'source-over';

    // Draw red tint overlay onto editor canvas
    ctx.drawImage(overlayCanvas, 0, 0, w, h);

    // 3. Draw cursor ring if active
    if (showCursor) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, brushSize / 2, 0, Math.PI * 2);
      ctx.lineWidth = Math.max(2, w / 350);
      ctx.strokeStyle = brushMode === 'restore' ? '#10b981' : '#f43f5e';
      ctx.stroke();
      ctx.restore();
    }
  }

  function getCanvasCoords(e) {
    const rect = editorCanvas.getBoundingClientRect();
    const scaleX = editorCanvas.width / rect.width;
    const scaleY = editorCanvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function paintBrush(cx, cy) {
    if (!workingMaskCanvas) return;
    const ctx = workingMaskCanvas.getContext('2d');
    ctx.save();
    if (brushMode === 'restore') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.globalCompositeOperation = 'destination-out';
    }
    ctx.beginPath();
    ctx.arc(cx, cy, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  editorCanvas?.addEventListener('pointerdown', (e) => {
    isBrushing = true;
    editorCanvas.setPointerCapture(e.pointerId);
    const { x, y } = getCanvasCoords(e);
    paintBrush(x, y);
    drawEditor(x, y, true);
  });

  editorCanvas?.addEventListener('pointermove', (e) => {
    const { x, y } = getCanvasCoords(e);
    if (isBrushing) {
      paintBrush(x, y);
    }
    drawEditor(x, y, true);
  });

  function stopBrushing() {
    if (isBrushing) {
      isBrushing = false;
      pushHistoryState();
      drawEditor(0, 0, false);
    }
  }

  editorCanvas?.addEventListener('pointerup', (e) => {
    try { editorCanvas.releasePointerCapture(e.pointerId); } catch (_) {}
    stopBrushing();
  });

  editorCanvas?.addEventListener('pointercancel', stopBrushing);
  editorCanvas?.addEventListener('pointerleave', () => {
    if (!isBrushing) {
      drawEditor(0, 0, false);
    }
  });
}

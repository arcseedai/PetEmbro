import{r as g,a as v,p as z,b as $,c as y,d as D,e as F,f as j,u as w,g as C,h as P,i as k,j as H,k as N,l as h,m as E,n as B,o as S,q as Q,s as U,t as T,v as I,S as O,w as K,x as W,y as _,z as V,A as G,B as J,C as X}from"./ContactPage-Bzt-RbDf.js";class Y{constructor(){this.currentRoute="home",this.init()}init(){var e;window.addEventListener("hashchange",()=>this.handleRoute()),this.handleRoute(),g(),this.bindToolbarEvents(),(e=document.getElementById("btn-close-tip"))==null||e.addEventListener("click",()=>{var t;(t=document.getElementById("customizer-tip"))==null||t.remove()}),document.addEventListener("click",t=>{(t.target.closest("#footer-edit-socials-btn")||t.target.closest(".customizer-socials-trigger"))&&(t.preventDefault(),this.openSocialsModal()),(t.target.closest(".btn-manage-commission-categories")||t.target.closest("#btn-customizer-categories"))&&(t.preventDefault(),this.openCommissionCategoriesModal())})}handleRoute(){const e=window.location.hash.replace("#","")||"home",o=["home","preview","portfolio","about","contact"].includes(e)?e:"home";switch(this.currentRoute=o,document.querySelectorAll(".customizer-nav-btn").forEach(d=>{d.dataset.route===o?d.className="customizer-nav-btn px-2.5 py-1 rounded-lg bg-terracotta text-white font-semibold transition":d.className="customizer-nav-btn px-2.5 py-1 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition"}),v(o),z(o),o){case"home":$();break;case"preview":j();break;case"portfolio":F();break;case"about":D();break;case"contact":y();break;default:$()}setTimeout(()=>{this.applyTextEditableBindings(),this.applyImageReplacerBindings(),o==="portfolio"&&this.injectPortfolioEditorControls(),o==="about"&&this.injectAboutFaqControls()},50),window.scrollTo({top:0,behavior:"smooth"})}applyImageReplacerBindings(){document.querySelectorAll("[data-image-key]").forEach(t=>{const o=t.parentElement;if(!o||o.querySelector(".customizer-img-badge"))return;getComputedStyle(o).position==="static"&&(o.style.position="relative");const d=t.dataset.imageKey,n=document.createElement("label");n.className="customizer-img-badge absolute top-3 right-3 z-30 px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-terracotta text-white text-[11px] font-semibold shadow-xl border border-linen-300/40 cursor-pointer flex items-center gap-1.5 transition transform hover:scale-105",n.innerHTML=`
        <span>📷</span>
        <span>Replace Photo</span>
        <input type="file" accept="image/*" class="hidden customizer-inline-img-input" data-img-key="${d}" />
      `,o.appendChild(n);const s=n.querySelector(".customizer-inline-img-input");s==null||s.addEventListener("change",l=>{var u;const a=(u=l.target.files)==null?void 0:u[0];if(!a)return;const r=new FileReader;r.onload=()=>{w(d,r.result),t.src=r.result,this.showToast(`Updated image for "${d}"`)},r.readAsDataURL(a)})})}applyTextEditableBindings(){document.querySelectorAll("[data-content-key]").forEach(t=>{t.contentEditable="true",t.spellcheck=!1,t.classList.add("customizer-editable");const o=t.dataset.contentKey;t.title=`Click to edit (${o})`,t.onblur=()=>{const d=t.innerText.trim();w(o,d),this.showToast(`Saved "${o}"`)},t.onclick=d=>{t.tagName==="A"&&d.preventDefault()}})}injectPortfolioEditorControls(){var d;const t=C().portfolioItems||[],o=document.getElementById("filter-tabs");if(o&&!document.getElementById("customizer-add-artwork-bar")){const n=document.createElement("div");n.id="customizer-add-artwork-bar",n.className="flex flex-col items-center gap-2 mb-8",n.innerHTML=`
        <button id="btn-add-portfolio-item" class="px-6 py-3 rounded-full bg-wood-dark hover:bg-wood text-white font-semibold text-sm shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2 border-2 border-wood-light">
          <span class="text-lg">➕</span>
          <span>Add New Portfolio Artwork</span>
        </button>
        <p class="text-xs text-stone-600 flex items-center gap-1.5 bg-linen-200/80 px-3 py-1 rounded-full border border-linen-300">
          <span class="text-stone-400 font-mono font-bold">⠿</span> Drag and drop cards to reorder your portfolio gallery
        </p>
      `,o.parentNode.insertBefore(n,o),(d=document.getElementById("btn-add-portfolio-item"))==null||d.addEventListener("click",()=>{this.openPortfolioModal()})}document.querySelectorAll(".portfolio-card").forEach(n=>{var u,i,f;const s=parseInt(n.dataset.portfolioId,10);if(!s||n.querySelector(".customizer-card-actions"))return;const l=t.find(p=>p.id===s);if(!l)return;const a=document.createElement("div");a.className="customizer-card-actions flex items-center justify-between gap-1 p-2 bg-stone-900/95 backdrop-blur text-white text-[11px] border-b border-linen-300 select-none",a.innerHTML=`
        <button class="px-2 py-1 rounded ${l.featured?"bg-amber-600 hover:bg-amber-500 text-white font-bold":"bg-stone-800 hover:bg-stone-700 text-stone-300"} transition flex items-center gap-1 btn-toggle-featured flex-shrink-0" data-item-id="${s}" title="${l.featured?"Marked as Featured in Header Showcase (Click to unfeature)":"Click to feature in Header Showcase"}">
          <span>${l.featured?"★ Featured":"☆ Feature"}</span>
        </button>
        <div class="flex items-center gap-1 flex-shrink-0">
          <label class="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer transition flex items-center gap-1" title="Replace photo">
            <span>📷</span>
            <span class="hidden sm:inline">Photo</span>
            <input type="file" accept="image/*" class="hidden customizer-replace-photo-input" data-item-id="${s}">
          </label>
          <button class="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition flex items-center gap-1 btn-edit-portfolio" data-item-id="${s}" title="Edit text and specifications">
            <span>✏️</span>
            <span class="hidden sm:inline">Edit</span>
          </button>
          <button class="px-2 py-1 rounded bg-red-900/80 hover:bg-red-800 text-white transition flex items-center gap-1 btn-delete-portfolio" data-item-id="${s}" title="Delete artwork">
            <span>🗑️</span>
          </button>
        </div>
      `,n.prepend(a),n.setAttribute("draggable","true"),n.classList.add("transition-all","duration-200"),n.addEventListener("dragstart",p=>{p.dataTransfer.setData("text/plain",String(s)),p.dataTransfer.effectAllowed="move",n.classList.add("opacity-40","border-dashed","border-terracotta"),window._customizerDraggingId=s}),n.addEventListener("dragend",()=>{n.classList.remove("opacity-40","border-dashed","border-terracotta"),document.querySelectorAll(".portfolio-card").forEach(p=>{p.classList.remove("ring-4","ring-terracotta/60","scale-[1.02]")}),window._customizerDraggingId=null}),n.addEventListener("dragover",p=>{p.preventDefault(),p.dataTransfer.dropEffect="move",window._customizerDraggingId&&window._customizerDraggingId!==s&&n.classList.add("ring-4","ring-terracotta/60","scale-[1.02]")}),n.addEventListener("dragleave",()=>{n.classList.remove("ring-4","ring-terracotta/60","scale-[1.02]")}),n.addEventListener("drop",p=>{p.preventDefault(),n.classList.remove("ring-4","ring-terracotta/60","scale-[1.02]");const c=parseInt(p.dataTransfer.getData("text/plain")||window._customizerDraggingId,10);c&&c!==s&&P(c,s)&&(this.showToast("Updated portfolio gallery order!"),this.handleRoute())}),(u=a.querySelector(".btn-toggle-featured"))==null||u.addEventListener("click",()=>{const p=!l.featured;k(s,{featured:p}),this.showToast(p?`⭐ "${l.name}" added to Featured Showcase rotation!`:`Removed "${l.name}" from showcase rotation.`),this.handleRoute()});const r=a.querySelector(".customizer-replace-photo-input");r==null||r.addEventListener("change",p=>{var m;const c=(m=p.target.files)==null?void 0:m[0];if(!c)return;const b=new FileReader;b.onload=()=>{k(s,{image:b.result}),this.showToast(`Updated photo for "${l.name}"`),this.handleRoute()},b.readAsDataURL(c)}),(i=a.querySelector(".btn-edit-portfolio"))==null||i.addEventListener("click",()=>{this.openPortfolioModal(l)}),(f=a.querySelector(".btn-delete-portfolio"))==null||f.addEventListener("click",()=>{confirm(`Are you sure you want to delete "${l.name}" from your portfolio?`)&&(H(s),this.showToast(`Deleted "${l.name}"`),this.handleRoute())})})}openPortfolioModal(e=null){var a,r;const t=!!e,o=document.getElementById("customizer-modal-container");if(!o)return;o.innerHTML=`
      <div id="portfolio-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-linen-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-6">
            <h3 class="font-serif text-2xl font-bold text-stone-900">
              ${t?"Edit Portfolio Artwork":"Add New Portfolio Artwork"}
            </h3>
            <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
          </div>

          <form id="portfolio-item-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Name *</label>
              <input type="text" name="name" required value="${(e==null?void 0:e.name)||""}" placeholder="e.g. Buster" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Additional Info *</label>
                <input type="text" name="additionalInfo" value="${(e==null?void 0:e.additionalInfo)||(e==null?void 0:e.breed)||""}" placeholder="e.g. French Bulldog, Memorial, or Custom Details" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
              </div>
              <div>
                <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Category *</label>
                <select name="category" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none">
                  <option value="keychains" ${(e==null?void 0:e.category)==="keychains"?"selected":""}>Keychains</option>
                  <option value="dogs" ${(e==null?void 0:e.category)==="dogs"?"selected":""}>Dogs</option>
                  <option value="cats" ${(e==null?void 0:e.category)==="cats"?"selected":""}>Cats</option>
                  <option value="special" ${(e==null?void 0:e.category)==="special"?"selected":""}>Small Pets & Bunnies</option>
                  <option value="memorial" ${(e==null?void 0:e.category)==="memorial"?"selected":""}>Memorials</option>
                  <option value="others" ${(e==null?void 0:e.category)==="others"?"selected":""}>Others</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Dimensions *</label>
                <input type="text" name="size" value="${(e==null?void 0:e.size)||'1.8" Beechwood Hoop'}" placeholder='e.g. 1.8" Beechwood Hoop' class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
              </div>
              <div>
                <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Stitch Time *</label>
                <input type="text" name="hours" value="${(e==null?void 0:e.hours)||"14 Hours"}" placeholder="e.g. 14 Hours" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
              </div>
            </div>

            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Artwork Photo</label>
              <div class="flex items-center gap-3">
                <input type="file" id="modal-photo-file" accept="image/*" class="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-terracotta file:text-white hover:file:bg-terracotta-dark" />
              </div>
              <p class="text-[11px] text-stone-500 mt-1">Or provide image URL:</p>
              <input type="text" id="modal-photo-url" name="image" value="${(e==null?void 0:e.image)||""}" placeholder="https://... or /assets/..." class="w-full px-3.5 py-2 rounded-xl bg-white border border-linen-300 text-stone-900 text-xs focus:ring-2 focus:ring-terracotta/40 outline-none mt-1" />
            </div>

            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Description / Caption *</label>
              <textarea name="caption" rows="3" required placeholder="Describe the thread colors, stitches, and pet details..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none">${(e==null?void 0:e.caption)||""}</textarea>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <input type="checkbox" id="modal-featured-checkbox" name="featured" ${e!=null&&e.featured?"checked":""} class="w-4 h-4 rounded text-terracotta focus:ring-terracotta" />
              <label for="modal-featured-checkbox" class="font-medium text-stone-800">Set as Featured Artwork in Header Showcase</label>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-linen-300">
              <button type="button" id="modal-cancel-btn" class="px-5 py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 font-semibold text-xs transition">Cancel</button>
              <button type="submit" class="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs shadow transition">
                ${t?"Save Changes":"Add to Portfolio"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;const d=document.getElementById("portfolio-item-form"),n=document.getElementById("modal-photo-file"),s=document.getElementById("modal-photo-url");n==null||n.addEventListener("change",u=>{var f;const i=(f=u.target.files)==null?void 0:f[0];if(i){const p=new FileReader;p.onload=()=>{s.value=p.result},p.readAsDataURL(i)}});const l=()=>{o.innerHTML=""};(a=document.getElementById("modal-close-btn"))==null||a.addEventListener("click",l),(r=document.getElementById("modal-cancel-btn"))==null||r.addEventListener("click",l),d==null||d.addEventListener("submit",u=>{u.preventDefault();const i=new FormData(d),f=i.get("category"),p={keychains:"Miniature Keychain",dogs:"Wall Hoop (Dogs)",cats:"Wall Hoop (Cats)",special:"Wall Hoop (Small Pets)",memorial:"Memorial Keepsake",others:"Other Creations"},c=i.get("additionalInfo")||"",b={name:i.get("name"),breed:c,additionalInfo:c,category:f,categoryLabel:p[f]||"Handcrafted Keepsake",size:i.get("size"),hours:i.get("hours"),image:s.value.trim()||"/assets/keychain_ref.png",caption:i.get("caption"),featured:i.get("featured")==="on"};t?(k(e.id,b),this.showToast(`Updated "${b.name}"`)):(N(b),this.showToast(`Added "${b.name}" to portfolio`)),l(),this.handleRoute()})}openSocialsModal(){const e=document.getElementById("customizer-modal-container");if(!e)return;const t=()=>{var r,u,i,f,p;const o=T(),n=C().contact||{};e.innerHTML=`
        <div id="socials-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-linen-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-5">
              <div>
                <h3 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <span>🔗</span> Manage Social Media Links
                </h3>
                <p class="text-xs text-stone-600 mt-0.5">Add, remove, or edit your social profiles. Updates appear in Navbar & Footer instantly.</p>
              </div>
              <button id="socials-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
            </div>

            <!-- Current Links List -->
            <div class="space-y-3 mb-6">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700">Active Social Profiles (${o.length})</p>
              ${o.length===0?`
                <div class="p-4 rounded-xl bg-linen-200 text-center text-xs text-stone-600">
                  No social profiles active. Add one below!
                </div>
              `:o.map((c,b)=>`
                <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-linen-300 shadow-sm" data-social-index="${b}">
                  <div class="w-9 h-9 rounded-xl bg-linen-200 text-stone-800 flex items-center justify-center flex-shrink-0">
                    ${I(c.platform)}
                  </div>
                  <div class="flex-grow">
                    <span class="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-1">${c.label||c.platform}</span>
                    <input type="url" class="social-url-input w-full px-3 py-1.5 rounded-lg bg-linen-50 border border-linen-300 text-stone-900 text-xs focus:ring-2 focus:ring-terracotta/40 outline-none" value="${c.url}" placeholder="https://..." data-link-id="${c.id}" />
                  </div>
                  <button type="button" class="btn-remove-social p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition flex-shrink-0" data-link-id="${c.id}" title="Remove this social link">
                    🗑️
                  </button>
                </div>
              `).join("")}
            </div>

            <!-- Add New Social Link Form -->
            <div class="p-4 rounded-2xl bg-linen-200/80 border border-linen-300 mb-6 space-y-3">
              <p class="text-xs font-bold uppercase tracking-wider text-wood-dark flex items-center gap-1.5">
                <span>➕</span> Add New Social Network
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select id="new-social-platform" class="px-3 py-2 rounded-xl bg-white border border-linen-300 text-xs text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none">
                  ${O.map(c=>`
                    <option value="${c.id}" data-default-url="${c.defaultUrl}">${c.label}</option>
                  `).join("")}
                </select>
                <div class="sm:col-span-2 flex gap-2">
                  <input type="url" id="new-social-url" placeholder="https://..." class="flex-grow px-3 py-2 rounded-xl bg-white border border-linen-300 text-xs text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none" />
                  <button type="button" id="btn-add-social-submit" class="px-4 py-2 rounded-xl bg-wood-dark hover:bg-wood text-white font-semibold text-xs shadow transition flex-shrink-0">
                    Add
                  </button>
                </div>
              </div>
            </div>

            <!-- WhatsApp Direct Information -->
            <div class="pt-4 border-t border-linen-300 mb-6 space-y-3">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700">WhatsApp Contact</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="block font-medium text-stone-600 mb-1">Display Phone Number</label>
                  <input type="text" id="social-whatsapp-phone" value="${n.whatsapp||""}" placeholder="+1 (555) 382-7638" class="w-full px-3 py-2 rounded-xl bg-white border border-linen-300 text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none" />
                </div>
                <div>
                  <label class="block font-medium text-stone-600 mb-1">WhatsApp Chat URL</label>
                  <input type="url" id="social-whatsapp-url" value="${n.whatsappUrl||""}" placeholder="https://wa.me/..." class="w-full px-3 py-2 rounded-xl bg-white border border-linen-300 text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none" />
                </div>
              </div>
            </div>

            <!-- Modal Action Buttons -->
            <div class="pt-4 flex items-center justify-end gap-3 border-t border-linen-300">
              <button type="button" id="socials-cancel-btn" class="px-5 py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 font-semibold text-xs transition">Close</button>
              <button type="button" id="socials-save-btn" class="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs shadow transition">Save All Changes</button>
            </div>
          </div>
        </div>
      `;const s=document.getElementById("new-social-platform"),l=document.getElementById("new-social-url");s&&l&&(l.value=((r=s.options[s.selectedIndex])==null?void 0:r.dataset.defaultUrl)||"https://",s.onchange=()=>{var c;l.value=((c=s.options[s.selectedIndex])==null?void 0:c.dataset.defaultUrl)||"https://"});const a=()=>{e.innerHTML=""};(u=document.getElementById("socials-close-btn"))==null||u.addEventListener("click",a),(i=document.getElementById("socials-cancel-btn"))==null||i.addEventListener("click",a),(f=document.getElementById("btn-add-social-submit"))==null||f.addEventListener("click",()=>{const c=s.value,m=s.options[s.selectedIndex].text,x=l.value.trim()||"https://";K({platform:c,label:m,url:x}),this.showToast(`Added ${m}`),v(this.currentRoute),g(),this.currentRoute==="contact"&&y(),t()}),document.querySelectorAll(".btn-remove-social").forEach(c=>{c.addEventListener("click",()=>{const b=c.dataset.linkId;W(b),this.showToast("Removed social link"),v(this.currentRoute),g(),this.currentRoute==="contact"&&y(),t()})}),(p=document.getElementById("socials-save-btn"))==null||p.addEventListener("click",()=>{var x,A;const c=T();document.querySelectorAll(".social-url-input").forEach(q=>{const M=q.dataset.linkId,L=c.find(R=>R.id===M);L&&(L.url=q.value.trim())}),_(c);const b=(x=document.getElementById("social-whatsapp-phone"))==null?void 0:x.value.trim(),m=(A=document.getElementById("social-whatsapp-url"))==null?void 0:A.value.trim();b!==void 0&&w("contact.whatsapp",b),m!==void 0&&w("contact.whatsappUrl",m),this.showToast("All social links saved successfully"),a(),v(this.currentRoute),g(),this.currentRoute==="contact"&&this.handleRoute()})};t()}openCommissionCategoriesModal(){const e=document.getElementById("customizer-modal-container");if(!e)return;const t=()=>{var n,s,l;const o=V();e.innerHTML=`
        <div id="categories-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-linen-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-5">
              <div>
                <h3 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <span>🛍️</span> Commission Products & Categories
                </h3>
                <p class="text-xs text-stone-600 mt-0.5">Customize the product formats and options clients select when commissioning an artwork.</p>
              </div>
              <button id="categories-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
            </div>

            <!-- Existing Categories List -->
            <div class="space-y-2.5 mb-6">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700">Active Form Options (${o.length})</p>
              ${o.length===0?`
                <div class="p-4 rounded-xl bg-linen-200 text-center text-xs text-stone-600">
                  No categories currently set. Add your first product below!
                </div>
              `:o.map((a,r)=>`
                <div class="flex items-center gap-2 p-2 rounded-2xl bg-white border border-linen-300 shadow-sm" data-category-id="${a.id}">
                  <span class="w-6 h-6 rounded-full bg-linen-200 text-stone-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0">${r+1}</span>
                  <input type="text" class="category-edit-input flex-grow text-xs font-medium text-stone-900 bg-transparent outline-none focus:ring-1 focus:ring-terracotta rounded px-2 py-1" value="${a.label}" data-category-id="${a.id}" placeholder="Product name..." />
                  <button type="button" class="btn-delete-category p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 text-sm transition" data-category-id="${a.id}" title="Remove this option">
                    🗑️
                  </button>
                </div>
              `).join("")}
            </div>

            <!-- Add New Category Form -->
            <div class="p-4 rounded-2xl bg-linen-200/80 border border-linen-300 mb-6">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">➕ Add New Category / Product</p>
              <form id="add-category-form" class="flex gap-2">
                <input type="text" id="new-category-input" required placeholder="e.g. Embroidered Denim Jacket, Tote Bag, etc." class="flex-grow px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-xs focus:ring-2 focus:ring-terracotta/40 outline-none" />
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs transition shadow flex-shrink-0">
                  Add
                </button>
              </form>
            </div>

            <!-- Footer / Done Button -->
            <div class="pt-4 border-t border-linen-300 flex items-center justify-between">
              <span class="text-[11px] text-stone-500">Auto-saves to inquiry dropdown</span>
              <button id="categories-done-btn" class="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-terracotta text-white font-semibold text-xs shadow transition">
                Done & Apply Changes
              </button>
            </div>
          </div>
        </div>
      `;const d=()=>{e.innerHTML="",this.handleRoute()};(n=document.getElementById("categories-close-btn"))==null||n.addEventListener("click",d),(s=document.getElementById("categories-done-btn"))==null||s.addEventListener("click",d),(l=document.getElementById("add-category-form"))==null||l.addEventListener("submit",a=>{a.preventDefault();const r=document.getElementById("new-category-input"),u=r==null?void 0:r.value.trim();u&&(G(u),this.showToast(`Added "${u}" to commission products!`),t())}),e.querySelectorAll(".category-edit-input").forEach(a=>{a.addEventListener("change",r=>{const u=r.target.dataset.categoryId,i=r.target.value.trim();i&&(J(u,i),this.showToast("Updated product name"))})}),e.querySelectorAll(".btn-delete-category").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.categoryId;X(r),this.showToast("Removed product category"),t()})})};t()}injectAboutFaqControls(){const e=document.getElementById("btn-add-faq");e&&!e.dataset.bound&&(e.dataset.bound="true",e.addEventListener("click",()=>{this.openFaqModal()})),document.querySelectorAll(".faq-question-text, .faq-answer-text").forEach(t=>{t.contentEditable="true",t.spellcheck=!1,t.classList.add("customizer-editable");const o=t.dataset.faqField,d=t.dataset.faqId;t.title=`Click to edit ${o}`,t.onblur=()=>{const n=t.innerText.trim();n&&(h(d,o,n),this.showToast(`Updated FAQ ${o}`))}}),document.querySelectorAll(".btn-edit-faq").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.faqId,n=E().find(s=>String(s.id)===String(o));n&&this.openFaqModal(n)})}),document.querySelectorAll(".btn-delete-faq").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.faqId,n=E().find(l=>String(l.id)===String(o)),s=n?n.question:"this FAQ";confirm(`Are you sure you want to delete "${s}"?`)&&(B(o),this.showToast("Deleted FAQ"),this.handleRoute())})})}openFaqModal(e=null){var n,s,l;const t=!!e,o=document.getElementById("customizer-modal-container");if(!o)return;o.innerHTML=`
      <div id="faq-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-linen-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-6">
            <h3 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
              <span>❓</span> ${t?"Edit FAQ":"Add New FAQ"}
            </h3>
            <button id="faq-modal-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
          </div>

          <form id="faq-item-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Question *</label>
              <input type="text" name="question" required value="${(e==null?void 0:e.question)||""}" placeholder="e.g. Can you embroider two pets on one hoop?" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none" />
            </div>

            <div>
              <label class="block font-bold text-stone-700 uppercase tracking-wider mb-1">Answer *</label>
              <textarea name="answer" rows="4" required placeholder="Write the helpful response here..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-linen-300 text-stone-900 text-sm focus:ring-2 focus:ring-terracotta/40 outline-none leading-relaxed">${(e==null?void 0:e.answer)||""}</textarea>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-linen-300">
              <button type="button" id="faq-modal-cancel-btn" class="px-5 py-2.5 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 font-semibold text-xs transition">Cancel</button>
              <button type="submit" class="px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs shadow transition">${t?"Save Changes":"Add FAQ"}</button>
            </div>
          </form>
        </div>
      </div>
    `;const d=()=>{o.innerHTML=""};(n=document.getElementById("faq-modal-close-btn"))==null||n.addEventListener("click",d),(s=document.getElementById("faq-modal-cancel-btn"))==null||s.addEventListener("click",d),(l=document.getElementById("faq-item-form"))==null||l.addEventListener("submit",a=>{a.preventDefault();const r=a.target,u=r.question.value.trim(),i=r.answer.value.trim();!u||!i||(t?(h(e.id,"question",u),h(e.id,"answer",i),this.showToast("FAQ updated successfully!")):(S(u,i),this.showToast("Added new FAQ item!")),d(),this.handleRoute())})}openFaqManagerModal(){const e=document.getElementById("customizer-modal-container");if(!e)return;const t=()=>{var n,s,l;const o=E();e.innerHTML=`
        <div id="faqs-modal-backdrop" class="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-linen-100 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-linen-300 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-4 border-b border-linen-300 mb-5">
              <div>
                <h3 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <span>❓</span> Manage All FAQs
                </h3>
                <p class="text-xs text-stone-600 mt-0.5">Add, edit, or remove questions in your Keepsake Care Guide & FAQ section.</p>
              </div>
              <button id="faqs-mgr-close-btn" class="w-8 h-8 rounded-full bg-linen-200 hover:bg-linen-300 text-stone-700 flex items-center justify-center font-bold">✕</button>
            </div>

            <!-- Existing FAQs List -->
            <div class="space-y-3 mb-6">
              <p class="text-xs font-bold uppercase tracking-wider text-stone-700">Current Questions (${o.length})</p>
              ${o.length===0?`
                <div class="p-4 rounded-xl bg-linen-200 text-center text-xs text-stone-600">
                  No FAQs currently added. Create your first question below!
                </div>
              `:o.map((a,r)=>`
                <div class="p-3.5 rounded-2xl bg-white border border-linen-300 shadow-sm space-y-2" data-faq-id="${a.id}">
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-center gap-2 flex-grow">
                      <span class="w-5 h-5 rounded-full bg-linen-200 text-stone-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">${r+1}</span>
                      <input type="text" class="faq-mgr-question flex-grow text-xs font-bold text-stone-900 bg-transparent outline-none focus:ring-1 focus:ring-terracotta rounded px-2 py-0.5" value="${a.question}" data-faq-id="${a.id}" placeholder="Question..." />
                    </div>
                    <button type="button" class="btn-delete-faq-mgr p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 text-sm transition flex-shrink-0" data-faq-id="${a.id}" title="Remove this FAQ">
                      🗑️
                    </button>
                  </div>
                  <textarea class="faq-mgr-answer w-full text-xs text-stone-600 bg-linen-50 border border-linen-200 rounded-xl p-2 outline-none focus:ring-1 focus:ring-terracotta resize-none" rows="2" data-faq-id="${a.id}" placeholder="Answer...">${a.answer}</textarea>
                </div>
              `).join("")}
            </div>

            <!-- Add New FAQ Quick Form -->
            <div class="p-4 rounded-2xl bg-linen-200/80 border border-linen-300 mb-6 space-y-2.5">
              <p class="text-xs font-bold uppercase tracking-wider text-wood-dark flex items-center gap-1.5">
                <span>➕</span> Add New Question
              </p>
              <form id="faq-mgr-add-form" class="space-y-2">
                <input type="text" id="new-faq-q" required placeholder="Question (e.g. Can you ship internationally?)" class="w-full px-3 py-2 rounded-xl bg-white border border-linen-300 text-xs text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none" />
                <textarea id="new-faq-a" required placeholder="Answer details..." rows="2" class="w-full px-3 py-2 rounded-xl bg-white border border-linen-300 text-xs text-stone-900 focus:ring-2 focus:ring-terracotta/40 outline-none"></textarea>
                <div class="flex justify-end">
                  <button type="submit" class="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs transition shadow">
                    Add FAQ
                  </button>
                </div>
              </form>
            </div>

            <!-- Footer / Done Button -->
            <div class="pt-4 border-t border-linen-300 flex items-center justify-between">
              <span class="text-[11px] text-stone-500">Auto-saves to About & Care guide</span>
              <button id="faqs-mgr-done-btn" class="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-terracotta text-white font-semibold text-xs shadow transition">
                Done & Close
              </button>
            </div>
          </div>
        </div>
      `;const d=()=>{e.innerHTML="",this.handleRoute()};(n=document.getElementById("faqs-mgr-close-btn"))==null||n.addEventListener("click",d),(s=document.getElementById("faqs-mgr-done-btn"))==null||s.addEventListener("click",d),(l=document.getElementById("faq-mgr-add-form"))==null||l.addEventListener("submit",a=>{a.preventDefault();const r=document.getElementById("new-faq-q"),u=document.getElementById("new-faq-a"),i=r==null?void 0:r.value.trim(),f=u==null?void 0:u.value.trim();i&&f&&(S(i,f),this.showToast("Added new FAQ!"),t())}),e.querySelectorAll(".faq-mgr-question").forEach(a=>{a.addEventListener("change",r=>{const u=r.target.dataset.faqId,i=r.target.value.trim();i&&(h(u,"question",i),this.showToast("Updated FAQ question"))})}),e.querySelectorAll(".faq-mgr-answer").forEach(a=>{a.addEventListener("change",r=>{const u=r.target.dataset.faqId,i=r.target.value.trim();i&&(h(u,"answer",i),this.showToast("Updated FAQ answer"))})}),e.querySelectorAll(".btn-delete-faq-mgr").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.faqId;B(r),this.showToast("Removed FAQ"),t()})})};t()}bindToolbarEvents(){var e,t,o,d,n;(e=document.getElementById("btn-edit-socials"))==null||e.addEventListener("click",()=>{this.openSocialsModal()}),(t=document.getElementById("btn-customizer-categories"))==null||t.addEventListener("click",()=>{this.openCommissionCategoriesModal()}),(o=document.getElementById("btn-customizer-faqs"))==null||o.addEventListener("click",()=>{this.openFaqManagerModal()}),(d=document.getElementById("btn-export-content"))==null||d.addEventListener("click",()=>{Q(),this.showToast("Downloaded siteContent.json")}),(n=document.getElementById("btn-reset-content"))==null||n.addEventListener("click",()=>{confirm("Are you sure you want to reset all content, texts, and portfolio artworks back to defaults?")&&(U(),this.showToast("Reset all content to defaults"),this.handleRoute(),g())})}showToast(e){const t=document.getElementById("toast-container");if(!t)return;const o=document.createElement("div");o.className="bg-stone-900 text-linen-100 px-4 py-2.5 rounded-2xl shadow-2xl border border-stone-700 text-xs flex items-center gap-2.5 transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto",o.innerHTML=`
      <span class="text-emerald-400 text-sm">✓</span>
      <span>${e}</span>
    `,t.appendChild(o),setTimeout(()=>{o.classList.remove("translate-y-4","opacity-0")},30),setTimeout(()=>{o.classList.add("opacity-0","translate-y-2"),setTimeout(()=>o.remove(),300)},3500)}}document.addEventListener("DOMContentLoaded",()=>{new Y});

// Central Content Store for PetEmbro Website
// Handles default texts, images, social links, localStorage persistence, and JSON export

const STORAGE_KEY = 'petembro_site_content_v1';

export const defaultSiteContent = {
  brand: {
    name: 'PetEmbro',
    tagline: 'Handcrafted Portraits',
    description: 'Preserving the spirit, eyes, and warmth of your beloved companion through miniature single-strand cotton embroidery hoops and keychains.'
  },
  hero: {
    badge: 'Handcrafted Miniature Pet Embroidery',
    titleLine1: 'Every Stitch Tells Your',
    titleHighlight: "Pet's True Story",
    subtitle: 'Transform your beloved furry family member into an heirloom wooden keychain or framed hoop. Hand-embroidered thread by thread on pure natural linen.',
    ctaPrimary: 'Preview on 3D Keychain',
    ctaSecondary: 'Explore Portfolio',
    featuredName: 'Rocky the Boxer',
    featuredDesc: 'Miniature Wooden Hoop Keychain',
    featuredImage: '/assets/keychain_ref.png'
  },
  craftStory: {
    badge: 'Pure Needlework Heritage',
    title: 'Made with Devotion, One Stitch at a Time',
    subtitle: "We don't use automated print presses or synthetic dyes. Every portrait begins with hand-tracing your pet's contours onto organic oatmeal linen.",
    step1Title: '1. Send Your Photo',
    step1Desc: 'Upload any favorite snapshot from your phone. Our artisan inspects the lighting and eye contours.',
    step2Title: '2. Interactive 3D Preview',
    step2Desc: 'Choose your favorite needlework style (Thread-Paint, Cross-Stitch, Needlepoint) and preview it in 3D.',
    step3Title: '3. Handcrafted & Delivered',
    step3Desc: 'Over 12 to 25 hours of detailed single-strand cotton needlework, mounted into a smooth wooden keepsake.'
  },
  about: {
    badge: 'The Artisan Behind PetEmbro',
    headline: 'Handcrafted with Thread, Needle & Devotion',
    subheadline: 'Welcome to my studio! I create miniature textile heirlooms that honor the bond we share with our animal companions.',
    artistName: 'Elena Rostova',
    artistRole: 'Fiber Artist & Founder',
    quote: "\"Pets Aren't Just Pets — They're Family.\"",
    p1: 'PetEmbro began three years ago when I wanted to keep my rescue dog close to me during long travels. I experimented with micro-embroidery techniques, shrinking complex needlework into a pocket-sized wooden hoop keychain.',
    p2: 'When fellow dog parents stopped me in the park asking if I could stitch their puppies, I realized how meaningful a physical, tactile portrait could be compared to a digital photo tucked away in a smartphone.',
    p3: 'Today, every single PetEmbro piece is hand-stitched by me in my sunlit studio. No automated machines, no shortcuts — just needle, French knots, single-strand blending, and endless patience.'
  },
  contact: {
    badge: 'Direct Inquiries',
    headline: "Let's Talk About Your Pet",
    subheadline: 'Have questions about an upcoming gift, memorial keepsake, or custom sizing? Send a message and our artisan will get back to you within 24 hours.',
    email: 'hello@petembro.com',
    whatsapp: '+1 (555) 382-7638',
    whatsappUrl: 'https://wa.me/',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM (EST)',
    location: 'Montréal & Burlington • Worldwide Shipping'
  },
  socials: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    pinterest: 'https://pinterest.com',
    whatsapp: 'https://wa.me/'
  },
  portfolioItems: [
    {
      id: 1,
      name: 'Rocky',
      breed: 'Boxer Mastiff',
      category: 'keychains',
      categoryLabel: 'Miniature Keychain',
      size: '1.8" Beechwood Hoop',
      hours: '14 Hours',
      image: '/assets/keychain_ref.png',
      caption: 'Rocky’s soulful gaze stitched with 24 DMC earth tones on unbleached oatmeal linen. Mounted with stainless steel keychain hardware.',
      featured: true
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Golden Retriever',
      category: 'dogs',
      categoryLabel: 'Wall Hoop (5")',
      size: '5" Bamboo Frame',
      hours: '18 Hours',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
      caption: 'Golden fur blending with subtle champagne thread highlights, surrounded by delicate wildflower embroidery.',
      featured: false
    },
    {
      id: 3,
      name: 'Milo & Cleo',
      breed: 'Tuxedo & Calico Cats',
      category: 'cats',
      categoryLabel: 'Wall Hoop (6")',
      size: '6" Beechwood Frame',
      hours: '22 Hours',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      caption: 'Double pet portrait capturing the contrasting emerald and amber eyes with fine single-strand silk thread.',
      featured: false
    },
    {
      id: 4,
      name: 'Barnaby',
      breed: 'Basset Hound',
      category: 'keychains',
      categoryLabel: 'Miniature Keychain',
      size: '1.8" Walnut Hoop',
      hours: '12 Hours',
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
      caption: 'Signature droopy eyes and long velvety ears in a pocket-sized dark walnut keychain frame.',
      featured: false
    },
    {
      id: 5,
      name: 'Winston',
      breed: 'French Bulldog',
      category: 'dogs',
      categoryLabel: 'Miniature Keychain',
      size: '1.8" Oak Hoop',
      hours: '15 Hours',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      caption: 'Brindle coat textures hand-stitched with intricate micro-knots for lifelike snout wrinkles.',
      featured: false
    },
    {
      id: 6,
      name: 'Jasper',
      breed: 'Tabby Cat',
      category: 'cats',
      categoryLabel: 'Wall Hoop (4")',
      size: '4" Bamboo Hoop',
      hours: '11 Hours',
      image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
      caption: 'Striped ginger coat with delicate white whisker accents stitched using silver metallic filament.',
      featured: false
    },
    {
      id: 7,
      name: 'Daisy',
      breed: 'Holland Lop Bunny',
      category: 'special',
      categoryLabel: 'Wall Hoop (4")',
      size: '4" Beechwood Hoop',
      hours: '10 Hours',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
      caption: 'Soft plush fur created with Turkish stitch loops and hand-brushed cotton.',
      featured: false
    }
  ]
};

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

// Get loaded content
export function getSiteContent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return deepMerge(defaultSiteContent, parsed);
    }
  } catch (e) {
    console.error('Failed to load content from storage:', e);
  }
  return JSON.parse(JSON.stringify(defaultSiteContent));
}

// Save complete content
export function saveSiteContent(newContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    window.dispatchEvent(new CustomEvent('petembro:content-updated', { detail: newContent }));
    return true;
  } catch (e) {
    console.error('Failed to save content to storage:', e);
    return false;
  }
}

// Update single nested field by dot notation, e.g. 'hero.subtitle'
export function updateContentField(path, value) {
  const content = getSiteContent();
  const keys = path.split('.');
  let current = content;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (!current[k] || typeof current[k] !== 'object') {
      current[k] = {};
    }
    current = current[k];
  }
  current[keys[keys.length - 1]] = value;
  saveSiteContent(content);
}

// Portfolio CRUD
export function updatePortfolioItem(id, fields) {
  const content = getSiteContent();
  const idx = content.portfolioItems.findIndex(p => p.id === id);
  if (idx !== -1) {
    content.portfolioItems[idx] = { ...content.portfolioItems[idx], ...fields };
    saveSiteContent(content);
  }
}

export function addPortfolioItem(item) {
  const content = getSiteContent();
  const maxId = content.portfolioItems.reduce((max, p) => Math.max(max, p.id || 0), 0);
  const newItem = {
    id: maxId + 1,
    name: item.name || 'New Pet',
    breed: item.breed || 'Custom Breed',
    category: item.category || 'keychains',
    categoryLabel: item.categoryLabel || 'Miniature Keychain',
    size: item.size || '1.8" Hoop',
    hours: item.hours || '12 Hours',
    image: item.image || '/assets/keychain_ref.png',
    caption: item.caption || 'Handcrafted single-strand portrait.',
    featured: Boolean(item.featured)
  };
  content.portfolioItems.unshift(newItem);
  saveSiteContent(content);
  return newItem;
}

export function deletePortfolioItem(id) {
  const content = getSiteContent();
  content.portfolioItems = content.portfolioItems.filter(p => p.id !== id);
  saveSiteContent(content);
}

// Reset all to initial defaults
export function resetSiteContent() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('petembro:content-updated', { detail: defaultSiteContent }));
}

// Export JSON file
export function exportContentFile() {
  const content = getSiteContent();
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'siteContent.json';
  a.click();
  URL.revokeObjectURL(url);
}

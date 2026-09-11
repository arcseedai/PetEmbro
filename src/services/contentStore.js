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
  stopPoint1: {
    badge: 'Stop Point 01 • Master Craftsmanship',
    title: 'Single-Strand Precision,',
    titleHighlight: 'Thread by Patient Thread',
    description: "Unlike machine embroidery, each PetEmbro piece uses single strands of fine DMC cotton thread. We micro-layer up to 30 distinct hues to recreate the authentic texture of your pet's fur, the wet shine of their nose, and that unmistakable sparkle in their eyes.",
    stat1Number: '14+ Hrs',
    stat1Label: 'Per Miniature Portrait',
    stat2Number: '450+',
    stat2Label: 'DMC Floss Color Shades',
    linkText: 'Read more about our materials & process →',
    image: '/assets/keychain_ref.png',
    quote: "\"When I opened the box and saw my dog's soulful eyes captured in thread, I was moved to tears. Truly an heirloom.\"",
    author: '— Sarah M. & Charlie'
  },
  stopPoint2: {
    badge: 'Stop Point 02 • Formats & Materials',
    title: 'Carry Their Love Everywhere',
    subtitle: 'Designed for durability and timeless elegance. Available in lightweight pocket keychains or stunning wall frames.',
    card1Icon: '🗝️',
    card1Title: 'Miniature Wooden Keychain',
    card1Desc: 'Our signature creation! A 1.8-inch circular natural beechwood frame, protected with a water-resistant fabric sealer, linked with stainless steel chains and split keyring.',
    card1Bullet1: 'Beech / Oak laser-cut hoop (lightweight)',
    card1Bullet2: 'Heavy-duty stainless steel split ring',
    card1Bullet3: 'Double-sealed linen fabric protection',
    card1BtnText: "Test with Your Pet's Photo →",
    card2Icon: '🖼️',
    card2Title: 'Bespoke Framed Wall Hoops',
    card2Desc: 'Available in 4-inch, 5-inch, and 6-inch bamboo embroidery hoops. Includes brass tightening screw, hanging loop, and custom engraved pet nameplate option.',
    card2Bullet1: 'Full chest or multi-pet portraits',
    card2Bullet2: 'Embroidered botanical floral wreaths',
    card2Bullet3: 'Ready to mount on wall or desk easel',
    card2BtnText: 'View Wall Hoop Gallery'
  },
  about: {
    badge: 'The Artisan Behind PetEmbro',
    headline: 'Handcrafted with Thread, Needle & Devotion',
    subheadline: 'Welcome to my studio! I create miniature textile heirlooms that honor the bond we share with our animal companions.',
    artisanImage: '/assets/keychain_ref.png',
    artistName: 'Elena Rostova',
    artistRole: 'Fiber Artist & Founder',
    quote: "\"Pets Aren't Just Pets — They're Family.\"",
    p1: 'PetEmbro began three years ago when I wanted to keep my rescue dog close to me during long travels. I experimented with micro-embroidery techniques, shrinking complex needlework into a pocket-sized wooden hoop keychain.',
    p2: 'When fellow dog parents stopped me in the park asking if I could stitch their puppies, I realized how meaningful a physical, tactile portrait could be compared to a digital photo tucked away in a smartphone.',
    p3: 'Today, every single PetEmbro piece is hand-stitched by me in my sunlit studio. No automated machines, no shortcuts — just needle, French knots, single-strand blending, and endless patience.',
    materialsTitle: 'Our Sacred Materials',
    materialsSubtitle: 'We source only sustainable, archive-grade natural materials designed to last generations.',
    mat1Title: '100% Organic Linen',
    mat1Desc: 'Unbleached European flax linen. Strong, tear-resistant, and naturally textured with an artisanal oatmeal grain.',
    mat2Title: 'DMC French Cotton Floss',
    mat2Desc: 'Colorfast, double-mercerized 100% Egyptian cotton thread. Resists UV fading and retains its vibrant sheen for decades.',
    mat3Title: 'Beech & Walnut Hoops',
    mat3Desc: 'Sustainably harvested hardwood frames, laser cut for smooth precision and hand-polished with organic beeswax.',
    faqTitle: 'Keepsake Care Guide',
    faq1Question: 'Are the keychains water-resistant?',
    faq1Answer: 'Yes! Each finished embroidery disc receives two micro-coats of archival textile sealant to protect against light rain, hand moisture, and dust.',
    faq2Question: 'How do I clean my embroidery?',
    faq2Answer: 'If dust accumulates over time, gently brush the stitches with a soft dry makeup brush or clean toothbrush. Avoid submersion in water or harsh detergents.',
    faq3Question: 'How long does a custom piece take?',
    faq3Answer: 'Standard production takes 7 to 12 business days before dispatch. Rush commission slots are available upon request.'
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
  footer: {
    socialTitle: 'Social Media',
    socialDesc: 'Watch behind-the-scenes stitching time-lapses and new customer reveals daily!',
    socialHandle: 'Follow @petembro_crafts on social media'
  },
  socialLinks: [
    { id: 'instagram', platform: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
    { id: 'tiktok', platform: 'tiktok', label: 'TikTok', url: 'https://tiktok.com' },
    { id: 'pinterest', platform: 'pinterest', label: 'Pinterest', url: 'https://pinterest.com' },
    { id: 'facebook', platform: 'facebook', label: 'Facebook', url: 'https://facebook.com' }
  ],
  socials: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    pinterest: 'https://pinterest.com',
    facebook: 'https://facebook.com',
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
      featured: true
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

// Get randomly selected featured artwork from marked items
export function getRandomFeaturedArtwork() {
  const content = getSiteContent();
  const items = content.portfolioItems || [];
  const featuredPool = items.filter(p => Boolean(p.featured));

  if (featuredPool.length > 0) {
    const randomIndex = Math.floor(Math.random() * featuredPool.length);
    const item = featuredPool[randomIndex];
    return {
      item,
      totalFeatured: featuredPool.length,
      index: randomIndex,
      pool: featuredPool
    };
  }

  if (items.length > 0) {
    return {
      item: items[0],
      totalFeatured: 1,
      index: 0,
      pool: [items[0]]
    };
  }

  return {
    item: {
      name: content.hero?.featuredName || 'Rocky the Boxer',
      breed: 'Boxer Mastiff',
      categoryLabel: content.hero?.featuredDesc || 'Miniature Wooden Hoop Keychain',
      size: '1.8" Beechwood Hoop',
      hours: '14 Hours',
      image: content.hero?.featuredImage || '/assets/keychain_ref.png',
      caption: 'Handcrafted miniature portrait.'
    },
    totalFeatured: 1,
    index: 0,
    pool: []
  };
}


// Social Links CRUD
export function getSocialLinks() {
  const content = getSiteContent();
  return content.socialLinks || defaultSiteContent.socialLinks;
}

export function saveSocialLinks(links) {
  const content = getSiteContent();
  content.socialLinks = links;
  // Also synchronize legacy socials map
  content.socials = content.socials || {};
  links.forEach(l => {
    if (l.platform) content.socials[l.platform] = l.url;
  });
  saveSiteContent(content);
}

export function addSocialLink(link) {
  const links = getSocialLinks();
  const id = link.platform + '_' + Date.now();
  links.push({
    id,
    platform: link.platform || 'instagram',
    label: link.label || link.platform,
    url: link.url || 'https://'
  });
  saveSocialLinks(links);
}

export function deleteSocialLink(id) {
  let links = getSocialLinks();
  links = links.filter(l => l.id !== id);
  saveSocialLinks(links);
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

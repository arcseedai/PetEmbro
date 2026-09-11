// Central Content Store for PetEmbro Website
// Handles default texts, images, social links, localStorage persistence, auto-sync to disk, and JSON export
import siteContentJson from '../data/siteContent.json';

const STORAGE_KEY = 'petembro_site_content_v1';

export const defaultSiteContent = siteContentJson;

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

// Auto-sync function to write to disk via local Vite dev server
function syncToDisk(data) {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    fetch('/api/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: typeof data === 'string' ? data : JSON.stringify(data)
    }).catch(() => {});
  }
}

// Auto-sync on script load if running locally and localStorage has customized data
if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      syncToDisk(existing);
    }
  } catch (e) {}
}

// Save complete content
export function saveSiteContent(newContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    window.dispatchEvent(new CustomEvent('petembro:content-updated', { detail: newContent }));
    syncToDisk(newContent);
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
  const additionalInfo = item.additionalInfo || item.breed || '';
  const newItem = {
    id: maxId + 1,
    name: item.name || 'New Artwork',
    breed: additionalInfo,
    additionalInfo: additionalInfo,
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

// Reorder portfolio items via drag-and-drop
export function reorderPortfolioItems(sourceId, targetId) {
  const content = getSiteContent();
  const items = [...(content.portfolioItems || [])];
  const fromIndex = items.findIndex(p => p.id === sourceId);
  const toIndex = items.findIndex(p => p.id === targetId);
  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return false;

  const [moved] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, moved);
  content.portfolioItems = items;
  saveSiteContent(content);
  return true;
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

// Commission Product Categories CRUD
export function getCommissionCategories() {
  const content = getSiteContent();
  return content.commissionCategories || defaultSiteContent.commissionCategories;
}

export function saveCommissionCategories(categories) {
  const content = getSiteContent();
  content.commissionCategories = categories;
  saveSiteContent(content);
}

export function addCommissionCategory(label) {
  const categories = getCommissionCategories();
  const id = 'cat_' + Date.now();
  categories.push({ id, label: label.trim() });
  saveCommissionCategories(categories);
}

export function deleteCommissionCategory(id) {
  let categories = getCommissionCategories();
  categories = categories.filter(c => c.id !== id);
  saveCommissionCategories(categories);
}

export function updateCommissionCategory(id, newLabel) {
  const categories = getCommissionCategories();
  const cat = categories.find(c => c.id === id);
  if (cat) {
    cat.label = newLabel.trim();
    saveCommissionCategories(categories);
  }
}

// FAQs CRUD
export function getFaqs() {
  const content = getSiteContent();
  if (content.about?.faqs && Array.isArray(content.about.faqs)) {
    return content.about.faqs;
  }
  // Migration fallback from legacy fields if faqs array isn't populated
  const legacy = [];
  if (content.about?.faq1Question) legacy.push({ id: 'faq_1', question: content.about.faq1Question, answer: content.about.faq1Answer || '' });
  if (content.about?.faq2Question) legacy.push({ id: 'faq_2', question: content.about.faq2Question, answer: content.about.faq2Answer || '' });
  if (content.about?.faq3Question) legacy.push({ id: 'faq_3', question: content.about.faq3Question, answer: content.about.faq3Answer || '' });
  return legacy.length > 0 ? legacy : defaultSiteContent.about.faqs;
}

export function saveFaqs(faqs) {
  const content = getSiteContent();
  if (!content.about) content.about = {};
  content.about.faqs = faqs;
  saveSiteContent(content);
}

export function addFaq(question, answer) {
  const faqs = getFaqs();
  const id = 'faq_' + Date.now();
  faqs.push({
    id,
    question: question.trim(),
    answer: answer.trim()
  });
  saveFaqs(faqs);
  return id;
}

export function deleteFaq(id) {
  let faqs = getFaqs();
  faqs = faqs.filter(f => String(f.id) !== String(id));
  saveFaqs(faqs);
}

export function updateFaq(id, field, value) {
  const faqs = getFaqs();
  const faq = faqs.find(f => String(f.id) === String(id));
  if (faq) {
    faq[field] = value.trim();
    saveFaqs(faqs);
  }
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

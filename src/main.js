// PetEmbro Application Main Orchestrator & Router

import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { playPageStitchAnimation } from './components/StitchAnimation.js';

import { renderHomePage } from './pages/HomePage.js';
import { renderPreviewPage } from './pages/PreviewPage.js';
import { renderPortfolioPage } from './pages/PortfolioPage.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderContactPage } from './pages/ContactPage.js';

class PetEmbroApp {
  constructor() {
    this.currentPage = 'home';
    this.init();
  }

  init() {
    // 1. Listen for URL hash changes (Client-side routing)
    window.addEventListener('hashchange', () => this.handleRoute());

    // 2. Initial route resolution
    this.handleRoute();

    // 3. Render footer once
    renderFooter();
  }

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validRoutes = ['home', 'preview', 'portfolio', 'about', 'contact'];
    
    // Support sub-hash or default to home
    const route = validRoutes.includes(hash) ? hash : 'home';
    this.currentPage = route;

    // 1. Update navigation bar active highlight
    renderNavbar(route);

    // 2. Play the page embroidery stitch animation on navigation
    playPageStitchAnimation(route);

    // 3. Render the target page
    switch (route) {
      case 'home':
        renderHomePage();
        break;
      case 'preview':
        renderPreviewPage();
        break;
      case 'portfolio':
        renderPortfolioPage();
        break;
      case 'about':
        renderAboutPage();
        break;
      case 'contact':
        renderContactPage();
        break;
      default:
        renderHomePage();
    }

    // Scroll to top cleanly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PetEmbroApp();
});

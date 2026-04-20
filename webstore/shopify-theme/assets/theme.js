/**
 * Bebot Theme — theme.js
 * Vanilla ES Module JavaScript
 * Y2K Streetwear Editorial Theme
 *
 * Modules:
 *  - ThemeUtils       — shared utilities
 *  - FocusTrap        — trap focus within dialogs
 *  - Overlay          — backdrop overlay management
 *  - Header           — sticky behavior
 *  - CartDrawer       — cart drawer open/close/update
 *  - SearchDrawer     — search drawer open/close
 *  - MobileNav        — mobile hamburger nav
 *  - Accordion        — product info accordions
 *  - ProductGallery   — thumbnail image switching
 *  - VariantPicker    — variant selection + price update
 *  - QuickAdd         — quick-add to cart from product cards
 *  - QuantityInput    — +/- quantity buttons
 *  - PromoBanner      — close announcement bar
 */

'use strict';

/* ==========================================================================
   ThemeUtils — shared helper functions
   ========================================================================== */
class ThemeUtils {
  /**
   * Format a number as money using Shopify's money_format.
   * @param {number} cents
   * @returns {string}
   */
  static formatMoney(cents) {
    const format = window.Shopify?.moneyFormat || '${{amount}}';
    const amount = (cents / 100).toFixed(2);
    return format.replace('{{amount}}', amount).replace('{{amount_no_decimals}}', Math.floor(cents / 100));
  }

  /**
   * POST to Shopify's Cart API.
   * @param {string} endpoint
   * @param {Object} body
   * @returns {Promise<Object>}
   */
  static async fetchCart(endpoint, body = null) {
    const opts = {
      method: body ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(endpoint, opts);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.description || `HTTP ${res.status}`);
    }
    return res.json();
  }

  /**
   * Debounce a function.
   * @param {Function} fn
   * @param {number} delay
   * @returns {Function}
   */
  static debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  /**
   * Dispatch a custom event on an element.
   * @param {string} name
   * @param {Object} detail
   * @param {Element} target
   */
  static dispatch(name, detail = {}, target = document) {
    target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
  }
}

/* ==========================================================================
   FocusTrap — trap keyboard focus inside dialogs/drawers
   ========================================================================== */
class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  /** Activate the trap and focus the first element. */
  activate() {
    this.focusableElements = Array.from(this.element.querySelectorAll(this.focusableSelector));
    if (this.focusableElements.length === 0) return;
    this.firstEl = this.focusableElements[0];
    this.lastEl  = this.focusableElements[this.focusableElements.length - 1];
    this.element.addEventListener('keydown', this._handleKeydown);
    // Focus the first focusable element after a short delay (allows CSS transitions)
    setTimeout(() => this.firstEl?.focus(), 50);
  }

  /** Deactivate the trap. */
  deactivate() {
    this.element.removeEventListener('keydown', this._handleKeydown);
  }

  _handleKeydown(e) {
    if (e.key !== 'Tab') return;
    if (!this.focusableElements.length) return;

    if (e.shiftKey) {
      if (document.activeElement === this.firstEl) {
        e.preventDefault();
        this.lastEl.focus();
      }
    } else {
      if (document.activeElement === this.lastEl) {
        e.preventDefault();
        this.firstEl.focus();
      }
    }
  }
}

/* ==========================================================================
   Overlay — backdrop management
   ========================================================================== */
class Overlay {
  constructor() {
    this.el = document.getElementById('Overlay');
    if (!this.el) return;
    this.el.addEventListener('click', () => ThemeUtils.dispatch('overlay:click'));
  }

  show() {
    this.el?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.el?.classList.remove('is-visible');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Header — sticky scroll behavior
   ========================================================================== */
class Header {
  constructor() {
    this.el = document.getElementById('SiteHeader');
    if (!this.el) return;
    if (!this.el.classList.contains('site-header--sticky')) return;

    this._onScroll = ThemeUtils.debounce(this._onScroll.bind(this), 10);
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this._onScroll(); // Initial check
  }

  _onScroll() {
    const scrolled = window.scrollY > 20;
    this.el.classList.toggle('is-scrolled', scrolled);
  }
}

/* ==========================================================================
   CartDrawer — slide-out cart drawer
   ========================================================================== */
class CartDrawer {
  constructor(overlay) {
    this.overlay   = overlay;
    this.drawer    = document.getElementById('CartDrawer');
    this.toggleBtn = document.getElementById('CartToggleBtn');
    this.closeBtn  = document.getElementById('CartDrawerClose');
    this.countEls  = document.querySelectorAll('#CartCount, #CartDrawerCount');
    this.bodyEl    = document.getElementById('CartDrawerBody');
    this.footerEl  = document.getElementById('CartDrawerFooter');
    this.subtotalEl= document.getElementById('CartSubtotal');
    this.checkoutEl= document.getElementById('CartDrawerCheckout');

    if (!this.drawer) return;

    this.focusTrap = new FocusTrap(this.drawer);
    this.isOpen    = false;
    this._triggerEl = null; // element that opened the drawer

    this._bind();

    // Listen for custom events from QuickAdd
    document.addEventListener('cart:open', () => this.open());
    document.addEventListener('cart:refresh', () => this.refresh());
  }

  _bind() {
    // Toggle on cart icon click (if cart type is drawer)
    this.toggleBtn?.addEventListener('click', (e) => {
      if (this.toggleBtn.hasAttribute('aria-controls')) {
        e.preventDefault();
        this.isOpen ? this.close() : this.open();
        this._triggerEl = this.toggleBtn;
      }
    });

    this.closeBtn?.addEventListener('click', () => this.close());

    // Close on overlay click
    document.addEventListener('overlay:click', () => {
      if (this.isOpen) this.close();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Cart item events (delegated)
    this.drawer.addEventListener('click', (e) => {
      const removeBtn  = e.target.closest('.cart-item__remove');
      const decreaseBtn= e.target.closest('[data-action="decrease"][data-cart-key]');
      const increaseBtn= e.target.closest('[data-action="increase"][data-cart-key]');

      if (removeBtn) {
        this._removeItem(removeBtn.dataset.cartKey);
      } else if (decreaseBtn) {
        this._adjustQty(decreaseBtn.dataset.cartKey, -1);
      } else if (increaseBtn) {
        this._adjustQty(increaseBtn.dataset.cartKey, 1);
      }
    });

    this.drawer.addEventListener('change', (e) => {
      const input = e.target.closest('.quantity-input__field[data-cart-key]');
      if (input) {
        const qty = parseInt(input.value, 10);
        if (!isNaN(qty) && qty >= 0) {
          this._updateItem(input.dataset.cartKey, qty);
        }
      }
    });
  }

  open() {
    this.drawer.classList.add('is-open');
    this.drawer.setAttribute('aria-hidden', 'false');
    this.toggleBtn?.setAttribute('aria-expanded', 'true');
    this.overlay.show();
    this.focusTrap.activate();
    this.isOpen = true;
    this.refresh();
  }

  close() {
    this.drawer.classList.remove('is-open');
    this.drawer.setAttribute('aria-hidden', 'true');
    this.toggleBtn?.setAttribute('aria-expanded', 'false');
    this.overlay.hide();
    this.focusTrap.deactivate();
    this.isOpen = false;
    this._triggerEl?.focus();
    this._triggerEl = null;
  }

  /** Fetch cart data and re-render the drawer body. */
  async refresh() {
    try {
      const cart = await ThemeUtils.fetchCart('/cart.js');
      this._updateCount(cart.item_count);
      this._renderItems(cart);
    } catch (err) {
      console.error('[CartDrawer] refresh error:', err);
    }
  }

  _updateCount(count) {
    this.countEls.forEach((el) => {
      el.textContent = el.id === 'CartDrawerCount' ? `(${count})` : count;
      el.classList.toggle('cart-count--empty', count === 0);
    });

    // Update aria-label on toggle button
    if (this.toggleBtn) {
      const label = this.toggleBtn.getAttribute('aria-label') || '';
      this.toggleBtn.setAttribute('aria-label', label.replace(/\(\d+\)/, `(${count})`));
    }
  }

  _renderItems(cart) {
    if (!this.bodyEl) return;

    if (cart.item_count === 0) {
      this.bodyEl.innerHTML = `
        <div class="cart-drawer__empty" id="CartDrawerEmpty">
          <p class="cart-drawer__empty-msg">Your cart is empty.</p>
          <a href="/collections/all" class="btn btn--secondary cart-drawer__empty-btn">Continue Shopping</a>
        </div>`;
      if (this.footerEl) this.footerEl.style.display = 'none';
      return;
    }

    if (this.footerEl) {
      this.footerEl.style.display = '';
      if (this.subtotalEl) {
        this.subtotalEl.textContent = ThemeUtils.formatMoney(cart.total_price);
      }
    }

    const items = cart.items.map((item) => `
      <li class="cart-item" data-key="${item.key}" data-variant-id="${item.variant_id}">
        <a href="${item.url}" class="cart-item__image-link" tabindex="-1" aria-hidden="true">
          ${item.image
            ? `<img src="${item.image.replace('.jpg', '_160x213.jpg')}" alt="${this._escape(item.product_title)}" class="cart-item__image" loading="lazy" width="88" height="117">`
            : '<div class="cart-item__image" style="background:var(--color-surface-2);width:88px;aspect-ratio:3/4;border-radius:4px;"></div>'
          }
        </a>
        <div class="cart-item__details">
          <div class="cart-item__meta">
            <a href="${item.url}" class="cart-item__name">${this._escape(item.product_title)}</a>
            ${item.variant_title !== 'Default Title' ? `<p class="cart-item__variant">${this._escape(item.variant_title)}</p>` : ''}
            <p class="cart-item__price">${ThemeUtils.formatMoney(item.final_line_price)}</p>
          </div>
          <div class="cart-item__actions">
            <div class="quantity-input quantity-input--small">
              <button class="quantity-input__btn quantity-input__btn--minus" type="button" aria-label="Decrease" data-action="decrease" data-cart-key="${item.key}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <input type="number" class="quantity-input__field" value="${item.quantity}" min="0" data-cart-key="${item.key}" aria-label="Quantity">
              <button class="quantity-input__btn quantity-input__btn--plus" type="button" aria-label="Increase" data-action="increase" data-cart-key="${item.key}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <button class="cart-item__remove" type="button" data-cart-key="${item.key}" aria-label="Remove ${this._escape(item.product_title)}">Remove</button>
          </div>
        </div>
      </li>`).join('');

    this.bodyEl.innerHTML = `<ul class="cart-drawer__items" role="list">${items}</ul>`;
  }

  async _removeItem(key) {
    try {
      await ThemeUtils.fetchCart('/cart/change.js', { id: key, quantity: 0 });
      await this.refresh();
    } catch (err) {
      console.error('[CartDrawer] remove error:', err);
    }
  }

  async _adjustQty(key, delta) {
    const itemEl = this.drawer.querySelector(`[data-key="${key}"]`);
    const input  = itemEl?.querySelector('.quantity-input__field');
    const currentQty = parseInt(input?.value || '1', 10);
    const newQty = Math.max(0, currentQty + delta);
    await this._updateItem(key, newQty);
  }

  async _updateItem(key, quantity) {
    try {
      await ThemeUtils.fetchCart('/cart/change.js', { id: key, quantity });
      await this.refresh();
    } catch (err) {
      console.error('[CartDrawer] update error:', err);
    }
  }

  _escape(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

/* ==========================================================================
   SearchDrawer — slide-down search drawer
   ========================================================================== */
class SearchDrawer {
  constructor(overlay) {
    this.overlay   = overlay;
    this.drawer    = document.getElementById('SearchDrawer');
    this.toggleBtn = document.getElementById('SearchToggleBtn');
    this.closeBtn  = document.getElementById('SearchDrawerClose');
    this.input     = document.getElementById('SearchInput');

    if (!this.drawer) return;

    this.focusTrap = new FocusTrap(this.drawer);
    this.isOpen    = false;
    this._triggerEl = null;

    this._bind();
  }

  _bind() {
    this.toggleBtn?.addEventListener('click', () => {
      this._triggerEl = this.toggleBtn;
      this.isOpen ? this.close() : this.open();
    });

    this.closeBtn?.addEventListener('click', () => this.close());

    document.addEventListener('overlay:click', () => {
      if (this.isOpen) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  open() {
    this.drawer.classList.add('is-open');
    this.drawer.setAttribute('aria-hidden', 'false');
    this.toggleBtn?.setAttribute('aria-expanded', 'true');
    this.overlay.show();
    this.focusTrap.activate();
    this.isOpen = true;
    // Focus input after transition
    setTimeout(() => this.input?.focus(), 100);
  }

  close() {
    this.drawer.classList.remove('is-open');
    this.drawer.setAttribute('aria-hidden', 'true');
    this.toggleBtn?.setAttribute('aria-expanded', 'false');
    this.overlay.hide();
    this.focusTrap.deactivate();
    this.isOpen = false;
    this._triggerEl?.focus();
    this._triggerEl = null;
  }
}

/* ==========================================================================
   MobileNav — hamburger toggle
   ========================================================================== */
class MobileNav {
  constructor(overlay) {
    this.overlay    = overlay;
    this.nav        = document.getElementById('MobileNav');
    this.openBtn    = document.getElementById('HamburgerBtn');
    this.closeBtn   = document.getElementById('MobileNavClose');

    if (!this.nav) return;

    this.focusTrap = new FocusTrap(this.nav);
    this.isOpen    = false;

    this._bind();
  }

  _bind() {
    this.openBtn?.addEventListener('click', () => this.toggle());
    this.closeBtn?.addEventListener('click', () => this.close());

    document.addEventListener('overlay:click', () => {
      if (this.isOpen) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.nav.classList.add('is-open');
    this.nav.setAttribute('aria-hidden', 'false');
    this.openBtn?.setAttribute('aria-expanded', 'true');
    this.overlay.show();
    this.focusTrap.activate();
    this.isOpen = true;
  }

  close() {
    this.nav.classList.remove('is-open');
    this.nav.setAttribute('aria-hidden', 'true');
    this.openBtn?.setAttribute('aria-expanded', 'false');
    this.overlay.hide();
    this.focusTrap.deactivate();
    this.isOpen = false;
    this.openBtn?.focus();
  }
}

/* ==========================================================================
   Accordion — open/close product info tabs
   ========================================================================== */
class Accordion {
  constructor() {
    // Query all accordion triggers on the page
    document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => this._toggle(trigger));
    });
  }

  _toggle(trigger) {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
  }
}

/* ==========================================================================
   ProductGallery — click thumbnail to swap main image
   ========================================================================== */
class ProductGallery {
  constructor() {
    document.querySelectorAll('.product-gallery').forEach((gallery) => {
      this._init(gallery);
    });
  }

  _init(gallery) {
    const mainImg   = gallery.querySelector('#ProductMainImage, .product-gallery__main-image');
    const thumbBtns = gallery.querySelectorAll('.product-gallery__thumb');

    if (!mainImg || !thumbBtns.length) return;

    thumbBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const newUrl = btn.dataset.imageUrl;
        if (!newUrl) return;

        // Fade transition
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = newUrl;
          mainImg.style.opacity = '1';
        }, 150);

        // Active state
        thumbBtns.forEach((b) => {
          b.classList.remove('product-gallery__thumb--active');
          b.setAttribute('aria-current', 'false');
        });
        btn.classList.add('product-gallery__thumb--active');
        btn.setAttribute('aria-current', 'true');
      });
    });
  }
}

/* ==========================================================================
   VariantPicker — update price/availability on selection
   ========================================================================== */
class VariantPicker {
  constructor() {
    document.querySelectorAll('[data-product-form]').forEach((form) => {
      this._init(form);
    });
  }

  _init(form) {
    const sectionId   = form.closest('[data-section]')?.dataset.section;
    const variantsEl  = document.getElementById(`ProductVariantsJson-${sectionId}`);
    if (!variantsEl) return;

    try {
      this.variants = JSON.parse(variantsEl.textContent);
    } catch {
      return;
    }

    // Listen for option changes
    form.closest('.main-product')?.addEventListener('change', (e) => {
      if (!e.target.matches('input[name^="option-"], select[name^="option-"]')) return;
      this._onOptionChange(sectionId);
    });
  }

  _onOptionChange(sectionId) {
    const section    = document.getElementById(`MainProduct-${sectionId}`);
    if (!section) return;

    // Collect selected options
    const selectedOptions = [];
    const positions = ['1', '2', '3'];
    for (const pos of positions) {
      const input  = section.querySelector(`input[name="option-${pos}"]:checked`);
      const select = section.querySelector(`select[name="option-${pos}"]`);
      const value  = input?.value || select?.value;
      if (value) selectedOptions.push(value);
    }

    // Find matching variant
    const variant = this.variants.find((v) =>
      selectedOptions.every((opt, i) => v[`option${i + 1}`] === opt)
    );

    if (!variant) return;

    // Update hidden variant ID input
    const variantInput = document.getElementById(`ProductVariantId-${sectionId}`);
    if (variantInput) variantInput.value = variant.id;

    // Update price display
    const priceContainer = document.getElementById(`ProductPrice-${sectionId}`);
    if (priceContainer && variant.price !== undefined) {
      const saleHtml = variant.compare_at_price > variant.price
        ? `<div class="price price--on-sale">
             <div class="price__container">
               <span class="price__sale">${ThemeUtils.formatMoney(variant.price)}</span>
               <s class="price__compare">${ThemeUtils.formatMoney(variant.compare_at_price)}</s>
             </div>
           </div>`
        : `<div class="price">
             <div class="price__container">
               <span class="price__regular">${ThemeUtils.formatMoney(variant.price)}</span>
             </div>
           </div>`;
      priceContainer.innerHTML = saleHtml;
    }

    // Update add to cart button
    const submitBtn  = document.getElementById(`ProductSubmitBtn-${sectionId}`);
    const submitText = document.getElementById('ProductSubmitBtnText');
    if (submitBtn && submitText) {
      if (variant.available) {
        submitBtn.removeAttribute('disabled');
        submitBtn.removeAttribute('aria-disabled');
        submitText.textContent = 'Add to cart';
      } else {
        submitBtn.setAttribute('disabled', '');
        submitBtn.setAttribute('aria-disabled', 'true');
        submitText.textContent = 'Sold out';
      }
    }

    // Update URL with variant param (no page reload)
    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url.toString());
  }
}

/* ==========================================================================
   QuickAdd — add to cart from product card without leaving page
   ========================================================================== */
class QuickAdd {
  constructor(cartDrawer) {
    this.cartDrawer = cartDrawer;
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('form[data-quick-add]');
      if (!form) return;
      e.preventDefault();
      this._submit(form);
    });
  }

  async _submit(form) {
    const btn = form.querySelector('.product-card__quick-add-btn');
    const originalText = btn?.textContent;
    if (btn) {
      btn.textContent = 'Adding...';
      btn.setAttribute('disabled', '');
    }

    try {
      const formData = new FormData(form);
      const body = {
        id: formData.get('id'),
        quantity: parseInt(formData.get('quantity') || '1', 10),
      };

      await ThemeUtils.fetchCart('/cart/add.js', body);

      if (btn) {
        btn.textContent = 'Added!';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.removeAttribute('disabled');
        }, 1500);
      }

      // Open cart drawer and refresh
      ThemeUtils.dispatch('cart:open');
      ThemeUtils.dispatch('cart:refresh');
    } catch (err) {
      console.error('[QuickAdd] error:', err);
      if (btn) {
        btn.textContent = originalText;
        btn.removeAttribute('disabled');
      }
      alert(err.message || 'Could not add item to cart. Please try again.');
    }
  }
}

/* ==========================================================================
   QuantityInput — +/- buttons on product page
   ========================================================================== */
class QuantityInput {
  constructor() {
    // Delegate for all quantity inputs (product page)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.product-info__quantity .quantity-input__btn');
      if (!btn) return;

      const action = btn.dataset.action;
      const input  = btn.closest('.quantity-input')?.querySelector('.quantity-input__field');
      if (!input) return;

      const current = parseInt(input.value, 10) || 1;
      if (action === 'increase') {
        input.value = current + 1;
      } else if (action === 'decrease' && current > 1) {
        input.value = current - 1;
      }

      // Also sync the hidden quantity on the product form
      const sectionContainer = btn.closest('[data-section]');
      if (sectionContainer) {
        const sectionId = sectionContainer.dataset.section;
        const hiddenQty = document.getElementById(`ProductQuantity-${sectionId}`);
        if (hiddenQty) hiddenQty.value = input.value;
      }

      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
}

/* ==========================================================================
   PromoBanner — close announcement bar
   ========================================================================== */
class PromoBanner {
  constructor() {
    const closeBtn = document.getElementById('PromoBannerClose');
    const banner   = document.getElementById('PromoBanner');
    if (!closeBtn || !banner) return;

    closeBtn.addEventListener('click', () => {
      banner.style.transition = 'height 0.3s ease, opacity 0.3s ease';
      banner.style.opacity = '0';
      banner.style.height = '0';
      banner.style.overflow = 'hidden';
      setTimeout(() => banner.remove(), 300);

      // Remember preference
      try {
        sessionStorage.setItem('promo-banner-closed', '1');
      } catch {}
    });

    // Don't show if closed this session
    try {
      if (sessionStorage.getItem('promo-banner-closed')) {
        banner.style.display = 'none';
      }
    } catch {}
  }
}

/* ==========================================================================
   ProductForm — handle add to cart on product page
   ========================================================================== */
class ProductForm {
  constructor(cartDrawer) {
    this.cartDrawer = cartDrawer;

    document.querySelectorAll('form[data-product-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this._submit(form);
      });
    });
  }

  async _submit(form) {
    const submitBtn  = form.querySelector('.product-form__submit');
    const submitText = form.querySelector('#ProductSubmitBtnText');
    if (!submitBtn) return;

    submitBtn.setAttribute('disabled', '');
    form.classList.add('is-loading');

    try {
      const variantId = form.querySelector('input[name="id"]')?.value;
      const quantity  = parseInt(form.querySelector('input[name="quantity"]')?.value || '1', 10);

      if (!variantId) throw new Error('No variant selected.');

      await ThemeUtils.fetchCart('/cart/add.js', { id: variantId, quantity });

      ThemeUtils.dispatch('cart:open');
      ThemeUtils.dispatch('cart:refresh');
    } catch (err) {
      console.error('[ProductForm] submit error:', err);
      alert(err.message || 'Could not add item. Please try again.');
    } finally {
      submitBtn.removeAttribute('disabled');
      form.classList.remove('is-loading');
    }
  }
}

/* ==========================================================================
   Init — bootstrap all components on DOMContentLoaded
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Core
  const overlay     = new Overlay();
  const header      = new Header();
  const accordion   = new Accordion();
  const gallery     = new ProductGallery();
  const variants    = new VariantPicker();
  const qtyInput    = new QuantityInput();
  const promoBanner = new PromoBanner();

  // Drawers (depend on overlay)
  const cartDrawer  = new CartDrawer(overlay);
  const searchDrawer= new SearchDrawer(overlay);
  const mobileNav   = new MobileNav(overlay);

  // Cart-dependent
  const quickAdd    = new QuickAdd(cartDrawer);
  const productForm = new ProductForm(cartDrawer);

  // Expose for potential external access (e.g. theme editor)
  window.BeBot = {
    overlay,
    header,
    cartDrawer,
    searchDrawer,
    mobileNav,
    accordion,
    gallery,
    variants,
    quickAdd,
    productForm,
    utils: ThemeUtils,
  };
});

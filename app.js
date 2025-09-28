const products = {
  phones: [
    { id: 'phone-1', name: 'xPhone Aurora X', alt: 'Aurora X smartphone front view' },
    { id: 'phone-2', name: 'xPhone Nova Air', alt: 'Nova Air smartphone display' },
    { id: 'phone-3', name: 'xPhone Pixelate', alt: 'Pixelate smartphone camera' },
    { id: 'phone-4', name: 'xPhone Edge Lite', alt: 'Edge Lite smartphone silhouette' },
    { id: 'phone-5', name: 'xPhone Prism 12', alt: 'Prism 12 smartphone gradient back' },
    { id: 'phone-6', name: 'xPhone Pulse Mini', alt: 'Pulse Mini smartphone compact design' },
    { id: 'phone-7', name: 'xPhone Quantum', alt: 'Quantum smartphone angled view' },
    { id: 'phone-8', name: 'xPhone Stellar', alt: 'Stellar smartphone starry finish' },
    { id: 'phone-9', name: 'xPhone Orbit S', alt: 'Orbit S smartphone polished frame' },
    { id: 'phone-10', name: 'xPhone Horizon', alt: 'Horizon smartphone ultra-wide display' }
  ],
  clothes: [
    { id: 'clothes-1', name: 'Linen Travel Jacket', alt: 'Light linen travel jacket on hanger' },
    { id: 'clothes-2', name: 'Coastal Cotton Tee', alt: 'Cotton t-shirt folded neatly' },
    { id: 'clothes-3', name: 'Midnight Denim Shirt', alt: 'Denim shirt laid on table' },
    { id: 'clothes-4', name: 'Velvet Evening Dress', alt: 'Velvet dress on mannequin' },
    { id: 'clothes-5', name: 'Summit Windbreaker', alt: 'Windbreaker jacket with zipper' },
    { id: 'clothes-6', name: 'Heritage Cable Knit', alt: 'Cable knit sweater folded' },
    { id: 'clothes-7', name: 'Cityline Chinos', alt: 'Pair of chinos on display' },
    { id: 'clothes-8', name: 'Breeze Maxi Skirt', alt: 'Flowing maxi skirt' },
    { id: 'clothes-9', name: 'Quartz Silk Scarf', alt: 'Silk scarf draped on table' },
    { id: 'clothes-10', name: 'Trailblazer Boots', alt: 'Leather boots standing side by side' }
  ],
  perfumes: [
    { id: 'perfume-1', name: 'Amber Dusk Eau', alt: 'Amber Dusk perfume bottle' },
    { id: 'perfume-2', name: 'Cedar Mist Spray', alt: 'Cedar Mist perfume bottle' },
    { id: 'perfume-3', name: 'Noir Velvet Parfum', alt: 'Noir Velvet perfume bottle' },
    { id: 'perfume-4', name: 'Citrus Bloom', alt: 'Citrus Bloom perfume bottle' },
    { id: 'perfume-5', name: 'Aurora Musk', alt: 'Aurora Musk perfume bottle' },
    { id: 'perfume-6', name: 'Azure Coast', alt: 'Azure Coast perfume bottle' },
    { id: 'perfume-7', name: 'Golden Trail', alt: 'Golden Trail perfume bottle' },
    { id: 'perfume-8', name: 'Rosewood Echo', alt: 'Rosewood Echo perfume bottle' },
    { id: 'perfume-9', name: 'Vanilla Sky', alt: 'Vanilla Sky perfume bottle' },
    { id: 'perfume-10', name: 'Midnight Garden', alt: 'Midnight Garden perfume bottle' }
  ]
};
const state = {
  selectedCategory: 'phones',
  selectedProductId: null,
  cartProductId: null,
  checkoutTimer: null
};
const gridElement = document.querySelector('.catalog__grid');
const tabButtons = document.querySelectorAll('.tabs__button');
const bottomBar = document.querySelector('.bottom-bar');
const bottomBarButton = document.querySelector('.bottom-bar__button');
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.modal__form');
const modalInputs = modalForm.querySelectorAll('.modal__input');
const modalSubmit = document.querySelector('.modal__submit');
const modalClose = document.querySelector('.modal__close');
const modalBackdrop = document.querySelector('.modal__backdrop');
const modalProductImage = document.querySelector('.modal__product-image');
const modalProductName = document.querySelector('.modal__product-name');
const modalConfirmation = document.querySelector('.modal__confirmation');
function createPlaceholderImage(text) {
  const truncated = text.length > 12 ? `${text.slice(0, 12)}…` : text;
  const safeText = truncated
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>` +
    `<defs><linearGradient id='grad' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23d5c8bc'/><stop offset='100%' stop-color='%23e9dfd5'/></linearGradient></defs>` +
    `<rect width='200' height='200' rx='28' fill='url(%23grad)'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Segoe UI, sans-serif' font-size='20' fill='%232f2822'>${safeText}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function renderProducts() {
  gridElement.innerHTML = '';
  const categoryProducts = products[state.selectedCategory];
  categoryProducts.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'listitem');
    card.dataset.productId = product.id;
    if (state.selectedProductId === product.id) {
      card.classList.add('product-card--selected');
    }
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product-card__image-wrapper';
    const image = document.createElement('img');
    image.className = 'product-card__image';
    image.src = createPlaceholderImage(product.name);
    image.alt = product.alt;
    imageWrapper.appendChild(image);
    const name = document.createElement('p');
    name.className = 'product-card__name';
    name.textContent = product.name;
    const cartButton = document.createElement('button');
    cartButton.className = 'product-card__cart';
    cartButton.type = 'button';
    cartButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6h15l-1.5 9h-12z" fill="currentColor" opacity="0.8"></path>
        <path d="M5 6L4 3H2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
        <circle cx="10" cy="18" r="1.5" fill="currentColor"></circle>
        <circle cx="17" cy="18" r="1.5" fill="currentColor"></circle>
      </svg>
    `;
    if (state.selectedProductId !== product.id) {
      cartButton.hidden = true;
    }
    card.addEventListener('click', (event) => {
      if (event.target.closest('.product-card__cart')) {
        return;
      }
      selectProduct(product.id);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectProduct(product.id);
      }
    });
    cartButton.addEventListener('click', (event) => {
      event.stopPropagation();
      state.cartProductId = product.id;
      updateBottomBar();
    });
    card.appendChild(imageWrapper);
    card.appendChild(name);
    card.appendChild(cartButton);
    gridElement.appendChild(card);
  });
}
function selectProduct(productId) {
  state.selectedProductId = productId;
  state.cartProductId = null;
  updateBottomBar();
  renderProducts();
}
function updateBottomBar() {
  const isVisible = Boolean(state.cartProductId);
  bottomBar.classList.toggle('bottom-bar--visible', isVisible);
  bottomBar.setAttribute('aria-hidden', String(!isVisible));
}
function updateTabs() {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.category === state.selectedCategory;
    button.classList.toggle('tabs__button--active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
}
function getProductById(productId) {
  const all = products[state.selectedCategory];
  return all.find((item) => item.id === productId) || null;
}
function openModal() {
  if (!state.cartProductId) {
    return;
  }
  const product = getProductById(state.cartProductId);
  if (!product) {
    return;
  }
  modalProductImage.src = createPlaceholderImage(product.name);
  modalProductImage.alt = product.alt;
  modalProductName.textContent = product.name;
  modalForm.classList.remove('modal__form--hidden');
  modalConfirmation.classList.remove('modal__confirmation--visible');
  modalConfirmation.setAttribute('aria-hidden', 'true');
  modalSubmit.disabled = true;
  modalInputs.forEach((input) => {
    input.value = '';
  });
  modal.classList.add('modal--active');
  modal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}
function closeModal() {
  modal.classList.remove('modal--active');
  modal.setAttribute('aria-hidden', 'true');
  modalForm.classList.remove('modal__form--hidden');
  modalConfirmation.classList.remove('modal__confirmation--visible');
  modalConfirmation.setAttribute('aria-hidden', 'true');
  modalSubmit.disabled = true;
  modalInputs.forEach((input) => {
    input.value = '';
  });
  if (state.checkoutTimer) {
    clearTimeout(state.checkoutTimer);
    state.checkoutTimer = null;
  }
}
function validateForm() {
  const allFilled = Array.from(modalInputs).every((input) => input.value.trim().length > 0);
  modalSubmit.disabled = !allFilled;
}
function fillFieldWithStars(input) {
  const starsCount = Math.floor(Math.random() * 8) + 5; // 5 to 12
  input.value = '★'.repeat(starsCount);
  validateForm();
}
modalInputs.forEach((input) => {
  input.addEventListener('focus', () => fillFieldWithStars(input));
  input.addEventListener('click', () => fillFieldWithStars(input));
  input.addEventListener('keydown', (event) => event.preventDefault());
  input.addEventListener('beforeinput', (event) => event.preventDefault());
});
modalSubmit.addEventListener('click', () => {
  if (modalSubmit.disabled) {
    return;
  }
  modalForm.classList.add('modal__form--hidden');
  modalConfirmation.classList.add('modal__confirmation--visible');
  modalConfirmation.setAttribute('aria-hidden', 'false');
  if (state.checkoutTimer) {
    clearTimeout(state.checkoutTimer);
  }
  state.checkoutTimer = setTimeout(() => {
    resetAppState();
  }, 5000);
});
function resetAppState() {
  closeModal();
  state.selectedCategory = 'phones';
  state.selectedProductId = null;
  state.cartProductId = null;
  updateTabs();
  renderProducts();
  updateBottomBar();
}
bottomBarButton.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('modal--active')) {
    closeModal();
  }
});
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.selectedCategory = button.dataset.category;
    state.selectedProductId = null;
    state.cartProductId = null;
    updateTabs();
    renderProducts();
    updateBottomBar();
  });
});
renderProducts();
updateTabs();
updateBottomBar();
const products = [
  {
    id: 7,
    name: 'Sea Games Logo Painting (13" × 11")',
    model: '13" × 11"',
    price: 26,
    category: 'Gems & Jewelry',
    stock: 2,
    date: 'Monday 02 December, 2013',
    image: 'assets/products/logo-painting.jpg',
    imageAlt: 'Original archived framed painting of the 2013 SEA Games Myanmar logo',
    source: 'https://web.archive.org/web/20131217102021/http://myanmarmart.com/index.php?main_page=product_info&amp;cPath=1&amp;products_id=7'
  },
  {
    id: 6,
    name: 'Sea Games Logo Paintings (17" × 13")',
    model: '17" × 13"',
    price: 57,
    category: 'Gems & Jewelry',
    stock: 3,
    date: 'Monday 02 December, 2013',
    image: 'assets/products/logo-painting.jpg',
    imageAlt: 'Original archived framed painting of the 2013 SEA Games Myanmar logo',
    source: 'https://web.archive.org/web/20131217102021/http://myanmarmart.com/index.php?main_page=product_info&amp;cPath=1&amp;products_id=6'
  },
  {
    id: 9,
    name: 'Sea Games Mascot (13" × 11")',
    model: '13" × 11"',
    price: 26,
    category: 'Kanu Kamar Painting',
    stock: 2,
    date: 'Monday 02 December, 2013',
    image: 'assets/products/mascot-painting.jpg',
    imageAlt: 'Original archived framed painting of the twin SEA Games owl mascots',
    source: 'https://web.archive.org/web/20131217102021/http://myanmarmart.com/index.php?main_page=product_info&amp;cPath=5&amp;products_id=9'
  },
  {
    id: 8,
    name: 'Sea Games Mascot (17" × 13")',
    model: '17" × 13"',
    price: 57,
    category: 'Kanu Kamar Painting',
    stock: 3,
    date: 'Monday 02 December, 2013',
    image: 'assets/products/mascot-painting.jpg',
    imageAlt: 'Original archived framed painting of the twin SEA Games owl mascots',
    source: 'https://web.archive.org/web/20131217102021/http://myanmarmart.com/index.php?main_page=product_info&amp;cPath=5&amp;products_id=8'
  }
];

const grid = document.querySelector('#product-grid');
const searchInput = document.querySelector('#product-search');
const resultsLabel = document.querySelector('#results-label');
const emptyState = document.querySelector('#empty-state');
const dialog = document.querySelector('#product-dialog');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
let activeView = 'all';
let activeCategory = 'all';
let searchTerm = '';

function productCard(product, index) {
  const article = document.createElement('article');
  article.className = 'product-card';
  article.innerHTML = `
    <figure class="card-art">
      <img class="product-photo" src="${product.image}" alt="${product.imageAlt}" loading="lazy" decoding="async">
      <figcaption class="archive-chip">ORIGINAL ARCHIVE PHOTO</figcaption>
      <span class="card-number" aria-hidden="true">NO. 0${index + 1}</span>
    </figure>
    <div class="card-info">
      <p class="card-category">${product.category}</p>
      <h3 class="card-title">${product.name}</h3>
      <p class="card-meta">Model ${product.model} · Added 02 Dec 2013</p>
      <div class="card-bottom">
        <span class="card-price"><small>$</small>${product.price.toFixed(2)}</span>
        <button class="detail-button" type="button" data-product-id="${product.id}" aria-label="Read archived details for ${product.name}">Read listing <span aria-hidden="true">→</span></button>
      </div>
    </div>`;
  return article;
}

function updateCatalog() {
  const matches = products.filter((product) => {
    const categoryMatches = activeCategory === 'all' || product.category === activeCategory;
    const queryMatches = `${product.name} ${product.category} ${product.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatches && queryMatches;
  });
  grid.replaceChildren(...matches.map(productCard));
  const count = matches.length;
  const viewLabel = activeView === 'new' ? 'new listing' : 'archived listing';
  resultsLabel.textContent = `Showing ${count} ${viewLabel}${count === 1 ? '' : 's'}${activeView === 'new' ? ' as archived in 2013' : ''}`;
  grid.hidden = count === 0;
  emptyState.hidden = count !== 0;
}

function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll('.category-button').forEach((button) => {
    const selected = button.dataset.category === category;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  updateCatalog();
}

function setView(view) {
  activeView = view;
  document.querySelectorAll('.view-button').forEach((button) => {
    const selected = button.dataset.view === view;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  updateCatalog();
}

function showDetails(productId) {
  const product = products.find((item) => item.id === Number(productId));
  if (!product) return;
  document.querySelector('#dialog-category').textContent = product.category;
  document.querySelector('#dialog-title').textContent = product.name;
  document.querySelector('#dialog-price').textContent = `$${product.price.toFixed(2)} USD`;
  document.querySelector('#dialog-model').textContent = product.model;
  document.querySelector('#dialog-stock').textContent = `${product.stock} shown in the archive`;
  const image = document.querySelector('#dialog-image');
  image.src = product.image;
  image.alt = product.imageAlt;
  document.querySelector('#dialog-source').href = product.source.replaceAll('&amp;', '&');
  dialog.showModal();
}

document.querySelectorAll('.category-button').forEach((button) => {
  button.addEventListener('click', () => setCategory(button.dataset.category));
});
document.querySelectorAll('.view-button').forEach((button) => {
  button.addEventListener('click', () => setView(button.dataset.view));
});
grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product-id]');
  if (button) showDetails(button.dataset.productId);
});
searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value.trim();
  updateCatalog();
});
document.querySelector('#reset-catalog').addEventListener('click', () => {
  searchInput.value = '';
  searchTerm = '';
  setCategory('all');
});
document.querySelectorAll('[data-nav-view="all"]').forEach((link) => {
  link.addEventListener('click', () => setView('all'));
});
document.querySelectorAll('[data-nav-view="new"]').forEach((link) => {
  link.addEventListener('click', () => setView('new'));
});
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  primaryNav.classList.toggle('is-open', !expanded);
});
primaryNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

updateCatalog();

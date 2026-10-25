/* Catalogue records are intentionally unpublished until real product information is supplied. */
const catalogue = [
  { id: "product-01", name: "Artwork title placeholder", category: "paintings", categoryName: "Original paintings", description: "Replace with a verified title, description, dimensions and materials.", price: null, image: "", availability: "Catalogue details pending", published: false },
  { id: "product-02", name: "Artwork title placeholder", category: "calligraphy", categoryName: "Calligraphy", description: "Replace with a verified title, description, dimensions and materials.", price: null, image: "", availability: "Catalogue details pending", published: false },
  { id: "product-03", name: "Artwork title placeholder", category: "crafts", categoryName: "Handmade crafts", description: "Replace with a verified title, description, dimensions and materials.", price: null, image: "", availability: "Catalogue details pending", published: false },
  { id: "product-04", name: "Artwork title placeholder", category: "sculpture", categoryName: "3D art & sculptures", description: "Replace with a verified title, description, dimensions and materials.", price: null, image: "", availability: "Catalogue details pending", published: false }
];

const categories = [
  { id: "paintings", label: "Paintings & canvas art" },
  { id: "calligraphy", label: "Calligraphy & Islamic art" },
  { id: "crafts", label: "Handmade crafts" },
  { id: "sculpture", label: "3D art & sculptures" },
  { id: "gifts", label: "Personalized gifts" },
  { id: "interior", label: "Home & interior art" }
];

const CART_KEY = "kalam-studio-cart-v1";
const productGrid = document.querySelector("#product-grid");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-products");
const bagCount = document.querySelector("#bag-count");
let cart = readCart();
let toastTimer;

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter((line) => catalogue.some((item) => item.id === line.id && item.published && Number.isFinite(item.price) && item.price > 0) && Number.isInteger(line.quantity) && line.quantity > 0) : [];
  } catch {
    return [];
  }
}

function money(value) {
  return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(value);
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function renderProducts() {
  let products = catalogue.filter((item) => item.published);
  const chosenCategory = categoryFilter.value;
  if (chosenCategory !== "all") products = products.filter((item) => item.category === chosenCategory);
  if (sortSelect.value === "name") products.sort((a, b) => a.name.localeCompare(b.name));
  if (sortSelect.value === "price-low") products.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "price-high") products.sort((a, b) => b.price - a.price);
  document.querySelector("#shop-status").textContent = products.length ? `${products.length} studio ${products.length === 1 ? "piece" : "pieces"} to explore.` : "A considered collection, coming into focus.";
  if (!products.length) {
    productGrid.innerHTML = `<div class="empty-catalogue"><p class="eyebrow">CATALOGUE IN PROGRESS</p><h3>The next piece is taking shape.</h3><p>Verified artwork, prices and availability will be added here by the studio. For now, tell us what you are looking for and we will help you explore.</p><a class="text-link" href="#contact">Ask about a piece <span aria-hidden="true">↗</span></a></div>`;
    return;
  }
  productGrid.innerHTML = products.map((item) => `
    <article class="product-card">
      <button class="product-image product-open" type="button" data-product="${item.id}" aria-label="View ${escapeHtml(item.name)}">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy">` : `<span class="product-image-label">KALAM<br>STUDIO</span>`}
      </button>
      <div class="product-meta"><span>${escapeHtml(item.categoryName)}</span><span>${escapeHtml(item.availability)}</span></div>
      <div class="product-title-row"><h3 class="product-title">${escapeHtml(item.name)}</h3><p class="product-price">${money(item.price)}</p></div>
      <p class="product-description">${escapeHtml(item.description)}</p>
      <button class="product-action" type="button" data-add="${item.id}">Add to bag</button>
    </article>`).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function addToCart(id) {
  const product = catalogue.find((item) => item.id === id && item.published && Number.isFinite(item.price) && item.price > 0);
  if (!product) return;
  const line = cart.find((item) => item.id === id);
  if (line) line.quantity += 1;
  else cart.push({ id, quantity: 1 });
  saveCart();
  showToast("Added to your bag.");
}

function cartTotal() {
  return cart.reduce((total, line) => {
    const product = catalogue.find((item) => item.id === line.id);
    return total + (product ? product.price * line.quantity : 0);
  }, 0);
}

function renderCart() {
  const count = cart.reduce((total, line) => total + line.quantity, 0);
  bagCount.textContent = String(count);
  bagCount.setAttribute("aria-label", `${count} items`);
  document.querySelector("#cart-title-count").textContent = `(${count})`;
  document.querySelector("#cart-total").textContent = money(cartTotal());
  const items = document.querySelector("#cart-items");
  const checkout = document.querySelector("#checkout-button");
  checkout.disabled = cart.length === 0;
  if (!cart.length) {
    items.innerHTML = `<p class="cart-empty">Your bag is waiting for a real studio piece. The catalogue is being prepared.</p>`;
    return;
  }
  items.innerHTML = cart.map((line) => {
    const product = catalogue.find((item) => item.id === line.id);
    return `<article class="cart-line"><div><h3>${escapeHtml(product.name)}</h3><p>${money(product.price)} each</p></div><div class="cart-line-actions"><button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${line.quantity}</span><button type="button" data-quantity="${product.id}" data-change="1" aria-label="Increase quantity">+</button><button class="remove-line" type="button" data-remove="${product.id}">Remove</button></div></article>`;
  }).join("");
}

function changeQuantity(id, change) {
  const line = cart.find((item) => item.id === id);
  if (!line) return;
  line.quantity += change;
  if (line.quantity < 1) cart = cart.filter((item) => item.id !== id);
  saveCart();
}

function openOverlay(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  overlay.querySelector(".dialog-close")?.focus();
}

function closeOverlay(overlay) {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".overlay.is-open")) document.body.classList.remove("no-scroll");
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function renderSearch(query = "") {
  const results = document.querySelector("#search-results");
  const text = query.trim().toLowerCase();
  const matches = categories.filter((item) => !text || item.label.toLowerCase().includes(text));
  const productMatches = catalogue.filter((item) => item.published && `${item.name} ${item.categoryName} ${item.description}`.toLowerCase().includes(text));
  const items = [...matches.map((item) => ({ name: item.label, type: "Collection", href: "#shop", category: item.id })), ...productMatches.map((item) => ({ name: item.name, type: item.categoryName, href: "#shop", category: item.category }))];
  results.innerHTML = items.length ? items.map((item) => `<a class="search-result" href="${item.href}" data-category="${item.category}"><span>${escapeHtml(item.name)}</span><span>${escapeHtml(item.type)} ↗</span></a>`).join("") : `<p class="search-empty">No matching collection or verified product. Try another search or ask the studio directly.</p>`;
}

function openProduct(id) {
  const item = catalogue.find((product) => product.id === id && product.published);
  if (!item) return;
  document.querySelector("#product-detail").innerHTML = `<div class="product-detail-layout"><div class="product-detail-art"><span class="product-image-label">KALAM<br>STUDIO</span></div><div class="product-detail-copy"><p class="eyebrow">${escapeHtml(item.categoryName)}</p><h2 id="product-title">${escapeHtml(item.name)}</h2><p>${escapeHtml(item.description)}</p><p class="detail-price">${money(item.price)}</p><p>${escapeHtml(item.availability)}</p><button class="button button-dark" type="button" data-add="${item.id}">Add to bag <span aria-hidden="true">↗</span></button></div></div>`;
  openOverlay("product-overlay");
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const addButton = target.closest("[data-add]");
  if (addButton) addToCart(addButton.getAttribute("data-add"));
  const productButton = target.closest("[data-product]");
  if (productButton) openProduct(productButton.getAttribute("data-product"));
  const removeButton = target.closest("[data-remove]");
  if (removeButton) {
    cart = cart.filter((line) => line.id !== removeButton.getAttribute("data-remove"));
    saveCart();
  }
  const quantityButton = target.closest("[data-quantity]");
  if (quantityButton) changeQuantity(quantityButton.getAttribute("data-quantity"), Number(quantityButton.getAttribute("data-change")));
  const policyButton = target.closest("[data-policy]");
  if (policyButton) {
    event.preventDefault();
    showPolicy(policyButton.getAttribute("data-policy"));
  }
  if (target.closest(".dialog-close")) closeOverlay(target.closest(".overlay"));
  if (target.classList.contains("overlay")) closeOverlay(target);
  const categoryLink = target.closest("[data-category]");
  if (categoryLink && categoryLink.tagName === "A") {
    categoryFilter.value = categoryLink.getAttribute("data-category");
    renderProducts();
    if (categoryLink.classList.contains("search-result")) closeOverlay(document.querySelector("#search-overlay"));
    document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
  }
  if (target.closest(".search-open")) {
    openOverlay("search-overlay");
    document.querySelector("#search-input").focus();
  }
  if (target.closest(".bag-button")) openOverlay("cart-overlay");
  if (target.closest(".menu-toggle")) toggleMobileMenu();
  if (target.closest(".nav-menu-button")) {
    const group = target.closest(".nav-group");
    group.classList.toggle("is-open");
    group.querySelector(".nav-menu-button").setAttribute("aria-expanded", String(group.classList.contains("is-open")));
  }
  if (target.closest("#newsletter-button")) showToast("Newsletter signup is not configured yet.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") document.querySelectorAll(".overlay.is-open").forEach(closeOverlay);
});

function toggleMobileMenu() {
  const menu = document.querySelector("#primary-nav");
  const button = document.querySelector(".menu-toggle");
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  button.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  menu.classList.toggle("is-open", !expanded);
}

function showPolicy(kind) {
  const policies = {
    shipping: ["Shipping & returns", "Delivery options, fees, timings and return terms have not been confirmed for this website preview. Contact the studio at <a href=\"mailto:info@kalamartsstudio.com\">info@kalamartsstudio.com</a> before arranging an order."],
    privacy: ["Privacy policy", "When the Google Apps Script backend is configured, project details are stored in the studio's Google Sheet and a Gmail notification is sent to the studio. Until then, this preview does not store form details; it provides a WhatsApp link instead."],
    terms: ["Terms & conditions", "This website is a development preview. The product catalogue, payment processing, shipping rules and order terms are not yet configured. No purchase can be completed on this preview."]
  };
  const [title, copy] = policies[kind] || policies.terms;
  document.querySelector("#policy-title").textContent = title;
  document.querySelector("#policy-copy").innerHTML = `<p>${copy}</p>`;
  openOverlay("policy-overlay");
}

categoryFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);
document.querySelector("#view-all").addEventListener("click", (event) => {
  event.preventDefault();
  categoryFilter.value = "all";
  renderProducts();
  document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
});
document.querySelector("#search-input").addEventListener("input", (event) => renderSearch(event.target.value));

document.querySelector("#enquiry-form").addEventListener("submit", (event) => {
  event.preventDefault();
  window.KalamIntegrations.submit(event.currentTarget, document.querySelector("#form-status"));
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  showToast("Checkout is not available until catalogue, delivery and payment settings are configured.");
});

document.querySelectorAll(".primary-nav a").forEach((link) => link.addEventListener("click", () => {
  document.querySelector("#primary-nav").classList.remove("is-open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
}));

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
renderProducts();
renderCart();
renderSearch();

const scrollProgress = document.querySelector("#scroll-progress-fill");
let progressFramePending = false;
function updateScrollProgress() {
  const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = availableScroll > 0 ? window.scrollY / availableScroll : 0;
  scrollProgress.style.width = `${Math.min(1, Math.max(0, progress)) * 100}%`;
  progressFramePending = false;
}
window.addEventListener("scroll", () => {
  if (progressFramePending) return;
  progressFramePending = true;
  window.requestAnimationFrame(updateScrollProgress);
}, { passive: true });
updateScrollProgress();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}
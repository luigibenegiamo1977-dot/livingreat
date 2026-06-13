const categories = [
  { name: "Piscine & SPA", group: "blu", image: "assets/blu-3.jpg", page: "Da pagina 3" },
  { name: "Forni & barbecue", group: "blu", image: "assets/blu-59.jpg", page: "Da pagina 59" },
  { name: "Giochi bimbo", group: "blu", image: "assets/blu-71.jpg", page: "Da pagina 71" },
  { name: "Illuminazione", group: "blu", image: "assets/blu-73.jpg", page: "Da pagina 73" },
  { name: "Cottage & bauli", group: "blu", image: "assets/blu-80.jpg", page: "Da pagina 80" },
  { name: "Arredo giardino", group: "blu", image: "assets/blu-84.jpg", page: "Da pagina 84" },
  { name: "Coltivazione", group: "verde", image: "assets/verde-3.jpg", page: "Da pagina 3" },
  { name: "Attrezzi", group: "verde", image: "assets/verde-17.jpg", page: "Da pagina 17" },
  { name: "Irrigazione", group: "verde", image: "assets/verde-33.jpg", page: "Da pagina 33" },
  { name: "Macchine", group: "verde", image: "assets/verde-59.jpg", page: "Da pagina 59" },
  { name: "Complementi & recinzioni", group: "verde", image: "assets/verde-89.jpg", page: "Da pagina 89" },
];

const products = [
  { name: "SPA Lay-Z Vancouver AirJet", category: "Piscine & SPA", catalog: "Spazio Blu", image: "assets/blu-3.jpg", page: "Pagina 3", description: "Una soluzione SPA per creare un angolo di benessere direttamente a casa." },
  { name: "Piscine fuori terra", category: "Piscine & SPA", catalog: "Spazio Blu", image: "assets/blu-3.jpg", page: "Da pagina 5", description: "Formati e finiture differenti per vivere l'estate nel proprio spazio outdoor." },
  { name: "Forni e barbecue", category: "Cucina outdoor", catalog: "Spazio Blu", image: "assets/blu-59.jpg", page: "Da pagina 59", description: "Soluzioni per cucinare e condividere momenti all'aperto." },
  { name: "Giochi per bambini", category: "Tempo libero", catalog: "Spazio Blu", image: "assets/blu-71.jpg", page: "Da pagina 71", description: "Giochi pensati per rendere il giardino uno spazio di scoperta." },
  { name: "Illuminazione esterna", category: "Illuminazione", catalog: "Spazio Blu", image: "assets/blu-73.jpg", page: "Da pagina 73", description: "Luci e lampade per valorizzare percorsi, terrazze e giardini." },
  { name: "Cottage in legno", category: "Strutture", catalog: "Spazio Blu", image: "assets/blu-80.jpg", page: "Pagina 80", description: "Spazio pratico e ordinato per attrezzi e accessori da esterno." },
  { name: "Vasi e coltivazione", category: "Coltivazione", catalog: "Spazioverde", image: "assets/verde-3.jpg", page: "Da pagina 3", description: "Tutto il necessario per accompagnare la crescita delle tue piante." },
  { name: "Attrezzi da giardino", category: "Attrezzi", catalog: "Spazioverde", image: "assets/verde-17.jpg", page: "Da pagina 17", description: "Strumenti affidabili per la cura quotidiana degli spazi verdi." },
  { name: "Sistemi di irrigazione", category: "Irrigazione", catalog: "Spazioverde", image: "assets/verde-33.jpg", page: "Da pagina 33", description: "Soluzioni per irrigare in modo semplice, preciso ed efficiente." },
  { name: "Macchine da giardino", category: "Macchine", catalog: "Spazioverde", image: "assets/verde-59.jpg", page: "Da pagina 59", description: "Macchine e accessori per gestire anche gli interventi più impegnativi." },
  { name: "Recinzioni e complementi", category: "Complementi", catalog: "Spazioverde", image: "assets/verde-89.jpg", page: "Da pagina 89", description: "Elementi funzionali per organizzare, delimitare e completare il giardino." },
];

const categoryGrid = document.querySelector("#categoryGrid");
const productGrid = document.querySelector("#productGrid");
const search = document.querySelector("#productSearch");
const emptyState = document.querySelector("#emptyState");
const modal = document.querySelector("#productModal");

function renderCategories(filter = "all") {
  categoryGrid.innerHTML = categories
    .filter(item => filter === "all" || item.group === filter)
    .map(item => `
      <a class="category-card" href="https://wa.me/393406289776?text=${encodeURIComponent(`Ciao, vorrei informazioni sulla categoria ${item.name}`)}" target="_blank" rel="noreferrer">
        <img src="${item.image}" alt="${item.name}">
        <div class="category-copy"><span>${item.page} · ${item.group === "blu" ? "Spazio Blu" : "Spazioverde"}</span><strong>${item.name}</strong></div>
      </a>`).join("");
}

function renderProducts(query = "") {
  const terms = query.toLowerCase().trim();
  const visible = products.filter(item => `${item.name} ${item.category} ${item.catalog}`.toLowerCase().includes(terms));
  productGrid.innerHTML = visible.map((item, index) => `
    <article class="product-card" data-index="${products.indexOf(item)}" tabindex="0">
      <img src="${item.image}" alt="${item.name}">
      <div class="product-copy"><span>${item.catalog}</span><h3>${item.name}</h3><p>${item.page}</p></div>
    </article>`).join("");
  emptyState.hidden = visible.length > 0;
}

function openProduct(index) {
  const item = products[index];
  modal.querySelector(".modal-content").innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div class="modal-copy">
      <p class="eyebrow">${item.catalog} · ${item.page}</p>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <a class="button" href="https://wa.me/393406289776?text=${encodeURIComponent(`Ciao, vorrei informazioni su: ${item.name}`)}" target="_blank" rel="noreferrer">Chiedi informazioni</a>
    </div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  renderCategories(button.dataset.filter);
}));
search.addEventListener("input", event => renderProducts(event.target.value));
productGrid.addEventListener("click", event => {
  const card = event.target.closest(".product-card");
  if (card) openProduct(card.dataset.index);
});
productGrid.addEventListener("keydown", event => {
  if (event.key === "Enter") openProduct(event.target.closest(".product-card")?.dataset.index);
});
modal.querySelector(".modal-close").addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
});
modal.addEventListener("click", event => {
  if (event.target === modal) modal.querySelector(".modal-close").click();
});
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("mobile-open");
});

renderCategories();
renderProducts();

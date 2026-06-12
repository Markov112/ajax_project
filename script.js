// API base URL
const BASE_URL = "https://fakestoreapi.com/products";

const productsDiv = document.getElementById("products");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

// Fetch all products
async function fetchProducts() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    allProducts = data;
    renderProducts(data);
    extractCategories(data);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// Render products to UI
function renderProducts(products) {
  productsDiv.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" width="100">
      <h3>${product.title}</h3>
      <p>${product.price} €</p>
    `;

    productsDiv.appendChild(card);
  });
}

// Create category dropdown dynamically
function extractCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Filter by category
categorySelect.addEventListener("change", () => {
  const value = categorySelect.value;

  if (value === "all") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === value);
    renderProducts(filtered);
  }
});

// Search filter
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(term)
  );

  renderProducts(filtered);
});

// Init app
fetchProducts();

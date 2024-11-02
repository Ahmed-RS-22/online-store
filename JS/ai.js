let userInfo = document.getElementById("user_info");
let userData = document.getElementById("user");
let links = document.querySelector(".links");
let header = document.querySelector("header");
let logOutBtn = document.getElementById("logOut");
let cart = document.querySelector(".Shopping-cart");
let sideBar = document.getElementById("sider");
let allProducts = document.querySelector(".products");
let productsCart = document.getElementById("sider");
let badge = document.querySelector(".Shopping-cart .badge");

// Check and Display User Info
function displayUserInfo() {
  if (localStorage.getItem("username")) {
    links?.remove();
    userInfo.style.display = "grid";
    userData.innerHTML = `Welcome, ${localStorage.getItem("username")}`;
  }
}
displayUserInfo();

// Log Out Functionality
logOutBtn?.addEventListener("click", () => {
  ["username", "password", "email"].forEach(item => localStorage.removeItem(item));
  location.reload(); // Reload to reflect changes
});

// Toggle Favorites
function setupFavorites() {
  document.querySelectorAll(".favBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("fav");
      btn.classList.toggle("grow");
    });
  });
}

// Sidebar Toggle
function toggleSidebar() {
  sideBar.classList.toggle("show");
}
function hideSidebar(event) {
  if (!sideBar.contains(event.target) && !cart.contains(event.target)) {
    sideBar.classList.remove("show");
    updateCartCount();
  }
}
cart?.addEventListener("click", toggleSidebar);
document.addEventListener("click", hideSidebar);
// Products Data
const products = [
  { id: 1, name: "product-1", price: 10, category: "cat-1", image: "1.jpg" },
  { id: 2, name: "product-2", price: 20, category: "cat-2", image: "2.jpg" },
  { id: 3, name: "product-3", price: 30, category: "cat-3", image: "3.jpg" },
  { id: 4, name: "product-4", price: 40, category: "cat-4", image: "4.jpg" },
  { id: 5, name: "product-5", price: 50, category: "cat-5", image: "5.jpg" },
  { id: 6, name: "product-6", price: 60, category: "cat-6", image: "6.jpg" },
  { id: 7, name: "product-7", price: 70, category: "cat-7", image: "7.jpg" },
  { id: 8, name: "product-8", price: 80, category: "cat-8", image: "8.jpg" }
];
// Draw Products
function drawProducts() {
  const productHTML = products.map(item => `
    <div class="product">
      <div class="product-image">
        <img src="images/${item.image}" alt="${item.name}">
      </div>
      <div class="product-desc">
        <p><span>Name: </span><span>${item.name}</span></p>
        <p><span>Price: </span><span>${item.price} $</span></p>
        <p><span>Category: </span><span>${item.category}</span></p>
      </div>
      <div class="product-btns">
        <button class="productBtn" onClick="toggleCart(${item.id}, this)">
          ${isInCart(item.id) ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button class="favBtn"><i class="fa-solid fa-heart"></i></button>
      </div>
    </div>
  `).join("");
  
  allProducts.innerHTML = productHTML;
  setupFavorites();
}
drawProducts();
// Check if item is in cart
function isInCart(id) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  return cartItems.some(item => item.id === id);
}
// Toggle Add/Remove Cart Button
function toggleCart(id, button) {
  if (isInCart(id)) {
    removeFromCart(id);
    button.innerHTML = "Add to Cart";
  } else {
    addToCart(id);
    button.innerHTML = "Remove from Cart";
  }
}

// Add Item to Cart and Local Storage
function addToCart(id) {
    if (!localStorage.getItem("username")) {
        alert("please login first");
        setTimeout(() => {
          window.location = "log-in.html";
        }, 1000);} else{
  const item = products.find(product => product.id === id);
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cartItems.find(cartItem => cartItem.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...item, quantity: 1 });
    renderCartItem({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();}
}

// Remove Item from Cart and Local Storage
function removeFromCart(id) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems = cartItems.filter(cartItem => cartItem.id !== id);

  localStorage.setItem("cart", JSON.stringify(cartItems));
  document.querySelector(`.sold[data-id="${id}"]`)?.remove();
  updateCartCount();

  // Find and reset the button text in the products section
  const productButton = document.querySelector(`.product .productBtn[onclick="toggleCart(${id}, this)"]`);
  if (productButton) {
    productButton.innerHTML = "Add to Cart";
  }
}

// Render a Single Cart Item
function renderCartItem(item) {
  const productHTML = `
    <div class="sold" data-id="${item.id}">
      <div class="image"><img src="images/${item.image}" alt="${item.name}"></div>
      <div class="data">
        <span>${item.name}</span>
        <span class="number">${item.quantity}</span>
        <button class="add">+</button>
        <button class="remove">-</button>
      </div>
    </div>`;

  productsCart.insertAdjacentHTML('beforeend', productHTML);

  const lastProduct = productsCart.querySelector(`.sold[data-id="${item.id}"]`);
  const addButton = lastProduct.querySelector(".add");
  const removeButton = lastProduct.querySelector(".remove");
  const numberDisplay = lastProduct.querySelector(".number");

  addButton.addEventListener("click", () => updateItemQuantity(item.id, numberDisplay, 1));
  removeButton.addEventListener("click", () => updateItemQuantity(item.id, numberDisplay, -1));
}

// Update Item Quantity and Update Local Storage
function updateItemQuantity(id, numberDisplay, delta) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cartItems.find(cartItem => cartItem.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(cartItem => cartItem.id !== id);
      document.querySelector(`.sold[data-id="${id}"]`).remove();
      toggleProductButtonToAdd(id); // Update product button text to "Add to Cart"
    } else {
      numberDisplay.innerHTML = item.quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartCount();
  }
}

// Reset product button text to "Add to Cart" when quantity reaches zero
function toggleProductButtonToAdd(id) {
  const productButton = document.querySelector(`.product .productBtn[onclick="toggleCart(${id}, this)"]`);
  if (productButton) {
    productButton.innerHTML = "Add to Cart";
  }
}

// Update Cart Count Badge
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  badge.innerHTML = cartItems.length;
}

// Load Cart on Page Load
// initializeCart();
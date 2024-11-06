const products = [
  { id: 1, name: "product-1", price: 10, category: "cat-1", image: "1.jpg" },
  { id: 2, name: "troduct-2", price: 20, category: "bat-2", image: "2.jpg" },
  { id: 3, name: "croduct-3", price: 30, category: "bat-3", image: "3.jpg" },
  { id: 4, name: "croduct-4", price: 40, category: "hat-4", image: "4.jpg" },
  { id: 5, name: "product-5", price: 50, category: "hat-5", image: "5.jpg" },
  { id: 6, name: "roduct-6", price: 60, category: "cat-6", image: "6.jpg" },
  { id: 7, name: "troduct-7", price: 70, category: "cat-7", image: "7.jpg" },
  { id: 8, name: "roduct-8", price: 80, category: "cat-8", image: "8.jpg" },
  {id: 9, name: "product-9", price: 90, category: "cat-9", image: "9.jpg"},
  {id: 10, name: "product-10", price: 100, category: "cat-10", image: "10.jpg"},
  {id: 11, name: "product-11", price: 110, category: "cat-11", image: "11.jpg"},
  {id: 12, name: "product-12", price: 120, category: "cat-12", image: "12.jpg"},
  {id: 13, name: "product-13", price: 130, category: "cat-13", image: "13.jpg"},
  {id: 14, name: "product-14", price: 140, category: "cat-14", image: "14.jpg"},
  {id: 15, name: "product-15", price: 150, category: "cat-15", image: "15.jpg"},
  {id: 16, name: "product-16", price: 160, category: "cat-16", image: "16.jpg"},
  {id: 17, name: "product-17", price: 170, category: "cat-17", image: "17.jpg"},
  {id: 18, name: "product-18", price: 180, category: "cat-18", image: "18.jpg"},
  {id: 19, name: "product-19", price: 190, category: "cat-19", image: "19.jpg"},
  {id: 20, name: "product-20", price: 200, category: "cat-20", image: "20.jpg"},
  {id: 21, name: "product-21", price: 210, category: "cat-21", image: "21.jpg"},
  {id: 22, name: "product-22", price: 220, category: "cat-22", image: "22.jpg"},
  {id: 23, name: "product-23", price: 230, category: "cat-23", image: "23.jpg"},
  {id: 24, name: "product-24", price: 240, category: "cat-24", image: "24.jpg"},
  // {id: 25, name: "product-25", price: 250, category: "cat-25", image: "25.jpg"},
  // {id: 26, name: "product-26", price: 260, category: "cat-26", image: "26.jpg"},
  // {id: 27, name: "product-27", price: 270, category: "cat-27", image: "27.jpg"},
  // {id: 28, name: "product-28", price: 280, category: "cat-28", image: "28.jpg"},
  // {id: 29, name: "product-29", price: 290, category: "cat-29", image: "29.jpg"},
  // {id: 30, name: "product-30", price: 300, category: "cat-30", image: "30.jpg"},
  // {id: 31, name: "product-31", price: 300, category: "cat-31", image: "31.jpg"},
  // {id: 32, name: "product-32", price: 300, category: "cat-32", image: "32.jpg"},
];
//////// favourite to red
let favouriteItems = JSON.parse(localStorage.getItem("favourite")) || [];
localStorage.setItem("favourite", JSON.stringify(favouriteItems))
function favourite() {
  let favBtns = document.querySelectorAll(".favBtn");
  favBtns.forEach((btn) => {
    // check if it exist in locla storage
    for (i of JSON.parse(localStorage.getItem("favourite"))) {
      if (i.id === btn.dataset.id) {
        btn.classList.add("fav");
        btn.classList.add("grow");
      }
    }
    btn.addEventListener("click", function () {
      let favIemID = btn.dataset.id;
      let favIemImage = btn.dataset.image;
      btn.classList.toggle("fav");
      btn.classList.toggle("grow");
      let favItem = btn.parentNode.parentNode.querySelector(".product-desc");
      let favData = {
        id: favIemID,
        name: favItem.querySelector(".iname").textContent,
        category: favItem.querySelector(".icat").textContent,
        image:favIemImage,
      };
      addAndRemovefavourite(favData);
    });
  });
}
function addAndRemovefavourite(fav) {
  // add or remove from locla storage
  const itemIndex = favouriteItems.findIndex((item) => item.id === fav.id);
  if (itemIndex !== -1) {
    // If item exists, remove it
    favouriteItems.splice(itemIndex, 1);
  } else {
    // If item does not exist, add it
    favouriteItems.push(fav);
  }
  // Update local storage after add/remove
  localStorage.setItem("favourite", JSON.stringify(favouriteItems));
}
////// side bar ///////
let cart = document.querySelector(".Shopping-cart");
let sideBar = document.getElementById("sider");
//  sideBar.onblur=()=>{
//    sideBar.classList.remove("show")
//  }
//  cart.addEventListener("click",()=>{
//    sideBar.focus()
//    sideBar.classList.toggle("show")
//   })
// Toggle the sideBar visibility when cart is clicked
cart.addEventListener("click", (event) => {
  sideBar.classList.toggle("show");
  event.stopPropagation(); // Prevent click event from bubbling up to document
});
// Hide sideBar if clicking outside of it
document.addEventListener("click", (event) => {
  if (!sideBar.contains(event.target) && !cart.contains(event.target)) {
    sideBar.classList.remove("show"); // Hide sideBar if click is outside
    count();
  }
});
/////////////// main products
let allProducts = document.querySelector(".products");
function drawProducts() {
  let drawnProducts = products
    .map((item) => {
      return `
    <div class="product" data-id="${item.id}">
              <div class="product-image">
                <img src="images/${item.image}" alt="...">
              </div>
              <div class="product-desc" >
                <p><span>name: </span><span class = "iname" data-ser="${item.name}">${item.name}</span></p>
                <p><span>price : </span><span >${item.price} $</span></p>
                <p><span>category : </span><span class = "icat" data-ser="${item.category}">${item.category}</span></p>
              </div>
              <div class="product-btns">
              <button class=" productBtn add" onClick="addToCart(${item.id}) " data-id="${item.id}">add to cart</button>
              <button class=" productBtn remove" onClick="removeFromCart(${item.id})" data-id="${item.id}" style="display: none;">remove from cart </button>
              <button class=" favBtn" data-id="${item.id}" data-image="${item.image}" tilte="add to favourite"><i class="fa-solid fa-heart"></i></button>
              </div>
              </div>
              `;
    })
    .join("");
  allProducts.innerHTML = drawnProducts;
  favourite();
  productsInCart();
}
/////////////// cart
let productsCart = document.getElementById("sider");
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify(cartItems));
function productsInCart() {
  let productinacrt = [];
  for (item of JSON.parse(localStorage.getItem("cart"))) {
    let clickedItem = cartItems.find((ele) => item.id == ele.id);
    ShowAndHide(clickedItem.id);
    const productHTML = `
        <div class="sold" data-id="${clickedItem.id}">
        <div class="image"><img src="images/${clickedItem.image}" alt="${clickedItem.name}"></div>
        <div class="data">
        <span>${clickedItem.name}</span>
        <span class="number">${clickedItem.number}</span>
        <button class="add" onClick="soldItemCont(${clickedItem.id}, 'add')">+</button>
        <button class="remove" onClick="soldItemCont(${clickedItem.id}, 'remove')">-</button>
        </div>
        </div>`;
    productinacrt.push(productHTML);
  }
  productsCart.innerHTML =
    `<a href="products.html"> view all products </a>` + productinacrt.join("");
  count();
}
function isInCart(id) {
  return cartItems.some((item) => item.id === id);
}
function ShowAndHide(id) {
  const addButton = document.querySelector(`.add[data-id="${id}"]`);
  const removeButton = document.querySelector(`.remove[data-id="${id}"]`);
  if (addButton && removeButton) {
    const isInCartItem = isInCart(id);
    addButton.style.display = isInCartItem ? "none" : "block";
    removeButton.style.display = isInCartItem ? "block" : "none";
  }
}
function removeFromCart(id) {
  let index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {

    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    productsInCart();
    ShowAndHide(id);
  }
}
function addToCart(id) {
  if (!localStorage.getItem("username")) {
    alert("please login first");
    setTimeout(() => {
      window.location = "log-in.html";
    }, 1000);
  } else {
    let clickedItem = products.find((item) => item.id == id);
    let soldItemData = {
      id: clickedItem.id,
      name: clickedItem.name,
      price: clickedItem.price,
      image: clickedItem.image,
      category:clickedItem.category,
      number: 1,
    };
    cartItems.push(soldItemData);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    productsInCart();
    count();
  }
}
function soldItemCont(id, action) {
  const soldItem = document.querySelector(`.sold[data-id="${id}"]`);

  let numberDisplay = soldItem.querySelector(".number");
  if (action === "add") {
    cartItems.find((item) => item.id == id).number++;
    numberDisplay.innerHTML = cartItems.find((item) => item.id == id).number;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else if (action === "remove") {
    cartItems.find((item) => item.id == id).number--;
    numberDisplay.innerHTML = cartItems.find((item) => item.id == id).number;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    if (numberDisplay.innerHTML <= 0) {
      removeFromCart(id);
    }
  }
}
function count() {
  let badge = document.querySelector(".Shopping-cart .badge");
  let solditems = document.querySelectorAll("#sider .sold");
  if(solditems.length <= 0){
    badge.style.display="none"
  }else{
    badge.style.display="block"
    badge.innerHTML = solditems.length;

  }
}
let searchInput = document.getElementById("search");
function searching() {
  let searchedItems =allProducts.querySelectorAll(".product")
  searchedItems.forEach((item) => {
    searchInput.addEventListener("keyup",()=>{      
      let searchInputValue = document.getElementById("search").value.toLowerCase();
      const selection = document.getElementById("searchBy").value.toLowerCase()
      let searchType;
  if(selection == "name"){
    searchType = item.querySelector(".iname").dataset.ser
    }else if(selection == "category"){
      searchType =item.querySelector(".icat").dataset.ser
      }      
      if (searchType.includes(searchInputValue) && searchType.startsWith(searchInputValue[0])) {
        item.style.display = "flex";
        } else {
          item.style.display = "none";
          if(searchInputValue.trim() == ""){
            item.style.display = "flex"
          }
          }
      })
    })

}
drawProducts();
searching()


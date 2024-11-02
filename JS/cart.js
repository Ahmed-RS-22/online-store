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
/////////////////////////////
let allProducts =document.getElementById("soldProducts")
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
function drawnProducts(){
    let drawnProducts = cartItems
    .map((item) => {
      return `
         <div class="product"  data-id="${item.id}">

            <div class="image">
              <img src="images/${item.image}" alt="...">
            </div>
            <div class="info">
              <div class="data">
                <p class="name"><span>Product : </span><span>${item.name}</span> </p>
                <p class="category"><span>category : </span> <span>${item.category}</span></p>
                <p class="price"><span>price : </span><span>${item.price} $</span></p>
              </div>
              <div class="buttons">
                <p class="number">${item.number}</p>
                <button class="add" onClick="soldItemCont(${item.id}, 'add')">+</button>
                <button class="remove" onClick="soldItemCont(${item.id}, 'remove')">-</button>
                <button class="remover" onClick="removeFromCart(${item.id})" data-id="${item.id}" >remove from cart</button>
              </div>
            </div>
         </div>
              `;
    })
    .join("");
  allProducts.innerHTML = drawnProducts +`<div class="total" id="total">total price : <span>0$</span></div>`;
  productsInCart()
}
let productsCart = document.getElementById("sider");
function productsInCart() {
    let productinacrt = [];
  for (item of JSON.parse(localStorage.getItem("cart"))) {
      let clickedItem = cartItems.find((ele) => item.id == ele.id);
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
    `<a href="index.html"> Go to store </a>` + productinacrt.join("");
    count();
    totalPrice()
}
function removeFromCart(id) {
    let index = cartItems.findIndex((item) => item.id === id);
    let currentItem = document.querySelector(`.product[data-id="${id}"]` )
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      currentItem.remove()
      productsInCart();
    }
  }
function soldItemCont(id, action) {
    const soldItem = document.querySelector(`.sold[data-id="${id}"]`);
    let currentItem = document.querySelector(`.product[data-id="${id}"]` )
    let countOnPage = currentItem.querySelector(".buttons .number")
    let numberDisplay = soldItem.querySelector(".number");
    if (action === "add") {        
        cartItems.find((item) => item.id == id).number++;
        numberDisplay.innerHTML = cartItems.find((item) => item.id == id).number;
        countOnPage.innerHTML = cartItems.find((item) => item.id == id).number;
        localStorage.setItem("cart", JSON.stringify(cartItems));
    } else if (action === "remove") {
        cartItems.find((item) => item.id == id).number--;
        numberDisplay.innerHTML = cartItems.find((item) => item.id == id).number;
        countOnPage.innerHTML = cartItems.find((item) => item.id == id).number;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        if (numberDisplay.innerHTML <= 0) {
            removeFromCart(id);
        }
    }
    totalPrice()
}
function count() {
    let badge = document.querySelector(".Shopping-cart .badge");
    let solditems = document.querySelectorAll("#sider .sold");
    badge.innerHTML = solditems.length;
  }
function totalPrice(){
    let total = 0;
    let totalPrice=document.getElementById("total").querySelector("span")
    cartItems.forEach(item => {
        total += item.price * item.number
        });
        totalPrice.innerHTML = total +" "+"$";
}


drawnProducts();
let cart = document.querySelector(".Shopping-cart");
let sideBar = document.getElementById("sider");
cart.addEventListener("click", (event) => {
    sideBar.classList.toggle("show");
    event.stopPropagation(); // Prevent click event from bubbling up to document
});
document.addEventListener("click", (event) => {
    if (!sideBar.contains(event.target) && !cart.contains(event.target)) {
        sideBar.classList.remove("show");
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
    if(solditems.length <= 0){
      badge.style.display="none"
    }else{
      badge.style.display="block"
      badge.innerHTML = solditems.length;
  
    }
  }
function totalPrice(){
    let total = 0;
    let totalPrice=document.getElementById("total").querySelector("span")
    cartItems.forEach(item => {
        total += item.price * item.number
        });
        totalPrice.innerHTML = total +" "+"$";
}
let favourites =document.getElementById("favsCarts");
let favInCart = JSON.parse(localStorage.getItem("favourite")) || [];
function drawfav() {
  let drawnFavProducts=favInCart.map((item)=>{
    return`
          <div class="fav-product"  data-id="${item.id}">
            <div class="image"><img src="images/${item.image}" alt="..."></div>
            <div class="fav-data">
              <p class="name"><span>product : </span><span>${item.name}</span></p>
              <p class="category"><span>category : </span><span>${item.category}</span></p>
            </div>
            <button class=" favBtn" data-id="${item.id}" onClick="removeFromFav(${item.id})"><i class="fa-solid fa-heart"></i></button>
          </div>
    `
  }).join("")
  favourites.innerHTML = drawnFavProducts;
}
function removeFromFav(id) {
  let favIndex = favInCart.findIndex((item) => item.id == id);
  const removedItem = document.querySelector(`.fav-product[data-id="${id}"]`);
  if(favIndex !== -1){
    favInCart.splice(favIndex, 1);
    removedItem.remove()
  }
  localStorage.setItem("favourite", JSON.stringify(favInCart));
}
drawnProducts();
drawfav()
//  favourite slide show
let next =document.getElementById("btnNext")
let prev =document.getElementById("btnprev")
let favsBox = document.getElementById("favsCarts")
let singleItemWidth =document.querySelectorAll(".favs-cart .fav-product")[0].offsetWidth;
let x =singleItemWidth
favsBox.addEventListener("mouseenter",()=>{favsBox.style.cursor="grab"})
next.addEventListener("mousedown",()=>{
  favsBox.scrollBy({
    top: 0,
    left: x,
    behavior: "smooth",
  })
})
prev.addEventListener("mousedown",()=>{
  favsBox.scrollBy({
    top: 0,
    left: -x,
    behavior: "smooth",
  })
})
// products database
const products = [
  {
    id: 1,
    name: "LYR05 X Crazyfast",
    price: 87,
    category: "ADIDAS Shoes",
    image: "1.jpg",
  },
  {
    id: 2,
    name: "LYW66 Football",
    price: 86,
    category: "ADIDAS Shoes",
    image: "2.jpg",
  },
  {
    id: 3,
    name: "MBS06 Predator",
    price: 89,
    category: "ADIDAS Shoes",
    image: "3.jpg",
  },
  {
    id: 4,
    name: "MAR07 Football",
    price: 91,
    category: "ADIDAS Shoes",
    image: "4.jpg",
  },
  {
    id: 5,
    name: "Jr.Zoom Mercurial",
    price: 72,
    category: "Nike Shoes",
    image: "5.jpg",
  },
  {
    id: 6,
    name: "Legend 9 Academy",
    price: 76,
    category: "Nike Shoes",
    image: "6.jpg",
  },
  {
    id: 7,
    name: " Jr.Tiempo Legend",
    price: 78,
    category: "Nike Shoes",
    image: "7.jpg",
  },
  {
    id: 8,
    name: "JR.MERCURIAL VAPOR",
    price: 81,
    category: "Nike Shoes",
    image: "8.jpg",
  },
  {
    id: 9,
    name: "Barcelona 23-24",
    price: 100,
    category: "Club kit",
    image: "9.jpg",
  },
  {
    id: 10,
    name: "Juventus 22-23",
    price: 98,
    category: "Club kit",
    image: "10.jpg",
  },
  {
    id: 11,
    name: "Man United 23-24",
    price: 99,
    category: "Club kit",
    image: "11.jpg",
  },
  {
    id: 12,
    name: "Real Madrid 23-24",
    price: 97,
    category: "Club kit",
    image: "12.jpg",
  },
  {
    id: 13,
    name: "Germany 2022",
    price: 95,
    category: "national kit",
    image: "13.jpg",
  },
  {
    id: 14,
    name: "Mexico 2022",
    price: 92,
    category: "national kit",
    image: "14.jpg",
  },
  {
    id: 15,
    name: "Argentina 2024",
    price: 96,
    category: "national kit",
    image: "15.jpg",
  },
  {
    id: 16,
    name: "Brazil 2023",
    price: 94,
    category: "national kit",
    image: "16.jpg",
  },
  {
    id: 17,
    name: "European Cup",
    price: 60,
    category: "ADIDAS Ball",
    image: "17.jpg",
  },
  {
    id: 18,
    name: "Champion Classic",
    price: 63,
    category: "ADIDAS Ball",
    image: "18.jpg",
  },
  {
    id: 19,
    name: "Champion Challenger",
    price: 65,
    category: "ADIDAS Ball",
    image: "19.jpg",
  },
  {
    id: 20,
    name: "Western Star",
    price: 69,
    category: "ADIDAS Ball",
    image: "20.jpg",
  },
  {
    id: 21,
    name: "adidas MLS",
    price: 62,
    category: "Nike Ball",
    image: "21.jpg",
  },
  {
    id: 22,
    name: "Nike Nk Acdmy Pro",
    price: 68,
    category: "Nike Ball",
    image: "22.jpg",
  },
  {
    id: 23,
    name: "World Cup Quality",
    price: 61,
    category: "Nike Ball",
    image: "23.jpg",
  },
  {
    id: 24,
    name: "Champion Sports Viper",
    price: 67,
    category: "Nike Ball",
    image: "24.jpg",
  },
];
let searchInput = document.getElementById("search");
//////// favourite buttons
let favouriteItems = JSON.parse(localStorage.getItem("favourite")) || [];
localStorage.setItem("favourite", JSON.stringify(favouriteItems));
function favourite() {
  let favBtns = document.querySelectorAll(".favBtn");
  favBtns.forEach((btn) => {
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
        image: favIemImage,
      };
      addAndRemovefavourite(favData);
    });
  });
}
function addAndRemovefavourite(fav) {
  const itemIndex = favouriteItems.findIndex((item) => item.id === fav.id);
  if (itemIndex !== -1) {
    favouriteItems.splice(itemIndex, 1);
  } else {
    favouriteItems.push(fav);
  }
  localStorage.setItem("favourite", JSON.stringify(favouriteItems));
}
////// side bar ///////
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
/////////////// main products
// draw all products 
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
// add an remove from cart check if it in cart 
// 
function isInCart(id) {
  return cartItems.some((item) => item.id === id);
}
// togle show and hide add/remove btns
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
      category: clickedItem.category,
      number: 1,
    };
    cartItems.push(soldItemData);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    productsInCart();
    count();
  }
}
// item on cart count update 
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
// badge count update
function count() {
  let badge = document.querySelector(".Shopping-cart .badge");
  let solditems = document.querySelectorAll("#sider .sold");
  if (solditems.length <= 0) {
    badge.style.display = "none";
  } else {
    badge.style.display = "block";
    badge.innerHTML = solditems.length;
  }
}
// searching function 
function searching() {
  drawProducts();
  searchInput.addEventListener("keyup", () => {
    let searchInputValue = searchInput.value.toLowerCase().trim();
    const selection = document.getElementById("searchBy").value.toLowerCase();
    document.querySelectorAll(".product").forEach((item) => {
      let searchField =
        selection === "name"
          ? item.querySelector(".iname").dataset.ser.toLowerCase()
          : item.querySelector(".icat").dataset.ser.toLowerCase();
      if (
        searchField.includes(searchInputValue)
      ) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }

      if (searchInputValue === "") {
        item.style.display = "flex";
      }
    });
  });
}

////////////////////////////////////////
// slide show
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {showSlides((slideIndex += n));}
function currentSlide(n) {showSlides((slideIndex = n));}
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let i;
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
let slideIndext = 0;
// auto show sliding
showSlidest();
function showSlidest() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndext++;
  if (slideIndext > slides.length) {
    slideIndext = 1;
  }
  slides[slideIndext - 1].style.display = "block";
  setTimeout(showSlidest, 6000);
}

//////// calling functions
drawProducts();
searching();

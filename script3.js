var products = [
  { id: 1, name: "Oxford Linen Shirt", category: "Shirts", price: 115, image: "images3/T-shirt1.jpg" },
  { id: 2, name: "Striped Cotton Shirt", category: "Shirts", price: 100, image: "images3/T-shirt2.jpg" },
  { id: 3, name: "Summer Wrap Dress", category: "Dresses", price: 300, image: "images3/dresse1.jpg" },
  { id: 4, name: "Midi Evening Dress", category: "Dresses", price: 200, image: "images3/dresse2.jpg" },
  { id: 5, name: "Waxed Field Jacket", category: "Jackets", price: 185, image: "images3/jackjt1.jpg" },
  { id: 6, name: "Tailored Wool Blazer", category: "Jackets", price: 210, image: "images3/jackjt2.jpg" },
  { id: 7, name: "Leather Tote Bag", category: "Accessories", price: 95, image: "images3/bag.jpg" },
  { id: 8, name: "Round Sunglasses", category: "Accessories", price: 45, image: "images3/Sunglasse.jpg" }
];

var cart = [];

var productGrid = document.getElementById("productGrid");
var filterButtons = document.querySelectorAll(".filter-button");
var categoryCards = document.querySelectorAll(".category-card");
var cartCount = document.getElementById("cartCount");
var cartButton = document.getElementById("cartButton");
var cartPanel = document.getElementById("cartPanel");
var cartItems = document.getElementById("cartItems");
var cartTotal = document.getElementById("cartTotal");
var closeCart = document.getElementById("closeCart");
var clearCart = document.getElementById("clearCart");
var overlay = document.getElementById("overlay");
var menuButton = document.getElementById("menuButton");
var navLinks = document.getElementById("navLinks");

function showProducts(category) {
  productGrid.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    if (category !== "All" && product.category !== category) {
      continue;
    }

    var card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML =
      '<div class="product-image"><img src="' + product.image + '" alt="' + product.name + '" loading="lazy"></div>' +
      '<div class="product-info">' +
        '<div><h3>' + product.name + '</h3><small>' + product.category + '</small></div>' +
        '<span class="price">$' + product.price + '</span>' +
      '</div>' +
      '<button class="add-button" data-id="' + product.id + '">Add to Cart</button>';

    productGrid.appendChild(card);
  }
}

function setActiveFilter(category) {
  for (var i = 0; i < filterButtons.length; i++) {
    if (filterButtons[i].getAttribute("data-filter") === category) {
      filterButtons[i].classList.add("active");
    } else {
      filterButtons[i].classList.remove("active");
    }
  }
}

function findProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
}

function addToCart(id) {
  cart.push(findProduct(id));
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;

  var total = 0;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty. Add something you like from the collection.</p>';
  }

  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].price;

    var row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML =
      '<img src="' + cart[i].image + '" alt="' + cart[i].name + '">' +
      '<div class="cart-item-info"><h4>' + cart[i].name + '</h4><span>$' + cart[i].price + '</span></div>' +
      '<button class="remove-button" data-index="' + i + '">Remove</button>';

    cartItems.appendChild(row);
  }

  cartTotal.textContent = "$" + total;
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("open");
}

function closeCartPanel() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("open");
}

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    var category = this.getAttribute("data-filter");
    setActiveFilter(category);
    showProducts(category);
  });
}

for (var j = 0; j < categoryCards.length; j++) {
  categoryCards[j].addEventListener("click", function () {
    var category = this.getAttribute("data-category");
    setActiveFilter(category);
    showProducts(category);
  });
}

productGrid.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-button")) {
    addToCart(Number(event.target.getAttribute("data-id")));
    event.target.textContent = "Added";
    var button = event.target;
    setTimeout(function () {
      button.textContent = "Add to Cart";
    }, 900);
  }
});

cartItems.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-button")) {
    removeFromCart(Number(event.target.getAttribute("data-index")));
  }
});

clearCart.addEventListener("click", function () {
  cart = [];
  updateCart();
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
overlay.addEventListener("click", closeCartPanel);

menuButton.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

navLinks.addEventListener("click", function () {
  navLinks.classList.remove("open");
});

showProducts("All");
updateCart();

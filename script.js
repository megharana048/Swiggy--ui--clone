let cart = JSON.parse(localStorage.getItem("swiggyCart")) || [];

function saveCart() {
  localStorage.setItem("swiggyCart", JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name: name, price: price });
  saveCart();
  updateCart();

  alert(name + " added to cart!");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
  renderCartPage();
}

function updateCart() {
  let cartCounts = document.querySelectorAll(".cart-box-icon");
  let cartItems = document.getElementById("cartItems");

  cartCounts.forEach(function(count) {
    count.innerText = cart.length;
  });

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(function(item, index) {
    total += item.price;

    cartItems.innerHTML +=
      '<div class="cart-item">' +
        '<h4>' + item.name + '</h4>' +
        '<p>Price: ₹' + item.price + '</p>' +
        '<button class="remove-btn" onclick="removeFromCart(' + index + ')">Remove</button>' +
      '</div>';
  });

  cartItems.innerHTML += '<div class="cart-total">Total: ₹' + total + '</div>';
}

function toggleCart() {
  let cartBox = document.getElementById("cartBox");
  if (cartBox) {
    cartBox.classList.toggle("active");
  }
}

function scrollCategories(direction) {
  let categoryContainer = document.getElementById("categoryContainer");
  if (!categoryContainer) return;

  if (direction === "right") {
    categoryContainer.scrollLeft += 350;
  } else {
    categoryContainer.scrollLeft -= 350;
  }
}

let mainSearchInput = document.getElementById("searchInput");
let scrollSearchInput = document.getElementById("scrollSearchInput");
let restaurantCards = document.querySelectorAll(".restaurant-card");

function searchRestaurants(value) {
  let searchValue = value.toLowerCase();

  restaurantCards.forEach(function(card) {
    let restaurantName = card.getAttribute("data-name").toLowerCase();
    let cardText = card.innerText.toLowerCase();

    if (restaurantName.includes(searchValue) || cardText.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

if (mainSearchInput && scrollSearchInput) {
  mainSearchInput.addEventListener("input", function() {
    searchRestaurants(mainSearchInput.value);
    scrollSearchInput.value = mainSearchInput.value;
  });

  scrollSearchInput.addEventListener("input", function() {
    searchRestaurants(scrollSearchInput.value);
    mainSearchInput.value = scrollSearchInput.value;
  });
}

window.addEventListener("scroll", function() {
  let scrollNavbar = document.getElementById("scrollNavbar");
  if (!scrollNavbar) return;

  if (window.scrollY > 330) {
    scrollNavbar.classList.add("show");
  } else {
    scrollNavbar.classList.remove("show");
  }
});

function toggleSortDropdown() {
  let sortDropdown = document.getElementById("sortDropdown");
  if (sortDropdown) {
    sortDropdown.classList.toggle("active");
  }
}

function applySort() {
  let selectedSort = document.querySelector('input[name="sort"]:checked');
  let restaurantGrid = document.getElementById("restaurantGrid");
  let cardsArray = Array.from(document.querySelectorAll(".restaurant-card"));

  if (!selectedSort || !restaurantGrid) return;

  selectedSort = selectedSort.value;

  if (selectedSort === "time") {
    cardsArray.sort((a, b) => Number(a.dataset.time) - Number(b.dataset.time));
  }

  if (selectedSort === "rating") {
    cardsArray.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
  }

  if (selectedSort === "low") {
    cardsArray.sort((a, b) => Number(a.dataset.cost) - Number(b.dataset.cost));
  }

  if (selectedSort === "high") {
    cardsArray.sort((a, b) => Number(b.dataset.cost) - Number(a.dataset.cost));
  }

  cardsArray.forEach(card => restaurantGrid.appendChild(card));

  let sortDropdown = document.getElementById("sortDropdown");
  if (sortDropdown) {
    sortDropdown.classList.remove("active");
  }
}

function renderCartPage() {
  let cartPageContent = document.getElementById("cartPageContent");
  if (!cartPageContent) return;

  if (cart.length === 0) {
    cartPageContent.innerHTML =
      '<div class="empty-cart-page">' +
        '<div class="cart-illustration">🍳</div>' +
        '<h2>Your cart is empty</h2>' +
        '<p>You can go to home page to view more restaurants</p>' +
        '<a href="index.html" class="orange-btn">SEE RESTAURANTS NEAR YOU</a>' +
      '</div>';
    return;
  }

  let total = 0;
  let html = '<div class="checkout-box"><h2>Your Food Cart</h2>';

  cart.forEach(function(item, index) {
    total += item.price;
    html +=
      '<div class="checkout-item">' +
        '<div>' +
          '<h3>' + item.name + '</h3>' +
          '<p>₹' + item.price + '</p>' +
        '</div>' +
        '<button onclick="removeFromCart(' + index + ')">Remove</button>' +
      '</div>';
  });

  html +=
    '<div class="checkout-total">Total: ₹' + total + '</div>' +
    '<button class="checkout-btn">Proceed to Checkout</button>' +
    '</div>';

  cartPageContent.innerHTML = html;
}

function filterHelp(tabName) {
  let helpTitle = document.getElementById("helpTitle");
  let helpText = document.getElementById("helpText");

  if (!helpTitle || !helpText) return;

  helpTitle.innerText = tabName;
  helpText.innerText = "Your " + tabName.toLowerCase() + " related details will be listed here.";
}

document.addEventListener("DOMContentLoaded", function() {
  updateCart();
  renderCartPage();
});
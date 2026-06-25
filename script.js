let cart = [];

function addToCart(name, price) {
  let item = {
    name: name,
    price: price
  };

  cart.push(item);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  let cartCount = document.querySelector(".cart-box-icon");
  let cartItems = document.getElementById("cartItems");

  cartCount.innerText = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(function(item, index) {
    total = total + item.price;

    cartItems.innerHTML +=
      '<div class="cart-item">' +
        '<h4>' + item.name + '</h4>' +
        '<p>Price: ₹' + item.price + '</p>' +
        '<button class="remove-btn" onclick="removeFromCart(' + index + ')">Remove</button>' +
      '</div>';
  });

  cartItems.innerHTML +=
    '<div class="cart-total">Total: ₹' + total + '</div>';
}

function toggleCart() {
  let cartBox = document.getElementById("cartBox");
  cartBox.classList.toggle("active");
}

function scrollCategories(direction) {
  let categoryContainer = document.getElementById("categoryContainer");

  if (direction === "right") {
    categoryContainer.scrollLeft = categoryContainer.scrollLeft + 350;
  } else {
    categoryContainer.scrollLeft = categoryContainer.scrollLeft - 350;
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

mainSearchInput.addEventListener("input", function() {
  searchRestaurants(mainSearchInput.value);
  scrollSearchInput.value = mainSearchInput.value;
});

scrollSearchInput.addEventListener("input", function() {
  searchRestaurants(scrollSearchInput.value);
  mainSearchInput.value = scrollSearchInput.value;
});

window.addEventListener("scroll", function() {
  let scrollNavbar = document.getElementById("scrollNavbar");

  if (window.scrollY > 330) {
    scrollNavbar.classList.add("show");
  } else {
    scrollNavbar.classList.remove("show");
  }
});

function toggleSortDropdown() {
  let sortDropdown = document.getElementById("sortDropdown");
  sortDropdown.classList.toggle("active");
}

function applySort() {
  let selectedSort = document.querySelector('input[name="sort"]:checked').value;
  let restaurantGrid = document.getElementById("restaurantGrid");
  let cardsArray = Array.from(document.querySelectorAll(".restaurant-card"));

  if (selectedSort === "time") {
    cardsArray.sort(function(a, b) {
      return Number(a.dataset.time) - Number(b.dataset.time);
    });
  }

  if (selectedSort === "rating") {
    cardsArray.sort(function(a, b) {
      return Number(b.dataset.rating) - Number(a.dataset.rating);
    });
  }

  if (selectedSort === "low") {
    cardsArray.sort(function(a, b) {
      return Number(a.dataset.cost) - Number(b.dataset.cost);
    });
  }

  if (selectedSort === "high") {
    cardsArray.sort(function(a, b) {
      return Number(b.dataset.cost) - Number(a.dataset.cost);
    });
  }

  cardsArray.forEach(function(card) {
    restaurantGrid.appendChild(card);
  });

  document.getElementById("sortDropdown").classList.remove("active");
}

document.addEventListener("click", function(event) {
  let sortWrapper = document.querySelector(".sort-wrapper");

  if (!sortWrapper.contains(event.target)) {
    document.getElementById("sortDropdown").classList.remove("active");
  }
});
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
  let cartCount = document.getElementById("cartCount");
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

let searchInput = document.getElementById("searchInput");
let restaurantCards = document.querySelectorAll(".restaurant-card");

searchInput.addEventListener("input", function() {
  let searchValue = searchInput.value.toLowerCase();

  restaurantCards.forEach(function(card) {
    let restaurantName = card.getAttribute("data-name").toLowerCase();

    if (restaurantName.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
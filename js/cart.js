
/*
 * Smart Meal Discovery
 * Demo cart: view items, update quantities and calculate subtotal.
 */

const cartItemsContainer = document.getElementById("cart-items");
const cartSummaryContainer = document.getElementById("cart-summary");

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("smartMealCart") || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("smartMealCart", JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = "";
  cartSummaryContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <article class="card">
        <h3>Your cart is waiting</h3>
        <p>You haven't added any meals yet. Explore the menu and find something you love.</p>
        <a class="button" href="discover.html">Discover Meals</a>
      </article>
    `;
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("article");
    row.className = "cart-row";

    row.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>${item.restaurant}</p>
        <p class="price">₹${item.price} each</p>
      </div>

      <div>
        <label for="quantity-${item.id}">Quantity</label>
        <input
          id="quantity-${item.id}"
          type="number"
          min="1"
          max="20"
          value="${item.quantity}"
          style="width: 76px; padding: 8px;"
        >
        <button class="button" type="button" data-remove="${item.id}">
          Remove
        </button>
      </div>

      <strong>₹${item.price * item.quantity}</strong>
    `;

    cartItemsContainer.appendChild(row);

    const quantityInput = row.querySelector(`#quantity-${item.id}`);

    quantityInput.addEventListener("change", () => {
      const quantity = Number(quantityInput.value);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        quantityInput.value = item.quantity;
        return;
      }

      const updatedCart = getCart();
      const target = updatedCart.find((entry) => entry.id === item.id);

      if (target) {
        target.quantity = quantity;
        saveCart(updatedCart);
        renderCart();
      }
    });

    row.querySelector("[data-remove]").addEventListener("click", () => {
      const updatedCart = getCart().filter((entry) => entry.id !== item.id);
      saveCart(updatedCart);
      renderCart();
    });
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartSummaryContainer.innerHTML = `
    <h2>Order summary</h2>
    <div class="cart-row">
      <span>Subtotal</span>
      <strong>₹${subtotal}</strong>
    </div>
    <p style="color: var(--muted); font-size: 0.9rem;">
      Delivery charges and taxes are excluded from this illustrative demo.
    </p>
    <a class="button" href="checkout.html">Proceed to Demo Checkout →</a>
    <p><a href="discover.html">Continue exploring meals</a></p>
  `;
}

renderCart();

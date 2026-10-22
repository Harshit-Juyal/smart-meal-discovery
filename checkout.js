
/*
 * Smart Meal Discovery
 * Simulated checkout and demo order completion.
 * No real orders or payments are processed.
 */

const checkoutSummary = document.getElementById("checkout-summary");
const checkoutForm = document.getElementById("checkout-form");
const checkoutMessage = document.getElementById("checkout-message");

function readCheckoutCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("smartMealCart") || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function renderCheckoutSummary() {
  const cart = readCheckoutCart();

  if (cart.length === 0) {
    checkoutSummary.innerHTML = `
      <p>Your cart is empty. Add a meal before checking out.</p>
      <a class="button" href="discover.html">Discover Meals</a>
    `;
    checkoutForm.hidden = true;
    return;
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemLines = cart.map((item) => `
    <div class="cart-row">
      <span>${item.name} × ${item.quantity}</span>
      <strong>₹${item.price * item.quantity}</strong>
    </div>
  `).join("");

  checkoutSummary.innerHTML = `
    ${itemLines}
    <div class="cart-row">
      <strong>Demo subtotal</strong>
      <strong>₹${subtotal}</strong>
    </div>
    <p style="color: var(--muted); font-size: 0.9rem;">
      This is an illustrative subtotal; no payment is due.
    </p>
  `;
}

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cart = readCheckoutCart();

  if (cart.length === 0) {
    checkoutMessage.textContent =
      "Your cart is empty. Please add a meal before checkout.";
    return;
  }

  if (!checkoutForm.reportValidity()) return;

  const order = {
    demoOrderId: `DEMO-${Date.now()}`,
    items: cart,
    subtotal: cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    completedAt: new Date().toISOString()
  };

  // Save only a simulated order record in this browser.
  // Customer name and email are not stored.
  localStorage.setItem("smartMealLastOrder", JSON.stringify(order));
  localStorage.removeItem("smartMealCart");

  window.location.href = "confirmation.html";
});

renderCheckoutSummary();

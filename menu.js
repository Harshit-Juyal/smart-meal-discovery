
/*
 * Smart Meal Discovery
 * Displays selected meal details and supports demo cart actions.
 */

const mealDetails = document.getElementById("meal-details");
const params = new URLSearchParams(window.location.search);
const mealId = Number(params.get("id"));

const selectedMeal = meals.find((meal) => meal.id === mealId);

function renderMeal(meal) {
  if (!meal) {
    mealDetails.innerHTML = `
      <h1>Meal not found</h1>
      <p>Choose a meal from the discovery page to view its details.</p>
      <a class="button" href="discover.html">Explore Meals</a>
    `;
    return;
  }

  mealDetails.innerHTML = `
    <p class="eyebrow">${meal.cuisine} · ${meal.diet}</p>
    <h1>${meal.name}</h1>
    <p>${meal.description}</p>

    <div class="card" style="max-width: 650px;">
      <h2>${meal.restaurant}</h2>
      <p class="price">₹${meal.price}</p>
      <p>Estimated delivery: ${meal.deliveryTime} minutes</p>
      <p>Dietary preference: ${meal.diet}</p>

      <button class="button" id="add-to-cart" type="button">
        Add to Cart
      </button>

      <p id="cart-message" aria-live="polite"></p>
    </div>

    <p><a href="discover.html">← Back to Discover Meals</a></p>
  `;

  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("smartMealCart") || "[]");
      if (!Array.isArray(cart)) cart = [];
    } catch {
      cart = [];
    }

    const existingItem = cart.find((item) => item.id === meal.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: meal.id,
        name: meal.name,
        restaurant: meal.restaurant,
        price: meal.price,
        quantity: 1
      });
    }

    localStorage.setItem("smartMealCart", JSON.stringify(cart));

    document.getElementById("cart-message").textContent =
      `${meal.name} added to your demo cart.`;

    document.getElementById("add-to-cart").textContent = "Add Another";
  });
}

renderMeal(selectedMeal);


/*
 * Smart Meal Discovery
 * Filters illustrative meal data using user preferences.
 */

const discoveryForm = document.getElementById("discovery-form");
const resultsContainer = document.getElementById("restaurant-results");
const resultsSummary = document.getElementById("results-summary");

function displayMeals(mealList) {
  resultsContainer.innerHTML = "";

  if (mealList.length === 0) {
    resultsContainer.innerHTML = `
      <article class="card">
        <h3>No exact matches found</h3>
        <p>Try increasing your budget or delivery time, or choosing another cuisine.</p>
      </article>
    `;
    resultsSummary.textContent =
      "No meals match all your selected preferences.";
    return;
  }

  resultsSummary.textContent =
    `We found ${mealList.length} matching meal option${mealList.length === 1 ? "" : "s"}.`;

  mealList.forEach((meal) => {
    const card = document.createElement("article");
    card.className = "restaurant-card";

    card.innerHTML = `
      <div class="restaurant-card-content">
        <p class="eyebrow">${meal.cuisine} · ${meal.diet}</p>
        <h3>${meal.name}</h3>
        <p>${meal.description}</p>
        <p><strong>${meal.restaurant}</strong></p>
        <div class="restaurant-meta">
          <span>₹${meal.price}</span>
          <span>${meal.deliveryTime} min estimated</span>
        </div>
        <a class="button" href="menu.html?id=${meal.id}">
          View Meal &rarr;
        </a>
      </div>
    `;

    resultsContainer.appendChild(card);
  });
}

function applyMealFilters(event) {
  if (event) event.preventDefault();

  const budget = Number(document.getElementById("budget").value);
  const cuisine = document.getElementById("cuisine").value;
  const diet = document.getElementById("diet").value;
  const deliveryTime = Number(document.getElementById("delivery").value);

  const filteredMeals = meals.filter((meal) => {
    const matchesBudget = meal.price <= budget;
    const matchesCuisine = cuisine === "all" || meal.cuisine === cuisine;
    const matchesDiet = diet === "all" || meal.diet === diet;
    const matchesDelivery = meal.deliveryTime <= deliveryTime;

    return (
      matchesBudget &&
      matchesCuisine &&
      matchesDiet &&
      matchesDelivery
    );
  });

  displayMeals(filteredMeals);
}

discoveryForm.addEventListener("submit", applyMealFilters);

discoveryForm.addEventListener("reset", () => {
  setTimeout(() => {
    applyMealFilters();
  }, 0);
});

// Display the initial meal collection.
applyMealFilters();

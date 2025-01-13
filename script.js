let btn = document.querySelector(".submit");
let textArea = document.querySelector(".Text-Area");
let mainContainer = document.querySelector(".main-container");
const apikey = "f9607ab23144405380d3d70a5f228605";
const baseurl = "https://api.spoonacular.com/recipes/findByIngredients";
const recipeInfoUrl = "https://api.spoonacular.com/recipes";

// Fetch the recipe details using the recipe ID
async function getRecipeDetails(recipeId) {
  try {
    const response = await fetch(`${recipeInfoUrl}/${recipeId}/information?apiKey=${apikey}`);
    if (!response.ok) {
      throw new Error("Failed to fetch recipe details");
    }
    const recipeDetails = await response.json();
    return recipeDetails;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Get the recipes based on ingredients
async function getrecipes(ingredients) {
  try {
    const response = await fetch(`${baseurl}?ingredients=${ingredients}&number=12&apiKey=${apikey}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const recipes = await response.json();
    loadthirdsection();
    displayRecipies(recipes);
  } catch (error) {
    console.error("Error:", error);
    mainContainer.innerHTML = '<p>Unable to fetch data. Please try again later.</p>';
  }
}

// Dynamically load the third section
function loadthirdsection() {
  let third = document.querySelector(".third");
  if (!third) {
    third = document.createElement("section");
    third.classList.add("third");
    third.innerHTML = `
      <div class="recipe-gallery">
        <h1 class="title">Recipes</h1>
        <div class="main-container"></div>
      </div>
    `;
    document.body.appendChild(third);
    mainContainer = third.querySelector(".main-container");
  }
  mainContainer.innerHTML = ""; // Clear previous content
}

// Display the recipes
async function displayRecipies(recipes) {
  for (const recipe of recipes) {
    const recipeDetails = await getRecipeDetails(recipe.id); // Fetch detailed recipe information

    const div = document.createElement("div");
    div.classList.add("recipe-box");
    div.innerHTML = `
      <div class="img-food">
        <img src="${recipe.image}" alt="${recipe.title}" class="image" />
      </div>
      <span class="foodheading">${recipe.title}</span>
      <div class="content">
        <p><strong>Ingredients Used:</strong></p>
        <ul>
          ${recipeDetails.extendedIngredients
            .map(ingredient => `<li>${ingredient.original}</li>`)
            .join("")}
        </ul>
        <p><strong>Instructions:</strong></p>
        <p>${recipeDetails.instructions || "No instructions available"}</p>
      </div>
    `;
    mainContainer.appendChild(div);
  }
}

btn.addEventListener("click", function () {
  let ingredients = textArea.value.trim();
  if (ingredients === "") {
    alert("Please enter some ingredients!");
  } else {
    getrecipes(ingredients);
  }
});

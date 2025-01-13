let btn = document.querySelector(".submit")
let textArea = document.querySelector(".Text-Area")
let mainContainer = document.querySelector(".main-container")
const apikey = "f9607ab23144405380d3d70a5f228605"
const baseurl = "https://api.spoonacular.com/recipes/findByIngredients"
async function getrecipes(ingredients){
  try{
    const response = await fetch(`${baseurl}?ingredients=${ingredients}&number=5&apiKey=${apikey}`)
    if(!response){
       throw new Error("Failed to fetch data")
    }
    const recipes = await response.json();
    displayRecipies(recipes)

  }
  catch(error){
    console.error("error:",error);
    mainContainer.innerHTML = '<p>Unable to fetch data. Please try again later<p>'

  }
};
function displayRecipies(recipes){
  recipes.forEach(recipes => {
    const div = document.createElement("div")
  div.classList.add("recipe-box")
  div.innerHTML = `
              <div class="img-food"src="${recipes.image}" alt="${recipes.title}">
                <img src="${recipes.image}" alt="" class="image" />
              </div>
              <span class="foodheading" >${recipes.title}</span>
              <div>
                <p>Recipe ID: ${recipes.id}</p>
        <p>Ingredients Used: ${recipes.usedIngredientCount}</p>
        <p>Missing Ingredients: ${recipes.missedIngredientCount}</p>
              </div>`
              mainContainer.appendChild(div);
})
};
  
btn.addEventListener('click',function(){
  let  ingredients = textArea.value.trim();
  if(ingredients === ""){
    alert("Please enter some ingredients!")
  }
  else{
    getrecipes(ingredients)
  }
})
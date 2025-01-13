let btn = document.querySelector(".submit")
let textArea = document.querySelector(".Text-Area")
let mainContainer = document.querySelector(".main-container")
const apikey = "f9607ab23144405380d3d70a5f228605"
const baseurl = "https://api.spoonacular.com/recipes/findByIngredients"
async function getrecipes(ingredients){
  try{
    const response = await fetch(`${baseurl}?ingredients=${ingredients}&number=3&apiKey=${apikey}`)
    if(!response){
       throw new Error("Failed to fetch data")
    }
    const recipes = await response.json();
    loadthirdsection();
    displayRecipies(recipes)

  }
  catch(error){
    console.error("error:",error);
    mainContainer.innerHTML = '<p>Unable to fetch data. Please try again later<p>'

  }
};
function loadthirdsection(){
  let third = document.querySelector(".third")
  if(!third){
     third=document.createElement("section")
     third.classList.add("third")
     third.innerHTML = `
         <div class="recipe-gallery">
          <h1 class="title">Recipes</h1>
          <div class="main-container">
          </div>
        </div>   
     `
     document.body.appendChild(third)
     mainContainer = third.querySelector(".main-container")
     
  }
  mainContainer.innerHTML = " "
}
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
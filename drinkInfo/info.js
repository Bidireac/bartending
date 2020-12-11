const display = document.getElementById("display");
const storageViewed = sessionStorage.getItem("viewedDrink");
const storageSearched = sessionStorage.getItem("searchedDrink");
const retrievedView = JSON.parse(storageViewed);
const retrievedSearch = JSON.parse(storageSearched);
const storageData = retrievedView ? retrievedView : retrievedSearch;

// Get the ingredients for display

function getIngredients() {
  let ingredients = [];
  let measurements = [];
  let iterator = 1;
  for (let ing in storageData) {
    let ingredientIterator = "strIngredient" + iterator;
    if (ing === ingredientIterator && storageData[ing] != null) {
      ingredients.push(storageData[ing]);
      iterator++;
    }
  }
  iterator = 1;
  for (let ms in storageData) {
    let measurementIterator = "strMeasure" + iterator;
    if (ms === measurementIterator && storageData[ms] != null) {
      measurements.push(storageData[ms]);
      iterator++;
    }
  }
  originalDrinkDisplay();
  instructionsDisplay(measurements);
  ingredientsDisplay(ingredients);
}

// Thumbnail Section

function originalDrinkDisplay() {
  const origin = document.createElement("div");
  origin.classList.add("originalDrink");
  origin.innerHTML = `
    <h3>${storageData.strDrink}</h3>
    <img src="${storageData.strDrinkThumb}" alt=""> 
  `;
  display.append(origin);
}

// Instructions Section

function instructionsDisplay(measurements) {
  const instruct = document.createElement("div");
  instruct.classList.add("instructions");
  instruct.innerHTML = `
    <h3>Instructions</h3>
    <h4>${storageData.strInstructions}</h4>
    <h3>Measurements</h3>
  `;
  const msList = document.createElement("ul");
  measurements.forEach((measurement) => {
    const msItem = document.createElement("li");
    msItem.classList.add("measurements");
    msItem.innerHTML = `
      <li>${measurement}</li>
    `;
    msList.append(msItem);
  });
  instruct.append(msList);
  display.append(instruct);
}

// Ingredients List Section

function ingredientsDisplay(ingredients) {
  const ingList = document.createElement("div");
  ingList.classList.add("ingredientsList");
  ingList.innerHTML = `
    <h3>Ingredients list</h3>
  `;
  ingredients.forEach((ing) => {
    const url = `https://www.thecocktaildb.com/images/ingredients/${ing}.png`;
    const ingBox = document.createElement("div");
    ingBox.classList.add("ingredients");
    ingBox.innerHTML = `
      <img src="${url}" alt=""> 
      <h4><span>${ing}</span></h4>
    `;
    ingList.append(ingBox);
  });
  display.append(ingList);
}

// Display everything about the drink
getIngredients();

const display = document.getElementById("display");
const storageData = sessionStorage.getItem("viewedDrink");
const retrievedData = JSON.parse(storageData);

console.log(retrievedData);

// Get the ingredients for display

function getIngredients() {
  let ingredients = [];
  let measurements = [];
  let iterator = 1;
  for (let ing in retrievedData) {
    let ingredientIterator = "strIngredient" + iterator;
    if (ing === ingredientIterator && retrievedData[ing] != null) {
      ingredients.push(retrievedData[ing]);
      iterator++;
    }
  }
  iterator = 1;
  for (let ms in retrievedData) {
    let measurementIterator = "strMeasure" + iterator;
    if (ms === measurementIterator && retrievedData[ms] != null) {
      measurements.push(retrievedData[ms]);
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
    <h3>${retrievedData.strDrink}</h3>
    <img src="${retrievedData.strDrinkThumb}" alt=""> 
  `;
  display.append(origin);
}

// Instructions Section

function instructionsDisplay(measurements) {
  const instruct = document.createElement("div");
  instruct.classList.add("instructions");
  instruct.innerHTML = `
    <h3>Instructions</h3>
    <h4>${retrievedData.strInstructions}</h4>
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

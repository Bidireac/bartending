const boxContainer = document.getElementById("drinks");
const searchDrinks = document.getElementById("searchDrinks");
const boxes = document.querySelectorAll(".box");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");
const filterName = document.getElementById("filterName");
const txtDiv = document.getElementById("txtDiv");
const filterErr = document.createElement("h1");

let n = 0;

// Search Name Filter

async function filterNamedDrinks() {
  let errorCounter = 0;

  let search = filterName.value.toUpperCase();
  boxContainer.style.display = "none";
  await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      filterErr.innerHTML = "";
      data.drinks.forEach((drinkName) => {
        if (drinkName.strDrink.toUpperCase().includes(search)) {
          getDrinkByID(drinkName.idDrink);
        }
      });
    })
    .catch((err) => {
      console.log(
        "The cocktail name you have entered is not valid, please try again.",
        err
      );
      if (!errorCounter) {
        filterErr.innerHTML = `
              <p>The cocktail name you have entered is not valid, please try again.</p>
            `;
        txtDiv.append(filterErr);
      }
      errorCounter++;
    });
  if (search === "") {
    location.reload();
    boxContainer.style.display = "grid";
    errorCounter = 0;
  }
}

// Search Filter
async function filterDrinks() {
  let errorCounter = 0;

  let search = filter.value.toUpperCase();
  boxContainer.style.display = "none";
  await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      filterErr.innerHTML = "";
      data.drinks.forEach((drinkID) => {
        getDrinkByID(drinkID.idDrink);
      });
    })
    .catch((err) => {
      console.log(
        "The ingredient name you have entered is not valid, please try again.",
        err
      );
      if (!errorCounter) {
        filterErr.innerHTML = `
          <p>The ingredient name you have entered is not valid, please try again.</p>
        `;
        txtDiv.append(filterErr);
      }
      errorCounter++;
    });
  if (search === "") {
    location.reload();
    boxContainer.style.display = "grid";
    errorCounter = 0;
  }
}

async function getDrinkByID(drinkID) {
  let res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`
  );
  const data = await res.json();

  const idSearch = data.drinks[0];

  const drinkBox = document.createElement("div");
  drinkBox.classList.add("boxSearch");
  drinkBox.innerHTML = `
    <h2>${idSearch.strDrink}</h2>
    <a target="_blank" href="./drinkInfo/"><img src=${idSearch.strDrinkThumb}></a>
  `;
  searchDrinks.append(drinkBox);
  drinkBox.addEventListener("click", () => {
    sessionStorage.setItem("searchedDrink", JSON.stringify(idSearch));
    sessionStorage.removeItem("viewedDrink");
  });
}

// Main Display
async function getDrinks() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  const data = await res.json();
  return data;
}

async function showDrinks() {
  const drinks = await getDrinks();

  drinks.drinks.forEach((drink) => {
    const drinkBox = document.createElement("div");
    drinkBox.classList.add("box");
    drinkBox.innerHTML = `
      <h2>${drink.strDrink}</h2>
      <a target="_blank" href="./drinkInfo/"><img src=${drink.strDrinkThumb}></a>
    `;
    boxContainer.append(drinkBox);
    drinkBox.addEventListener("click", () => {
      sessionStorage.setItem("viewedDrink", JSON.stringify(drink));
      sessionStorage.removeItem("searchedDrink");
    });
  });
}

// Show loader
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");
  }, 1000);
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
    n = 0;
    loadMore();
  }
});

function loadMore() {
  while (n < 3) {
    showDrinks();
    n++;
  }
}

setTimeout(() => {
  while (n < 3) {
    showDrinks();
    n++;
  }
}, 300);

function debounce(callback, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}

filter.addEventListener("input", debounce(filterDrinks, 1000));
filterName.addEventListener("input", debounce(filterNamedDrinks, 1000));

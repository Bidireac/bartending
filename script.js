const boxContainer = document.getElementById("drinks");
const boxes = document.querySelectorAll(".box");
const loading = document.querySelector(".loader");

let n = 0;

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
    console.log(drink);
    const drinkBox = document.createElement("div");
    drinkBox.classList.add("box");
    drinkBox.innerHTML = `
      <h2>${drink.strDrink}</h2>
      <a href="./drinkInfo/"><img src=${drink.strDrinkThumb}></a>
    `;
    boxContainer.append(drinkBox);
    drinkBox.addEventListener("click", () => {
      sessionStorage.setItem("viewedDrink", JSON.stringify(drink));
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

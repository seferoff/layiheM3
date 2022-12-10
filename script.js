let buttons = document.querySelectorAll(".btn");
let buttonsLeft = document.querySelectorAll(".btn.left");
let buttonsRight = document.querySelectorAll(".btn.right");
let leftInp = document.querySelector(".inp.left");
let rightInp = document.querySelector(".inp.right");
let currencyLeft = document.querySelector(".currency.p.left");
let currencyRight = document.querySelector(".currency.p.right");

let base = "RUB";
let symbols = "USD";
let valueLeft;
let valueRight;
let urlLeft;
let urlRight;

function convertLeft() {
  buttonsLeft.forEach((item) => {
    if (item.innerHTML == base) {
      item.classList.add("clicked");
    } else {
      item.classList.remove("clicked");
    }
  });

  urlLeft = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`;
  fetch(urlLeft)
    .then((res) => res.json())
    .then((data) => {
      valueLeft = +Object.values(data.rates);
      currencyLeft.innerHTML = `1 ${base} = ${valueLeft} ${symbols}`;
    });

  leftInp.addEventListener("keyup", () => {
    rightInp.value = (+leftInp.value * valueLeft).toFixed(2);
  });
}

function convertRight() {
  buttonsRight.forEach((item) => {
    if (item.innerHTML == symbols) {
      item.classList.add("clicked");
    } else {
      item.classList.remove("clicked");
    }
  });

  urlRight = `https://api.exchangerate.host/latest?base=${symbols}&symbols=${base}`;
  fetch(urlRight)
    .then((res) => res.json())
    .then((data) => {
      valueRight = +Object.values(data.rates);
      currencyRight.innerHTML = `1 ${symbols} = ${valueRight} ${base}`;
    });

  rightInp.addEventListener("keyup", () => {
    leftInp.value = (+rightInp.value * valueRight).toFixed(2);
  });
}

convertLeft();
convertRight();

buttons.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("left")) {
      base = item.innerHTML;
    }
    if (item.classList.contains("right")) {
      symbols = item.innerHTML;
    }
    convertLeft();
    convertRight();

    if (item.classList.contains("left")) {
      urlLeft = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`;
      fetch(urlLeft)
        .then((res) => res.json())
        .then((data) => {
          valueLeft = +Object.values(data.rates);
          leftInp.value = (+rightInp.value * valueRight).toFixed(2);
        });
    }
    if (item.classList.contains("right")) {
      urlLeft = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`;
      fetch(urlLeft)
        .then((res) => res.json())
        .then((data) => {
          valueLeft = +Object.values(data.rates);
          rightInp.value = (+leftInp.value * valueLeft).toFixed(2);
        });
    }
  });
});

let buttons = document.querySelectorAll(".btn");
let leftInp = document.querySelector(".inp.left");
let rightInp = document.querySelector(".inp.right");
let currencyLeft = document.querySelector(".currency.p.left");
let currencyRight = document.querySelector(".currency.p.right");

let base = "RUB";
let symbols = "USD";
let valueLeft;
let valueRight;
let url;

function leftFunc () {
  rightInp.value = (+leftInp.value * valueLeft).toFixed(2);
};

function rightFunc () {
  leftInp.value = (+rightInp.value * valueRight).toFixed(2);
};

function convert() {
  buttons.forEach((item) => {
    if (
      (item.classList.contains("left") && item.innerHTML == base) ||
      (item.classList.contains("right") && item.innerHTML == symbols)
    ) {
      item.classList.add("clicked");
    } else {
      item.classList.remove("clicked");
    }
  });

  if (base != symbols) {
    url = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        valueLeft = +Object.values(data.rates);
        valueRight = (1 / valueLeft).toFixed(6);
        currencyLeft.innerHTML = `1 ${base} = ${valueLeft} ${symbols}`;
        currencyRight.innerHTML = `1 ${symbols} = ${valueRight} ${base}`;
      });
  } else {
    valueLeft = 1;
    valueRight = 1;
    currencyLeft.innerHTML = `1 ${base} = 1 ${symbols}`;
    currencyRight.innerHTML = `1 ${symbols} = 1 ${base}`;
  }

  leftInp.addEventListener("keyup", leftFunc)
  rightInp.addEventListener("keyup", rightFunc)

  leftInp.addEventListener("click", (e) => {
    e.target.value = ""
  })
  rightInp.addEventListener("click", (e) => {
    e.target.value = ""
  })
}

convert();

buttons.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("left")) {
      base = item.innerHTML;
      convert()
      setTimeout(rightFunc, 10);
    }
    if (item.classList.contains("right")) {
      symbols = item.innerHTML;
      convert()
      setTimeout(leftFunc, 10);
    }
  });
});

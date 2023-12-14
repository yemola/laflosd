import "regenerator-runtime/runtime";
const currencyElOne = document.getElementById("currency-one");
const currencyElTwo = document.getElementById("currency-two");
const amountElOne = document.getElementById("amount-one");
const amountElTwo = document.getElementById("amount-two");
const usd = document.querySelector(".usdNgn");
const gbp = document.querySelector(".gbpNgn");
const eur = document.querySelector(".eurNgn");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

async function calculate() {
  let currencyOne = currencyElOne.value;
  let currencyTwo = currencyElTwo.value;

  try {
    fetch(
      `https://v6.exchangerate-api.com/v6/dac679102ab47566ce82e789/latest/${currencyOne}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const rate = data.conversion_rates[currencyTwo].toFixed(3);
        if (currencyOne && currencyTwo)
          rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

        amountElTwo.value = (amountElOne.value * rate).toFixed(3);
      });
  } catch (e) {
    alert(e);
  }
}

currencyElOne.addEventListener("change", calculate);
currencyElTwo.addEventListener("change", calculate);
amountElOne.addEventListener("input", calculate);
amountElTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  let temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;
  calculate();
});

calculate();

function converted() {
  let currencyOne = "NGN";

  try {
    fetch(
      `https://v6.exchangerate-api.com/v6/dac679102ab47566ce82e789/latest/${currencyOne}`
    )
      .then((response) => response.json())
      .then((dat) => {
        const usdRate = dat.conversion_rates["USD"];
        const gbpRate = dat.conversion_rates["GBP"];
        const eurRate = dat.conversion_rates["EUR"];

        usd.innerText = Math.round(1 / usdRate);
        gbp.innerText = Math.round(1 / gbpRate);
        eur.innerText = Math.round(1 / eurRate);
      });
  } catch (e) {
    alert(e);
  }
}
converted();

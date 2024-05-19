const API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const selectors = document.querySelectorAll(".select-country select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");
const finalResult = document.querySelector(".result");

for (let select of selectors) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let newFlag = element.parentElement.querySelector("img");
  newFlag.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = document.querySelector(".amount input");
  let amount = amt.value;
  const URL = `${API_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let result = amount * rate;
  finalResult.innerText = `${amount} ${fromCurr.value} = ${result.toFixed(2)} ${
    toCurr.value
  }`;
});

// Get the input fields
const currencyCodeInput = document.getElementById("from-currency");
const amountInput = document.getElementById("amount");
const conversionCodeInput = document.getElementById("to-currency");

// Add a submit event listener to the form
document.querySelector("form").addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the input field values
  const currencyCode = currencyCodeInput.value.toLowerCase();
  const amount = parseFloat(amountInput.value);
  const conversionCode = conversionCodeInput.value.toLowerCase();

  // Fetch the exchange rates for the currencyCode from the API
  fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyCode}/${conversionCode}.json`)
    .then((response) => response.json())
    .then((data) => {
      const convertedAmount = amount * data[conversionCode];
      const resultElement = document.getElementById("result");
      resultElement.innerText = `${amount} ${currencyCode} = ${convertedAmount} ${conversionCode}`;

      // fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`)
      //   .then((response) => response.json())
      //   .then((data) => {
          
      //   })
    })
    .catch((error) => {
      console.error(error);
    });
});

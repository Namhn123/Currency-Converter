// Get the input fields
const currencyCodeInput = document.getElementById("from-currency");
const amountInput = document.getElementById("amount");
const conversionCodeInput = document.getElementById("to-currency");

// Add a submit event listener to the form
document.querySelector("form").addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the input field values
  const currencyCode = currencyCodeInput.value.toUpperCase();
  const amount = parseFloat(amountInput.value);
  const conversionCode = conversionCodeInput.value.toUpperCase();

  // Fetch the exchange rates for the currencyCode from the API
  fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`)
    .then((response) => response.json())
    .then((data) => {
      // Extract the exchange rate from the API response
      const exchangeRate = data[0].currency[currencyCode].exchangeRate;

      // Fetch the exchange rates for the conversionCode from the API
      fetch(`https://restcountries.com/v3.1/currency/${conversionCode}`)
        .then((response) => response.json())
        .then((data) => {
          // Extract the exchange rate from the API response
          const conversionRate = data[0].currency[conversionCode].exchangeRate;

          // Calculate the converted amount using the exchange rates
          const convertedAmount = (amount / exchangeRate) * conversionRate;

          // Display the converted amount
          const resultElement = document.getElementById("result");
          resultElement.innerText = `${amount} ${currencyCode} = ${convertedAmount.toFixed(
            2
          )} ${conversionCode}`;
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

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
      //takes amount and multiplies it by the data from api to get desired numerical output
      const convertedAmount = amount * data[conversionCode];
      //displays output in the html
      const resultElement = document.getElementById("result");
      resultElement.innerText = `${amount} ${currencyCode} = ${convertedAmount} ${conversionCode}`;
      //gets the country data of the first currency
      fetch(`https://restcountries.com/v3.1/currency/${currencyCode}?fields=name,capital,currencies,flags`)
        .then((response) => response.json())
        .then((data) => {
          for(var i=0; i<data.length; i++) {//if there are more than 1 country associated with the currency, display all in dropdown list
            $("#from-countries").append($('<option></option>').val(i).html(data[i].name.common));
          }
          fetch(`https://restcountries.com/v3.1/currency/${conversionCode}?fields=name,capital,currencies,flags`)
          .then((response) => response.json())
          .then((data) => {
            for(var i=0; i<data.length; i++) {
              $("#to-countries").append($('<option></option>').html(data[i].name.common));
            }
            $("#countriesDisplay").css("visibility", "visible");//makes form visible
          })
        })
    })
    .catch((error) => {
      console.error(error);
    });
});
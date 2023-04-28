// Variables to store the API endpoints and the exchange rates
const countriesEndpoint = 'https://restcountries.com/v2/all';
const currencyEndpoint = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';

let exchangeRates = {};

// Fetch to get the exchange rates from the API and store them in the exchangeRates object
fetch(currencyEndpoint)
  .then(response => response.json())
  .then(data => exchangeRates = data);

// Fetch to get the country data from the API and store it in the countries object
let countries = [];
fetch(countriesEndpoint)
  .then(response => response.json())
  .then(data => {
    // Process the data to create an object with the country code and currency code for each country
    countries = data.map(country => ({
      countryCode: country.alpha2Code,
      currencyCode: country.currencies[0].code
    }));
  });

  // Function to convert between two currencies
function convertCurrency(amount, fromCurrency, toCurrency) {
    // Convert the amount to USD using the exchange rate for the fromCurrency
    const usdAmount = amount / exchangeRates[fromCurrency];
  
    // Then, convert the USD amount to the toCurrency using the exchange rate for the toCurrency
    const convertedAmount = usdAmount * exchangeRates[toCurrency];
  
    return convertedAmount;
  }
  
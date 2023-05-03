// Get the input fields
const currencyCodeInput = document.getElementById("from-currency");
const amountInput = document.getElementById("amount");
const conversionCodeInput = document.getElementById("to-currency");
var fromCountry = {};
var toCountry = {};


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
      fetch(`https://restcountries.com/v3.1/currency/${currencyCode}?fields=name,capital,currencies,flags,population,latlng`)
        .then((response) => response.json())
        .then((data) => {
          fromCountry = data;
          for(var i=0; i<data.length; i++) {//if there are more than 1 country associated with the currency, display all in dropdown list
            $("#from-countries").append($('<option></option>').val(i).html(fromCountry[i].name.common));
          }
          fetch(`https://restcountries.com/v3.1/currency/${conversionCode}?fields=name,capital,currencies,flags,population,latlng`)
          .then((response) => response.json())
          .then((data) => {
            toCountry = data;
            for(var i=0; i<data.length; i++) {
              $("#to-countries").append($('<option></option>').val(i).html(toCountry[i].name.common));
            }
            $("#countriesDisplay").css("visibility", "visible");//makes form visible
          })
        })
    })
    .catch((error) => {
      console.error(error);
    });
});

document.querySelector("#countryDisplay").addEventListener("submit", (event) => {
  event.preventDefault();
  var fromCountryIndex = $("#from-countries").val();
  var toCountryIndex = $("#to-countries").val();
  var fromCountryData = fromCountry[fromCountryIndex];
  var toCountryData = toCountry[toCountryIndex];


  var img = $('<img />', {src: fromCountryData.flags.png, alt: fromCountryData.flags.alt});
  var div1 = $('<div>');
  div1.text(`Country: ${fromCountryData.name.official}`);
  var div2 = $('<div>');
  div2.text(`Population: ${fromCountryData.population}`);
  var div3 = $('<div>');
  div3.text(`Capital: ${fromCountryData.capital[0]}`);
  var div7 = $('<div>');
  div7.text(`Latitude, Longitude: ${fromCountryData.latlng[0]}, ${fromCountryData.latlng[1]}`);

  $("#from-countries-display").append(img, div1,div2,div3, div7);

  console.log(toCountryData);
  var img2 = $('<img />', {src: toCountryData.flags.png, alt: toCountryData.flags.alt});
  var div4 = $('<div>');
  div4.text(`Country: ${toCountryData.name.official}`);
  var div5 = $('<div>');
  div5.text(`Population: ${toCountryData.population}`);
  var div6 = $('<div>');
  div6.text(`Capital: ${toCountryData.capital[0]}`);
  var div8 = $('<div>');
  div8.text(`Latitude, Longitude: ${toCountryData.latlng[0]}, ${toCountryData.latlng[1]}`);

  $("#to-countries-display").append(img2, div4,div5,div6,div8);

});
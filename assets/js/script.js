// Get the input fields
const currencyCodeInput = document.getElementById("from-currency");
const amountInput = document.getElementById("amount");
const conversionCodeInput = document.getElementById("to-currency");
const resultElement = document.getElementById("result");
var fromCountry = {};
var toCountry = {};


// Add a submit event listener to the form
document.querySelector("form").addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  if (currencyCodeInput.value == "000" || conversionCodeInput.value == "000" || amountInput.value == "") {
    resultElement.innerText = "Please select a country and amount";
    $("#countryDisplayChoices").css("visibility", "hidden");//makes form visible
    $("#from-countries-display").empty();
    $("#to-countries-display").empty();
    return;
  }

  // Get the input field values
  const currencyCode = currencyCodeInput.value.toLowerCase();
  const amount = parseFloat(amountInput.value);
  const conversionCode = conversionCodeInput.value.toLowerCase();

  // Fetch the exchange rates for the currencyCode from the API
  fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyCode}/${conversionCode}.json`)
    .then((response) => response.json())
    .then((data) => {
      //empties country display so it doesn't appear when changing currencies
      $("#from-countries-display").empty();
      $("#to-countries-display").empty();
      //takes amount and multiplies it by the data from api to get desired numerical output
      const convertedAmount = amount * data[conversionCode];
      //displays output in the html
      resultElement.innerText = `Result: ${amount} ${currencyCode} = ${formatFloat(convertedAmount)} ${conversionCode}`;
    
      getCountryData(currencyCode, true);
      getCountryData(conversionCode, false);
      $("#countryDisplayChoices").css("visibility", "visible");//makes form visible
    })
    .catch((error) => {
      console.error(error);
    });
});

function getCountryData(currencyCode, isFrom) {
  fetch(`https://restcountries.com/v3.1/currency/${currencyCode}?fields=name,capital,currencies,flags,population,latlng,maps,continents`)
    .then((response) => response.json())
    .then((data) => {

      if (isFrom) {
        var countryLabel = "#fromCountryLabel";
        var countryId = "#from-countries";
        fromCountry = data;//stores data into variable to use for outside functions
      } else {
        var countryLabel = "#toCountryLabel";
        var countryId = "#to-countries";
        toCountry = data;
      }

      $(countryLabel).text(`Countries that use ${currencyCode}:`);
      $(countryId).empty();//empties current dropdown list so it doesn't stack with new one
      for(var i=0; i<data.length; i++) {//if there are more than 1 country associated with the currency, display all in dropdown list
        $(countryId).append($('<option></option>').val(i).html(data[i].name.common));//populates dropdown list with each country
      }
    })    
    .catch((error) => {
      console.error(error);
    });

}

//event listener for country selection that calls display country for the left and right selection
document.querySelector("#countryDisplayChoices").addEventListener("submit", (event) => {
  event.preventDefault();
  //gets the value from the dropdowns
  var fromCountryIndex = $("#from-countries").val();
  var toCountryIndex = $("#to-countries").val();

  //calls display country for first and second country data
  displayCountry(fromCountry[fromCountryIndex], true);
  displayCountry(toCountry[toCountryIndex], false);
});

//creates div elements with data of countries gotten from country fetches
function displayCountry(countryData, isFrom) {
  //empties the current displays so it doesn't stack with previous displays
  if(isFrom) {
    $("#from-countries-display").empty();
  } else {
    $("#to-countries-display").empty();
  }

  var img = $('<img />', {src: countryData.flags.png, alt: countryData.flags.alt});//displays image of country flag with alt
  var div1 = $('<div>');
  div1.text(`Country: ${countryData.name.official}`);
  var div2 = $('<div>');
  div2.text(`Population: ${countryData.population.toLocaleString("en-US")} people`);//converts int into string with , after every three digits
  var div3 = $('<div>');
  div3.text(`Capital: ${countryData.capital[0]}`);
  var div4 = $('<div>');
  div4.text(`Continent: ${countryData.continents[0]}`);
  var div5 = $('<div>');
  div5.text(`Latitude, Longitude: ${formatFloat(countryData.latlng[0])}, ${formatFloat(countryData.latlng[1])}`);
  var a = $("<a />", {href : countryData.maps.googleMaps ,text : "Google Maps"});

  if(isFrom) {
    $("#from-countries-display").append(img, div1, div2, div3, div4, div5, a);
  } else {
    $("#to-countries-display").append(img, div1, div2, div3, div4, div5, a);
  }
}

//rounds float to nearest 2 nonzero decimals ex. 23.33, 123.55, 0.000012
function formatFloat(number) {
  // Convert the number to a string
  newNumber = 0;

  var str = number.toString();
  var isNegative = false;
  if (str.charAt(0) === '-') {
    isNegative = true;
    str = str.slice(1);
  }

  if(str.charAt(0) === '0' && str !== '0') {//checks if first digit is 0 without the whole value just being 0
    var nonZeroIndex = str.indexOf('.')+1;//finds the place of decimal
    while ((str.charAt(nonZeroIndex) === '0')){//finds the place of the first non zero
      nonZeroIndex++;
    }
    newNumber = parseFloat(str.substring(0,nonZeroIndex+2));
    if (isNegative) {
      newNumber = newNumber * -1;
    }
    return(newNumber);
  } else if (str.includes('.')) {//if there's a decimal, return number with 2 decimal places
    newNumber = parseFloat(str)
    if (isNegative) {
      newNumber = newNumber * -1;
    }
    return (newNumber.toFixed(2))
  }
  else {//if there's no decimal, return number as normal
    newNumber = parseFloat(str);
    if (isNegative) {
      newNumber = newNumber * -1;
    }
    return (newNumber)
  }

}
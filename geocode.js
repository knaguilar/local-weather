var geocoder;
var weatherData;
var city;


/* Forecast.io API Variables (Weather Forecasting) */
var FORECAST_URL =  "https://api.darksky.net/forecast/";
var FORECAST_API =  "9e33c0fe31a85de97a958d06533d6a18";  // Your API Key
var latitude     =  "";  // Your Latitude
var longitude    =  "";  // Your Longitude

//display current temperature
function do_something(data) {
  $('.temp').html(data.currently.temperature);
}

//display user's location
function displayCity(city, found) {
  if(found){
    $('.city').html(city.long_name);
  }
  else {
    $('.city').html(city);
  }
}

//Ask the API for current weather and other info
function fetchWeather() {
  $.ajax({
    url: FORECAST_URL + FORECAST_API + '/' + latitude + ',' + longitude + "?units=auto",
    dataType: "jsonp",

    success: function (data) {
      weatherData = data;  /* Store our newly aquired weather data */
      do_something(weatherData);
    }
  });

  // Fetch the weather every fifteen minutes
  setTimeout(function() { fetchWeather();  }, 900000);
}

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
    /* geolocation is available */
  else {
  console.log("GeoLocation not available");

  /* geolocation IS NOT available */
  }
//if the geolocation was successful, calls functions to run location name finder
//and weather info
function successFunction(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  codeLatLng(latitude, longitude);
  fetchWeather();
}

function errorFunction() {
  alert("Geocoder failed");
}

function initialize() {
  geocoder = new google.maps.Geocoder();
}


//Using the found lat and long, finds the location's city name
//and calls display city
function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  var found = false;
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      if(results[1]) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          for (var j = 0; j < results[0].address_components[i].types.length; j++) {
            if(results[0].address_components[i].types[j] == "locality") {
              city = results[0].address_components[i];
              found = true;
              break;
            }
            if (results[0].address_components[i].types[j] == "administrative_area_level_2") {
              city = results[0].address_components[i];
              found = true;
              break;
            }
          }
          if(found) break;
        }
      }
      else {
        city = "No results found";
      }
    }
    else {
      city = "Geocoder failed due to: " + status;
    }
    displayCity(city, found);
  });
}
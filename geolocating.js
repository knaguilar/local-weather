var weatherData;

/* Forecast.io API Variables (Weather Forecasting) */
var FORECAST_URL =  "https://api.forecast.io/forecast/";
var FORECAST_API =  "9e33c0fe31a85de97a958d06533d6a18";  // Your API Key
var latitude     =  "";  // Your Latitude
var longitude    =  "";  // Your Longitude

function do_something(lat, long) {
  console.log("lat is " + lat + " and long is " + long);
}

function fetchWeather() {
  $.ajax({
    url: FORECAST_URL + FORECAST_API + '/' + latitude + ',' + longitude + "?units=auto",
    dataType: "jsonp",
    success: function (data) { weatherData = data;  /* Store our newly aquired weather data */ }
  });

  console.log("Success: data is " + data);

  // Fetch the weather every fifteen minutes
  setTimeout(function() { fetchWeather();  }, 900000);
}

$(document).ready(function() {
  $('.button').on("click", function() {
    if ("geolocation" in navigator) {
      console.log("GeoLocation available");
      navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        fetchWeather();
      });
    /* geolocation is available */
    } else {
    console.log("GeoLocation not available");

    /* geolocation IS NOT available */
    }
  });
});
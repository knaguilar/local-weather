var weatherData;

/* Forecast.io API Variables (Weather Forecasting) */
var FORECAST_URL =  "https://api.darksky.net/forecast/";
var FORECAST_API =  "9e33c0fe31a85de97a958d06533d6a18";  // Your API Key
var latitude     =  "42.3601";  // Your Latitude
var longitude    =  "-71.0589";  // Your Longitude

function do_something(lat, long) {
  console.log("lat is " + lat + " and long is " + long);
}

function fetchWeather() {
  $.ajax({
    url: FORECAST_URL + FORECAST_API + '/' + latitude + ',' + longitude,
    dataType: "jsonp",
    success: function (data) {
      weatherData = data;  /* Store our newly aquired weather data */
      console.log("Success: data is " + weatherData.currently.temperature);
    }
  });

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
        do_something(latitude, longitude);
      });
    /* geolocation is available */
    } else {
    console.log("GeoLocation not available");

    /* geolocation IS NOT available */
    }
  });
});
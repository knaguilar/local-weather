var geocoder;
var weatherData;
var city;


/* Forecast.io API Variables (Weather Forecasting) */
var FORECAST_URL =  "https://api.darksky.net/forecast/";
var FORECAST_API =  "9e33c0fe31a85de97a958d06533d6a18";  // Your API Key
var latitude     =  "";  // Your Latitude
var longitude    =  "";  // Your Longitude

//display current temperature
function displayWeather(data) {
  var temperature = roundNumber(data.currently.temperature);
  $('.temp').append(temperature + "&#8457;");
  $('.temp').addClass('fahren');
  var icon = data.currently.icon.replace(/-/gi, " ");
  $('.description').append(icon);
  $('.wind').append(data.currently.windSpeed + " mph");
  $('.temp').click(function(){
    if( $('.temp').hasClass('fahren')){
      fahrenToCel(temperature);
    }
    else{
      celToFahren(temperature);
    }
});
}

//display user's location
function displayCity(city, found) {
  if(found){
    $('.city').append(city.long_name);
  }
  else {
    $('.city').html(city);
  }
}

function fahrenToCel(temperature){
  $('.temp').removeClass('fahren');
  var cel = (temperature - 32) / 1.8;
  $('.temp').html(roundNumber(cel) + "&#8451;");
  $('.temp').addClass('celsius');
}

function celToFahren(temperature){
  $('.temp').removeClass('celsius');
  $('.temp').html(temperature + "&#8457;");
  $('.temp').addClass('fahren');
}

function roundNumber(num) {
    num = Math.ceil(num * 100)/100;
  return num;
}

//Ask the API for current weather and other info
function fetchWeather() {
  $.ajax({
    url: FORECAST_URL + FORECAST_API + '/' + latitude + ',' + longitude + "?units=us",
    dataType: "jsonp",

    success: function (data) {
      weatherData = data;  /* Store our newly aquired weather data */
      chooseBackgroundWeather(weatherData.currently.icon);
      displayWeather(weatherData);
    }
  });

  // Fetch the weather every fifteen minutes
  //setTimeout(function() { fetchWeather();  }, 900000);
}


//if the geolocation was successful, calls functions to run location name finder
//and weather info
function successFunction(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetchWeather();
  codeLatLng(latitude, longitude);
}

function errorFunction() {
  alert("Geocoder failed");
}

function chooseBackgroundWeather(condition){
  $('.container-fluid').removeClass('fill');
  if(condition == "clear-day"){
    $('.container-fluid').css({"background-image" : "url('images/sunny.jpg')"});
    //show image of clear skies
  }
  else if(condition == "clear-night"){
    $('.container-fluid').css({"background-image" : "url('images/clear-night.jpg')"});
    //show image of clear skies
  }
  else if(condition == "rain" || condition == "hail" || condition == "fog"){
    $('.container-fluid').css({"background-image" : "url('images/rain.jpg')"});
    //show image of clear skies
  }
  else if(condition == "snow" || condition == "sleet"){
    $('.container-fluid').css({"background-image" : "url('images/snow.jpg')"});
    //show image of clear skies
  }
  else if(condition == "wind" || condition == "tornado"){
    $('.container-fluid').css({"background-image" : "url('images/wind.jpg')"});
    //show image of clear skies
  }
  else if(condition == "partly-cloudy-day" || condition == "partly-cloudy-night"){
    $('.container-fluid').css({"background-image" : "url('images/cloudy-sky.jpg')"});
    //show image of clear skies
  }
  else if(condition == "thunderstorm"){
    $('.container-fluid').css({"background-image" : "url('images/lighting.jpg')"});
    //show image of clear skies
  }
  else{
    $('.container-fluid').css({"background-image" : "url('images/default.jpg')"});
    //default
  }
}

function initialize() {
  geocoder = new google.maps.Geocoder();

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
    /* geolocation is available */
  else {
    console.log("GeoLocation not available");
  /* geolocation IS NOT available */
  }
}


//Using the found lat and long, finds the location's city name
//and calls display city
function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  var found = false;
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      if(results[1]) {
        // var addr = results[0].formatted_address;
        // var addr_array = addr.split(" ");
        // var len = addr_array.length;

        // city = addr_array[len - 2] + " " + addr_array[len - 1];
        // found = true;

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
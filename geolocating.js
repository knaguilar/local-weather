function do_something(lat, long) {
  console.log("lat is " + lat + " and long is " + long);
}


$(document).ready(function() {
  $('.button').on("click", function() {
    if ("geolocation" in navigator) {
      console.log("GeoLocation available");
      navigator.geolocation.getCurrentPosition(function(position) {
        http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}

        $.getJSON("api.openweathermap.org/data/2.5/forcast?lat={" + position.coords.latitude + "}&lon={"+ position.coords.longitude + "&APPID={d6dad265455539cfaba673a7f3cf6bc8}}", function(data) {
        //do stuff with data returned as json
          console.log(data[0].name);
        });
        $.ajaxSetup({ cache: false });
      });
    /* geolocation is available */
    } else {
    console.log("GeoLocation not available");

    /* geolocation IS NOT available */
    }
  });
});
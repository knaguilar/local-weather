function do_something(lat, long) {
  console.log("lat is " + lat + " and long is " + long);
}


$(document).ready(function() {
  $('.button').on("click", function() {
    if ("geolocation" in navigator) {
      console.log("GeoLocation available");
      navigator.geolocation.getCurrentPosition(function(position) {
        $.getJSON("api.openweathermap.org/data/2.5/weather?lat={" + position.coords.latitude + "}&lon={"+ position.coords.longitude + "}", function(data) {
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
function do_something(lat, long) {
  console.log("lat is " + lat + " and long is " + long);
}

$(document).ready(function() {
  $('.button').on("click", function() {
    if ("geolocation" in navigator) {
      console.log("GeoLocation available");
      navigator.geolocation.getCurrentPosition(function(position) {
        $.getJSON("https://api.darksky.net/forecast/9e33c0fe31a85de97a958d06533d6a18/" + position.coords.latitude + ","+ position.coords.longitude + ", function(data) {
        //do stuff with data returned as json
          console.log(data); //moscow
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
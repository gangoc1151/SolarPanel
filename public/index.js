console.log("Env read");

var getSensorData = function (location) {
  if (!location) {
    $("#id01").empty();
    return $("#id01").append("<h2>Please provide your address</h2>");
  }
  $.getJSON("https://solarpanel.mybluemix.net/test?city=" + location, function (
    data,
    status
  ) {
    console.log(JSON.stringify(data));
    $("#tdata").empty();
    $("#id01").empty();
    $("#tdata").append(
      "<tr>" +
        "<td>" +
        data.timezone_id +
        "</td>" +
        "<td>" +
        data.weather_description +
        "</td>" +
        "<td>" +
        data.cloudcover +
        "</td>" +
        "<td>" +
        data.temperature +
        "</td>" +
        "</tr>"
    );
    let power_output = 0;
    let temp = data.temperature;
    if (data.weather_description == "Partly cloudy") {
      if (data.cloudcover > 75) {
        let x = 0.45;

        power_output = 233.13;
      } else {
        let x = 0.5;
        power_output = 149.18;
      }
    }
    if (data.weather_description == "Cloudy") {
      if (data.cloudcover > 75) {
        let x = 0.45;
        power_output = 233.13;
      } else {
        let x = 0.5;
        power_output = 149.18;
      }
    }
    if (data.weather_description == "Sunny") {
      if (data.cloudcover > 75) {
        let x = 0.45;
        power_output = 233.13;
      } else {
        let x = 0.5;
        power_output = 149.18;
      }
    }
    $("#id01").append(
      "<h4>The estimated Solar power generation for today will be</h4>",
      " <h3><strong>" + power_output + " KWh</strong></h3>"
    );
    $(document).ready(function () {
      console.log(["my dom is ready"]);
    });
  });
};

//specify location in ggl map
function createMap() {
  var map;
  var markers = [];

  var latitude, longitude;

  var option = {
    center: { lat: -37.8044416, lng: 144.97218568 },
    zoom: 10,
  };

  map = new google.maps.Map(document.getElementById("map"), option);

  map.addListener("click", function (event) {
    if (markers.length >= 1) {
      deleteMarkers();
    }

    addMarker(event.latLng);
    latitude = event.latLng.lat();
    longitude = event.latLng.lng();

    console.log(latitude + ", " + longitude);
    // getting location name
    var location = getAddress(latitude, longitude)
      .then(console.log)
      .catch(console.error);

    getSensorData2(latitude, longitude);
  });
  // Adds a marker to the map and push to the array.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  function getAddress(latitude, longitude) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();

      var method = "GET";
      var url =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        latitude +
        "," +
        longitude +
        "&sensor=true&key=AIzaSyC221w2EQVhNM9Aj844W6a8O70ZJr63CKY";
      var async = true;

      request.open(method, url, async);
      request.onreadystatechange = function () {
        if (request.readyState == 4) {
          if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            var address = data.results[0].formatted_address;
            resolve(address);
          } else {
            reject(request.status);
          }
        }
      };
      request.send();
    });
  }
}
var getSensorData2 = function (latitude, longitude) {
  $.getJSON(
    "https://solarpanel.mybluemix.net/test?latitude=" +
      latitude +
      "&longitude=" +
      longitude,
    function (data, status) {
      console.log(JSON.stringify(data));
      $("#tdata").empty();
      $("#id01").empty();
      $("#tdata").append(
        "<tr>" +
          "<td>" +
          data.timezone_id +
          "</td>" +
          "<td>" +
          data.weather_description +
          "</td>" +
          "<td>" +
          data.cloudcover +
          "</td>" +
          "<td>" +
          data.temperature +
          "</td>" +
          "</tr>"
      );
      let power_output = 0;
      let temp = data.temperature;
      if (data.weather_description == "Partly cloudy") {
        if (data.cloudcover > 75) {
          let x = 0.45;

          power_output = 233.13;
        } else {
          let x = 0.5;
          power_output = 149.18;
        }
      }
      if (data.weather_description == "Cloudy") {
        if (data.cloudcover > 75) {
          let x = 0.45;
          power_output = 233.13;
        } else {
          let x = 0.5;
          power_output = 149.18;
        }
      }
      if (data.weather_description == "Sunny") {
        if (data.cloudcover > 75) {
          let x = 0.45;
          power_output = 233.13;
        } else {
          let x = 0.5;
          power_output = 149.18;
        }
      }
      $("#id01").append(
        "<h4>The estimated Solar power generation for today will be</h4>",
        " <h3><strong>" + power_output + " KWh</strong></h3>"
      );
      $(document).ready(function () {
        console.log(["my dom is ready"]);
      });
    }
  );
};

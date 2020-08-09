//specify location in ggl map

function createMap() {
  var address;
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
      $("#address").empty();
      $("#weather").empty();
      $("#cloudcover").empty();
      $("#temperature").empty();
      $("#address").append(data.address);
      $("#weather").append(data.weather_description);
      $("#cloudcover").append(data.cloudcover);
      $("#temperature").append(data.temperature);
      $("#timezone").empty();
      $("#timezone").append(data.time);
      $("#PowerGenerated").empty();
      let STC = 250;
      let power_output;
      let temp = data.temperature;
      let day = data.is_day;
      if (day == "yes") {
        if (temp < 0) {
          power_output = 0;
        }
        if (temp < 10) {
          if ((data.cloudcover = 0)) {
            power_output = 250 * 0.3;
          } else if (data.cloudcover < 20) {
            power_output = 250 * 0.2;
          } else if (data.cloudcover >= 20 && data.cloudcover < 70) {
            power_output = 250 * 0.15;
          } else if (data.cloudcover >= 70) {
            power_output = 250 * 0.1;
          }
        }
        if (temp >= 10 && temp < 16) {
          if (data.cloudcover < 20) {
            power_output = 250 * 0.7;
          } else if (data.cloudcover >= 20 && data.cloudcover < 70) {
            power_output = 250 * 0.5;
          } else if (data.cloudcover >= 70) {
            power_output = 250 * 0.25;
          }
        }
        if (temp >= 16 && temp < 25) {
          if (data.cloudcover < 20) {
            power_output = 250 * 0.9;
          } else if (data.cloudcover >= 20 && data.cloudcover < 70) {
            power_output = 250 * 0.4;
          } else if (data.cloudcover >= 70) {
            power_output = 250 * 0.2;
          }
        }
        if (temp >= 25) {
          if (data.cloudcover == 0) {
            power_output = 250 - (30 + temp - 25) * 0.005 * 250;
          }
          if (data.cloudcover < 20) {
            power_output = 250 - (30 + temp - 25) * 0.005 * 250 * 0.75;
          }
          if (data.cloudcover >= 20 && data.cloudcover < 70) {
            power_output = 250 - (30 + temp - 25) * 0.005 * 250 * 0.5;
          }
          if (data.cloudcover >= 70) {
            power_output = 250 - (30 + temp - 25) * 0.005 * 250 * 0.25;
          }
        }
      } else {
        $("#PowerGenerated").append(0);
      }
      $("#PowerGenerated").append(power_output);

      $("#id01").append(
        "<h5>The estimated Solar power generation for today will be</h5>",
        " <h4><strong>" + power_output + " KWh</strong></h4>"
      );
      $(document).ready(function () {
        console.log(["my dom is ready"]);
      });
    }
  );
};

console.log("Env read");

var getSensorData = function () {
  $.getJSON("https://solarpanel.mybluemix.net/test?city=melbourne", function (
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

//url to GeoJSON. see https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php for more info
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


function map () {
//function to build map

    //layers

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

// var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "light-v10",
//         accessToken: API_KEY
//       });

// Create the map object with options
var map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap]
  });

};
  // read in data

  d3.json(url, function(response) {

    console.log(response);
  });
  
map()

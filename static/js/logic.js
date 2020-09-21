
//level 2

//url to earthquake GeoJSON. see https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php for more info
earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

plateURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

//function to build map
function mapDisplay () {

    //layers

  // Create the tile layer that will be the background of our map
  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  var streetView = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        tileSize: 512,
        maxZoom: 10,
        zoomOffset: -1,      
        id: "streets-v11",
        accessToken: API_KEY
      });

  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        tileSize: 512,
        maxZoom: 10,
        zoomOffset: -1,      
        id: "satellite-v9",
        accessToken: API_KEY
      });

  // Create group of tile types
  var baseMaps = {
    Street: streetView,
    Dark: dark,
    Satellite: satellite
  };

  // Create a GeoJSON layer containing the features array on the plate data object
  var platePolygons = d3.json(plateURL, function(data) {
        L.geoJSON(data, {
          style: plateStyle
        })
        .addTo(earthQuakeMap)
        });

  // // Get request to URL
  var earthquakes = d3.json(earthquakeURL, function(data) {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, markerStyle(feature));
      },
    // Call pop-up for each feature
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h1> Magnitude: " + feature.properties.mag+ "</h1> <hr> <h2>" + feature.properties.place + "</h2>");
      }
    }).addTo(earthQuakeMap);
  });

  // create Overlay layer that can be toggled on or off
  var overlayMaps = {
    "Fault line": platePolygons,
    //Earthquakes: earthquakes
    };
  
    // Create the map 
    var earthQuakeMap = L.map("map", {
      center: [0, 0],
      zoom: 3,
      worldCopyJump: true,
      layers: [satellite]
    });

  // Pass map layers into layer control and add the layer control to the map
  L.control.layers(baseMaps, null, {collapsed:false}).addTo(earthQuakeMap);

  //call legend function
  mapLegend(earthQuakeMap);

};

//function for creating legend
function mapLegend (map) {

  colors = ["#459E22", "#7FB20E", "#BEBE02", "#B19A0F", "#B54C0B", "#C00000"];

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
                  categories = ['<1', '1 to <2', '2 to <3', '3 to <4', '4 to <5', '>5'],
                  labels =[];
    
    div.innerHTML += '<strong> Magnitude </strong> <br>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            categories[i] + '<br>';
    };
    return div;
 };
    legend.addTo(map);
};

//function for styling markers
function markerStyle (feature) {
  return {
      fillColor: markerColor(feature.properties.mag),
      radius: 4*feature.properties.mag,
      weight: 2,
      opacity: 1,
      color: markerColor(feature.properties.mag),
      fillOpacity: 0.9   
  };
};

//function for styling polygons
function plateStyle (feature) {
  return {
      fillColor: null,
      color: "grey",
      fillOpacity: 0
  };
};

// Function determining the color of marker based on magnitude
function markerColor(magnitude) {
  if (magnitude<1) {
    return "#459E22"}
  else if (magnitude<2) {
     return "#7FB20E"}
  else if (magnitude<3) {
     return "#BEBE02"}
  else if (magnitude<4) {
     return "#B19A0F"}
  else if (magnitude<5) {
     return "#B54C0B"}
  else if (magnitude>=5) {
     return "#C00000"}
  else {return "black"}
 };
  
//call function to display map
mapDisplay();


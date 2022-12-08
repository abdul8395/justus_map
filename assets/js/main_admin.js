var map
var dark  = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
// var dark  = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png');

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        });
var plain =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/light-v9',
            tileSize: 512,
            zoomOffset: -1
        })  
var openstreet   = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');




  map = L.map('map', {
  center: [38.57389610087847,-77.81616160646082],
  zoom: 9,
  attributionControl: false
});
map.zoomControl.setPosition('bottomright');
var googlestreet   = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map)



    var geocoder=L.Control.geocoder({
      // defaultMarkGeocode: false,
        collapsed:false,
        position:"topright", 
        // placeholder:"Enter Zip Code Here...",
        queryParams: {"countrycodes": "US"},
        geocoder: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
            "countrycodes": "US"
            }
        })
      })
      geocoder.addTo(map);



    L.control.fullscreen({
      position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
      // title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
      // titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
      // content: null, // change the content of the button, can be HTML, default null
      // forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
      // forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
      // fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
    }).addTo(map);




var baseLayers = {
"Google Street Map": googlestreet,
"Google Sattellite Map": googleSat,
"Open Street Map": openstreet,
"Dark Map": dark,

"plain": plain
// "LGA Layer": lga
};
var overLays = {
// "Land_Plots": Land_Plots,
// "Trees & Graphics": trees_layer,
// "Clouds": clouds_layer
};

var mylayercontrol= L.control.layers(baseLayers,overLays).addTo(map);




L.DomEvent.on(document.getElementById('btnGetLoc'), 'click', function(){
  // map.locate({setView: true, maxZoom: 16});
  $('.leaflet-control-locate-location-arrow')[0].click()
})


// function onLocationFound(e) {
//   var radius = e.accuracy;

//   // L.marker(e.latlng).addTo(map)
     

//   L.circle(e.latlng, radius).addTo(map)
//   .bindPopup("You are within " + radius + " meters from this point").openPopup();
// }

// map.on('locationfound', onLocationFound);



var lc = L.control
  .locate({
    position: "topright",
    strings: {
      title: "Show me where I am, yo!"
    }
  })
  .addTo(map);





  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  var drawControl = new L.Control.Draw({
    draw: {
      position: 'topleft',
      polygon: {
        title: 'Draw a polygon!',
        allowIntersection: false,
        drawError: {
          color: '#b00b00',
          timeout: 1000
        },
        shapeOptions: {
          color: 'red'
        },
        showArea: true
      },
      polyline: {
        metric: false
      },
      circle: {
        shapeOptions: {
          color: '#662d91'
        }
      }
    },
    edit: {
      featureGroup: drawnItems
    }
  });
  // map.addControl(drawControl);

  map.on('draw:created', function (e) {
    var type = e.layerType,
      layer = e.layer;

    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }

    drawnItems.addLayer(layer);




    var layer = e.layer,
    feature = layer.feature = layer.feature || {}; // Intialize layer.feature
    feature.type = feature.type || "Feature"; // Intialize feature.type
    var props = feature.properties = feature.properties || {}; // Intialize feature.properties
    props.title = "my title";
    props.content = "my content";
    var idIW = L.popup();
    var content = '<b>Territory ID:</b><br/><input id="id" placeholder="Enter ID" type="text"/><br><b>Name:</b><br/><input id="Name" placeholder="Enter Name" type="text"/><br><b>Email:</b><br/><input id="Email" placeholder="Enter Email" type="text"/><br/><br/><input type="button" id="okBtn" value="Save" onclick="saveIdIW()"/>';
    idIW.setContent(content);
    idIW.setLatLng(e.layer.getBounds().getCenter());
    idIW.openOn(map);
    drawnItems.addLayer(layer);
  });





  
  var options = {
    position: 'topright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: false,  // adds button to draw markers
    drawPolygon: true,  // adds button to draw a polygon
    drawPolyline: false,  // adds button to draw a polyline
    drawCircle: false,  // adds button to draw a cricle
    editPolygon: true,  // adds button to toggle global edit mode
    deleteLayer: true,   // adds a button to delete layers
    drawText: false,   // adds a button to delete layers        
    cutPolygon: false,   // adds a button to delete layers        
    drawRectangle: false,   // adds a button to delete layers        
    dragMode: false,   // adds a button to delete layers        
    drawCircleMarker: false,   // adds a button to delete layers        
    rotateMode: false,   // adds a button to delete layers        
      
   
};

// add leaflet.pm controls to the map

map.pm.addControls(options);


// get array of all available shapes
map.pm.Draw.getShapes()

// disable drawing mode
map.pm.disableDraw('Polygon');

// listen to when drawing mode gets enabled
map.on('pm:drawstart', function(e) {
  console.log(e)
});

// listen to when drawing mode gets disabled
map.on('pm:drawend', function(e) {
  console.log(e)
});

// listen to when a new layer is created
map.on('pm:create', function(e) {
  console.log(e)


  // var layer = e.layer,
  // feature = layer.feature = layer.feature || {}; // Intialize layer.feature
  // feature.type = feature.type || "Feature"; // Intialize feature.type
  // var props = feature.properties = feature.properties || {}; // Intialize feature.properties
  // props.title = "my title";
  // props.content = "my content";
  var idIW = L.popup();
  var content = '<b>Territory ID:</b><br/><input id="id" placeholder="Enter ID" type="text"/><br><b>Name:</b><br/><input id="Name" placeholder="Enter Name" type="text"/><br><b>Email:</b><br/><input id="Email" placeholder="Enter Email" type="text"/><br/><br/><input type="button" id="okBtn" value="Save" onclick="saveIdIW()"/>';
  idIW.setContent(content);
  idIW.setLatLng(e.layer.getBounds().getCenter());
  idIW.openOn(map);
  // drawnItems.addLayer(layer);

  // listen to changes on the new layer
  e.layer.on('pm:edit', function(x) {
  console.log('edit', x)
  });
});




map.pm.setGlobalOptions({
  limitMarkersToCount: 20
})








  
var circlemarker
// map.on('zoomend',function(e){
//   var currZoom = map.getZoom();
//   console.log(currZoom)
// });

map.on('click', function(e) {
  console.log(e.latlng.lat + ", " + e.latlng.lng)
  var currZoom = map.getZoom();
    if(currZoom > 16){
      if(map.hasLayer(circlemarker)){
        map.removeLayer(circlemarker)
      }
      circlemarker=L.circle([e.latlng.lat, e.latlng.lng], 0).addTo(map)
      .bindPopup("Address: <br>Latitude: "+e.latlng.lat+"<br>"+"Longitude: "+e.latlng.lng).openPopup();
      circlemarker.setStyle({color: 'red'});


      console.log(currZoom)
      fetch("https://nominatim.openstreetmap.org/search.php?q="+e.latlng.lat+","+e.latlng.lng+"&polygon_geojson=1&format=json")
      .then(response => response.json())
      .then(j => {
        var address=j[0].display_name
        console.log(address)
        if(map.hasLayer(circlemarker)){
          map.removeLayer(circlemarker)
        }
        circlemarker=L.circle([e.latlng.lat, e.latlng.lng], 0).addTo(map)
        .bindPopup("Address: "+address+"<br>Latitude: "+e.latlng.lat+"<br>"+"Longitude: "+e.latlng.lng).openPopup();
        circlemarker.setStyle({color: 'red'});
      })

     

    } 
});













const urlGoogleSheetsTerritoriesData =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmf6o6Xynlqv4UVrj_WMWn_oSXgRGnPDGvzCObrUwFoncct3iMHBnvHGwYKWSirMByMY4ExI_KSNan/pub?output=csv";


function getTerritoriesData() {
  Papa.parse(urlGoogleSheetsTerritoriesData, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      mapTerritoryData = results.data;

      let sheetColumns = Object.keys(mapTerritoryData[0]);

      territories.features.map((geoJsonItem) => {
        let stateId = geoJsonItem.properties.id;
        let filteredCsvData = mapTerritoryData.filter(function (e) {
          console.log(e.terr_id+","+e.rep_name+","+e.rep_email)
          return parseInt(e.terr_id) === stateId;
        });

        sheetColumns.forEach((col, i) => {
          geoJsonItem.properties[col] = filteredCsvData[0][col];
        });
      });
    },
  });
}

// getTerritoriesData();

var mycount=0
var territories_lyr
setTimeout(function(){
    territories_lyr=L.geoJson( territories, {
    style: function(feature){
      // var fillColor,
      var colorId = feature.properties.color;

      let color = "#FFFFFF";
  
      if (colorId === 1) {
        color = "#c3ecb2";
      } else if (colorId == 2) {
        color = "#aadaff";
      } else if (colorId == 3) {
        color = "#f58c9b";
      } else if (colorId == 4) {
        color = "#f6cf65";
      } else if (colorId == 5) {
        color = "#d79ce6";
      } else {
        color = "#FFFFFF";
      }
  
      return {
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWeight: 0.5,
        fillColor: color,
        fillOpacity: 0.5,
        weight: 0.9,
        opacity: 0.7,
        dashArray: '2',
        color: 'black',
      };

    },
    onEachFeature: function( feature, layer ){
      layer.on({
        click: layerclick
      })
      // console.log(feature.properties.id)
     

      // drawnItems.addLayer(layer);
      // map.pm.addLayer(layer);
     
    }
  })
  map.addLayer(territories_lyr)
},200);

setTimeout(() => {
  territories_lyr.on('pm:edit', function (e) {
    console.log(e);
  });
}, 500);


function layerclick(e) {
  console.log(mycount+1)
  var layer = e.target;
  // var poly_id=layer.defaultOptions.id
  var f_id=layer.feature.properties.id



  var idIW = L.popup();




  var currZoom = map.getZoom();
    if(currZoom > 16){
      // console.log(currZoom)
   

      fetch("https://nominatim.openstreetmap.org/search.php?q="+e.latlng.lat+","+e.latlng.lng+"&polygon_geojson=1&format=json")
      .then(response => response.json())
      .then(j => {
        var address=j[0].display_name
        console.log(address)
        var content='' 
        content=content+address
        content=content+"Address: "+address+"<br>Latitude: "+e.latlng.lat+"<br>"+"Longitude: "+e.latlng.lng
        idIW.setContent(content);
      })

    }else{
      Papa.parse(urlGoogleSheetsTerritoriesData, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          mapTerritoryData = results.data;
    
          let sheetColumns = Object.keys(mapTerritoryData[0]);
    
          territories.features.map((geoJsonItem) => {
            let stateId = geoJsonItem.properties.id;
            let filteredCsvData = mapTerritoryData.filter(function (e) {
              if(e.terr_id==f_id){
            
                  // console.log(currZoom)
                  var content='' 
                  content=content+"<h4> Territory: " + f_id + "</h4>"+"<strong> Name: </strong>" + e.rep_name + "<br/>"+"<strong> Email: </strong>" + e.rep_email + "<br/>"
                  // layer.bindPopup( "<h4> Territory: " + f_id + "</h4>"+"<strong> Name: </strong>" + e.rep_name + "<br/>"+"<strong> Email: </strong>" + e.rep_email + "<br/>").openPopup()
                  idIW.setContent(content);
              }
              // console.log(e.terr_id+","+e.rep_name+","+e.rep_email)
              // return parseInt(e.terr_id) === stateId;
            });
    
            sheetColumns.forEach((col, i) => {
              // geoJsonItem.properties[col] = filteredCsvData[0][col];
            });
          });
        },
      });
    }
    

    
    idIW.setLatLng(e.latlng);
    idIW.openOn(map);
}




  





 





















$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}


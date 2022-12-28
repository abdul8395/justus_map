var territories_data; 


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


  
var circlemarker
// map.on('zoomend',function(e){
//   var currZoom = map.getZoom();
//   console.log(currZoom)
// });

map.on('click', function(e) {
  console.log(e.latlng.lat + ", " + e.latlng.lng)
  var currZoom = map.getZoom();
    if(currZoom > 16){
      console.log(currZoom)

      if(map.hasLayer(circlemarker)){
        map.removeLayer(circlemarker)
      }
      circlemarker=L.circle([e.latlng.lat, e.latlng.lng], 0).addTo(map)
      .bindPopup("Address: <br>Latitude: "+e.latlng.lat+"<br>"+"Longitude: "+e.latlng.lng).openPopup();
      circlemarker.setStyle({color: 'red'});



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






var territories_lyr
var tlyr_arr=[]
setTimeout(function(){
   territories_lyr=L.geoJson( territories_data, {
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
      // console.log(feature.properties.id)
      var currZoom = map.getZoom();
      if(currZoom <= 16){
        console.log(currZoom)
        layer.bindPopup( "<h4> Territory: " + feature.properties.id )
        // layer.bindPopup( "<h4> Territory: " + feature.properties.id + "</h4>"+"<strong> Name: </strong>" + e.rep_name + "<br/>"+"<strong> Email: </strong>" + e.rep_email + "<br/>")
      }
      tlyr_arr.push(layer)
     
    }
  })
  map.addLayer(territories_lyr)
},1000);












function generateList() {
  const statesdiv = document.querySelector('#states_list');
  var str=''
  Papa.parse(urlGoogleSheetsTerritoriesData, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      mapTerritoryData = results.data;
      for(var i=0; i<mapTerritoryData.length; i++ ){
        str=str+'<div class="territory-item">';
         str=str+'<a href="#" onclick="flyTotritory('+mapTerritoryData[i].terr_id+')" id="terr_'+mapTerritoryData[i].terr_id+'">'+mapTerritoryData[i].terr_id+":  "+'Territory'+'</a>';
         str=str+'</div>'
      }
      $("#states_list").html(str)
    },
  });
  
}

setTimeout(function(){
  generateList();
},500)

function flyTotritory(tritory_id) {
  console.log(tritory_id)
  for(var i=0; i<tlyr_arr.length; i++ ){
    if(tlyr_arr[i].feature.properties.id==tritory_id){
      var latlng= tlyr_arr[i].getBounds().getCenter()
      map.flyTo(latlng, 12, {
          duration: 3
      });
      // map.fitBounds(territories_lyr.pm._layers[i].getBounds(), {padding: [50, 50]});
      setTimeout(() => {
        L.popup({closeButton: true, offset: L.point(0, -8)})
        .setLatLng(latlng)
        .setContent("<h4> Territory: " + tritory_id )
        // .setContent(makePopupContent(tritory))
        .openOn(map);
      }, 2000);
    }
  }
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


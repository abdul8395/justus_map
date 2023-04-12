


var map
var territories_data 
var VA_electric_flyr
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

var googlestreet   = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
    })
    map.zoomControl.setPosition('bottomright');


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
      position: 'bottomright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
      // title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
      // titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
      // content: null, // change the content of the button, can be HTML, default null
      // forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
      // forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
      // fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
    }).addTo(map);


var Esri_WorldImagery = L.esri.basemapLayer('Imagery').addTo(map);



   
var baseLayers = {
"Google Street Map": googlestreet,
"Google Imagery/Sattellite": googleSat,
"Esri_Imagery": Esri_WorldImagery,
"Open Street Map": openstreet,
"Dark Map": dark,
"Plain Map": plain
// "LGA Layer": lga
};
var overLays = {
// "Land_Plots": Land_Plots,
// "Trees & Graphics": trees_layer,
// "Clouds": clouds_layer
};

// var mylayercontrol= L.control.layers(baseLayers,overLays).addTo(map);


var uscountieslyr=L.geoJson(uscounties, {
  style: function(feature){
    // var fillColor,


    let color = "#aadaff";


    return {
      strokeColor: "#000000",
      strokeOpacity: 1,
      strokeWeight: 0.5,
      fillColor: color,
      fillOpacity: 0.2,
      weight: 0.9,
      opacity: 0.9,
      dashArray: '2',
      color: 'red',
    };

  },
  onEachFeature: function( feature, layer ){
   
    layer.bindPopup( "<b> County Name: </b>" + feature.properties.NAME )
    // console.log(feature.properties.terr_id)

   
  }
})
// map.addLayer(uscountieslyr)


   //  ......................Gradiant OR Heat MAP of NVRC................. 
  var gradiant_heat_lyr=L.esri.tiledMapLayer({
    url:"https://tiles.arcgis.com/tiles/6MUPhDX27Ne3DNOw/arcgis/rest/services/NVA_TPK/MapServer",
  })
  map.getPane("tilePane").style.zIndex = 100;

var co2lyr=L.esri.featureLayer({
  url: "https://services5.arcgis.com/6MUPhDX27Ne3DNOw/arcgis/rest/services/BuildingFootprintCO2/FeatureServer/0",
  style: function(feature) {
      return {
          color: "#ffffff",
          opacity:0,
          fillColor: "#ffffff",
          fillOpacity: 0
      };
  }
})

co2lyr.on("mouseover", function (e) {
  var prop=e.layer.feature.properties
 co2lyr.bindPopup("<b>Address: </b>"+prop.Address+"<br> <b>Roof Area: </b> "+parseFloat(prop.Area).toFixed(2)+" Sq.Ft. <br> <b>Usable Roof Area #: </b>"+parseFloat(prop.UsblArea).toFixed(2)+" Sq.Ft <br> <b>Usable Roof Area %: </b> "+parseFloat(prop.PctArea).toFixed(2)+" % <br> <b>Solar System Size: </b>"+parseFloat(prop.SysSize).toFixed(2)+" kW <br> <b>Electricity Savings: $</b>"+parseFloat(prop.Savings).toFixed(2)+"<br> <b>Annual CO2 Averted: </b>"+parseFloat(prop.CO2Ton).toFixed(2)+" Tonz")
  
});




setTimeout(function(){
  
  var overLays = {
    "Territories Layer":territories_lyr,
    "Counties Map Overlay": uscountieslyr,
    "VA Electric Territories": VA_electric_flyr,
    "ROOFS SOLAR MAP": gradiant_heat_lyr,
    // "Trees & Graphics": trees_layer,
    // "Clouds": clouds_layer
    };
     mylayercontrol= L.control.layers(baseLayers,overLays,{collapsed:false}).addTo(map);
     
},2500)





// L.DomEvent.on(document.getElementById('btnGetLoc'), 'click', function(){
//   // map.locate({setView: true, maxZoom: 16});
//   // $('.leaflet-control-locate-location-arrow')[0].click()
//       map.locate({setView: true, maxZoom: 15});
//       map.on('locationfound', onLocationFound);
//       function onLocationFound(e) {
//           console.log(e); 
//           // e.heading will contain the user's heading (in degrees) if it's available, and if not it will be NaN. This would allow you to point a marker in the same direction the user is pointed. 
//           var lmarker=L.marker(e.latlng).addTo(map);
//           lmarker._icon.classList.add("huechange");
//       }
// })


var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let locationButton = document.getElementById("btnGetLoc");
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          console.log(pos);
          map.setView([pos.lat, pos.lng], 15);
          // var lmarker=L.marker([pos.lat, pos.lng]).addTo(map);
          var lmarker=L.marker([pos.lat, pos.lng], {icon: redIcon}).addTo(map);
        },
        () => {
          console.log("handleLocationError");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      console.log("Browser doesn't support Geolocation");
    }
  });








// function onLocationFound(e) {
//   var radius = e.accuracy;

//   // L.marker(e.latlng).addTo(map)
     

//   L.circle(e.latlng, radius).addTo(map)
//   .bindPopup("You are within " + radius + " meters from this point").openPopup();
// }

// map.on('locationfound', onLocationFound);



// var lc = L.control
//   .locate({
//     position: "topright",
//     strings: {
//       title: "Show me where I am, yo!"
//     }
//   })
//   .addTo(map);


  
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
      // console.log(feature.properties.terr_id)
      var currZoom = map.getZoom();
      if(currZoom <= 16){
        // console.log(currZoom)
        layer.bindPopup( "<h4> Territory: " + feature.properties.terr_id + "</h4>"+"<strong> RepName: </strong>" + feature.properties.rep_name)
        // layer.bindPopup( "<h4> Territory: " + feature.properties.terr_id + "</h4>"+"<strong> Name: </strong>" + e.rep_name + "<br/>"+"<strong> Email: </strong>" + e.rep_email + "<br/>")
      }
      tlyr_arr.push(layer)
     
    }
  })
  map.addLayer(territories_lyr)
},2000);












function generateList() {
  var sortedbyid_terr_data=territories_data.features.sort(function(a, b){
    return a.properties.terr_id - b.properties.terr_id;
  });
  var str=''
  for(var i=0; i<sortedbyid_terr_data.length; i++ ){
    var terr_unique_id = "'"+sortedbyid_terr_data[i].properties.unique_id+"'";
    str=str+"<div class='territory-item'>";
     str=str+"<a href='#' onclick=\"flyTotritory("+terr_unique_id+")\" id='trr_'>"+sortedbyid_terr_data[i].properties.terr_id+":  "+sortedbyid_terr_data[i].properties.rep_name+"</a>";
     str=str+"<br><p style='text-align: center;  font-size: 11px;'>"+sortedbyid_terr_data[i].properties.rep_email+"</p>";
     str=str+"</div>"
  }
  $("#states_list").html(str)
}

setTimeout(function(){
  generateList();
},1700)

function sortbyId(){
  $("#states_list").empty();
  var sortedbyid_terr_data=territories_data.features.sort(function(a, b){
    return a.properties.terr_id - b.properties.terr_id;
  });
  // console.log(sortedbyid_terr_data)
  var str=''
  for(var i=0; i<sortedbyid_terr_data.length; i++ ){
    var terr_unique_id = "'"+sortedbyid_terr_data[i].properties.unique_id+"'";
    str=str+"<div class='territory-item'>";
     str=str+"<a href='#' onclick=\"flyTotritory("+terr_unique_id+")\" id='trr_'>"+sortedbyid_terr_data[i].properties.terr_id+":  "+sortedbyid_terr_data[i].properties.rep_name+"</a>";
     str=str+"<br><p style='text-align: center;  font-size: 11px;'>"+sortedbyid_terr_data[i].properties.rep_email+"</p>";
     str=str+"</div>"
  }
  $("#states_list").html(str)
}
function SortbyName(){
  $("#states_list").empty();
  var sortedbyid_terr_data=territories_data.features.sort(function(a, b){
    return a.properties.rep_name.localeCompare(b.properties.rep_name);
  });
  // console.log(sortedbyid_terr_data)
  var str=''
  for(var i=0; i<sortedbyid_terr_data.length; i++ ){
    var terr_unique_id = "'"+sortedbyid_terr_data[i].properties.unique_id+"'";
    str=str+"<div class='territory-item'>";
     str=str+"<a href='#' onclick=\"flyTotritory("+terr_unique_id+")\" id='trr_'>"+sortedbyid_terr_data[i].properties.terr_id+":  "+sortedbyid_terr_data[i].properties.rep_name+"</a>";
     str=str+"<br><p style='text-align: center;  font-size: 11px;'>"+sortedbyid_terr_data[i].properties.rep_email+"</p>";
     str=str+"</div>"
  }
  $("#states_list").html(str)
}

var tlyr_arr_fly_index
function flyTotritory(u_id) {
  console.log(u_id)
  for(var i=0; i<tlyr_arr.length; i++ ){
  
    if(tlyr_arr[i].feature.properties.unique_id==u_id){
      tlyr_arr_fly_index=i
      var latlng= tlyr_arr[i].getBounds().getCenter()
      map.flyTo(latlng, 11, {
          duration: 3
      });
     
      setTimeout(() => {
        L.popup({closeButton: true, offset: L.point(0, -8)})
        .setLatLng(latlng)
        .setContent("<h4> Territory: " + tlyr_arr[tlyr_arr_fly_index].feature.properties.terr_id+"<br><br>RepName: "+ tlyr_arr[tlyr_arr_fly_index].feature.properties.rep_name )
        // .setContent(makePopupContent(tritory))
        .openOn(map);
      }, 2000);
    }
  }
}



  







$('#legenddiv').css('visibility','hidden');
var furl='https://services3.arcgis.com/Ww6Zhg5FR2pLMf1C/arcgis/rest/services/VA_Electric_2016/FeatureServer/0';
 VA_electric_flyr=L.esri.featureLayer({
    url: furl,
    opacity: 1,
    style: (feature) => {
        let style = {
            fillColor: "black",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
        };
        if (feature.properties.Utility === "Appalachian Power Company") {
            return {
            fillColor: "#E08F94",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        // style.fillColor = "red";
      
        } 
        else if (feature.properties.Utility === "Kentucky Utilities/Old Dominion Power Company") {
            return {
            fillColor: "#70AE8F",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Dominion Virginia Power") {
            return {
            fillColor: "yellow",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "A&N Electric Cooperative") {
            return {
            fillColor: "#F6C39F",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "BARC Electric Cooperative") {
            return {
            fillColor: "green",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Craig Botetourt Electric Cooperative") {
            return {
            fillColor: "#92E660",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Community Electric Cooperative") {
            return {
            fillColor: "#B4D3B2",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Central Virginia Electric Cooperative") {
            return {
            fillColor: "#74DBEF",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Mecklenburg Electric Cooperative") {
            return {
            fillColor: "#F9DAD3",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Northern Neck Electric Cooperative") {
            return {
            fillColor: "#F9EED5",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Northern Virginia Electric Cooperative") {
            return {
            fillColor: "#C4B697",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Powell Valley Electric Cooperative") {
            return {
            fillColor: "#9C9D9A",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Prince George Electric Cooperative") {
            return {
            fillColor: "#6f03fc",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Rappahannock Electric Cooperative") {
            return {
            fillColor: "#C2E3E8",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Southside Electric Cooperative") {
            return {
            fillColor: "#EBE8E3",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 
        else if (feature.properties.Utility === "Shenandoah Valley Electric Cooperative") {
            return {
            fillColor: "blue",
            weight: 0.3,
            opacity: 1,
            color:"black",
            dashArray: '2',
            fillOpacity: 0.8
            };
        } 

        else {
        style.fillColor = "black";
        }

        return style;
    }
});
  


  VA_electric_flyr.bindPopup(function (layer) {
      console.log(layer);
      // return L.Util.template("<b>District</b><br>{district_n}</br>", layer.feature.properties);
      // return L.Util.template('<b>Utility: </b>{Utility}<br><b>Phone: </b>{Phone}</br><b>Website: </b><a href="https://{Website}/" target="_blank">{Website}</a></br><b>Provider: </b>{Provider}</br><b>Provider_1: </b>{Provider_1}</br>', layer.feature.properties);
      return L.Util.template('<b>Utility: </b>{Utility}<br><b>Phone: </b>{Phone}</br><b>Website: </b>{Website}</br><b>Provider: </b>{Provider}</br><b>Provider_1: </b>{Provider_1}</br>', layer.feature.properties);
  
  });





  map.on('overlayadd', function(e) {
    if(e.name=="VA Electric Territories"){
        // $('#legenddiv').show();
        setTimeout(function(){
        $('#legenddiv').css('visibility','visible');
        console.log('Changed to ' + e.name);
        }, 2000);  
    }
    if(e.name=="ROOFS SOLAR MAP"){
      // map.getPane("tilePane").style.zIndex = 800;
      map.addLayer(co2lyr)
      // map.setView([38.88714129486354, -77.07550227642061], 18);
      var cuurent_zoom=map.getZoom()
      if(cuurent_zoom<17){
        map.setView([38.84534810596939, -77.3061454296112], 17);
      }

      setTimeout(function(){
        if(map.hasLayer(territories_lyr)){ //the old DistrictLayer
          map.removeLayer(territories_lyr)
        }
      }, 500); 
      
    }
    
});
map.on('overlayremove', function(e) {
    if(e.name=="VA Electric Territories"){
        $('#legenddiv').css('visibility','hidden');
        console.log('Changed to ' + e.name);
    }
    if(e.name=="ROOFS SOLAR MAP"){
      map.removeLayer(co2lyr)
      // map.setView([38.57389610087847,-77.81616160646082], 9); 
    }
});






















 





















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


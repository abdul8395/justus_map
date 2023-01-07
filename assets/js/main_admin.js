
var map
var polygon = null;
var radiusCircle = null;
var currentlayer;
var territories_lyr=new L.LayerGroup()
var territories_data 
var mylayercontrol 
var new_created_lyr
var drawnPolygons = L.featureGroup();
var drawnLines = L.featureGroup();



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
  attributionControl: false,
  // fullscreenControl: true,
});

    // saad split
  drawnPolygons.addTo(map);
  drawnLines.addTo(map);



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
    





    var OWM_API_KEY = 'f6912b4e43460266a19b6d984d6b2610';

    var clouds = L.OWM.clouds({showLegend: false, opacity: 0.5, appId: OWM_API_KEY});
    var cloudscls = L.OWM.cloudsClassic({opacity: 0.5, appId: OWM_API_KEY});
    var precipitation = L.OWM.precipitation( {opacity: 0.5, appId: OWM_API_KEY} );
    var precipitationcls = L.OWM.precipitationClassic({opacity: 0.5, appId: OWM_API_KEY});
    var rain = L.OWM.rain({opacity: 0.5, appId: OWM_API_KEY});
    var raincls = L.OWM.rainClassic({opacity: 0.5, appId: OWM_API_KEY});
    var snow = L.OWM.snow({opacity: 0.5, appId: OWM_API_KEY});
    var pressure = L.OWM.pressure({opacity: 0.4, appId: OWM_API_KEY});
    var pressurecntr = L.OWM.pressureContour({opacity: 0.5, appId: OWM_API_KEY});
    var temp = L.OWM.temperature({opacity: 0.5, appId: OWM_API_KEY});
    var wind = L.OWM.wind({opacity: 0.5, appId: OWM_API_KEY});
  
  var overlayMaps = { "Clouds": clouds,"CloudHistory":cloudscls,"Precipitation":precipitation,"precipitationHistory":precipitationcls,"Rain":rain,"RainHistory":raincls,"Snow":snow,"Pressure":pressure,"Pressure Contours":pressurecntr,"Temprature":temp,"Wind":wind };
  
  


var baseLayers = {
"Google Street Map": googlestreet,
"Google Sattellite Map": googleSat,
"Open Street Map": openstreet,
"Dark Map": dark,
"Plain Map": plain
};





// L.DomEvent.on(document.getElementById('btnGetLoc'), 'click', function(){
//   // map.locate({setView: true, maxZoom: 16});
//   // $('.leaflet-control-locate-location-arrow')[0].click()
//   map.locate({setView: true, maxZoom: 15});
//   map.on('locationfound', onLocationFound);
//   function onLocationFound(e) {
//       console.log(e); 
//       // e.heading will contain the user's heading (in degrees) if it's available, and if not it will be NaN. This would allow you to point a marker in the same direction the user is pointed. 
//       var lmarker=L.marker(e.latlng).addTo(map);
//       lmarker._icon.classList.add("huechange");
//   }
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



var lc = L.control
  .locate({
    position: "topright",
    strings: {
      title: "Show me where I am, yo!"
    }
  })
  .addTo(map);


var measuredistance=L.control.polylineMeasure({showUnitControl: true,position:'topright'}).addTo(map);





  
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



var mycount=0

var tlyr_arr=[]
function maketerritories(){
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
      layer.on({
        click: terri_layerclick
      })
      tlyr_arr.push(layer)
      // console.log(feature.properties.terr_id)
     

      // drawnItems.addLayer(layer);
     
     
    }
  })
}
setTimeout(function(){
  maketerritories()
  map.addLayer(territories_lyr)
},2000)



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









  setTimeout(function(){
    
    var overLays = {
      "Territories Layer":territories_lyr,
      "Counties Map Overlay": uscountieslyr,
      // "Trees & Graphics": trees_layer,
      // "Clouds": clouds_layer
      };
       mylayercontrol= L.control.layers(baseLayers,overLays).addTo(map);
  },3000)

       











// setTimeout(() => {
//   territories_lyr.on('pm:edit', function (e) {
//     console.log("lyr edited");
//     console.log(e);
//   });
//   territories_lyr.on('pm:update', function (e) {
//     console.log("lyr upated");
//     console.log(e);
    // console.log(e.layer.feature);
    // console.log(JSON.stringify(e.layer.feature));

    // //Find index of specific object using findIndex method.    

    
    // // objIndex = territories_data.features.findIndex((obj => Number(obj.properties.terr_id)+1 == Number(e.layer.feature.properties.terr_id)));
    // for (const obj of territories_data.features) {
    //   if (obj.properties.terr_id === e.layer.feature.properties.terr_id) {
    //     obj.geometry = e.layer.feature.geometry;
    //     break;
    //   }
    // }
    // //Log object to Console.
    // // console.log("Before update: ", territories_data.features[objIndex])

    // //Update object's name property.
    // // territories_data.features[objIndex].geometry=''

    // //Log object to console again.
    // // console.log("After update: ", territories_data.features[objIndex])
    // console.log(territories_data);

    // setTimeout(function(){
    //   var dataString = JSON.stringify(territories_data);
    //   $.ajax({
    //           type: "POST",
    //           dataType: "json",
    //           url: "services/update_json_data.php",
    //           data: {myData:dataString},
    //           // contentType: "application/json; charset=utf-8",
    //           success: function(data){
    //               // alert('Items added');
    //           },
    //           error: function(e){
    //               console.log(e.message);
    //           }
    //   });
    //   alert("Data Edited & Saved Successfully")
    // },200)

    
//   });
// }, 1700);


function terri_layerclick(e) {
  console.log(mycount+1)
  var layer = e.target;
  // var poly_id=layer.defaultOptions.id
  var f_id=Number(layer.feature.properties.GEO_ID)
  // var name=layer.feature.properties.name
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
      var param = "'"+layer.feature.properties.GEO_ID+"'";
      var content='' 
      content=content + "<h4> Territory: " + f_id + "</h4>"+"<strong> Name: </strong>" + layer.feature.properties.rep_name + "<br/>"+"<strong> Email: </strong>" + layer.feature.properties.rep_email + "<br/><br/><input type='button' class='btn btn-success' style='margin-left:1%; display: inline;' id='editbtn' value='Edit Data' onclick='edit_terr_data("+f_id+")'/>&nbsp&nbsp<input type='button' class='btn btn-warning' style='display: inline;' id='editpolygonbtn' value='Split Polygon' onclick=\"split_terr_polygon_func("+param+")\" />"
      // "<br/><input type='button' class='btn btn-success' id='okBtn1' value='Edit Button' onclick='saveIdIW()'/>"
      // layer.bindPopup( "<h4> Territory: " + f_id + "</h4>"+"<strong> Name: </strong>" + e.rep_name + "<br/>"+"<strong> Email: </strong>" + e.rep_email + "<br/>").openPopup()
      idIW.setContent(content);
    }
    

    
    idIW.setLatLng(e.latlng);
    idIW.openOn(map);
}


var trr_indx=0
function edit_terr_data(geoid){
console.log(geoid)

trr_indx=territories_data.features.findIndex(x => Number(x.properties.GEO_ID) === geoid)

$("#mterr_id").val(territories_data.features[trr_indx].properties.terr_id)
$("#mRecName").val(territories_data.features[trr_indx].properties.rep_name)
$("#mRecEmail").val(territories_data.features[trr_indx].properties.rep_email)
$("#mColor").val(territories_data.features[trr_indx].properties.color)

$('#terr_edit_Modal').modal('show'); 
}


function saveterr_edited_data(){
  var terr_id=$("#mterr_id").val()
  var mRecName=$("#mRecName").val()
  var mRecEmail=$("#mRecEmail").val()
  var mColor=$("#mColor").val()

  // var terr_idx=territories_data.features.findIndex(x => x.properties.terr_id === terr_id)
  var props = territories_data.features[trr_indx].properties 
  // props.id = Number(terr_id);
  props.color = Number(mColor);
  props.rep_name = mRecName;
  props.rep_email = mRecEmail;
  props.terr_id = Number(terr_id);


  setTimeout(function(){
    var dataString = JSON.stringify(territories_data);
    $.ajax({
            type: "POST",
            dataType: "json",
            url: "services/update_json_data.php",
            data: {myData:dataString},
            // contentType: "application/json; charset=utf-8",
            success: function(data){
                // alert('Items added');
            },
            error: function(e){
                console.log(e.message);
            }
    });
    map.closePopup();
    map.removeLayer(territories_lyr)
    territories_lyr=new L.LayerGroup()
    maketerritories()
    map.addLayer(territories_lyr)
    $("#states_list").empty()
    generateList();
    alert("Polygon Data Edited Successfully")
    $('#terr_edit_Modal').modal('hide'); 
    map.removeControl(mylayercontrol);
    setTimeout(function(){
      var overLays = {
        "Territories Layer":territories_lyr,
        "Counties Map Overlay": uscountieslyr,
        };
        mylayercontrol = L.control.layers(baseLayers,overLays).addTo(map);
    },500)
},200)


}




function generateList() {
  const statesdiv = document.querySelector('#states_list');
  var str=''
  for(var i=0; i<territories_data.features.length; i++ ){
    str=str+'<div class="territory-item">';
     str=str+'<a href="#" onclick="flyTotritory('+territories_data.features[i].properties.terr_id+')" id="trr_'+territories_data.features[i].properties.terr_id+'">'+territories_data.features[i].properties.terr_id+":  "+territories_data.features[i].properties.rep_name+'</a>';
     str=str+'<br><p style="text-align: center;  font-size: 11px;">'+territories_data.features[i].properties.rep_email+'</p>';
     str=str+'</div>'
  }
  $("#states_list").html(str)
}

setTimeout(function(){
  generateList();
},1700)

var tlyr_arr_fly_index
function flyTotritory(tritory_id) {

  console.log(tritory_id)
  for(var i=0; i<tlyr_arr.length; i++ ){
  
    if(tlyr_arr[i].feature.properties.terr_id==tritory_id){
      tlyr_arr_fly_index=i
      var latlng= tlyr_arr[i].getBounds().getCenter()
      map.flyTo(latlng, 12, {
          duration: 3
      });
    
      setTimeout(() => {
        var content='' 
        content=content+"<h4> Territory: " + tlyr_arr[tlyr_arr_fly_index].feature.properties.terr_id + "</h4>"+"<strong> Name: </strong>" + tlyr_arr[tlyr_arr_fly_index].feature.properties.rep_name + "<br/>"+"<strong> Email: </strong>" + tlyr_arr[tlyr_arr_fly_index].feature.properties.rep_email + "<br/><br/><input type='button' class='btn btn-success' style='margin-left:25%' id='editbtn' value='Edit Data' onclick='edit_terr_data("+tritory_id+")'/>"
       
        L.popup({closeButton: true, offset: L.point(0, -8)})
        .setLatLng(latlng)
        .setContent(content)
        // .setContent(makePopupContent(tritory))
        .openOn(map);
      }, 2000);
    }
  }
}







// var drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);

// var drawControl = new L.Control.Draw({
//   draw: {
//     position: 'topright',
//     polygon: false,
//     // {
//     //   title: 'Draw a polygon!',
//     //   allowIntersection: false,
//     //   drawError: {
//     //     color: '#b00b00',
//     //     timeout: 1000
//     //   },
//     //   shapeOptions: {
//     //     color: 'red'
//     //   },
//     //   showArea: true
//     // },
//     // polyline: {
//     //   metric: false
//     // },
//     // circle: {
//     //   shapeOptions: {
//     //     color: '#662d91'
//     //   }
//     // }
//     polyline:true,
//     rectangle: false,
//     circle: {
//       title: 'click on mouse Draw a Circle on map and relase mouse to get results!',
//       shapeOptions: {
//         color: 'green'
//       },
//       metric:['km'],
//       showArea: true,
//       // kilometers:true,
//       // metres: false,
//       // feet: false,
//       // yards: false,
//       // miles: false,
//       // acres: false,

//     },
//     circlemarker: false,
//     marker: false

//   },
//   edit: {
//     featureGroup: drawnItems
//   }
// });

// map.on('draw:created', function (e) {
//   $("#div_output").empty();
//   document.getElementById("div_output").innerHTML = "Please Wait...";
//   var type = e.layerType,
//     layer = e.layer;
//     console.log(layer)

//     layer._latlng.lat
//     layer._latlng.lng
//     layer._mRadius

//     var radius_inkm= (layer._mRadius/1000).toFixed(2);
//     // var radius_inkm = radius.toFixed(2)
//     var miles = (radius_inkm / 1.609).toFixed(2);


//     $.ajax({
//       url: "https://ringpopulationsapi.azurewebsites.net/api/globalringpopulations?latitude="+layer._latlng.lat+"&longitude="+layer._latlng.lng+"&distance_km="+radius_inkm,
//       type: "GET",
//       dataType: "json",
//       // contentType: "application/json; charset=utf-8",
//       success: function(data){
//           console.log(data);

//           var content='' 
//         content=content+"<h4><strong> Population: </strong>" + data.people + "</h4>"+"<strong> Bus Stops: </strong>" + data.busStops + "<br/>"+"<strong> Rail Stops: </strong>" + data.railStops + "<br/>"+"<strong>Tram Stops: </strong>" + data.tramStops+ "<br/>"+"<b style='font-size: 11px;'>Radius in KM & Miles: " + radius_inkm+"km, "+miles+"mi</b>"
//         $("#div_output").html(content)
//       },
//       error: function(e){
//           console.log(e.message);
//       }
//     });


//   if (type === 'marker') {
//     radiusCircle = layer;
//     layer.bindPopup('A popup!');
//   }

//   if (type === 'polygon') {
//     polygon = layer;
// }

//   drawnItems.addLayer(layer);
// });

// map.addControl(drawControl);






var drawnItems = new L.FeatureGroup();


var drawControl =new L.Control.Draw({
  draw: {
    marker: false,
    circle: true,
    circlemarker: false,
    rectangle: false,
    polyline:true,
    circlemarker: false,
    marker: false,
    polygon: true
    // {
    //   allowIntersection: true,
    //   showArea: true
    // }
  }
});


map.addLayer(drawnItems);
map.addControl(drawControl);












var current_spliting_polygon_id


function split_terr_polygon_func(GEO_ID){

  current_spliting_polygon_id=GEO_ID
  map.closePopup();
  $('.leaflet-popup-pane .leaflet-draw-tooltip').show();
  drawnItems.clearLayers();
  $('.leaflet-draw-draw-polyline')[0].click()


  // var GEO_ID="'"+GEO_ID_in+"'";


   var drawnGeoJSON = L.geoJSON(territories_data, {
      filter: function (feature) {
          return feature.properties.GEO_ID === GEO_ID;
      }
  });
  console.log(drawnGeoJSON);
  drawnGeoJSON = drawnGeoJSON.toGeoJSON();
  console.log(drawnGeoJSON);
  var drawnGeometry = turf.getGeom(drawnGeoJSON);
  polygons = [];
  unkinked = turf.unkinkPolygon(drawnGeometry);
  turf.geomEach(unkinked, function (geometry) 
  {
    polygons.push(geometry);
  });
  drawnPolygons.clearLayers();
  drawnLines.clearLayers();
}



const cutIdPrefix = 'cut_';
var polygons = [];

function cutPolygonStyle(feature) {
  var id, color;
  
  id = feature.properties.id;
  if (typeof(id) !== 'undefined') {
    id = id.substring(0, (cutIdPrefix.length + 1))
  }

  if (id == cutIdPrefix + '1')
    color = 'green';
  else if (id == cutIdPrefix + '2')
    color = 'red';
  else {
    color = '#3388ff';
  }      
  return {color: color, opacity: 0.5, fillOpacity: 0.1};
}






map.on(L.Draw.Event.CREATED, function (event) {

  var getdrawnlayerType = event.layerType
   

  if (getdrawnlayerType == 'circle') 
  {
    console.log("circle created")

    $("#div_output").empty();
    document.getElementById("div_output").innerHTML = "Please Wait...";
    var type = event.layerType,
      layer = event.layer;
      console.log(layer)
  
      layer._latlng.lat
      layer._latlng.lng
      layer._mRadius
  
      var radius_inkm= (layer._mRadius/1000).toFixed(2);
      // var radius_inkm = radius.toFixed(2)
      var miles = (radius_inkm / 1.609).toFixed(2);
  
  
      $.ajax({
        url: "https://ringpopulationsapi.azurewebsites.net/api/globalringpopulations?latitude="+layer._latlng.lat+"&longitude="+layer._latlng.lng+"&distance_km="+radius_inkm,
        type: "GET",
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log(data);
  
            var content='' 
          content=content+"<h4><strong> Population: </strong>" + data.people + "</h4>"+"<strong> Bus Stops: </strong>" + data.busStops + "<br/>"+"<strong> Rail Stops: </strong>" + data.railStops + "<br/>"+"<strong>Tram Stops: </strong>" + data.tramStops+ "<br/>"+"<b style='font-size: 11px;'>Radius in KM & Miles: " + radius_inkm+"km, "+miles+"mi</b>"
          $("#div_output").html(content)
        },
        error: function(e){
            console.log(e.message);
        }
      });

      drawnItems.addLayer(layer);
  }

  
  if (getdrawnlayerType == 'polygon') 
  {
   
    var layer = event.layer;
     new_created_lyr=''
     new_created_lyr=layer.toGeoJSON()
     // console.log(e)
     
     // feature = layer.feature = layer.feature || {}; // Intialize layer.feature
     // feature.type = feature.type || "Feature"; // Intialize feature.type
     // var props = feature.properties = feature.properties || {}; // Intialize feature.properties
     // props.title = "my title";
     // props.content = "my content";

     var popnxtid=territories_data.features.length+1
     var idIW  = L.popup();
     var content = '<form><b>Territory ID:</b><br/><input id="popid" placeholder="Enter ID" value="'+popnxtid+'" type="text"/><br><b>Color:</b><br/><input id="pcolor" placeholder="Enter ColorID" type="text"/><br><b>Name:</b><br/><input id="pName" placeholder="Enter Name" type="text"/><br><b>Email:</b><br/><input id="pEmail" placeholder="Enter Email" type="text"/><br/><br/><input type="button" class="btn btn-success" style="margin-left:25%" id="okBtn" value="Save Territory" onclick="saveIdIW()"/></form>';
     idIW.setContent(content);
     idIW.setLatLng(layer.getBounds().getCenter());
     idIW.openOn(map);
     drawnItems.addLayer(layer);

    // console.log("Polygon created")
    // polygons = [];
    // unkinked = turf.unkinkPolygon(drawnGeometry);
    // turf.geomEach(unkinked, function (geometry) 
    // {
    //   polygons.push(geometry);
    // });
    // drawnPolygons.clearLayers();
    // drawnLines.clearLayers();
    // drawnPolygons.addLayer(drawnLayer);
  }
  if (getdrawnlayerType == 'polyline') 
  {

    var drawnLayer, drawnGeoJSON, drawnGeometry, unkinked;
    var newPolygons = [];
    debugger;
    drawnLayer = event.layer;
    drawnGeoJSON = drawnLayer.toGeoJSON();
    drawnGeometry = turf.getGeom(drawnGeoJSON);

    console.log("Line created")
    drawnLines.addLayer(drawnLayer);
    drawnPolygons.clearLayers();
    polygons.forEach(function (polygon, index) {
      var cutPolygon = polygonCut(polygon, drawnGeometry, cutIdPrefix);
      if (cutPolygon != null) {


        L.geoJSON(cutPolygon, {
          style: cutPolygonStyle,
          // onEachFeature: function( feature, layer ){
          //   layer.on({
          //     click: splited_layerclick
          //   })
          // }
        }).addTo(drawnPolygons);   
        turf.geomEach(cutPolygon, function (geometry) {
          newPolygons.push(geometry);
        });


        
        var fid=Number(current_spliting_polygon_id)
        // // var arr=territories_data.features
        // // removeById(arr, fid);
        var findx=territories_data.features.findIndex(x => x.properties.terr_id === fid)
       

        var splitedpoly1=cutPolygon.features[0]
        var splitedpoly2=cutPolygon.features[1]

        var old_terr_props=territories_data.features[findx].properties

        territories_data.features.splice(findx, 1);
        var oldgeoid= old_terr_props.terr_id 
        var poly1props = splitedpoly1.properties = splitedpoly1.properties || {}; // Intialize feature.properties
        poly1props.GEO_ID   = oldgeoid.toString();
        poly1props.color    = old_terr_props.color
        poly1props.rep_name = old_terr_props.rep_name 
        poly1props.rep_email= old_terr_props.rep_email 
        poly1props.terr_id  = old_terr_props.terr_id


        var poly2props = splitedpoly2.properties = splitedpoly2.properties || {}; // Intialize feature.properties
        var p2geoid=territories_data.features.length+2
        poly2props.GEO_ID   = p2geoid.toString();
        poly2props.color    = old_terr_props.color
        poly2props.rep_name = old_terr_props.rep_name 
        poly2props.rep_email= old_terr_props.rep_email 
        poly2props.terr_id  = territories_data.features.length+2

       
        // console.log(new_created_lyr)
      
       territories_data.features.push(splitedpoly1);
       territories_data.features.push(splitedpoly2);
      
        setTimeout(function(){
          var dataString = JSON.stringify(territories_data);
          $.ajax({
                  type: "POST",
                  dataType: "json",
                  url: "services/update_json_data.php",
                  data: {myData:dataString},
                  // contentType: "application/json; charset=utf-8",
                  success: function(data){
                      // alert('Items added');
                  },
                  error: function(e){
                      console.log(e.message);
                  }
          });
          // map.closePopup();
          map.removeLayer(territories_lyr)
          territories_lyr=new L.LayerGroup()
          drawnItems.clearLayers();
          maketerritories()
          map.addLayer(territories_lyr)
          // $("#states_list").empty()
          // generateList();
          alert("Polygon Splited Successfully")
          fly_aftr_split(fid)
          // map.removeControl(mylayercontrol);
          // setTimeout(function(){
          //   var overLays = {
          //     "Territories Layer":territories_lyr,
          //     "Counties Map Overlay": uscountieslyr,
          //     };
          //     mylayercontrol = L.control.layers(baseLayers,overLays).addTo(map);
          // },500)
        },200)


       
      }
      else {
        L.geoJSON(polygon).addTo(drawnPolygons);   
        newPolygons.push(polygon);
      }
    });
    polygons = newPolygons;
    // console.log(polygons);
    // new_created_lyr=''
    // new_created_lyr=polygons

    drawnLines.clearLayers();
    
  }
  console.log(polygons);
});


// const removeById = (arr, id) => {
//   const requiredIndex = arr.findIndex(el => {
//      return el.id === String(id);
//   });
//   if(requiredIndex === -1){
//      return false;
//   };
//   return !!arr.splice(requiredIndex, 1);
// };




function fly_aftr_split(tritory_id) {
  console.log(tritory_id)
  for(var i=0; i<tlyr_arr.length; i++ ){
    if(tlyr_arr[i].feature.properties.terr_id==tritory_id){
      tlyr_arr_fly_index=i
      var latlng= tlyr_arr[i].getBounds().getCenter()
      map.flyTo(latlng, 12, {
          duration: 0
      });
    }
  }
}



function polygonCut(polygon, line, idPrefix) {
  const THICK_LINE_UNITS = 'kilometers';
  const THICK_LINE_WIDTH = 0.001;
  var i, j, id, intersectPoints, lineCoords, forCut, forSelect;
  var thickLineString, thickLinePolygon, clipped, polyg, intersect;
  var polyCoords = [];
  var cutPolyGeoms = [];
  var cutFeatures = [];
  var offsetLine = [];
  var retVal = null;
  
  if (((polygon.type != 'Polygon') && (polygon.type != 'MultiPolygon')) || (line.type != 'LineString')) {
    return retVal;
  }
  
  if (typeof(idPrefix) === 'undefined') {
    idPrefix = '';
  }
  
  intersectPoints = turf.lineIntersect(polygon, line);
  if (intersectPoints.features.length == 0) {
    return retVal;
  }
    
  var lineCoords = turf.getCoords(line);
  if ((turf.booleanWithin(turf.point(lineCoords[0]), polygon) ||
      (turf.booleanWithin(turf.point(lineCoords[lineCoords.length - 1]), polygon)))) {
    return retVal;
  }

  offsetLine[0] = turf.lineOffset(line, THICK_LINE_WIDTH, {units: THICK_LINE_UNITS});
  offsetLine[1] = turf.lineOffset(line, -THICK_LINE_WIDTH, {units: THICK_LINE_UNITS});

  for (i = 0; i <= 1; i++) {
    forCut = i; 
    forSelect = (i + 1) % 2; 
    polyCoords = [];
    for (j = 0; j < line.coordinates.length; j++) {
      polyCoords.push(line.coordinates[j]);
    }
     for (j = (offsetLine[forCut].geometry.coordinates.length - 1); j >= 0; j--) {
      polyCoords.push(offsetLine[forCut].geometry.coordinates[j]);
    }
    polyCoords.push(line.coordinates[0]);
    
    thickLineString = turf.lineString(polyCoords);
    thickLinePolygon = turf.lineToPolygon(thickLineString);
    clipped = turf.difference(polygon, thickLinePolygon);
   
    cutPolyGeoms = [];
    for (j = 0; j < clipped.geometry.coordinates.length; j++) {
      polyg = turf.polygon(clipped.geometry.coordinates[j]);
      intersect = turf.lineIntersect(polyg, offsetLine[forSelect]);
      if (intersect.features.length > 0) {
        cutPolyGeoms.push(polyg.geometry.coordinates);
      }
    }
    
    cutPolyGeoms.forEach(function (geometry, index) {
      id = idPrefix + (i + 1) + '.' +  (index + 1);
      cutFeatures.push(turf.polygon(geometry, {id: id}));
    });
  }
  
  if (cutFeatures.length > 0) retVal = turf.featureCollection(cutFeatures);
  
  return retVal;
}





function saveIdIW(){
  var popid=$("#popid").val();
  var pcolor=$("#pcolor").val();
  var pname=$("#pName").val();
  var pEmail=$("#pEmail").val();
  
  // console.log(popid+","+pname+","+pEmail)
  // console.log(new_created_lyr)
  var popnxtid=territories_data.features.length+1
  var props = new_created_lyr.properties = new_created_lyr.properties || {}; // Intialize feature.properties
  props.GEO_ID = popnxtid.toString();
  props.color = Number(pcolor);
  props.rep_name = pname;
  props.rep_email = pEmail;
  props.terr_id = Number(popid);
  // console.log(new_created_lyr)

 territories_data.features.push(new_created_lyr);

  setTimeout(function(){
    var dataString = JSON.stringify(territories_data);
    $.ajax({
            type: "POST",
            dataType: "json",
            url: "services/update_json_data.php",
            data: {myData:dataString},
            // contentType: "application/json; charset=utf-8",
            success: function(data){
                // alert('Items added');
            },
            error: function(e){
                console.log(e.message);
            }
    });


    map.closePopup();
    map.removeLayer(territories_lyr)
    territories_lyr=new L.LayerGroup()
    drawnItems.clearLayers();
    maketerritories()
    map.addLayer(territories_lyr)
    $("#states_list").empty()
    generateList();
    alert("New Territory Added Successfully")
    map.removeControl(mylayercontrol);
    setTimeout(function(){
      var overLays = {
        "Territories Layer":territories_lyr,
        "Counties Map Overlay": uscountieslyr,
        };
        mylayercontrol = L.control.layers(baseLayers,overLays).addTo(map);
    },500)
  },200)
}

















// function splited_layerclick(e){
// console.log(e)
// var layer = e.target;
// // var lyrid= JSON.parse(layer.feature.properties.id)
// var lyrid
// var lid= layer.feature.properties.id.replace(/^["'](.+(?=["']$))["']$/, '$1');
// if(lid="cut_1.1"){
//   lyrid=1
// }else{
//   lyrid=2
// }

//   var idIW  = L.popup();
//   var content = '<form><b>Territory ID:</b><br/><input id="popid" placeholder="Enter ID" type="text"/><br><b>Color:</b><br/><input id="pcolor" placeholder="Enter ColorID" type="text"/><br><b>Name:</b><br/><input id="pName" placeholder="Enter Name" type="text"/><br><b>Email:</b><br/><input id="pEmail" placeholder="Enter Email" type="text"/><br/><br/><input type="button" class="btn btn-success" style="margin-left:25%" id="okBtn" value="Save Splited Territory" onclick="save_splited_IdIW('+lyrid+')"/></form>';
//   idIW.setContent(content);
//   idIW.setLatLng(layer.getBounds().getCenter());
//   idIW.addTo(map)
// }

// function save_splited_IdIW(sp_id){
//   console.log(sp_id)
// console.log(new_created_lyr)
// var new_splited_lyr
// if(sp_id==1){
//   new_splited_lyr=new_created_lyr[0]
// }else{
//   new_splited_lyr=new_created_lyr[0]
// }

//   var popid=$("#popid").val();
//   var pcolor=$("#pcolor").val();
//   var pname=$("#pName").val();
//   var pEmail=$("#pEmail").val();
  
//   // console.log(popid+","+pname+","+pEmail)
//   // console.log(new_splited_lyr)
//   var props = new_splited_lyr.properties = new_splited_lyr.properties || {}; // Intialize feature.properties
//   props.id = popid;
//   props.color = pcolor;
//   props.rep_name = pname;
//   props.rep_email = pEmail;
//   props.terr_id = popid;
//   // console.log(new_splited_lyr)

//  territories_data.features.push(new_splited_lyr);

//   setTimeout(function(){
//     var dataString = JSON.stringify(territories_data);
//     $.ajax({
//             type: "POST",
//             dataType: "json",
//             url: "services/update_json_data.php",
//             data: {myData:dataString},
//             // contentType: "application/json; charset=utf-8",
//             success: function(data){
//                 // alert('Items added');
//             },
//             error: function(e){
//                 console.log(e.message);
//             }
//     });
//     map.closePopup();
//     // map.removeLayer(territories_lyr)
//     // territories_lyr=new L.LayerGroup()
//     // drawnItems.clearLayers();
//     // maketerritories()
//     // map.addLayer(territories_lyr)
//     // $("#states_list").empty()
//     // generateList();
//     alert("New Polygon Added Successfully")
//     // map.removeControl(mylayercontrol);
//     // setTimeout(function(){
//     //   var overLays = {
//     //     "Territories Layer":territories_lyr,
//     //     "Counties Map Overlay": uscountieslyr,
//     //     };
//     //     mylayercontrol = L.control.layers(baseLayers,overLays).addTo(map);
//     // },500)
//   },200)
 
// }








$("#popdrawcircle").click(function(){
  $('.leaflet-popup-pane .leaflet-draw-tooltip').show();
drawnItems.clearLayers();
$('.leaflet-draw-draw-circle')[0].click()
});


$("#add_polygon").click(function(){
  $('.leaflet-popup-pane .leaflet-draw-tooltip').show();
  drawnItems.clearLayers();
  $('.leaflet-draw-draw-polygon')[0].click()
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


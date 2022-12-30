
var map
var polygon = null;
var radiusCircle = null;
var currentlayer;
var territories_lyr=new L.LayerGroup()
var territories_data 
var mylayercontrol 
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








  
  var options = {
    position: 'topright', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: false,  // adds button to draw markers
    drawPolygon: true,  // adds button to draw a polygon
    drawPolyline: false,  // adds button to draw a polyline
    drawCircle: false,  // adds button to draw a cricle
    editPolygon: true,  // adds button to toggle global edit mode
    deleteLayer: false,   // adds a button to delete layers
    drawText: false,   // adds a button to delete layers        
    cutPolygon: true,   // adds a button to delete layers        
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
  // console.log(e)
});

// listen to when drawing mode gets disabled
map.on('pm:drawend', function(e) {
  // console.log(e)
});


// listen to when a new layer is created
var new_created_lyr
map.on('pm:create', function(e) {
 var layer = e.layer
  new_created_lyr=''
  new_created_lyr=layer.toGeoJSON()
  // console.log(e)
  
  // feature = layer.feature = layer.feature || {}; // Intialize layer.feature
  // feature.type = feature.type || "Feature"; // Intialize feature.type
  // var props = feature.properties = feature.properties || {}; // Intialize feature.properties
  // props.title = "my title";
  // props.content = "my content";
  var idIW  = L.popup();
  var content = '<form><b>Territory ID:</b><br/><input id="popid" placeholder="Enter ID" type="text"/><br><b>Color:</b><br/><input id="pcolor" placeholder="Enter ColorID" type="text"/><br><b>Name:</b><br/><input id="pName" placeholder="Enter Name" type="text"/><br><b>Email:</b><br/><input id="pEmail" placeholder="Enter Email" type="text"/><br/><br/><input type="button" class="btn btn-success" style="margin-left:25%" id="okBtn" value="Save" onclick="saveIdIW()"/></form>';
  idIW.setContent(content);
  idIW.setLatLng(e.layer.getBounds().getCenter());
  idIW.openOn(map);
  // drawnItems.addLayer(layer);

  // listen to changes on the new layer
  e.layer.on('pm:edit', function(x) {
  // console.log('edit', x)
  });
});


function saveIdIW(){
  var popid=$("#popid").val();
  var pcolor=$("#pcolor").val();
  var pname=$("#pName").val();
  var pEmail=$("#pEmail").val();
  
  // console.log(popid+","+pname+","+pEmail)
  // console.log(new_created_lyr)
  var props = new_created_lyr.properties = new_created_lyr.properties || {}; // Intialize feature.properties
  props.id = popid;
  props.color = pcolor;
  props.rep_name = pname;
  props.rep_email = pEmail;
  props.terr_id = popid;
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
    alert("New Polygon Added Successfully")
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






map.pm.setGlobalOptions({
  limitMarkersToCount: 20
})


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
      // console.log(feature.properties.id)
     

      // drawnItems.addLayer(layer);
      // map.pm.addLayer(layer);
     
    }
  })
}
setTimeout(function(){
  maketerritories()
  map.addLayer(territories_lyr)
},1200)



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
      // console.log(feature.properties.id)
 
     
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
  },2000)

       











setTimeout(() => {
  territories_lyr.on('pm:edit', function (e) {
    console.log("lyr edited");
    console.log(e);
  });
  territories_lyr.on('pm:update', function (e) {
    console.log("lyr upated");
    console.log(e);
    // console.log(e.layer.feature);
    // console.log(JSON.stringify(e.layer.feature));

    // //Find index of specific object using findIndex method.    

    
    // // objIndex = territories_data.features.findIndex((obj => Number(obj.properties.id)+1 == Number(e.layer.feature.properties.id)));
    // for (const obj of territories_data.features) {
    //   if (obj.properties.id === e.layer.feature.properties.id) {
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

    
  });
}, 1700);


function terri_layerclick(e) {
  console.log(mycount+1)
  var layer = e.target;
  // var poly_id=layer.defaultOptions.id
  var f_id=layer.feature.properties.id
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
      var content='' 
      content=content + "<h4> Territory: " + f_id + "</h4>"+"<strong> Name: </strong>" + layer.feature.properties.rep_name + "<br/>"+"<strong> Email: </strong>" + layer.feature.properties.rep_email + "<br/><br/><input type='button' class='btn btn-success' style='margin-left:25%' id='editbtn' value='Edit Data' onclick='edit_terr_data("+f_id+")'/>"
      // "<br/><input type='button' class='btn btn-success' id='okBtn1' value='Edit Button' onclick='saveIdIW()'/>"
      // layer.bindPopup( "<h4> Territory: " + f_id + "</h4>"+"<strong> Name: </strong>" + e.rep_name + "<br/>"+"<strong> Email: </strong>" + e.rep_email + "<br/>").openPopup()
      idIW.setContent(content);
    }
    

    
    idIW.setLatLng(e.latlng);
    idIW.openOn(map);
}


var trr_indx=0
function edit_terr_data(terr_id){
console.log(terr_id)

trr_indx=territories_data.features.findIndex(x => x.properties.terr_id === terr_id)

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
  props.id = Number(terr_id);
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
    alert("New Polygon Edited Successfully")
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
},800)

var tlyr_arr_fly_index
function flyTotritory(tritory_id) {

  console.log(tritory_id)
  for(var i=0; i<tlyr_arr.length; i++ ){
  
    if(tlyr_arr[i].feature.properties.id==tritory_id){
      tlyr_arr_fly_index=i
      var latlng= tlyr_arr[i].getBounds().getCenter()
      map.flyTo(latlng, 12, {
          duration: 3
      });
      // map.fitBounds(territories_lyr.pm._layers[i].getBounds(), {padding: [50, 50]});
      setTimeout(() => {
        var content='' 
        content=content+"<h4> Territory: " + tlyr_arr[tlyr_arr_fly_index].feature.properties.id + "</h4>"+"<strong> Name: </strong>" + tlyr_arr[tlyr_arr_fly_index].feature.properties.rep_name + "<br/>"+"<strong> Email: </strong>" + tlyr_arr[tlyr_arr_fly_index].feature.properties.rep_email + "<br/><br/><input type='button' class='btn btn-success' style='margin-left:25%' id='editbtn' value='Edit Data' onclick='edit_terr_data("+tritory_id+")'/>"
       
        L.popup({closeButton: true, offset: L.point(0, -8)})
        .setLatLng(latlng)
        .setContent(content)
        // .setContent(makePopupContent(tritory))
        .openOn(map);
      }, 2000);
    }
  }
}











var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  draw: {
    position: 'bottomleft',
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
    // polyline: {
    //   metric: false
    // },
    // circle: {
    //   shapeOptions: {
    //     color: '#662d91'
    //   }
    // }
    polyline:false,
    rectangle: false,
    circle: {
      title: 'click on mouse Draw a Circle on map and relase mouse to get results!',
      shapeOptions: {
        color: 'green'
      },
      metric:['km'],
      showArea: true,
      // kilometers:true,
      // metres: false,
      // feet: false,
      // yards: false,
      // miles: false,
      // acres: false,

    },
    circlemarker: false,
    marker: false

  },
  edit: {
    featureGroup: drawnItems
  }
});

map.on('draw:created', function (e) {
  $("#div_output").empty();
  document.getElementById("div_output").innerHTML = "Please Wait...";
  var type = e.layerType,
    layer = e.layer;
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


  if (type === 'marker') {
    radiusCircle = layer;
    layer.bindPopup('A popup!');
  }

  if (type === 'polygon') {
    polygon = layer;
}

  drawnItems.addLayer(layer);
});

map.addControl(drawControl);




$("#popdrawcircle").click(function(){
  $('.leaflet-popup-pane .leaflet-draw-tooltip').show();
drawnItems.clearLayers();
$('.leaflet-draw-draw-circle')[0].click()
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


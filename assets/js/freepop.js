var map;
var points = [];
var clickmode = 2;
var currentlayer;
var drawnItems;
var lineColor = "#FF0000";
var circleColor = "#FF0000";
var circleFillColor = "#F0000FF";
var circleFillOpacity = 0.35;
var circleWeight = 1;
var polygon = null;
var radiusCircle = null;
ftn_radius_change("km");
var autocomplete2;
function GUnload() {}
function Gload() {
    document.getElementById(mapDivID).style.cursor = "crosshair";
    map = L.map(mapDivID, {
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 'topleft'
        }
    }).setView(latlng, zoom);
    var openstreetmap = L.tileLayer('https://{s}.' + tileProviderURL + '/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: tileProviderAttribution
    });
    var ESRIImg = L.esri.basemapLayer('Imagery');
    var ESRIImbLab = L.esri.basemapLayer('ImageryLabels');
    var baseLayers = {
        "OSM": openstreetmap,
        "Satellite": ESRIImg
    };
    var overlays = {
        "Labels": ESRIImbLab,
    };
    openstreetmap.addTo(map);
    L.control.layers(baseLayers, overlays).addTo(map);
    L.control.locate().addTo(map);
    document.getElementById("div_output").value = "";
    $.getScript("script/v3/global-fullscreen.js", function(data, textStatus, jqxhr) {});
    var autocomplete = new kt.OsmNamesAutocomplete('tb_searchlocation','https://geocoder.tilehosting.com/','C7i0kEFQS2ggqr5zC2nv');
    autocomplete.registerCallback(function(item) {
        var latlng = L.latLng(item.lat, item.lon);
        map.panTo(latlng);
        map.setZoom(15);
        let mev = {
            latlng: latlng
        };
        console.log(mev);
        console.log(mev.latlng);
        ftn_mapclick(mev);
    });
    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: {
            polyline: false,
            marker: false,
            circlemarker: false,
            rectangle: false,
            polygon: true,
            circle: true
        },
    });
    map.addControl(drawControl);
    var optionColorSelected = '#000'
    map.on(L.Draw.Event.CREATED, function(event) {
        var type = event.layerType;
        event.layer.options.color = optionColorSelected;
        var layer = event.layer;
        drawnItems.clearLayers();
        drawnItems.addLayer(layer);
        currentlayer = layer;
        if (type === 'circle') {
            clickmode = 2;
            radiusCircle = layer;
            document.getElementById("radiusinputkm").value = (currentlayer.getRadius() / 1000).toFixed(2);
            document.getElementById("radiusinputmi").value = ((currentlayer.getRadius() / 1000) * 0.621371192).toFixed(2);
        }
        if (type === 'polygon') {
            clickmode = 1;
            polygon = layer;
        }
    });
}
function ftn_findPopulation() {
    if (clickmode == 0) {
        document.getElementById("div_output").innerHTML = "Choose a polygon or radius first";
        document.getElementById("div_output").innerHTML = "Draw a radius first";
    }
    if (clickmode == 1) {
        document.getElementById("div_output").innerHTML = "Please Wait...";
        ftn_findpoppoly(polygon);
    }
    if (clickmode == 2) {
        document.getElementById("div_output").innerHTML = "Please Wait...";
        ftn_findpop(currentlayer.getLatLng().lat, currentlayer.getLatLng().lng, currentlayer.getRadius());
    }
}
function ftn_zoomtofit() {
    if (polygon) {
        var points = polygon.getLatLngs();
        var thisArrPoints = points[0];
        if (thisArrPoints.length > 0) {
            var latlngbounds = new L.latLngBounds();
            for (i in thisArrPoints) {
                latlngbounds.extend(points[i]);
            }
            map.fitBounds(latlngbounds);
        }
    }
    if (radiusCircle) {
        map.fitBounds(radiusCircle.getBounds());
    }
}
function radiusCircledrag() {
    document.getElementById("radiusinputkm").value = (radiusCircle.getRadius() / 1000).toFixed(2);
    document.getElementById("radiusinputmi").value = ((radiusCircle.getRadius() / 1000) * 0.621371192).toFixed(2);
}
function ftn_clearmap() {
    console.log("Clear Map");
    drawnItems.clearLayers();
}
function ftnResetMap() {
    console.log("Reset Map");
    radiusCircle = null;
    ftn_clearmap();
    document.getElementById("div_output").innerHTML = " ";
}
function ftn_radius_change(unitschanged) {
    var km;
    if (unitschanged == "km") {
        km = document.getElementById("radiusinputkm").value;
    }
    if (unitschanged == "miles") {
        km = document.getElementById("radiusinputmi").value / 0.621371192;
        document.getElementById("radiusinputkm").value = km;
    }
    document.getElementById("radiusinputmi").value = round_decimals(parseFloat(km) * 0.621371192, 2);
}
function round_decimals(original_number, decimals) {
    var result1 = original_number * Math.pow(10, decimals);
    var result2 = Math.round(result1);
    var result3 = result2 / Math.pow(10, decimals);
    return pad_with_zeros(result3, decimals);
}
function ftn_findpop(lat, lng, radius) {
    lat = lat.toFixed(6);
    lng = lng.toFixed(6);
    radius = radius / 1000;
    $.ajax({
        url: 'ajax/ww-data/find-population-inside-radius/',
        type: "GET",
        crossDomain: true,
        data: {
            lat: lat,
            lng: lng,
            radius: radius,
            key: 'JGgS6LSbJresHRfgA8',
            user: 'fmt-2983'
        },
        success: function(result) {
            if (result) {
                displayResults(result.population, radius);
            } else {
                document.getElementById("div_output").innerHTML = "Error. No Results.";
            }
        },
        error: function(x, y, z) {
            console.log(y);
        }
    });
}
function ftn_findpoppoly(polygon) {
    var coordinates = '';
    var points = polygon.getLatLngs();
    var thisArrPoints = points[0];
    if (thisArrPoints.length > 0) {
        for (i in thisArrPoints) {
            coordinates += round_decimals(thisArrPoints[i].lng, 5) + "," + round_decimals(thisArrPoints[i].lat, 5) + ",0 ";
        }
        coordinates += round_decimals(thisArrPoints[0].lng, 5) + "," + round_decimals(thisArrPoints[0].lat, 5) + ",0";
    }
    $.ajax({
        url: 'ajax/ww-data/find-population-inside-polygon/',
        type: "GET",
        crossDomain: true,
        data: {
            coordinates: coordinates,
            key: 'JGgS6LSbJresHRfgA8',
            user: 'fmt-2983'
        },
        success: function(result) {
            if (result) {
                displayResultsPoly(result.population);
            } else {
                document.getElementById("div_output").innerHTML = "Error. No Results.";
            }
        },
        error: function(x, y, z) {
            console.log(y);
        }
    });
}
function displayResults(result, radius) {
    result = numberWithCommas(result);
    if ((result == 0) && (radius < 1)) {
        document.getElementById("div_output").innerHTML = "The estimated population in the radius is " + result + ". Perhaps you need a larger radius.";
    } else {
        var words = capitalizeFirstLetter(numberToEnglish(result));
        document.getElementById("div_output").innerHTML = "The estimated population in the radius is " + result + "<br />" + words;
    }
}
function displayResultsPoly(result) {
    result = numberWithCommas(result);
    var words = capitalizeFirstLetter(numberToEnglish(result));
    document.getElementById("div_output").innerHTML = "The estimated population in the area is " + result + "<br />" + words;
}

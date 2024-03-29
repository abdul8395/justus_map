<?php
session_start();
$loc = 'http://' . $_SERVER['HTTP_HOST'];
if (isset($_SESSION['VA_ADMIN'])) {

} else {
    header("Location:" . $loc . "/admin.php");
}
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">


    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#000000">



    <title>ADMIN_MAP</title>
    <link rel="icon" type="image/x-icon" href="assets/img/logo.png">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
          <!-- jQuery library -->
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">


    
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" crossorigin=""></script>
  

    <link rel="stylesheet" href="assets/css/app.css">

    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css" integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=" crossorigin="anonymous"> -->
    <link rel="stylesheet" 
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    





    

  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <div class="navbar-icon-container">
            <a href="#" class="navbar-icon pull-right visible-xs" id="nav-btn"><i class="fa fa-bars fa-lg white"></i></a>
            <a href="#" class="navbar-icon pull-right visible-xs" id="sidebar-toggle-btn"><i class="fa fa-search fa-lg white"></i></a>
          </div>
          <!-- <a class="navbar-brand" href="#">HMIS (Affordable Housing Marketing Information System)</a> -->
        </div>
        <div class="navbar-collapse collapse">
          <form class="navbar-form navbar-right" role="search">
            <div style="margin-top: 1%;  display: inline-block;">  <button type="button" class="btn btn-success" onclick="goto_url()">Public Page</button>
            </div>
            <div style="margin-top: 1%;  display: inline-block;">  <button type="button" class="btn btn-warning" onclick="goto_url()">Logout</button>
            </div>
           
            <div class="form-group has-feedback">

                <!-- <span id="searchicon" class="fa fa-search form-control-feedback"></span> -->
            </div>
          </form>
          <ul class="nav navbar-nav">
           <!-- <li class="hidden-xs" ><img src="assets/img/logo.png" width="150"  height="47" alt=""
            class="d-inline-block align-middle mr-2"></li><li class="hidden-xs" ><a class="" href="#">AFI</a></li>
           <li class="hidden-xs"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="list-btn"><i class="fa fa-list white"></i>&nbsp;&nbsp;TOC</a></li>
            -->
            <li class="hidden-xs" style="padding-left:0px;">
              <img src="assets/img/sunrun_logo.png" style="padding-left:0px;" width="150"  height="47" alt="" class="d-inline-block align-middle">
              <!-- <a class="navbar-brand" href="#">VA_Territory_Map  </a>   -->
            </li>
            <li class="hidden-xs" ><a  href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="list-btn"><i class="fa fa-list white"></i>&nbsp;&nbsp;TOC</a></li>
            
            <!-- <li class="hidden-xs"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="list-btn"><i class="fa fa-list white"></i>&nbsp;&nbsp;TOC</a></li>
            <li class="hidden-xs" style="margin-left: 450px;"><a class="navbar-brand" href="#">Sunrun Solar Admin,    VA_Territory_Map  </a></li> -->
           

            
            <!-- <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="about-btn"><i class="fa fa-question-circle white"></i>&nbsp;&nbsp;About</a></li>
           <li class="dropdown">
             <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-globe white"></i>&nbsp;&nbsp;Draw Tool <b class="caret"></b></a>
             <ul class="dropdown-menu">
               <li><a  data-toggle="collapse" onclick="drawNewPoint()">&nbsp;&nbsp;Add New Point</a></li>
              &lt;!&ndash;  <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="legend-btn">&nbsp;English</a></li>&ndash;&gt;
              &lt;!&ndash;  <li class="divider hidden-xs"></li>&ndash;&gt;
              &lt;!&ndash;  <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="login-btn">&nbsp;&nbsp;Hebrew</a></li>&ndash;&gt;
             </ul>
           </li> -->
          </ul>
        </div><!--/.navbar-collapse -->
      </div>
    </div>

    <div id="container" class="sidebar_background">
      <div id="sidebar">
        <div class="sidebar-wrapper">
          <div class="panel panel-default sidebar_background" id="features">
            <div class="panel-heading sidebar_background">
              <h3 class="panel-title" >TOC
              <button type="button" class="btn btn-xs btn-default pull-right" id="sidebar-hide-btn"><i class="fa fa-chevron-left"></i></button></h3>
            </div>

            <div  class="panel-body" >
                <button type="button" class="btn btn-primary" style="margin-left:1%;" id="btnGetLoc"><i class="fas fa-map-marked-alt" style="font-size:20px;color:black"></i> Current Location</button>
                <br>
                <button  class="btn btn-info" id="popdrawcircle" style="margin-left:1%; margin-top: 2%;">
                  <i class="fa-solid fa-users-viewfinder" aria-hidden="true" style="font-size:20px;color:black"></i>
                  <span style="font-size:18px">Find Population</span><br/>
                  <!-- </i><i class="fa-regular fa-circle" aria-hidden="true" style="font-size:20px;color:black"></i>
                  <span style="font-size:10px">Click me & Draw Circle On Map</span> -->
                </button>
                <br>
                <div id="div_output" name="div_output" style="color: green; margin-left:2%;"></div>
             
                
                <button  class="btn btn-success" id="add_polygon" style="margin-left:1%; margin-top: 2%;">
                  <i class="fa-solid fa-landmark" aria-hidden="true" style="font-size:20px;color:black"></i>
                  <span style="font-size:18px">Add New Territory</span><br/>
                  <i class="fas fa-draw-polygon" aria-hidden="true" style="font-size:20px;color:black"></i>
                  <span style="font-size:10px">Click me & Draw Polygon On Map</span>
                </button>
                <br>
        
                <!-- <button  class="btn btn-danger" id="save_all_edited" style="margin-left:1%; margin-top: 2%;">
                  <i class="fa-solid fa-database" aria-hidden="true" style="font-size:20px;color:black;"></i>
                  <span style="font-size:13px">Save all changes on Server</span><br/>
                </button>
                <br> -->
                <!-- <button  class="btn btn-warning" id="split_polygon" style="margin-left:0%; margin-top: 2%;">
                  <i class="fas fa-globe-americas" aria-hidden="true" style="font-size:20px;color:black"></i>
                  <span style="font-size:18px">Split Territory </span><br/>
                  <i class="fas fa-pencil-ruler" aria-hidden="true" style="font-size:20px;color:black"></i>
                  <span style="font-size:9px">Click Territory on Map & Draw Split Line</span>
                </button>
                <br> -->
                <button  class="btn btn-danger" id="sortbyid" onclick="backup_current_data()" style="font-size:13px; border-radius: 0px; cursor: pointer; margin-left:1%; margin-top: 2%;"><i class="fa-solid fa-database" aria-hidden="true" style="font-size:13px;color:black;"></i> Save/Backup Current Data</button>
                <button  class="btn btn-warning" id="sortbyname" onclick="restore_saved_data()" style="font-size:11px; padding-left:1px; padding-right:1px; cursor: pointer; border-radius: 0px; margin-left:1%; margin-top: 2%;"><i class="fa-sharp fa-solid fa-rotate" aria-hidden="true" style="font-size:11px;color:black;"></i> Restore Saved Data <span style="font-size:11px; color:red;" class="blink_me" id="restore_datetime"></span> </button>
                <br>
                <br>
                <button  class="btn btn-info" id="sortbyid" onclick="sortbyId()" style="padding-left:5px; padding-right:5px; padding-top:1px; padding-bottom:1px; background-color:black; border: none; border-radius: 0px; cursor: pointer; margin-left:1%;  margin-bottom: 2%;">Sort By ID</button>
                &nbsp&nbsp&nbsp&nbsp
                <button  class="btn btn-info" id="sortbyname" onclick="SortbyName()" style="padding-left:5px; padding-right:5px; padding-top:1px; padding-bottom:1px; background-color:black; border: none; border-radius: 0px; cursor: pointer; margin-left:1%; margin-bottom: 2%;">Sort By Name</button>
                <br>
                
                <div id="states_list" class="states_list" style="overflow: auto;height: 50vh; max-height: 60%; margin-left: 5%;"></div>
            </div>

          </div>
        </div>
      </div>


      <div class="modal fade" id="terr_edit_Modal" tabindex="-1" role="dialog" aria-labelledby="terr_edit_ModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="terr_edit_ModalLabel">Edit Territories Data</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Terr_id:</label>
                  <input type="text" class="form-control" id="mterr_id">
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">RecName:</label>
                  <input type="text" class="form-control" id="mRecName">
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">RecEmail:</label>
                  <input type="text" class="form-control" id="mRecEmail">
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Color:</label>
                  <input type="text" class="form-control" id="mColor">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onclick="saveterr_edited_data()">Save Data</button>
            </div>
          </div>
        </div>
      </div>

      
      <div id="map">
          <div id="legenddiv" style="z-index: 999999;">
            <img class="legenddiv" src="assets/img/va_legend_complete.png" alt="">
          </div>
          <div style="z-index: 1000000;position: absolute;padding-left: 100px;"  class="row">
        <!-- <div class="col-md-4">
                  <div class="card">
                     <div class="btn btn-danger">
                          <h5 class="card-title">Total Surveys</h5>
                          <p class="card-text" id="tc" style="text-align: center;">00</p>
                      </div>
                  </div>
              </div> -->
          </div>
      </div>


    </div>
   

  

    

    <script src="https://unpkg.com/esri-leaflet@3.0.10/dist/esri-leaflet.js"></script>




    <link rel="stylesheet" href="assets/libs/mortiz_locate.css" />
<script src="assets/libs/mortiz_locate.js" charset="utf-8"></script>




<script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js"></script>

<!-- <script type="text/javascript" src="assets/data/tdata.js"></script> -->


<!-- <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script> -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/perliedman-leaflet-control-geocoder/1.9.0/Control.Geocoder.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/perliedman-leaflet-control-geocoder/1.9.0/Control.Geocoder.js"></script>


<!-- <link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css" /> 
<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.min.js"></script>   -->

	<!-- <script src="betterwms.js"></script> -->
  <!-- <script src='https://unpkg.com/@turf/turf@6/turf.min.js'></script> -->
  <script src='https://cdnjs.cloudflare.com/ajax/libs/Turf.js/6.5.0/turf.min.js'></script>

<link 
rel="stylesheet" 
href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"
/>
<script
src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js">
</script>

<link rel="stylesheet" href="https://ppete2.github.io/Leaflet.PolylineMeasure/Leaflet.PolylineMeasure.css" />
<script src="https://ppete2.github.io/Leaflet.PolylineMeasure/Leaflet.PolylineMeasure.js"></script>


<link rel="stylesheet" href="assets/libs/owm.css"/> 
<script src="assets/libs/owm.js"></script>

<!-- <link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.css" />
<script src="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.js"></script> -->

<link rel="assets/libs/fullscreen/fullscreen.css" />
<script src="assets/libs/fullscreen/fullscreen.js"></script>


<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9GR0oF71wisbzR6xuV1k6gbmEBQlkmOc&libraries=places"></script>


    <script src="assets/js/uscounties.js"></script>
    <script src="assets/js/main_admin.js"></script>

    <script>
      $.getJSON('assets/data/tdata.json', function(jsonData) {
        // console.log(jsonData)
        territories_data = jsonData; 
      });  
      setTimeout(function(){
        console.log(territories_data)
      },1000)


      function goto_url(){
        window.location = "index.html"; // Redirecting to other page.
      }

    

      

    </script>

   

  </body>
</html>

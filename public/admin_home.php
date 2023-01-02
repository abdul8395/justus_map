<?php
session_start();
$loc = 'http://' . $_SERVER['HTTP_HOST'];
if (isset($_SESSION['VA_ADMIN'])) {

} else {
    header("Location:" . $loc . "/justus_map/public/admin.php");
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#000000">

    <title>ADMIN_MAP</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
          <!-- jQuery library -->
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">


    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css">
  

    <link rel="stylesheet" href="assets/css/app.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css" integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=" crossorigin="anonymous">






    

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
            <div style="margin-top: 1%;  display: inline-block;"> <a href="index.html"> <button   type="button" class="btn btn-success">Public Page</button></a>
            </div>
            <div style="margin-top: 1%;  display: inline-block;"> <a href="services/logout.php"> <button   type="button" class="btn btn-warning">Logout</button></a>
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
            <li class="hidden-xs"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="list-btn"><i class="fa fa-list white"></i>&nbsp;&nbsp;TOC</a></li>
            <li class="hidden-xs" style="margin-left: 480px;"><a class="navbar-brand" href="#">Admin,    VA_Territory_Map  </a></li>
           

            
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
                <button type="button" class="btn btn-primary" style="margin-left:10%;" id="btnGetLoc"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"></path></svg>Current Location</button>
                <br>
                <button  class="btn btn-primary" id="popdrawcircle" style="margin-left:1%; margin-top: 2%;">
                  <i class="fa fa-users" aria-hidden="true" style="font-size:20px;color:white"></i>
                  <span style="font-size:18px">Find Population</span><br/>
                  <i class="fa fa-circle-o" aria-hidden="true" style="font-size:20px;color:white"></i>
                  <span style="font-size:10px">Click me & Draw Circle On Map</span>
                
                </button>
                <br>
                <div id="div_output" name="div_output" style="color: green; margin-left:2%;"></div>
                <br>
            
                <div id="states_list" class="states_list" style="overflow: auto;height: 475px; max-height: 60%; margin-left: 5%;"></div>
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
   

  

    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>




    <link rel="stylesheet" href="assets/libs/mortiz_locate.css" />
<script src="assets/libs/mortiz_locate.js" charset="utf-8"></script>




<script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js"></script>

<!-- <script type="text/javascript" src="assets/data/tdata.js"></script> -->


<link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>

<link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css" /> 
<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.min.js"></script>  

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

<link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.css" />
<script src="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.js"></script>

	<!-- <script src="betterwms.js"></script> -->
  <script src='https://unpkg.com/@turf/turf@6/turf.min.js'></script>



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
    </script>

   

  </body>
</html>

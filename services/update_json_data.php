<?php

$obj = $_REQUEST['myData'];

file_put_contents('../assets/data/tdata.json',$obj);




// print_r($obj);

// // read json file
// $data = file_get_contents('../assets/data/tdata.json');

// // decode json
// $json_arr = json_decode($data, true);
// // print_r($json_arr["features"]);
// // add data
// $new_feature='{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-77.096045,38.747364],[-77.095153,38.74386],[-77.095659,38.740912],[-77.089808,38.740056],[-77.087906,38.737722],[-77.08448,38.734887],[-77.082949,38.734495],[-77.080581,38.731273],[-77.082055,38.730056],[-77.079876,38.721933],[-77.079235,38.720964],[-77.072848,38.715578],[-77.074186,38.712824],[-77.071834,38.710085],[-77.062639,38.7098],[-77.056508,38.710216],[-77.053017,38.709932],[-77.046196,38.714431],[-77.043338,38.718468],[-77.04167,38.726899],[-77.04159,38.736817],[-77.043421,38.739463],[-77.042282,38.741285],[-77.041514,38.761038],[-77.047162,38.760988],[-77.049615,38.762931],[-77.049874,38.766046],[-77.052328,38.767306],[-77.053814,38.764763],[-77.059747,38.763604],[-77.059381,38.760302],[-77.061126,38.759902],[-77.065956,38.760624],[-77.068396,38.763149],[-77.070126,38.760091],[-77.072974,38.760686],[-77.078725,38.764525],[-77.083883,38.765869],[-77.083779,38.7591],[-77.091068,38.759868],[-77.093861,38.747807],[-77.096045,38.747364]]]},"properties":{"id":145,"color":2}}';
// $new_f_decoded=json_decode($new_feature, true);
// // $json_arr[] = array();

// // // encode json and save to file
// file_put_contents('../assets/data/tdata.json', json_encode($json_arr));

// $testgj='
//     {
//         "type": "FeatureCollection",
//         "features": [
//             {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "coordinates": [
//                 [
//                     [
//                     36.88228137091201,
//                     10.764901886614311
//                     ],
//                     [
//                     37.92065878309643,
//                     9.60543318210685
//                     ],
//                     [
//                     38.74553979897635,
//                     10.813043033298058
//                     ],
//                     [
//                     36.88228137091201,
//                     10.764901886614311
//                     ]
//                 ]
//                 ],
//                 "type": "Polygon"
//             }
//             },
//             {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "coordinates": [
//                 [
//                     [
//                     39.612637633878904,
//                     7.291720914771162
//                     ],
//                     [
//                     41.161228016671544,
//                     6.410825539416479
//                     ],
//                     [
//                     42.00363451071979,
//                     7.732776672415227
//                     ],
//                     [
//                     39.612637633878904,
//                     7.291720914771162
//                     ]
//                 ]
//                 ],
//                 "type": "Polygon"
//             }
//             }
//         ]
//     }
// ';

// $arr = '[
//    {
//       "id":1,
//       "name":"Charlie"
//    },
//    {
//       "id":2,
//       "name":"Brown"
//    },
//    {
//       "id":3,
//       "name":"Subitem",
//       "children":[
//          {
//             "id":4,
//             "name":"Alfa"
//          },
//          {
//             "id":5,
//             "name":"Bravo"
//          }
//       ]
//    },
//    {
//       "id":8,
//       "name":"James"
//    }
// ]';


// $data = json_decode($testgj, TRUE);
// // $arr[] = ['id' => '9999', 'name' => 'Name'];


//     // echo '<pre>';
//     // var_dump($data['features']);
//     // echo '</pre>';

//     $arr=$data['features'];
//     $all_fe = json_encode($arr, JSON_PRETTY_PRINT);
//     $new_f= '{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-77.096045,38.747364],[-77.095153,38.74386]]]},"properties":{"id":145,"color":2}}';
// // $arr[] = ['features' => '"id":8,"name":"James"'];
// // $finalArray =[];
// $finalArray[] = json_decode($all_fe, true);
// $finalArray[] = json_decode($new_f, true);

// // encode array to json
// $result = json_encode($finalArray, JSON_PRETTY_PRINT);

// // print merged json
// header('Content-type: text/javascript');
// echo $result;

?>
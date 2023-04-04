<?php

$obj = $_REQUEST['myData'];
file_put_contents('../assets/data/backup_dateTime.json',$obj);

// date_default_timezone_set('US/Eastern');
// $date = date('m-d-Y H:i:s', time());
// $myObj = new stdClass();
// $myObj->datetime_now = $date;
// $current_datetime=json_encode($myObj);
// echo $current_datetime;
?>
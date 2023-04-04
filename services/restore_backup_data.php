<?php
$json = file_get_contents('../assets/data/backup_data.json');
file_put_contents('../assets/data/tdata.json',$json);
// print_r($json);    
// $obj = $_REQUEST['myData'];
// file_put_contents('../assets/data/backup_data.json',$obj);
echo"success";
?>
<?php

$obj = $_REQUEST['myData'];
file_put_contents('../assets/data/backup_data.json',$obj);
?>
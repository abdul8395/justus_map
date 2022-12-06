<?php
session_start();
include("connection.php");
class Start extends connection
{
    function __construct()
    {
        $this->connectionDB();

    }
    public function loadData()
    {



        $sql_dist="select gid,district_name,division_id  from tbl_district order by district_name";

        $result_query_dist = pg_query($sql_dist);
        if($result_query_dist)
        {
            $output['district'] = pg_fetch_all($result_query_dist);
        }

        $sql_teh="select gid,district_name,tehsil_name,district_id  from tbl_tehsil1 order by tehsil_name";

        $result_query_teh = pg_query($sql_teh);
        if($result_query_teh)
        {
            $output['teh'] = pg_fetch_all($result_query_teh);
        }


        $this->closeConnection();
        return json_encode($output);
    }

}

$json = new Start();
echo $json->loadData();
?>
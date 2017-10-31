<?php

header("Content-Type:application/json");

$count = 6;
@$start = $_REQUEST["start"];

if(empty($start))
{
    $start = 0;
}

require('init.php');;

$sql = "SELECT did,name,price,material,img_sm01,detail FROM ys_dish LIMIT $start,$count";
$result = mysqli_query($conn,$sql);

$output = [];
while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);


?>












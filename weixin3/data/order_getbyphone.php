<?php

header("Content-Type:application/json");

@$phone = $_REQUEST["phone"];

if(empty($phone))
{
    echo '[]';
    return;
}

require('init.php');;

$sql = "SELECT ys_order.phone,ys_order.oid,ys_order.user_name,ys_order.addr,ys_order.order_time,ys_order.did,ys_dish.img_sm
FROM ys_dish,ys_order WHERE ys_order.phone=$phone AND ys_order.did=ys_dish.did";

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












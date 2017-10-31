<?php

header("Content-Type:application/json");
@$id = $_REQUEST["id"];
if(empty($id))
{
    echo '[]';
    return;
}
require('init.php');
$sql = "SELECT did,name,img_sm01,img_sm02,img_sm03,img_lg01,img_lg02,img_lg03,price,material,pinkage FROM ys_dish WHERE did=$id ";
$result = mysqli_query($conn,$sql);
$output = [];
$row = mysqli_fetch_assoc($result);
if(empty($row))
{
    echo '[]';
}
else
{
    $output[] = $row;
    echo json_encode($output);
}




?>












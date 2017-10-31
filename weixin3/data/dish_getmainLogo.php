<?php
header('Content-Type:application/json');
require('init.php');
$sql = "SELECT img_logo01,img_logo02,img_logo03,img_logo FROM ys_mainlogo";
$result = mysqli_query($conn,$sql);
$output = [];
$row = mysqli_fetch_assoc($result);
$output[] = $row;
echo json_encode($output);
?>
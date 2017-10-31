<?php
header("Content-type:application/json;charset=utf-8");
@$start=$_REQUEST['start'];
if($start===NULL){
	$start=0;
};
$conn=mysqli_connect('127.0.0.1','root','','yushan');
mysqli_query($conn,'SET NAMES UTF8');
$sql="SELECT did,img_sm01,name,price,detail FROM ys_dish limit $start,2";
$result=mysqli_query($conn,$sql);
$output = [];
while(true){
  $row = mysqli_fetch_assoc($result);
  if(!$row)
  {
    break;
  }
  $output[] = $row;
}
echo json_encode($output);
?>
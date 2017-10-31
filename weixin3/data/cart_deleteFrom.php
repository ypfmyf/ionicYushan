<?php
/**
*根据购物车详情记录编号删除所有购买记录
*/
require('init.php');
$sql = "DELETE From ys_cart";
$result = mysqli_query($conn,$sql);
if($result){
  $output['code']=1;
  $output['msg']='succ';
}else {
  $output['code']=400;
}
echo json_encode($output);

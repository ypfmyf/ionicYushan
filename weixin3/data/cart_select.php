<?php
/**
*查询指定用户的购物车内容
*请求参数：
  uid-用户ID，必需
*输出结果：
  {
    "uid": 1,
    "data":[
      {"cid":1,"title":"xxx","pic":"xxx","price":1599.00,'courseCount':1},
      {"cid":3,"title":"xxx","pic":"xxx","price":1599.00,'courseCount':3},
      ...
      {"cid":5,"title":"xxx","pic":"xxx","price":1599.00,'courseCount':5}
    ]
  }
*/
@$uid = $_REQUEST['uid'] or die('uid required');
require('init.php');
$output['uid'] = $uid;
$sql = "SELECT ys_cart.ctid,ys_cart.did,ys_cart.dishCount,ys_dish.name,ys_dish.img_sm01,ys_dish.price,ys_dish.material,ys_dish.checked FROM ys_dish,ys_cart WHERE ys_cart.did=ys_dish.did AND ys_cart.userid='$uid'";
$result = mysqli_query($conn,$sql);
$output['data'] = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);
<?php
/**根据用户id查询订单数据**/
header('Content-Type:application/json');

$output = [];

@$userid = $_REQUEST['userid'];

if(empty($userid)){
    echo "[]"; //若客户端未提交用户id，则返回一个空数组，
    return;    //并退出当前页面的执行
}

//访问数据库
require('init.php');

$sql = "SELECT ys_order.oid,ys_order.userid,ys_order.phone,ys_order.addr,
ys_order.totalprice,ys_order.user_name,ys_order.order_time,
ys_orderdetails.did,ys_orderdetails.dishcount,ys_orderdetails.price,
ys_dish.name,ys_dish.img_sm

 from ys_order,ys_orderdetails,ys_dish
WHERE ys_order.oid = ys_orderdetails.oid and ys_orderdetails.did = ys_dish.did and ys_order.userid='$userid'";
$result = mysqli_query($conn, $sql);

$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);
?>

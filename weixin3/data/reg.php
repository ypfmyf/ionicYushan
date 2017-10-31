<?php
header('Content-Type:application/json;Charset=UTF-8');
@$uname=$_REQUEST['uname'];
@$pwd=$_REQUEST['pwd'];
@$phone=$_REQUEST['phone'];
if(empty($uname) || empty($pwd) || empty($phone)){
    echo "[]";
    return;
};
require('init.php');
$sql="INSERT INTO ys_users VALUES(NULL,'$uname','$pwd','$phone')";
$result=mysqli_query($conn,$sql);
 if($result===true){
   echo '{"code":1,"msg":"注册成功"}';
 }else{
   echo '{"code":-1,"msg":"注册失败"}';
 }
?>
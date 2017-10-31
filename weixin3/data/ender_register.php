<?php
//注册
 header("content-type:application/json;charset=utf-8");
 @$uname = $_REQUEST['uname']or die('{"code":-2,"msg":"登录名是必须的"}');
 @$pwd = $_REQUEST['pwd']or die('{"code":-3,"msg":"密码是必须的"}');
 @$phone = $_REQUEST['phone']or die('{"code":-4,"msg":"手机号是必须的"}');
 require('init.php');
 $sql = "INSERT INTO ys_users VALUES(null,'$uname','$pwd','$phone')";
 $result = mysqli_query($conn,$sql);
 if($result===true){
   echo '{"code":1,"msg":"添加成功"}';
 }else{
   echo '{"code":-1,"msg":"添加失败"}';
 }
?>
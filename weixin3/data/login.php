<?php
/**
*请求参数：
  uname-用户名称，必需
  pwd-用户密码，必需
*输出结果：
  {"uid": 1, "msg":"succ"}
  或者
  {"uid": -1, "msg":"error"}
*/
@$phone = $_REQUEST['phone'] or die('phone required');
@$pwd = $_REQUEST['pwd'] or die('pwd required');

require('init.php');

$sql = "select userid,uname,phone from ys_users where phone='$phone' and pwd='$pwd'";
$result = mysqli_query($conn,$sql);

    $row = mysqli_fetch_assoc($result);
    $array = [];
    if($row)
    {
        $array['uid'] = $row['userid'];
        $array['uname'] = $row['uname'];
        $array['phone'] = $row['phone'];
        $array['msg'] = 'succ';
    }
    else
    {
        $array['uid'] =-1;
        $array['uname'] =-2;
         $array['phone'] =-3;
        $array['msg'] = 'error';
    }
$output[] = $array;
echo json_encode($output);

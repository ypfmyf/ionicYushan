<?php
/*此页面中为通用代码，由其他php页面调用*/
$conn = mysqli_connect('127.0.0.1','root','','yushan');
$sql = 'SET NAMES UTF8';
mysqli_query($conn,  $sql);
?>

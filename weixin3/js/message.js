/**
 * Created by Administrator on 2017/10/19 0019.
 */
//我的信息
app.controller('MessageCtrl',['$scope','$state','$LoginOperate',function($scope,$state,$LoginOperate){
    //获取当前已登录的账户
    $scope.messageUser=JSON.parse(sessionStorage.getItem("id"));
    //console.log($scope.messageUser);
    //判断是否登录
    $scope.message='';
    if($LoginOperate.checkLoginFlag() == -1){
        $scope.message='登录/注册';
        $scope.messageClick=function(){
            $state.go("ysEnter");
        }
    }else{
        $scope.message=$scope.messageUser.uname;
        $scope.messageClick=function(){
            $state.go("ysMySecurity");
        };
    }
}]);
//登录
app.controller('EnterCtrl',['$scope','$state','$http','$LoginOperate','$ysShowE','$timeout',
    function($scope, $state,$http,$LoginOperate,$ysShowE,$timeout){
    //登录
    $scope.formUser={phoneText: '',password: ''};
    //执行用户登录操作
        $scope.doLogin = function () {
            $ysShowE.showSuccessMesPopup("正在登录请稍后");
            $timeout(function(){
                $http.get('data/login.php?phone='+$scope.formUser.phoneText+"&pwd="+$scope.formUser.password)
                    .success(function(data){
                        if (data[0].msg == 'succ') {
                            $ysShowE.showErrorMesPopup("登录成功");
                            var user=JSON.stringify(data[0]);
                            console.log(user);
                            $LoginOperate.setLoginFlag(1);
                            sessionStorage.setItem('id',user);
                            $state.go("ysMessage");
                        }
                        else {
                            $ysShowE.showErrorMesPopup("手机号或密码错误");
                        }
                    }
                )
            },2000);

        };
}]);
//注册
app.controller('RegisterCtrl',['$scope','$http','$ysShowE','$state','$interval','$timeout',
    function($scope,$http,$ysShowE,$state,$interval,$timeout){
        $scope.formUser={};
        $scope.formUser.unameText="";
        $scope.formUser.phoneNumber="";
        $scope.formUser.password="";
        $scope.formUser.rePassword="";
        //注册
        $scope.doRegister=function(){
            var u=$scope.formUser.unameText;
            var p=$scope.formUser.phoneNumber;
            var pa=$scope.formUser.password;
            $ysShowE.showSuccessMesPopup("正在注册，请稍后");
            $timeout(function(){
                $http.get('data/ender_register.php?uname='+u+'&pwd='+pa+'&phone='+p)
                    .success(function(data){
                        console.log(data);
                        if(data.code==1){
                                $ysShowE.showErrorMesPopup("注册成功！");
                                $state.go("ysEnter");

                        }else{
                            $ysShowE.showErrorMesPopup("用户名已被注册，请更换！");
                        }
                    })
            },2000);

            };
        //验证码
        $scope.canClick=false;
        $scope.description='获取验证码';
        var second=59;
        var timerHandler;
        $scope.getCheckCode = function(){
            if($scope.formUser.phoneNumber>0){
                timerHandler=$interval(function(){
                    if(second<=0){
                        $interval.cancel(timerHandler);
                        second=59;
                        $scope.description="获取验证码";
                        $scope.canClick=false;
                    }else{
                        $scope.description=second+"s后重发";
                        second--;
                        $scope.canClick=true;
                    }
                },1000)
            }else{
                $scope.canClick=false;
            }
        };
}]);
//安全中心
app.controller('MySecurityCtrl',['$scope',function($scope){
    //获取当前已登录的账户
    $scope.messageUser=JSON.parse(sessionStorage.getItem("id"));
    console.log($scope.messageUser);
    $scope.message='';
    if($scope.messageUser!=null){
        $scope.message=$scope.messageUser.phone;
    }
}]);
//修改密码
app.controller('MyChangePasswordCtrl',['$scope','$http','$ysShowE','$state','$interval','$timeout',
    function($scope,$http,$ysShowE,$state,$interval,$timeout){
        //获取当前已登录账户
        $scope.messageUser=JSON.parse(sessionStorage.getItem("messageUser"));
        $scope.formUser={};
        $scope.formUser.password="";
        //注册
        $scope.doRegister=function(){
            var pa=$scope.formUser.password;
            console.log(pa);
            var p=$scope.messageUser.phone;
            console.log(p);
            $ysShowE.showSuccessMesPopup("正在修改密码，请稍后");
            $timeout(function(){
                $http.get('data/ender_getPassword.php?pwd='+pa+'&phone='+p)
                    .success(function(data){
                        console.log(data);
                        if(data.code==1){
                            $timeout(function(){
                                $ysShowE.showErrorMesPopup("修改成功！");
                                $state.go("ysMessage");
                            }, 2000);
                        }else{
                            $ysShowE.showErrorMesPopup("修改失败，请重新修改！");
                        }
                    })
            },2000);
        };
        //验证码
        $scope.canClick=false;
        $scope.description='获取验证码';
        var second=59;
        var timerHandler;
        $scope.getCheckCode = function(){
            if($scope.messageUser!=null){
                timerHandler=$interval(function(){
                    if(second<=0){
                        $interval.cancel(timerHandler);
                        second=59;
                        $scope.description="获取验证码";
                        $scope.canClick=false;
                    }else{
                        $scope.description=second+"s后重发";
                        second--;
                        $scope.canClick=true;
                    }
                },1000)
            }else{
                $scope.canClick=false;
            }
        };
    }]);
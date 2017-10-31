/**
 * Created by Administrator on 2017/10/17 0017.
 */
//自定义服务
//什么时候检查:添加到购物车时，下单时，进入购物车时，查看订单中心
//什么时候设置:登录成功时，设置为1, 退出登录时，设置为-1
app.service('$LoginOperate', [function () {
    //检查是否已经登录
    this.checkLoginFlag = function () {
        var flag = sessionStorage.getItem('LoginFlag');
        console.log(flag);
        return flag;
    };
    //设置登录的状态
    this.setLoginFlag = function (flag) {
        sessionStorage.setItem('LoginFlag', flag)
    }
}]);
app.controller('parentCtrl',['$scope', '$state', '$LoginOperate','$ysShowE','$ionicPopup','$timeout',
    function($scope, $state, $LoginOperate,$ysShowE,$ionicPopup,$timeout){
        //购物车数量
        $scope.data = {totalNumInCount: 0};
        //登录状态
        var flag = $LoginOperate.checkLoginFlag();
        if (flag != -1 && flag != 1) {
            $LoginOperate.setLoginFlag(-1);
        }
        //跳转
        $scope.jump = function (stateName, arg) {
            $state.go(stateName, arg);
        };
        //退出登录
        $scope.logOut = function () {
            $ionicPopup.confirm({
                title: "确认退出当前登录？",
                okText:"确认",
                cancelText:"取消"
            }).then(function(res) {
                if(res) {
                    $ysShowE.showSuccessMesPopup("正在退出请稍后");
                    $timeout(function(){
                        sessionStorage.clear();
                        $LoginOperate.setLoginFlag(-1);
                        $scope.jump('ysMessage');
                        $scope.data.totalNumInCount = 0;
                        $ysShowE.showErrorMesPopup("已退出");
                    },2000);
                }else{
                    return false;
                }
            });
        };
        //尾页导航条
        //$scope.funcSelect = function (index){
        //    if (index == 0) {
        //        $scope.jump('ysMainJia');
        //    }
        //    else if (index == 1) {
        //        $scope.jump('ysInbox1');
        //    }
        //    else if (index == 2) {
        //        $scope.jump('ysShopp');
        //    }
        //    else if (index == 3) {
        //        $scope.jump('ysMessage');
        //    }
        //}
    }]);

app.service('$ysHttp',['$ionicLoading','$timeout','$http','$ionicPopup',function($ionicLoading,$timeout,$http,$ionicPopup){
    this.sendRequest=function(url,handleSucc){
        $ionicLoading.show({template:'正在加载中......'});
        $timeout(function(){
            $ionicLoading.hide();
        },1000);
        $http.get(url)
            .success(function(data){
                //$ionicLoading.hide();
                handleSucc(data)
            })
    };
}]);
app.service('$ysShowE',['$ionicPopup','$timeout',
    function($ionicPopup,$timeout){
        this.showErrorMesPopup=function(title) {
            var myPopup=$ionicPopup.show({
                title:'<b>'+title+'</b>'
            });
            $timeout(function() {
                myPopup.close();//2秒后关闭
            }, 1000);
        };
        this.showSuccessMesPopup = function(title) {
            var myPopup=$ionicPopup.show({
                title: '<b>'+title+'</b>',
                template: '<p style="text-align: center"><ion-spinner icon="android" class="spinner-positive"></ion-spinner></p>'
            });
            $timeout(function() {
                myPopup.close();//2秒后关闭
            }, 2000);
        };
    }]);


//自定义指令
app.directive('hideTabs',function($rootScope){
    return {
        restrict:'AE',
        link:function($scope){
            $rootScope.hideTabs = 'tabs-item-hide';
            $scope.$on('$destroy',function(){
                $rootScope.hideTabs =' ';
            })
        }
    }
});
//自定义指令
app.directive('neIsclick',['$rootScope','$http','$ionicPopup','$stateParams','$timeout',
    function ($rootScope,$http,$ionicPopup,$stateParams,$timeout) {
    return {
        restrict:'AE',
        link: function ($scope, $el) {
            $rootScope.isNe1=true;
            $rootScope.isWon1=true;
            $rootScope.isNe2=false;
            $rootScope.isWon2=true;
            $rootScope.isNe3=false;
            $rootScope.isWon3=true;
            $rootScope.isNe4=false;
            $rootScope.isWon4=true;
            $rootScope.isNe5=false;
            $rootScope.isWon5=true;
            $rootScope.isNe6=false;
            $rootScope.isWon6=true;
            $rootScope.isNe7=false;
            $rootScope.isWon7=true;
            $rootScope.NeClick1=function(){
                $scope.isNe1=true;
                $scope.isNe2=false;
                $scope.isNe3=false;
                $scope.isNe4=false;
                $scope.isNe5=false;
                $scope.isNe6=false;
                $scope.isNe7=false;

            };
            $rootScope.NeClick2=function(){
                $scope.isNe2=true;
                $scope.isNe1=false;
                $scope.isNe3=false;
                $scope.isNe4=false;
                $scope.isNe5=false;
                $scope.isNe6=false;
                $scope.isNe7=false;
            };
            $rootScope.NeClick3=function(){
                $scope.isNe3=true;
                $scope.isNe1=false;
                $scope.isNe2=false;
                $scope.isNe4=false;
                $scope.isNe5=false;
                $scope.isNe6=false;
                $scope.isNe7=false;
            };
            $rootScope.NeClick4=function() {
                $scope.isNe4 = true;
                $scope.isNe1 = false;
                $scope.isNe2 = false;
                $scope.isNe3 = false;
                $scope.isNe5 = false;
                $scope.isNe6=false;
                $scope.isNe7=false;

            };
            $rootScope.NeClick5=function(){
                $scope.isNe5=true;
                $scope.isNe1=false;
                $scope.isNe2=false;
                $scope.isNe3=false;
                $scope.isNe4=false;
                $scope.isNe6=false;
                $scope.isNe7=false;
                $scope.data = {};
                // 弹框
                var myPopup = $ionicPopup.show({
                    template: '<div  class="tempshow">' +
                    '<input type="text" placeholder="最低价">' +
                    '<input type="text" placeholder="最高价">' +
                    '</div>',
                    title: '价格区间',
                    scope: $scope,
                    buttons: [
                        { text:'退出' },
                        {
                            text:'<b>完成</b>',
                            type: 'button-assertive'
                        }
                    ]
                });
            };
            $rootScope.NeClick6=function() {
                $scope.isNe6=true;
                $scope.isNe1=false;
                $scope.isNe2=false;
                $scope.isNe3=false;
                $scope.isNe4=false;
                $scope.isNe5=false;
                $scope.isNe7=false;

            };
            $rootScope.NeClick7=function() {
                $scope.isNe7=true;
                $scope.isNe1=false;
                $scope.isNe2=false;
                $scope.isNe3=false;
                $scope.isNe4=false;
                $scope.isNe5=false;
                $scope.isNe6=false;

            };
            $rootScope.jiagouClick = function (){
                $http.get('data/shopp_updeta.php?uid=1&did='+$stateParams.id + "&count=-1")
                .success(function(result){
                        console.log(result);
                        //  将添加都购物车的结果弹窗显示
                        var jisalert=$ionicPopup.show({
                            title:"<p>加入购物车成功</p>",
                            scope: $scope
                        });
                        $timeout(function () {
                            jisalert.close(); //由于某种原因3秒后关闭弹出
                        },2000);
                    })
            }
        }
    }
}]);
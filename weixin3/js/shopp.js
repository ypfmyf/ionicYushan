/**
 * Created by Administrator on 2017/10/19 0019.
 */
//购物车

app.controller('ShoppCtrl',['$scope','$http','$LoginOperate','$ysShowE','$ionicPopup',
    function($scope,$http,$LoginOperate,$ysShowE,$ionicPopup) {
        //登录状态
        if ($LoginOperate.checkLoginFlag() == -1) {
            console.log('未登录');
            $scope.jump('ysEnter', {name: 'ysShopp'});
            return;
        }
        //获取登录账户信息
        $scope.messageUser = JSON.parse(sessionStorage.getItem("id"));
        //请求服务器端，读取购物车数据
        $scope.cart = [];//购物车对象数组
        $scope.hasDish = true;  //购物车空显示
        $scope.hasDishli=true;     //删除
        $scope.editTex =true;      //清空
        $scope.hasChange = false;  //加减
        //查询购物车内容
        $http.get('data/cart_select.php?uid=' + $scope.messageUser.uid)
            .success(function (result) {
                console.log(result);
                $scope.cart = result.data;
                if ($scope.cart.length == 0) {
                    $scope.hasDish = false;
                    $scope.hasDishli=false;
                    $scope.editTex =false;
                }
                else {
                    $scope.data.totalNumInCount = 0;
                    angular.forEach($scope.cart, function (value, key) {
                        $scope.data.totalNumInCount += parseInt(value.dishCount);
                        console.log(value);
                    });
                    //复选框全选
                    $scope.selectAll=true;//全选默认为false
                    //全选按钮check的点击事件
                    $scope.selectAllClick= function (sa) {
                        for(var i=0;i<$scope.cart.length;i++){
                            $scope.cart[i].checked=sa;
                        }
                    };
                    //单个数据的check事件
                    $scope.echoChange=function(sa){

                    };
                }

            });
        //删除
        $scope.shangchu = function (id,index) {
            $http.get('data/cart_delete.php?ctid='+id)
                .success(function (data) {
                    console.log(data);
                    if(data.msg=='succ'){
                        $ysShowE.showErrorMesPopup('删除成功');
                        $scope.cart.splice(index,1);
                        if ($scope.cart.length == 0) {
                            $scope.hasDish = false;
                            $scope.hasDishli=false;
                            $scope.editTex =false;
                        }
                        $scope.data.totalNumInCount=0;
                        angular.forEach($scope.cart, function (value, key) {
                            $scope.data.totalNumInCount += parseInt(value.dishCount);
                        });

                    }else{
                        $ysShowE.showErrorMesPopup('删除失败')
                    }
                });
        };
        //清空购物车
        $scope.toggleEdit=function(){
            $ionicPopup.confirm({
                title: "确定要清空购物车吗？",
                okText:"确定",
                cancelText:"取消"
            }).then(function(res) {
                if(res) {
                    $http.get('data/cart_deleteFrom.php')
                        .success(function(data) {
                            console.log(data);
                            if (data.msg == 'succ') {
                                $ysShowE.showErrorMesPopup('全部清空成功');
                                $scope.cart.splice(0);
                                if ($scope.cart.length == 0) {
                                    $scope.hasDish = false;
                                    $scope.hasDishli = false;
                                    $scope.editTex = false;
                                }
                                $scope.data.totalNumInCount = 0;
                                angular.forEach($scope.cart, function (value, key) {
                                    $scope.data.totalNumInCount += parseInt(value.dishCount);
                                });

                            } else {
                                $ysShowE.showErrorMesPopup('清空失败')
                            }
                        })
                }else{
                    return false;
                }
            });
        };

        //获取价格
        $scope.updateToServer = function (did, count) {
            $http.get('data/cart_update.php?did=' + did + "&count=" + count + "&uid=" +$scope.messageUser.uid)
                .success(function(data) {
                    $scope.data.totalNumInCount = 0;
                    angular.forEach($scope.cart, function (value, key) {
                        $scope.data.totalNumInCount += parseInt(value.dishCount);
                    })
                })
        };
        //加
        $scope.add = function (index) {
            $scope.hasChange = true;
            $scope.cart[index].dishCount++;
            $scope.updateToServer($scope.cart[index].did, $scope.cart[index].dishCount);
        };
        //减
        $scope.delete=function (index) {
            $scope.hasChange = true;
            var num = $scope.cart[index].dishCount;
            num--;
            if (num <= 0) {
                num = 1;
            }
            else {
                $scope.cart[index].dishCount = num;
                $scope.updateToServer($scope.cart[index].did, $scope.cart[index].dishCount);
            }
        };
        //总的价格
        $scope.sumAll = function () {
            result = 0;
            for(var i =0;i<$scope.cart.length;i++)
            {
                var dish = $scope.cart[i];
                result += (dish.price * dish.dishCount);
            }
            return result;
        };
        //立即结算
        $scope.jumpToOrder = function () {
            //准备要传递的参数
            var totalPrice = $scope.sumAll();
            //json格式的序列化（将一个普通的对象或者数组 序列化 json格式的字符串）
            var detail = angular.toJson($scope.cart);
            $scope.jump('ysConfirmation',{cartDetail:detail,price:totalPrice});
        }

}]);
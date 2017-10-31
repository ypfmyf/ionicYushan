/**
 * Created by Administrator on 2017/10/17 0017.
 */
//详情
app.controller('DetailCtrl',['$scope','$http','$stateParams','$LoginOperate','$ysShowE','$timeout',
    function($scope,$http,$stateParams,$LoginOperate,$ysShowE,$timeout){
        $scope.messageUser=JSON.parse(sessionStorage.getItem("id"));
        $http.get('data/dish_getbyid.php?id='+$stateParams.id).
            success(function(data){
                console.log(data);
                $scope.dish = data[0];
            });
        $scope.addToCart = function () {
            if ($LoginOperate.checkLoginFlag()==-1) {
                $scope.jump('ysEnter', {name: 'detail', args: '{"id":' + $stateParams.id + '}'});
                return;
            }
            $http.get('data/cart_update.php?did=' + $scope.dish.did +
                "&count=-1" + "&uid="+$scope.messageUser.uid)
                .success(function (data) {
                    if (data.msg == 'succ') {
                        $ysShowE.showErrorMesPopup("加入购物车成功！");
                        $scope.data.totalNumInCount++;
                    }
                    else {
                        $ysShowE.showErrorMesPopup("添加失败");
                    }
                }
            )
        }
        $scope.jiarug=$scope.data.totalNumInCount++;
        $scope.data.totalNumInCount = 0;
        angular.forEach($scope.cart, function (value, key) {
            $scope.data.totalNumInCount += parseInt(value.dishCount);
        })
    }]);
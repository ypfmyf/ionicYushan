/**
 * Created by Administrator on 2017/10/26 0026.
 */
//订单确认
app.controller('ConfirmationCtrl',['$scope','$http','$stateParams','$httpParamSerializerJQLike','$LoginOperate',
    function($scope, $http, $stateParams, $httpParamSerializerJQLike, $LoginOperate){
        $scope.order = {
            userid:1,
            totalprice:$stateParams.price,
            cartDetail: $stateParams.cartDetail
        };
        console.log($scope.order);
        $scope.money=$scope.order.totalprice;
        //$scope.conDD=$scope.order.cartDetail;
        //consoleo.log($scope.conDD);
}]);
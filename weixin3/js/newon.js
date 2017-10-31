/**
 * Created by Administrator on 2017/10/18 0018.
 */
//ÐÂÆ·
app.controller('NewonCtrl',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
    var id=$stateParams.id;
    console.log(id);
    $http.get('data/dish_getdetailId.php?id='+id)
        .success(function(data){
            console.log(data);
            $scope.newonX=data[0];
        });

}]);
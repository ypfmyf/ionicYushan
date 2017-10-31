/**
 * Created by Administrator on 2017/10/18 0018.
 */
//搜索
app.controller('SearchCtrl',['$scope','$http',function($scope,$http){
    //绑定内容
    $scope.inputKw={kw:''};
    //删除内容
    $scope.clearSearch = function(){
        $scope.inputKw={kw:''};
    };
    //触发搜索
    $scope.chufa=false;
    //监听模型数据
    $scope.$watch('inputKw.kw',function(){
        if($scope.inputKw.kw){
            $http.get('data/dish_getbykw.php?kw='+$scope.inputKw.kw)
                .success(function(data){
                    console.log(data);
                    $scope.searchkw=data;
                    if(data=$scope.inputKw.kw){
                        $scope.chufa=true;
                    }
                })
        }

    });
}]);

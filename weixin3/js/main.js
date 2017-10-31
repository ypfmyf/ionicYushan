/**
 * Created by Administrator on 2017/10/17 0017.
 */
//首页
app.directive('translucentBar', ['$ionicScrollDelegate',function($ionicScrollDelegate) {
    return {
        scope:false,
        restrict: 'AE',
        replace: false,
        link: function(scope, element, attrs) {
            var el = angular.element(element);
            var ion = angular.element(element).parent().find('ion-content').css({
                top:'0'
            });
            var delegateHandle = attrs.translucentBar;
            var translucentColorOpacity = attrs.translucentColorOpacity;
            var translucentColor  = attrs.translucentColor;
            var translucentScrollMaxtop = attrs.translucentScrollMaxtop;
            var translucentColorTotal   = attrs.translucentColorTotal;
            if(!translucentScrollMaxtop) {
                translucentScrollMaxtop = 88;
            }
            if(!translucentColorTotal) {
                translucentColorTotal = 90;
            }
            var rgb = translucentColor.substring(4,translucentColor.length-1);
            var initCss = {
                'background': "rgba("+rgb+","+translucentColorOpacity+")",
            };
            el.css(initCss);
            var scroollTop = null;
            var distance = null;
            var opacity  = null;
            var translucentCss = null;
            scope.$$childHead.$onScroll = function() {
                distance   = $ionicScrollDelegate.$getByHandle(delegateHandle).getScrollPosition();
                scroollTop = distance.top;
                if(scroollTop <= translucentScrollMaxtop) {
                    opacity = scroollTop / translucentColorTotal;
                    translucentCss = {
                        'background': "rgba("+rgb+","+opacity+")",
                    };
                    el.css(translucentCss);
                }
            }
        }
    };
}]);
app.controller('MainCtrl',['$scope','$http','$ysHttp',
    function($scope){
        //加载首页数据
        $scope.list=['top_01.png','top_04.jpg','top_05.jpg'];
        console.log($scope.list);
        //分类加载
        $scope.isWarning1=true;
        $scope.isWarning2= false;
        $scope.isWarning3= false;
        $scope.isWarning4= false;
        $scope.isWarning5= false;
        $scope.isWarning6= false;
        $scope.isWarning7= false;
        $scope.isWarning8= false;
        $scope.color1Click=function(){
            $scope.isWarning1=true;
            $scope.isWarning2=false;
            $scope.isWarning3=false;
            $scope.isWarning4=false;
            $scope.isWarning5=false;
            $scope.isWarning6=false;
            $scope.isWarning7=false;
            $scope.isWarning8=false;
        };
        $scope.color2Click=function(){
            $scope.isWarning1=false;
            $scope.isWarning2=true;
            $scope.isWarning3= false;
            $scope.isWarning4=false;
            $scope.isWarning5=false;
            $scope.isWarning6=false;
            $scope.isWarning7=false;
            $scope.isWarning8=false;
        };
        $scope.color3Click=function(){
            $scope.isWarning1=false;
            $scope.isWarning2=false;
            $scope.isWarning3=true;
            $scope.isWarning4=false;
            $scope.isWarning5=false;
            $scope.isWarning6=false;
            $scope.isWarning7=false;
            $scope.isWarning8=false;
        };
        $scope.color4Click=function(){
            $scope.isWarning1=false;
            $scope.isWarning2=false;
            $scope.isWarning3=false;
            $scope.isWarning4=true;
            $scope.isWarning5=false;
            $scope.isWarning6=false;
            $scope.isWarning7=false;
            $scope.isWarning8=false;

        };
        $scope.color5Click=function(){
            $scope.isWarning1=false;
            $scope.isWarning2=false;
            $scope.isWarning3=false;
            $scope.isWarning4=false;
            $scope.isWarning5=true;
            $scope.isWarning6=false;
            $scope.isWarning7=false;
            $scope.isWarning8=false;
        };
        $scope.color6Click=function(){
            $scope.isWarning1=false;
            $scope.isWarning2=false;
            $scope.isWarning3=false;
            $scope.isWarning4=false;
            $scope.isWarning5=false;
            $scope.isWarning6=true;
            $scope.isWarning7=false;
            $scope.isWarning8=false;
        };
        $scope.color7Click=function(){
            $scope.isWarning1=false;
            $scope.isWarning2=false;
            $scope.isWarning3=false;
            $scope.isWarning4=false;
            $scope.isWarning5=false;
            $scope.isWarning6=false;
            $scope.isWarning7=true;
            $scope.isWarning8=false;
        };
        $scope.color8Click=function(){
            $scope.isWarning1=false;
            $scope.isWarning2=false;
            $scope.isWarning3=false;
            $scope.isWarning4=false;
            $scope.isWarning5=false;
            $scope.isWarning6=false;
            $scope.isWarning7=false;
            $scope.isWarning8=true;
        };
        //加入购物车
        $scope.isXianmei=false;
    }]);
app.controller('MainjiaCtrl',['$scope','$http',function($scope,$http){
    $scope.MainImgLogo = [];
    $http.get('data/dish_getmainLogo.php')
        .success(function(data){
            console.log(data);
            $scope.MainImgLogo=data;
        });
    //加载数据
    $http.get('data/dish_getmainSell.php?start='+1)
        .success(function(data){
            console.log(data);
            $scope.MainjiaSell=data;
        });
    $http.get('data/dish_getmainWife.php?start='+2)
        .success(function(data){
            console.log(data);
            $scope.MainjiaWife=data;
        });
    $http.get('data/dish_getbypage.php')
        .success(function(data){
            console.log(data);
            $scope.MainjiaBy=data;
        });

}]);
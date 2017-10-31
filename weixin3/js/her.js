/**
 * Created by Administrator on 2017/10/12 0012.
 */
//热销
app.controller('PromotionCtrl',['$scope','$interval',function($scope,$interval){
    $scope.showInfo=false;
    $scope.jiaruClick=function(){
        $scope.showInfo=true;
        $interval(function(){
            $scope.showInfo=false;
        },1000)
    }


}]);
//商品评论
app.controller('EvaluateCtrl',['$scope',function($scope){}]);
//储值卡
app.controller('MyStoredCtrl',['$scope',function($scope){}]);
//礼品卡
app.controller('MyPresentCtrl',['$scope',function($scope){}]);
//我的优惠券
app.controller('MyCouponCtrl',['$scope',function($scope){}]);
//积分
app.controller('MyIntegralCtrl',['$scope',function($scope){}]);
//收藏
app.controller('MyCollectCtrl',['$scope',function($scope){}]);
//消息
app.controller('MyMessagedCtrl',['$scope',function($scope){}]);
//我的订单
app.controller('OrderCtrl',['$scope',function($scope){}]);
//我的退换货
app.controller('RefundCtrl',['$scope',function($scope){}]);
//我的咨询
app.controller('MyLeaveCtrl',['$scope',function($scope){}]);
//发表咨询
app.controller('LeaveCtrl',['$scope',function($scope){}]);

//自己配置出生日期
app.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
        inputDate: new Date(),
        titleLabel:"选择日期",
        setLabel: '确定',
        todayLabel: '今天',
        closeLabel: '关闭',
        weeksList: [ "日", "一", "二", "三", "四", "五","六"],
        monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        templateType: 'popup',
        from: new Date(1949,10, 1),
        to: new Date(2020,10, 1),
        showTodayButton:false,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect:false
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
});
//个人信息
app.controller('MyPersonageCtrl',['$scope','$ionicActionSheet','ionicDatePicker',
    function($scope,$ionicActionSheet,ionicDatePicker){
        //头像
        $scope.showAct=function(){
            $ionicActionSheet.show({
                titleText:'选择方式',
                cancelText:'取消',
                buttons:[
                    {text:'拍照'},
                    {text:'从相册中选'}
                ],
                buttonClicked:function(index){
                    switch (index){
                        case 0:
                            takePhoto();
                            break;
                        case 1:
                            pickImage();
                            break;
                        default:
                            break;
                    }
                    return true;
                }
            })
        };
        //填写出生日期弹出框
        var ipObj1 = {
            callback: function (val) {  //Mandatory
                console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                var DateList=new Date(val);
                $scope.DateList=DateList.toLocaleDateString();
                console.log($scope.DateList)
            },
            from: new Date(1949, 1, 1),
            to: new Date(2018,1,1),
            inputDate: new Date(),
            mondayFirst:false,
            closeOnSelect: false,
            templateType: 'popup'
        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

    }]);
'use strict';

/**
 * @ngdoc overview
 * @name diancanApp
 * @description
 * # diancanApp
 *
 * Main module of the application.
 */

angular
  .module('diancanApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngSocket',
    'ngStorage'

  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);

//顶层controller
angular.module('diancanApp').controller('header-nav',['$rootScope','$scope','$location','$http','$sessionStorage',function($rootScope,$scope,$location,$http,$sessionStorage){
    $scope.logined=false;
    $scope.message='';

    $rootScope.safeApply = function( fn ) {//外部调用内部函数代理
        var phase = this.$root.$$phase;
        if(phase === '$apply' || phase === '$digest') {
            if(fn) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };


    $scope.$on('summon', function(e, data) {
        if(data === 'main'){
            angular.element('.business-mng').addClass('active');
            angular.element('.setting-page').removeClass('active');
        }else if(data === 'set'){
            angular.element('.setting-page').addClass('active');
            angular.element('.business-mng').removeClass('active');
        }else if(data === 'login'){
            if($scope.$storage.accountId !== '0'){
                $location.path('/main');
                $scope.logined=true;
            }
        }
    });

    $scope.printAskflag = 0;//问题弹出框
    $scope.printmenuING = 0;//正在打印菜单
    $scope.printmenupicING=0;//真在打印订单
    $scope.$on('printmenu',function(e,data){//打印菜单

        if(data === 'continue'){
            $scope.$broadcast('printmenuAsk', 0);
        }else{
            if($scope.printmenupicING===1){//由于正在打印订单，所以重新获取菜单来打印
                $scope.$broadcast('printmenuAsk', 0);
            }else {
                $scope.printmenuING = 1;
                colgarJS.messsage(data);  //打印菜单
            }

        }
    });

    $scope.$on('printmenuprice',function(e,data){//打印订单
        $scope.printmenupicING=1;
        colgarJS.messsage(data);
    });

    $scope.tiaoshiyong='';
    $scope.printBackMsg=function(msg){//打印反馈信息


        $scope.tiaoshiyong='msg:'+msg+'printmenuING:'+$scope.printmenuING;
        if(msg==='suc'){//打印成功，继续获取打印菜单
            if($scope.printmenuING === 1){//打印的是菜单，
                $scope.printmenuING = 0;
                $scope.$broadcast('printmenuAsk', 1);
            }else if($scope.printmenupicING===1){//打印的是订单
                $scope.printmenupicING=0;
                $scope.$broadcast('printpicAsk', 1);//订单答应成功
            }

        }else{//打印不成功
            $scope.printAskflag = 1;
            angular.element('#askmsg-show').modal('show');
        }
    };

    $scope.goAhead=function(){//未能成功打印，继续获取菜单打印
        if($scope.printAskflag === 1) {
            $scope.printAskflag = 0;
            if($scope.printmenuING === 1){//打印不成功的是菜单,ze需要重新打印
                $scope.printmenuING = 0;
                $scope.$broadcast('printmenuAsk', 0);

            }else if($scope.printmenupicING===1){//打印不成功的是订单
                $scope.printmenupicING=0;
                $scope.$broadcast('printpicAsk', 0);//订单答应不成功
            }
        }
    };
    $scope.$on('showmsg', function(e, data) {
        $scope.message=data;
        angular.element('.msg-show').slideDown('normal');
        setTimeout(function(){
            angular.element('.msg-show').slideUp('normal');
        },3000);

    });
    $scope.testconnect=function(){//重新连接
        $scope.printmenupicING=0;
        $scope.$broadcast('printmenuAsk', 0);
    };



    $scope.$storage = $sessionStorage.$default({
        accountId: '0',
        name:''
    });

    $rootScope.accountId=$scope.$storage.accountId;

    $scope.$on('logindata',function(e,data){
        $http.post('/adyd/web/merchant_login!login.do?account='+data.account+'&password='+data.password)
            .success(function(backData){
                if(backData.flag!=='error') {
                    $location.path('/main');
                    $scope.logined = true;
                    $scope.$storage.accountId = backData.data.merchantId;
                    $scope.$storage.name = backData.data.name;
                    $rootScope.accountId = $scope.$storage.accountId;
                }
            });
    });
    if($scope.$storage.accountId === '0'){
        $location.path('/login');
        $scope.logined=false;
    }else{
        $scope.logined=true;
    }

}]);

'use strict';

/**
 * @ngdoc function
 * @name diancanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diancanApp
 */
angular.module('diancanApp')
    .controller('MainCtrl', ["$rootScope", "$scope", "$http", function ($rootScope,$scope,$http) {
    $scope.tableInfo=[
            {
                groupId:'xxx',
                groupName:'xxx',
                tables:[
                    {tableNum:1,tableId:122,showFlag:true},
                    {tableNum:2,tableId:222,showFlag:false},
                    {tableNum:3,tableId:322,showFlag:false},
                    {tableNum:4,tableId:422,showFlag:false},
                    {tableNum:5,tableId:522,showFlag:false},
                    {tableNum:6,tableId:622,showFlag:false},
                    {tableNum:7,tableId:722,showFlag:false},
                    {tableNum:8,tableId:822,showFlag:false}
                ]
            },
            {
                groupId:'xxx',
                groupName:'xxx',
                tables:[
                    {tableNum:1,tableId:122,showFlag:true},
                    {tableNum:2,tableId:222,showFlag:false},
                    {tableNum:3,tableId:322,showFlag:false},
                    {tableNum:4,tableId:422,showFlag:false},
                    {tableNum:5,tableId:522,showFlag:false},
                    {tableNum:6,tableId:622,showFlag:false},
                    {tableNum:7,tableId:722,showFlag:false},
                    {tableNum:8,tableId:822,showFlag:false}
                ]
            },
            {
                groupId:'xxx',
                groupName:'xxx',
                tables:[
                    {tableNum:1,tableId:122,showFlag:true},
                    {tableNum:2,tableId:222,showFlag:false},
                    {tableNum:3,tableId:322,showFlag:false},
                    {tableNum:4,tableId:422,showFlag:false},
                    {tableNum:5,tableId:522,showFlag:false},
                    {tableNum:6,tableId:622,showFlag:false},
                    {tableNum:7,tableId:722,showFlag:false},
                    {tableNum:8,tableId:822,showFlag:false}
                ]
            }

        ];
        $scope.tablemenu={};
        $scope.currentTableId='';
        $scope.currentTableName='';
        $scope.waitIdArrey=[];
        $scope.tablemsg=[];
        $scope.currentPrintMenu=[];

    //初始化餐桌
    $http.get('/adyd/web/index!initTables.do?storeId='+$rootScope.accountId)
        .success(function(backData){

            if(backData.flag==='success') {
                $scope.tableInfo = backData.data;
            }else{
                $scope.$emit('showmsg', '初始化失败');
            }
    });


    $scope.opentable = function(tableId){//开桌
        //$scope.$emit('showmsg', 'lalalallal');
        $http.post('/adyd/web/index!openTable.do?tableId='+tableId)
            .success(function(backData){

                if(backData.flag==='success'){
                    setTableStatus(tableId,'1');//设置为已经开桌
                    $scope.$emit('showmsg', backData.why);
                }
            });
    };

    $scope.closetable = function(tableId){//关桌
        //$scope.$emit('showmsg', 'lalalallal');
        $scope.getmenu(tableId);

    };

    $scope.printMenu = function(){//结账时打印的菜单小票
        if($scope.tablemenu.data===null || $scope.tablemenu.data===undefined || $scope.tablemenu.data[0].dishesName==='该桌位没有菜单'){
            return;
        }
        var menuString=''+$scope.currentTableName+'\n';
        menuString += '订单号：'+$scope.tablemenu.number+'\n';
        for(var cnt=0;cnt<$scope.tablemenu.data.length;cnt++){
            menuString+='￥'+$scope.tablemenu.data[cnt].price+'|'+$scope.tablemenu.data[cnt].dishesName+'\t'+$scope.tablemenu.data[cnt].count+'份\n';
        }
        menuString+='总价格：￥'+$scope.tablemenu.totalPrice;
        $scope.$emit('printmenuprice', menuString);

    };

    $scope.$on('printpicAsk', function(e,data){//打印订单返回消息
        if(data===1){//订单答应成功
            $http.post('/adyd/web/index!closeTable.do?tableId='+$scope.currentTableId)
                .success(function(backData){
                    if(backData.flag==='success'){
                        setTableStatus($scope.currentTableId,'2');//设置为已经关桌
                        $scope.$emit('showmsg', backData.why);
                        $scope.tablemenu={};
                    }else{
                        $scope.$emit('showmsg', backData.why);
                    }
                });
        }else{
            $scope.$emit('showmsg', '打印不成功');
        }
    });

    $scope.getmenu = function(tableId){
        $scope.currentTableId=tableId;
        $scope.currentTableName=getTableName(tableId);
        $http.post('/adyd/web/index!getOrder.do?tableId='+tableId)
            .success(function(backData){
                angular.element('#myTab a:first').tab('show');

                if(backData.data){
                    $scope.tablemenu=backData.data;
                }else{
                    $scope.$emit('showmsg', backData.why);
                    $scope.tablemenu= {data: [
                        {dishesId: '', dishesName: '该桌位没有菜单', price: '', count: ''}
                    ],
                        number: '',
                        totalPrice: ''
                    };
                }
            });
    };
    $scope.getmsg = function(tableId){
        $scope.currentTableId=tableId;
        $scope.currentTableName=getTableName(tableId);
        $http.post('/adyd/web/index!getMessage.do?tableId='+tableId)
            .success(function(backData){

                if(backData.data){
                    $scope.tablemsg = backData.data;
                    angular.element('#myTab a:last').tab('show');
                }else{
                    $scope.$emit('showmsg', backData.why);
                    //$scope.tablemsg= [{"content":"该桌没有消息"}];
                }
            });
    };
    $scope.delmsg = function(msgid,index){//
        var temp = [{id:msgid}];
        $http.post('/adyd/web/index!delMessage.do?content='+JSON.stringify(temp))
            .success(function(backData){
                if(backData.flag==='success'){
                    $scope.$emit('showmsg', '删除成功');
                    $scope.tablemsg.splice(index,1);
                    if($scope.tablemsg.length===0){
                        setTableMsg($scope.currentTableId,false);
                    }
                }else{
                    $scope.$emit('showmsg', '删除失败');
                }
            });
    };

    $scope.clearmsgall = function(){
        var log = [];
        angular.forEach($scope.tablemsg, function(value){
            this.push({id:value.id});
        }, log);
        $http.post('/adyd/web/index!delMessage.do?content='+JSON.stringify(log))
            .success(function(backData){

                if(backData.flag==='success'){
                    $scope.$emit('showmsg', '全部清空成功');
                    $scope.tablemsg=[];
                    setTableMsg($scope.currentTableId,false);
                }else{
                    $scope.$emit('showmsg', '清空失败');
                }
            });
    };
    //轮询消息
    function cycleAsk(){
        $http.post('/adyd/web/polling!getInfo.do?storeId='+$rootScope.accountId)
            .success(function(backData){

                if(backData.flag==='success'){
                    /*if(backData.datamenu!==undefined && backData.datamenu!==null && backData.datamenu.length>0){
                        for(var cntId=0;cntId<backData.datamenu.length;cntId++){
                            $scope.waitIdArrey.push(backData.datamenu[cntId].o_tableId);
                        }
                    }*/

                    if(backData.datamsg!==undefined && backData.datamsg!==null && backData.datamsg.length>0){
                        for(var cntId2=0;cntId2<backData.datamsg.length;cntId2++){

                            setTableMsg(backData.datamsg[cntId2].n_tableId,true);
                        }
                    }
                }
            });
        setTimeout(function(){
            cycleAsk();
        },6000);
    }
    cycleAsk();
    function printAsk(){
        $http.post('/adyd/web/polling!getPrintOrder.do?storeId='+$rootScope.accountId)
            .success(function(backData){

                if(backData.flag==='success' && backData.data !== undefined && backData.data !== null && backData.data.length !== 0){
                    var menuString = ''+backData.tableNum+'\n';
                    for(var cnt=0;cnt<backData.data.length;cnt++){
                        menuString +=(''+backData.data[cnt].dishesName+'\t'+backData.data[cnt].count+'份\n');
                    }
                    $scope.currentPrintMenu=backData.data;
                    $scope.$emit('printmenu', menuString);
                }
                else{
                    $scope.$emit('printmenu', 'continue');
                }
            });
    }

    //第一次打印菜单询问
    setTimeout(function () {
        printAsk();
    }, 3000);
    $scope.printMenupicFlag=0;
    $scope.printMenuFlag=0;
    $scope.$on('printmenuAsk', function(e,data){
        if(data === 1){//已经打印，需要告诉服务器
            var log = [];
            angular.forEach($scope.currentPrintMenu, function(value){
                this.push({id:value.id});
            }, log);
            markPrintMenu(log);
        }

        setTimeout(function () {
            printAsk();
        }, 3000);
    });

    function markPrintMenu(data){//让服务器标记已经打印的菜单
        $http.post('/adyd/web/index!changeOrderItemStatus.do?content='+JSON.stringify(data))
            .success(function(backData){
                if(backData.flag==='success'){
                    angular.noop();
                }else{
                    $scope.$emit('showmsg', '后台操作出错');
                }
            });
    }
    $scope.menu={

    };


    function setTableStatus(id,flag){
        for(var cnt=0; cnt<$scope.tableInfo.length; cnt++){
            for(var scnt=0;scnt<$scope.tableInfo[cnt].tables.length;scnt++){
                if(id === $scope.tableInfo[cnt].tables[scnt].tableID){
                    $scope.tableInfo[cnt].tables[scnt].tableStatus = flag;
                    return;
                }
            }
        }
    }
    function setTableMsg(id,flag){
        for(var cnt=0; cnt<$scope.tableInfo.length; cnt++){
            for(var scnt=0;scnt<$scope.tableInfo[cnt].tables.length;scnt++){
                if(id === $scope.tableInfo[cnt].tables[scnt].tableID){
                    $scope.tableInfo[cnt].tables[scnt].tableMsg = flag;
                    return;
                }
            }
        }
    }
    function getTableName(id){
        for(var cnt=0; cnt<$scope.tableInfo.length; cnt++){
            for(var scnt=0;scnt<$scope.tableInfo[cnt].tables.length;scnt++){
                if(id === $scope.tableInfo[cnt].tables[scnt].tableID){
                   return  $scope.tableInfo[cnt].tables[scnt].tableNum;
                }
            }
        }
    }

    $scope.$emit('summon', 'main');//改变导航栏状态的信号


        //UI 初始化
    /*angular.element('#menu-tab').click(function(e){
        e.preventDefault();
        angular.element('.message').removeClass('active');
        angular.element('.themenu').addClass('active');
        angular.element('#message').removeClass('active');
        angular.element('#themenu').addClass('active');
    });
    angular.element('#message-tab').click(function(e){
        e.preventDefault();
        angular.element('.themenu').removeClass('active');
        angular.element('.message').addClass('active');
        angular.element('#themenu').removeClass('active');
        angular.element('#message').addClass('active');
    });*/
        angular.element('#myTab a').click(function (e) {
            e.preventDefault();
            angular.element(this).tab('show');
        });

}]);

'use strict';

/**
 * @ngdoc function
 * @name diancanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the diancanApp
 */
angular.module('diancanApp')
    .controller('AboutCtrl', ['$rootScope','$scope','globalData',function ($rootScope,$scope,globalData) {

        switch (globalData.getPara('subpage')){
            case '店铺宣传图': angular.element('#otherInfoTab a:first').tab('show');//初始化显示哪个tab
                break;
            case '菜单管理': angular.element('#otherInfoTab li:eq(1) a').tab('show');
                break;
            case '餐桌设置': angular.element('#otherInfoTab li:eq(2) a').tab('show');
                break;
            case '订单轨迹': angular.element('#otherInfoTab a:last').tab('show');
                break;
            default:break;
        }

        angular.element('#otherInfoTab a').click(function(e) {
            e.preventDefault();//阻止a链接的跳转行为
            angular.element(this).tab('show');//显示当前选中的链接及关联的content

            globalData.addPare('subpage',angular.element(this).context.text,'replace');

        });


  }]);

//菜单设置
angular.module('diancanApp')
    .controller('menuCtrl', ['$rootScope','$scope','$http',function ($rootScope,$scope,$http) {

        $scope.menudata = [];
        $scope.menudatacopy =[];
        function getmenudata(){
            $scope.addgroup_ = [];
            $scope.addmenu_ =[];
            $scope.editgroup_ ={};
            $scope.editmenu_ = {};
            $scope.delgroup_ = [];
            $scope.delmenu_ = [];
            $http.post('/adyd/web/dishes!showDishestypeAndDishes.do?storeId='+$rootScope.accountId)
                .success(function(data){
                    $scope.menudata=(data===null||data===undefined)?[]:data;
                    $scope.menudatacopy = angular.copy($scope.menudata);

                });
        }
        getmenudata();

        $scope.$emit('summon', 'set');
        $scope.addFlag = false;
        $scope.editFlag = false;
        $scope.delFlag = false;
        $scope.saveFlag = false;
        $scope.tianjia = function(){
            $scope.addFlag=true;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = true;
        };
        $scope.xiugai = function(){
            $scope.addFlag=false;$scope.editFlag = true;$scope.delFlag = false;
            $scope.saveFlag = true;
        };
        $scope.shanchu = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = true;
            $scope.saveFlag = true;
        };
        $scope.quxiao = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = false;
            $scope.menudata = angular.copy($scope.menudatacopy);
            $scope.addgroup_ = [];
            $scope.addmenu_ =[];
            $scope.editgroup_ ={};
            $scope.editmenu_ = {};
            $scope.delgroup_ = [];
            $scope.delmenu_ = [];
        };
        $scope.baocun = function(){
            if($scope.addFlag===true) {//添加菜单数据
                $http.post('/adyd/web/dishes!addDishestypeAndDishes.do?postdata='+JSON.stringify($scope.addgroup_)+
                '&storeId='+$rootScope.accountId+
                '&postdata1='+JSON.stringify($scope.addmenu_))
                    .success(function (data) {
                        if(data.flag==='success'){
                            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
                            $scope.saveFlag = false;
                            getmenudata();
                        }else{
                            $scope.$emit('showmsg', '操作出错');
                        }

                    });
            }else if($scope.delFlag === true){//删除菜单数据
                $http.post('/adyd/web/dishes!deleteDishestypeAndDishes.do?postdata='+JSON.stringify($scope.delgroup_)+
                    '&postdata1='+JSON.stringify($scope.delmenu_))
                    .success(function (data) {

                        if(data.flag==='success'){
                            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
                            $scope.saveFlag = false;
                            getmenudata();
                        }else{
                            $scope.$emit('showmsg', '操作出错');
                        }
                    });

            }else if($scope.editFlag === true){//编辑菜单数据
                var log = [];//菜名
                var log1=[];//组
                angular.forEach($scope.editmenu_, function(value){
                    this.push(value);
                }, log);
                angular.forEach($scope.editgroup_, function(value){
                    this.push(value);
                }, log1);

                $http.post('/adyd/web/dishes!updateDishestypeAndDishes.do?postdata='+JSON.stringify(log1)+
                    '&postdata1='+JSON.stringify(log))
                    .success(function (data) {

                        if(data.flag==='success'){
                            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
                            $scope.saveFlag = false;
                            getmenudata();
                        }else{
                            $scope.$emit('showmsg', '操作出错');
                        }
                    });
            }

        };

//添加，修改，删除数据容器
        $scope.addgroup_ = [];
        $scope.addmenu_ =[];
        $scope.editgroup_ ={};
        $scope.editmenu_ = {};
        $scope.delgroup_ = [];
        $scope.delmenu_ = [];


//添加，修改，删除操作//////////////////////////
        $scope.delgronp = function(index){
            $scope.delgroup_.push({groupId:$scope.menudata[index].grunpId});
            $scope.menudata.splice(index,1);

        };
        $scope.delmenu = function(fIndex,index){
            $scope.delmenu_.push({
                groupId:$scope.menudata[fIndex].grunpId,
                theId:$scope.menudata[fIndex].grunpMenu[index].theId
            });
            $scope.menudata[fIndex].grunpMenu.splice(index,1);
        };
        $scope.addgroup = function(){
            var tempdata = {
                grunpName:'',
                grunpId:'add',
                grunpMenu:[]
            };
            $scope.addgroup_.push(tempdata);
            $scope.menudata.push($scope.addgroup_[$scope.addgroup_.length-1]);
        };
        $scope.addmenus = function(fIndex){
            var tempdata = {
                grunpId:$scope.menudata[fIndex].grunpId,
                data:{price:'',theName:'',theId:'add'}
            };
            if(tempdata.grunpId==='add'){//在心添加的组里边添加菜单，这里不添加到addmenu_
                $scope.menudata[fIndex].grunpMenu.push(tempdata.data);
            }else{
                $scope.addmenu_.push(tempdata);
                $scope.menudata[fIndex].grunpMenu.push(
                    $scope.addmenu_[$scope.addmenu_.length-1].data
                );
            }
        };
        $scope.groupedited = function(index){
            if($scope.menudata[index].grunpId!=='add'){//非新添加的组才加到editgroup_
                $scope.editgroup_[index] = {
                    grunpId:$scope.menudata[index].grunpId,
                    grunpName:$scope.menudata[index].grunpName
                };
            }
        };
        $scope.menuedited = function(fIndex,index){
            if($scope.menudata[fIndex].grunpMenu[index].price===undefined ||$scope.menudata[fIndex].grunpMenu[index].price===null){
                $scope.$emit('showmsg', '请输入数字');
                $scope.editmenu_['' + fIndex + index] = undefined;
                $scope.menudata[fIndex].grunpMenu[index].price=angular.copy($scope.menudatacopy[fIndex].grunpMenu[index].price);
                return;
            }
            if($scope.menudata[fIndex].grunpMenu[index].theId !== 'add'){//非新添加的菜单才加到editmenu_
                if($scope.editmenu_[''+fIndex+index] === undefined) {
                    $scope.editmenu_['' + fIndex + index] = {
                        grunpId:$scope.menudata[fIndex].grunpId,
                        data:$scope.menudata[fIndex].grunpMenu[index]
                    };
                }
            }
        };





    }]);

//餐桌设置
angular.module('diancanApp')
    .controller('tableCtrl', ['$rootScope','$scope','$http',function ($rootScope,$scope,$http) {
        $scope.showCodeImg=false;
        $scope.menudata = [];
        $scope.menudatacopy =[];
        $scope.showCodeImgfn=function(){
            $scope.showCodeImg = !$scope.showCodeImg;
        };
        function getmenudata(){
            $scope.addgroup_ = [];
            $scope.addmenu_ =[];
            $scope.editgroup_ ={};
            $scope.editmenu_ = {};
            $scope.delgroup_ = [];
            $scope.delmenu_ = [];
            $http.post('/adyd/web/tble!showTableAndTablePos.do?storeId='+$rootScope.accountId)
                .success(function(data){
                    $scope.menudata=(data===null||data===undefined)?[]:data;
                    $scope.menudatacopy = angular.copy($scope.menudata);

                });
        }
        getmenudata();
        $scope.$emit('summon', 'set');
        $scope.addFlag = false;
        $scope.editFlag = false;
        $scope.delFlag = false;
        $scope.saveFlag = false;
        $scope.tianjia = function(){
            $scope.addFlag=true;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = true;
        };
        $scope.xiugai = function(){
            $scope.addFlag=false;$scope.editFlag = true;$scope.delFlag = false;
            $scope.saveFlag = true;
        };
        $scope.shanchu = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = true;
            $scope.saveFlag = true;
        };
        $scope.quxiao = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = false;
            $scope.menudata = angular.copy($scope.menudatacopy);
            $scope.addgroup_ = [];
            $scope.addmenu_ =[];
            $scope.editgroup_ ={};
            $scope.editmenu_ = {};
            $scope.delgroup_ = [];
            $scope.delmenu_ = [];
        };
        $scope.baocun = function(){
            if($scope.addFlag===true) {//添加菜单数据
                $http.post('/adyd/web/tble!addTableAndTablePos.do?postdata='+JSON.stringify($scope.addgroup_)+
                    '&storeId='+$rootScope.accountId+
                    '&postdata1='+JSON.stringify($scope.addmenu_))
                    .success(function (data) {
                        if(data.flag==='success'){
                            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
                            $scope.saveFlag = false;
                            getmenudata();
                        }else{

                            $scope.$emit('showmsg', '操作出错');
                        }

                    });
            }else if($scope.delFlag === true){//删除菜单数据
                $http.post('/adyd/web/tble!deleteTableAndTablePos.do?postdata='+JSON.stringify($scope.delgroup_)+
                    '&postdata1='+JSON.stringify($scope.delmenu_))
                    .success(function (data) {

                        if(data.flag==='success'){
                            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
                            $scope.saveFlag = false;
                            getmenudata();
                        }else{
                            $scope.$emit('showmsg', '操作出错');
                        }
                    });

            }else if($scope.editFlag === true){//编辑菜单数据
                var log = [];//菜名
                var log1=[];//组
                angular.forEach($scope.editmenu_, function(value){
                    this.push(value);
                }, log);
                angular.forEach($scope.editgroup_, function(value){
                    this.push(value);
                }, log1);

                $http.post('/adyd/web/tble!updateTableAndTablePos.do?postdata='+JSON.stringify(log1)+
                    '&postdata1='+JSON.stringify(log))
                    .success(function (data) {

                        if(data.flag==='success'){
                            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
                            $scope.saveFlag = false;
                            getmenudata();
                        }else{
                            $scope.$emit('showmsg', '操作出错');
                        }
                    });
            }

        };

//添加，修改，删除数据
        $scope.addgroup_ = [];
        $scope.addmenu_ =[];
        $scope.editgroup_ ={};
        $scope.editmenu_ = {};
        $scope.delgroup_ = [];
        $scope.delmenu_ = [];



        $scope.delgronp = function(index){
            $scope.delgroup_.push({groupId:$scope.menudata[index].grunpId});
            $scope.menudata.splice(index,1);

        };
        $scope.delmenu = function(fIndex,index){
            $scope.delmenu_.push({
                groupId:$scope.menudata[fIndex].grunpId,
                theId:$scope.menudata[fIndex].grunpMenu[index].theId
            });
            $scope.menudata[fIndex].grunpMenu.splice(index,1);
        };
        $scope.addgroup = function(){
            var tempdata = {
                grunpName:'',
                grunpId:'add',
                grunpMenu:[]
            };
            $scope.addgroup_.push(tempdata);
            $scope.menudata.push($scope.addgroup_[$scope.addgroup_.length-1]);
        };
        $scope.addmenus = function(fIndex){
            var tempdata = {
                grunpId:$scope.menudata[fIndex].grunpId,
                data:{theName:'',theId:'add'}
            };
            if(tempdata.grunpId==='add'){//在心添加的组里边添加菜单，这里不添加到addmenu_
                $scope.menudata[fIndex].grunpMenu.push(tempdata.data);
            }else{
                $scope.addmenu_.push(tempdata);
                $scope.menudata[fIndex].grunpMenu.push(
                    $scope.addmenu_[$scope.addmenu_.length-1].data
                );
            }
        };
        $scope.groupedited = function(index){
            if($scope.menudata[index].grunpId!=='add'){//非新添加的组才加到editgroup_
                $scope.editgroup_[index] = {
                    grunpId:$scope.menudata[index].grunpId,
                    grunpName:$scope.menudata[index].grunpName
                };
            }
        };
        $scope.menuedited = function(fIndex,index){
            if($scope.menudata[fIndex].grunpMenu[index].theId !== 'add'){//非新添加的菜单才加到editmenu_
                if($scope.editmenu_[''+fIndex+index] === undefined) {
                    $scope.editmenu_['' + fIndex + index] = {
                        grunpId:$scope.menudata[fIndex].grunpId,
                        data:$scope.menudata[fIndex].grunpMenu[index]
                    };
                }
            }
        };

    }]);





//上传图片
angular.module('diancanApp').directive('fileUploader', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: '<div><input type="file" multiple /><button>上传</button></div>',
        controller: ["$scope", "$element", "$fileUpload", function($scope,$element,$fileUpload) {
            $scope.notReady = true;
            $scope.files = [];
            $scope.upload = function() {

                $fileUpload.upload($scope.files);
            };

            var fileInput = $element.find('input[type="file"]');
            fileInput.bind('change', function(e) {
                $scope.notReady = e.target.files.length === 0;
                if(e.target.files.length>4){
                    $scope.$emit('showmsg', '请最多只选择4张图片！');

                    return;
                }
                //$scope.files = [];
                for(var i in e.target.files) {
                    //Only push if the type is object for some stupid-ass reason browsers like to include functions and other junk
                    if(typeof e.target.files[i] === 'object'){
                        if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(e.target.files[i].name)){
                            $scope.$emit('showmsg', '图片类型必须是.gif,jpeg,jpg,png中的一种！');

                            $scope.files=[];e.target=null;
                            break;
                        }else {
                            $scope.files.push(e.target.files[i]);
                        }
                    }

                }

            });
        }]
        /*link: function($scope, $element) {
            var fileInput = $element.find('input[type="file"]');
            fileInput.bind('change', function(e) {
                $scope.notReady = e.target.files.length === 0;
                $scope.files = [];
                for(var i in e.target.files) {
                    //Only push if the type is object for some stupid-ass reason browsers like to include functions and other junk
                    if(typeof e.target.files[i] === 'object'){ $scope.files.push(e.target.files[i]);}

                }

            });
        }*/
    };
});





angular.module('diancanApp').service('$fileUpload', ['$http', function($http) {
    this.upload = function(files) {
        //Not really sure why we have to use FormData().  Oh yeah, browsers suck.
        var formData = new FormData();
        for(var i in files) {
            formData.append('file_'+i, files[i]);
        }

        $http({method: 'POST', url: '/api/files', data: formData, headers: {'Content-Type': undefined}, transformRequest: angular.identity})
            .success(function(data) {
                console.log(data);
            });
    };
}]);

//自定义全局数据存储服务////////
angular.module('diancanApp')
    .factory('globalData',function(){
        var a = {};
        function addPara(name,v,r){
            if(a[name] !== undefined && r !== 'replace'){
                return false;
            }
            a[name]=v;
            return a[name];
        }

        function replacePara(name,v) {
            if(a[name] === undefined){
                return false;
            }else{
                a[name] = v;
            }
        }
        function getPara(name){
            return a[name];
        }
        return {
            addPare:addPara,
            getPara:getPara,
            replacePara:replacePara
        };
    });
/**
 * Created by weijianli on 14/11/4.
 */
'use strict';

angular.module('diancanApp')
    .controller('loginCtrl',['$scope',function($scope){
        $scope.$emit('summon', 'login');//改变导航栏状态的信号
        $scope.name='';
        $scope.password='';
        $scope.loginGo=function(){
            if($scope.name ==='' || $scope.name===null || $scope.name===undefined ||
                $scope.password ==='' || $scope.password===null || $scope.password===undefined
                ){
                $scope.$emit('showmsg', '请填写正确的用户名与密码');
                return;
            }
            $scope.$emit('logindata',{account:$scope.name,password:$scope.password});
        };
    }]);
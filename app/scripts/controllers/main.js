'use strict';

/**
 * @ngdoc function
 * @name diancanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diancanApp
 */
angular.module('diancanApp')
    .controller('MainCtrl', function ($rootScope,$scope,$http) {
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

    //
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

});

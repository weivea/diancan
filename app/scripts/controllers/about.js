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
        controller: function($scope,$element,$fileUpload) {
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
        }
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
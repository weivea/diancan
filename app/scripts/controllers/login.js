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
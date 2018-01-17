"use strict"
var newProblem = angular.module('newProblem',['OJ']);
newProblem.controller('newProblemCtrl',function ($scope, APIService) {
    $scope.initData = function () {

        //判断题参数init
        $scope.initJudge();

        //选择题参数
        $scope.initChoose();


    }

    $scope.initJudge = function () {
        $scope.problemTypes = constent.problemTypes;
        $scope.problemType = constent.problemTypes[0];
        $scope.judge = 'yes'
    }

    $scope.initChoose = function () {
        $scope.optionAmounts = [1,2,3,4,5,6];
        $scope.optionAmount = 4;
        $scope.optionArray = 'ABCDEFG'.slice(0,4).split('');
        $scope.optionContent = [];
    }

    $scope.changeModel = function (type) {
        if(type.no == 1){
            $scope.initJudge();
        }else if(type.no == 2){
            $scope.initChoose();
        }
    }

    $scope.updateArray = function(i){
        $scope.optionArray = 'ABCDEFG'.slice(0,i).split('');
    }
    
    $scope.submit = function () {
        console.log($scope.optionContent['B'])
        console.log($scope.problemForm)
        console.log($scope.problemForm.optionAmount.$invalid)
        console.log($scope.problemForm['optionContent[A]'].$invalid)
        $scope.problemForm.submitted = true;
        if(!$scope.problemForm.$valid){
            layer.msg('请输入必填项！')
            console.log('error',$scope.problemForm.$error);
        }else{
            console.log('correct',$scope.problemForm.$error);
        }
    }
})
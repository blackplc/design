"use strict"
var main = angular.module('main',['OJ']);
main.controller('mainCtrl',function ($scope, APIService) {
    $scope.initData = function () {
        $scope.ui()
        $scope.username = sessionStorage.username;
        if(sessionStorage.class === null){
            $scope.class = {};
            $scope.class.name = '请选择班级';
        }else{
            $scope.class = sessionStorage.class;
        }
        $scope.classList = JSON.parse(sessionStorage.classList);

        $scope.content = "完成页面：登录、首页、问题列表、更新问题、添加问题、新建问题"
    }
    
    $scope.ui = function () {
        $('.nav.navbar-nav').eq(0).children().removeClass('active');
    }

    $scope.chooseClass = function (clz) {
        $scope.class = clz;
        sessionStorage.class = JSON.stringify(clz);
        goto_view('main/problemList');
    }

    $scope.jump = function (word) {
        if($scope.class === null){
            layer.msg('请先选择班级！');
            return;
        }
        if(word === 'main'){
            goto_view('main')
        }else if(word === 'problem'){
            goto_view('main/problemList')
        }else if(word === 'homework'){
            goto_view('main/homeworkList')
        }
    }
})
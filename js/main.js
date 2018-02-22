"use strict"
var main = angular.module('main',['OJ']);
main.controller('mainCtrl',function ($scope, APIService,$location, $state) {
    $scope.initData = function () {
        $scope.navbar = {};
        $scope.nav = sessionStorage.getItem('nav') ? sessionStorage.nav : '';
        $scope.username = sessionStorage.getItem('username');
        if(sessionStorage.class === null || sessionStorage.class === undefined){
            $scope.class = {};
            $scope.class.name = '请选择班级';
        }else{
            $scope.class = JSON.parse(sessionStorage.class);
        }
        $scope.classList = JSON.parse(sessionStorage.classList);

        $scope.content = "完成页面：登录{API}、首页、问题列表、更新问题、添加问题、新建问题{API}、" +
            "作业（考试）列表、作业（考试）详情、作业（考试）编辑"
    }

    $scope.titleInit = function () {
        $scope.navbar.title = $state.params.title;
    }

    $scope.chooseClass = function (clz) {
        $scope.class = clz;
        sessionStorage.class = JSON.stringify(clz);
        $scope.jump('problem')
    }

    $scope.jump = function (word) {
        if($scope.class.id === null || $scope.class.id === undefined){
            layer.msg('请先选择班级！');
            return;
        }
        if(word === 'main'){
            $scope.nav = '';
            sessionStorage.nav = '';
            $state.go('main')
        }else if(word === 'problem'){
            $scope.nav = 'problem';
            sessionStorage.nav = 'problem';
            $state.go('main.problemList')
        }else if(word === 'homework'){
            $scope.nav = 'homework';
            sessionStorage.nav = 'homework';
            $state.go('main.homeworkList')
        }
    }
})
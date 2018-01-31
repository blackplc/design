"use strict"
var homeworkList = angular.module('homeworkList',['OJ']);
homeworkList.controller('homeworkListCtrl',function ($scope, APIService) {
    $scope.initData = function () {
        $scope.title = JSON.parse(sessionStorage.class).name + "作业列表";
        $('.nav.navbar-nav').eq(0).children().removeClass('active');
        $('.nav.navbar-nav').eq(0).children().eq(1).addClass('active');
        $scope.userType = 1;
    }
})
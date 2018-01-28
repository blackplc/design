"use strict"
var problemList = angular.module('problemList',['OJ']);
problemList.controller('problemListCtrl',function ($scope, $stateParams,APIService) {
    $scope.initData = function () {
        $scope.userType = 1;
        $scope.hide = 1;
        if(sessionStorage.getItem('class') == null){
            layer.msg('请先选择班级！')
            history.back();
        }
        $scope.$parent.$parent.class = JSON.parse(sessionStorage.class);
        $scope.title = JSON.parse(sessionStorage.class).name + "问题列表";
        var p1 = function () {
            return {
                problemId:1,
                title:'abc',
                description:'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
                totalSunmit:Math.ceil(Math.random()*50) + 20,
                passAmount:Math.ceil(Math.random()*20),
                problemType:5,
                submitState:1,
                hide:1
            }
        };  // 13.83    28.4     2.43    1.41
        var p2 = {
            problemId:2,
            title:'abdc',
            description:'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            totalSunmit:40,
            passAmount:15,
            problemType:5,
            submitState:3,
            hide:0
        };
        var p3 = {
            problemId:3,
            title:'abgc',
            description:'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            totalSunmit:50,
            passAmount:22,
            problemType:5,
            submitState:2,
            hide:1
        }
        $scope.problemList= [];
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(p2);
        $scope.problemList.push(p3);
        $scope.cur = 1;
        $('.nav.navbar-nav').eq(0).children().eq(0).addClass('active');

    }

    $scope.addProblem = function () {
        var p = {
            from:"problemList",
            class:$scope.$parent.$parent.class.name
        }
        sessionStorage.props = JSON.stringify(p);
        goto_view('main/addProblem');
    }
    
    $scope.change = function () {
        console.log($scope.cur);
    }

    $scope.click = function (obj) {
        console.log(obj)
        goto_view('main/problemDetail')
    }

    $scope.update = function (obj, $event) {
        sessionStorage.editProblemParam = JSON.stringify({
            type:'update',
            problem:obj
        });
        goto_view('main/editProblem');
        $event.stopPropagation();
    }

    $scope.toggle = function (obj, $event) {
        obj.hide = 1 - obj.hide;
        $event.stopPropagation();
    }
})
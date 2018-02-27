"use strict"
var problemList = angular.module('problemList',[]);
problemList.controller('problemListCtrl',function ($scope, $stateParams,APIService,$location,$state) {
    $scope.initData = function () {
        $scope.navbar.title = "问题列表";
        $scope.userType = 1;
        $scope.hide = 1;
        $scope.$parent.$parent.class = JSON.parse(sessionStorage.class);
        var p1 = function () {
            return {
                problemId:1,
                title:'abc',
                description:'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
                totalSunmit:Math.ceil(Math.random()*50) + 20,
                passAmount:Math.ceil(Math.random()*20),
                problemType:5,
                submitState:1,
                hide:0
            }
        };
        var p2 = {
            problemId:2,
            title:'abdc',
            description:'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            totalSunmit:40,
            passAmount:15,
            problemType:5,
            submitState:3,
            hide:1
        };
        var p3 = {
            problemId:3,
            title:'abgc',
            description:'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            totalSunmit:50,
            passAmount:22,
            problemType:5,
            submitState:2,
            hide:0
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

    }

    $scope.addProblem = function () {
        var p = {
            from:"problemList",
            class:$scope.$parent.$parent.class.name
        }
        sessionStorage.props = JSON.stringify(p);
        $state.go('main.addProblem');
    }
    
    $scope.change = function () {
        console.log($scope.cur);
    }

    $scope.click = function (obj) {
        $state.go('main.problemDetail')
    }

    $scope.updateProblem = function (obj, $event) {
        $event.stopPropagation();
        sessionStorage.editProblemParam = JSON.stringify({
            type:'update',
            problem:obj
        });
        $state.go('main.editProblem');
    }

    $scope.deleteProblem = function (obj, $event) {
        $event.stopPropagation();
        layer.confirm('确定删除'+obj.title+'？', {
            btn: ['确定','取消'], //按钮
            icon:0
        }, function(){
            // APIService 删除题目
            layer.closeAll()
            layer.msg('删除成功',{icon:1})
            setTimeout(function() {
                location.reload();
            }, 500);
        }, function(){
            layer.closeAll()
        });
    }

    $scope.toggle = function (obj, $event) {
        obj.hide = 1 - obj.hide;
        $event.stopPropagation();
    }
})
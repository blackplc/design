'use strict';
var addProblem = angular.module('addProblem', ['OJ']);
addProblem.controller('addProblemCtrl', function ($scope, APIService, $sce) {

    $scope.initData = function () {
        $scope.userType = 1;
        $scope.problemSet = new Set();
        var props = JSON.parse(sessionStorage.props);
        $scope.title = '添加问题到' + props.class + '的' + (props.from === 'problemList' ? '问题列表' : props.from === 'homework' ? '第' + props.times + '次作业' : '考试');
        var id = 1;
        var p1 = function () {
            return {
                problemId: id++,
                title: 'abc',
                description: 'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
                totalSunmit: Math.ceil(Math.random() * 50) + 20,
                passAmount: Math.ceil(Math.random() * 20),
                problemType: 5,
                checked: 0,
                submitState: 1,
                hide: 1
            }
        };  // 13.83    28.4     2.43    1.41
        var p2 = {
            problemId: id++,
            title: 'abdc',
            description: 'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            totalSunmit: 40,
            passAmount: 15,
            problemType: 5,
            checked: 0,
            submitState: 3,
            hide: 0
        };
        var p3 = {
            problemId: id++,
            title: 'abgc',
            description: 'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            totalSunmit: 50,
            passAmount: 22,
            problemType: 5,
            checked: 0,
            submitState: 2,
            hide: 1
        }
        $scope.problemList = [];
        $scope.problemList.push(p2);
        $scope.problemList.push(p3);
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

    }

    $scope.newProblem = function () {
        sessionStorage.editProblemParam = JSON.stringify({
            type: 'new'
        });
        goto_view('main/editProblem');
    }

    $scope.todoSomething = function (event) {
        if (event.keyCode == 13) {//回车
            console.log('!!')
        }
    }

    $scope.check = function (problemId) {
        if ($scope.problemSet.has(problemId)) {
            $scope.problemSet.delete(problemId)
        } else {
            $scope.problemSet.add(problemId)
        }
    }

    $scope.update = function (obj, $event) {
        sessionStorage.editProblemParam = JSON.stringify({
            type:'update',
            problem:obj
        });
        goto_view('main/editProblem');
        $event.stopPropagation();
    }

    $scope.contain = function (problemId) {
        if($scope.problemSet.has(problemId)){
            return true;
        }else{
            return false;
        }
    }

    $scope.submit = function () {
        var problemArray = Array.from($scope.problemSet);
        console.log(problemArray, typeof problemArray, $scope.problemList)
    }
})
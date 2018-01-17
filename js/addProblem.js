'use strict';
var addProblem = angular.module('addProblem', ['OJ']);
addProblem.controller('addProblemCtrl', function ($scope, APIService, $sce) {

    $scope.initData = function () {
        $scope.userType = 1;
        $scope.problemSet = new Set();
        var props = JSON.parse(sessionStorage.props);
        $scope.title = '添加问题到' + props.class + '的' + (props.from === 'problemList' ? '问题列表' : props.from === 'homework' ? '第' + props.times + '次作业' : '考试');
        var p1 = function () {
            return {
                problemId: 1,
                title: 'abc',
                description: 'dddeessss\n\n\nask基督教卡上的疆阿克苏的金卡黑色贷记卡上的空间啊圣诞卡觉得哈斯看见的啊黑色短裤Jason华东科技',
                checked:0,
                hide: 1
            };
        };  // 13.83    28.4     2.43    1.41
        var p2 = {
            problemId: 2,
            title: 'abdc',
            description: 'dddeessss',
            checked:0,
            hide: 0
        };
        var p3 = {
            problemId: 3,
            title: 'abgc',
            description: 'dddeessss',
            checked:0,
            hide: 1
        }
        $scope.problemList = [];
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

    }

    $scope.newProblem = function () {
        goto_view('main/newProblem');
    }

    $scope.todoSomething = function (event) {
        if(event.keyCode==13){//回车
            console.log('!!')
        }
    }

    $scope.check = function(obj){
        obj.checked = 1 - obj.checked;
        if(obj.checked === 1){
            $scope.problemSet.add(obj.problemId)
        }else{
            $scope.problemSet.delete(obj.problemId)
        }
    }

    $scope.submit = function () {
        var problemArray = Array.from($scope.problemSet);
        console.log(problemArray,typeof problemArray,$scope.problemList)
    }
})
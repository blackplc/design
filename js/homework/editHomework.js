"use strict"
let editHomework = angular.module('editHomework', ['OJ']);
editHomework.controller('editHomeworkCtrl', function ($scope, $stateParams, APIService, $location, $state) {

    $scope.initData = function () {
        $scope.param = JSON.parse(sessionStorage.editHomeworkParam);
        APIService.stateChange('aaa', 'bbb').then(function (data) {
            console.log(data,data.headers('Content-Type'));
        })
        $scope.start = {};
        $scope.start.open = false;
        $scope.end = {};
        $scope.end.open = false;

        if ($scope.param.type === 'new') {
            $scope.oprationType = '新建';
            $scope.start.date = new Date();
            $scope.start.time = new Date(0);
            $scope.end.date = new Date();
            $scope.end.time = new Date(0);
        } else if ($scope.param.type === 'update') {
            $scope.oprationType = '更新';
            $scope.title = $scope.param.homework.title;
            $scope.start.date = new Date($scope.param.homework.startTime);
            $scope.start.time = $scope.start.date.getTime() % (1000 * 60 * 60 * 24);
            $scope.end.date = new Date($scope.param.homework.endTime);
            $scope.end.time = $scope.end.date.getTime() % (1000 * 60 * 60 * 24);
        }
        $scope.navbar.title = $scope.oprationType + '作业';
        $scope.submitContent = '确认' + $scope.oprationType;
        let p1 = function () {
            return {
                problemId: 1,
                title: 'abc',
                description: 'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
                totalSunmit: Math.ceil(Math.random() * 50) + 20,
                passAmount: Math.ceil(Math.random() * 20),
                problemType: 5,
                submitState: 1,
                hide: 0
            }
        };
        let p2 = {
            problemId: 2,
            title: 'abdc',
            description: 'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            totalSunmit: 40,
            passAmount: 15,
            problemType: 5,
            submitState: 3,
            hide: 1
        };
        let p3 = {
            problemId: 3,
            title: 'abgc',
            description: 'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
            totalSunmit: 50,
            passAmount: 22,
            problemType: 5,
            submitState: 2,
            hide: 0
        }
        $scope.problemList = [];
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(new p1());
        $scope.problemList.push(p2);
        $scope.problemList.push(p3);
    }

    $scope.change = function () {
        console.log($scope.start.time);
    }

    $scope.addProblem = function () {
        $state.go('main.addProblem')
    }

    $scope.toggleDate = function (word) {
        if (word === 'start') {
            $scope.start.open = true;
        } else {
            $scope.end.open = true;
        }
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

    $scope.submit = function () {
        // 先调用图片的组件的update方法（post参数写在url上），等后台返回保存后的图片序号后再用图片序号提交其他数据
        // console.log($scope.optionContent['B'])
        console.log($scope.homeworkForm)
        // console.log($scope.homeworkForm.optionAmount.$invalid)
        // console.log($scope.homeworkForm['optionContent[A]'].$invalid)
        $scope.homeworkForm.submitted = true;
        if (!$scope.homeworkForm.$valid) {
            layer.msg('请输入必填项！')
            console.log('error', $scope.homeworkForm.$error);
        } else {
            layer.msg($scope.oprationType + '成功', {icon: 1});
            setTimeout(function () {
                history.back();
            }, 500);
            console.log('correct', $scope.homeworkForm.$error);
        }
    }
})
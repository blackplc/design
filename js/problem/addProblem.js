'use strict';
var addProblem = angular.module('addProblem', []);
addProblem.controller('addProblemCtrl', function ($scope, APIService, $state, $location, storage,$q) {

    $scope.initData = function () {
        $scope.userType = 1;
        $scope.problemSet = new Set();
        var props = JSON.parse(sessionStorage.getItem('addProblemParam'));
        $scope.navbar.title = '添加问题';
        var id = 1;
        $scope.category = '分类'
        $scope.keyword = '';
        $scope.cur = 1;
        $scope.pageSize = constant.pageSize;
        APIService.getCategoryList().then(function (res) {
            if(res.data != null){
                $scope.categoryList = res.data.categoryList;
            }
        });
        $scope.courseList = [
            {'no': 1, 'name': 'C语言实训'},
            {'no': 2, 'name': 'c2'},
            {'no': 3, 'name': 'c3'},
        ]

        $scope.blankCourse();
        $scope.getProblemDicList()

        var p1 = function () {
            return {
                problemId: id++,
                title: 'abc',
                description: 'dedddeeddededeeddeesssede\ndesddede\ndwesdsededwweede\ndes',
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

    $scope.getProblemDicList = function () {
        let c = $scope.category === '分类' ? '' : $scope.category;
        let n = $scope.course.no === 0 ? '' : $scope.course.no;
        let k = $scope.keyword === '' ? '' : $scope.keyword;
        APIService.getProblemDicList(c, n, k, $scope.cur - 1).then(function (res) {
            if(res.data != null){
                $scope.problemList = res.data.problemList;
                $scope.totalSize = res.data.pageSize;
            }
        });
    }

    $scope.bindingCourseList = function (course) {
        if (course != null) {
            $scope.course = course;
        } else {
            $scope.blankCourse();
        }
    }

    $scope.blankCourse = function () {
        $scope.course = {'no': 0, 'name': '课程'}
    }

    $scope.bindingCategory = function (category) {
        $scope.category = category;
    }

    $scope.newProblem = function () {
        sessionStorage.editProblemParam = JSON.stringify({
            type: 'new'
        });
        $state.go('main.editProblem');
    }

    $scope.todoSomething = function (event) {
        if (event.keyCode == 13) {//回车
            $scope.getProblemDicList();
        }
    }

    $scope.check = function (problemId) {
        if ($scope.problemSet.has(problemId)) {
            $scope.problemSet.delete(problemId)
        } else {
            $scope.problemSet.add(problemId)
        }
    }

    $scope.updateProblem = function (obj, $event) {
        $event.stopPropagation();
        sessionStorage.editProblemParam = JSON.stringify({
            type: 'update',
            problem: obj
        });
        $state.go('main.editProblem');
    }

    $scope.deleteProblem = function (obj, $event) {
        $event.stopPropagation();
        layer.confirm('确定删除' + obj.title + '？', {
            btn: ['确定', '取消'], //按钮
            icon: 0
        }, function () {
            // APIService 删除题目
            layer.closeAll()
            layer.msg('删除成功', {icon: 1})
            setTimeout(function () {
                location.reload();
            }, 500);
        }, function () {
            layer.closeAll()
        });
    }

    $scope.page = function () {
        $scope.getProblemDicList();
    }

    $scope.contain = function (problemId) {
        if ($scope.problemSet.has(problemId)) {
            return true;
        } else {
            return false;
        }
    }

    $scope.submit = function () {
        var problemArray = Array.from($scope.problemSet);
        console.log(problemArray, typeof problemArray, $scope.problemList, $location)
        history.back()
    }
})
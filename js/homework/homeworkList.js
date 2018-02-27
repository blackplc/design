"use strict"
var homeworkList = angular.module('homeworkList', []);
homeworkList.controller('homeworkListCtrl', function ($scope, APIService, $state) {
    $scope.initData = function () {
        $scope.navbar.title = '作业列表'
        $scope.userType = 1;


        let index = 1;
        let homework = function () {
            return {
                id: index,
                title: "homework" + index++,
                startTime: new Date(2018, 5, 12, 14, 24, 28),
                endTime: new Date(2022, 1, 1),
                state: index % 3,
                hide: index % 4 === 1 ? 1 : 0
            }
        }
        $scope.homeworkList = [];
        $scope.homeworkList.push(new homework())
        $scope.homeworkList.push(new homework())
        $scope.homeworkList.push(new homework())
        $scope.homeworkList.push(new homework())
        $scope.homeworkList.push(new homework())
        $scope.homeworkList.push(new homework())
        $scope.homeworkList.push(new homework())
        $scope.homeworkList.push(new homework())

    }

    $scope.addHomework = function () {
        sessionStorage.editHomeworkParam = JSON.stringify({
            type: 'new'
        });
        $state.go('main.editHomework')
    }

    $scope.updateHomework = function (obj, $event) {
        $event.stopPropagation();
        sessionStorage.editHomeworkParam = JSON.stringify({
            type: 'update',
            homework: obj
        });
        $state.go('main.editHomework')
    }

    $scope.deleteHomework = function (obj, $event) {
        $event.stopPropagation();
        layer.confirm('确定删除'+obj.title+'？', {
            btn: ['确定','取消'], //按钮
            icon:0
        }, function(){
            // APIService 删除作业
            layer.closeAll()
            layer.msg('删除成功',{icon:1})
            setTimeout(function() {
                location.reload();
            }, 500);
        }, function(){
            layer.closeAll()
        });
    }

    $scope.click = function (obj) {
        $state.go('main.homeworkDetail')
    }

    $scope.toggle = function (obj, $event) {
        obj.hide = 1 - obj.hide;
        $event.stopPropagation();
    }
})
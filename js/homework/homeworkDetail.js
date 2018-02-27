"use strict"
let homeworkDetail = angular.module('homeworkDetail', []);
homeworkDetail.controller('homeworkDetailCtrl', function ($scope, $stateParams, APIService, $location, $state, $interval) {
    $scope.initData = function () {
        let index = 1;

        let p1 = new constant.judgeProblemModal();
        p1.problemId = index++;
        let p2 = new constant.chooseProblemModal();
        p2.problemId = index++;
        let p3 = new constant.fillingProblemModal();
        p3.problemId = index++;
        let p4 = new constant.correctingProblemModal();
        p4.problemId = index++;
        let p5 = new constant.programmingProblemModal();
        p5.problemId = index++;
        let p6 = new constant.chooseProblemModal();
        p6.problemId = index++;
        $scope.homework = {
            title: 'homework1',
            startTime: new Date(2018, 5, 12),
            endTime: new Date(2018, 5, 11),
            state: 1,
            totalScore: 100,
            score: 90,
            problemSet: [p1, p2, p3, p4, p5, p6]
        }
        $scope.leftTime = constant.timeToHMS(($scope.homework.endTime.getTime() - new Date().getTime()));//用于提前显示
        $interval(function () {
            let sub = $scope.homework.endTime.getTime() - new Date().getTime();
            if (sub > 0) {
                $scope.leftTime = constant.timeToHMS(sub);
            } else {
                $scope.leftTime = '已结束';
            }
        }, 1000)

        $scope.answer = [];
        $scope.initAnswerStore();
        $scope.radioModel = {};
        $scope.radioModel.i = 0;
        $scope.problem = $scope.homework.problemSet[$scope.radioModel.i];
        $scope.answer.judgeResult = 'Y';
        $scope.optionArray = constant.numToCharacterArray($scope.problem.blankAmount)
        $scope.answer.chooseResult = 'A';
        $scope.navbar.title = '作业详情';
    }

    $scope.initAnswerStore = function () {
        for (let i in $scope.homework.problemSet) {
            if ($scope.homework.problemSet[i].problemType === 0) {
                $scope.answer[i] = {
                    judgeResult: 'Y'
                }
            } else if ($scope.homework.problemSet[i].problemType === 1) {
                $scope.answer[i] = {
                    chooseResult: 'A',
                    chooseArray: constant.numToCharacterArray($scope.homework.problemSet[i].blankAmount)
                }
            } else if ($scope.homework.problemSet[i].problemType === 2 || $scope.homework.problemSet[i].problemType === 3) {
                $scope.answer[i] = {
                    blankArray: constant.numToNumArray($scope.homework.problemSet[i].blankAmount),
                    resultArray: []
                }
            } else if ($scope.homework.problemSet[i].problemType === 4) {
                $scope.answer[i] = {
                    sourceCode: ''
                }
            }
        }
    }

    $scope.$watch('radioModel.i', function () {
        $scope.problem = $scope.homework.problemSet[$scope.radioModel.i]
        // console.log($scope.optionArray, $scope.problem.blankAmount);

    })

    $scope.change = function (res) {
        // console.log(res);
    }

    $scope.problemType = function (num) {
        return constant.fliter.homeworkState(num)
    }

    $scope.submit = function () {
        console.log($scope.answer);
    }
})
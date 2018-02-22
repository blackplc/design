"use strict"
var editProblem = angular.module('editProblem', ['OJ']);
editProblem.controller('editProblemCtrl', function ($scope, APIService) {
    $scope.initData = function () {

        $scope.param = JSON.parse(sessionStorage.editProblemParam);

        $scope.problem = {};
        if ($scope.param.type === 'new') {
            $scope.oprationType = '新建'
            //题目类型初始化
            $scope.problemType = 1;
            //判断题参数init
            $scope.initJudgement();
        } else if ($scope.param.type === 'update') {
            $scope.oprationType = '更新'
            //题目类型初始化
            $scope.problemType = $scope.param.problem.problemType;
            $scope.title = $scope.param.problem.title;
            $scope.description = $scope.param.problem.description;
        }

        $scope.navbar.title = $scope.oprationType + '问题';
        $scope.submitContent = '确认' + $scope.oprationType;
        $scope.problemTypes = constant.problemTypes;

        $("#input-21").fileinput({
            language: 'zh',
            previewFileType: "image",
            browseClass: "btn btn-primary",
            browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
            showUpload: false,
            showUploadedThumbs: false,
            initialCaption: "选择图片上传（可一次选多张）",
            removeClass: "btn btn-danger",
            removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> ",
        });
    }

    $scope.initJudgement = function () {
        $scope.judgeArray = [
            {val: 'Y', dis: '是'},
            {val: 'N', dis: '否'}];
        $scope.problem.judge = 'Y'
    }

    $scope.initChoice = function () {
        $scope.optionAmounts = [1, 2, 3, 4, 5, 6];
        $scope.problem.optionAmount = 4;
        $scope.optionArray = 'ABCDEFG'.slice(0, 4).split('');
        $scope.optionContent = [];
        $scope.problem.rightOption = 'A'
    }

    $scope.initFilling = function () {
        $scope.blankAmounts = [1, 2, 3, 4, 5, 6];
        $scope.problem.blankAmount = 1;
        $scope.blankArray = $scope.blankAmounts.slice(0, 1);
        $scope.codeContent = [];
        $scope.blankContent = [];
    }

    $scope.initCorrecting = function () {
        $scope.errorAmounts = [1, 2, 3, 4, 5, 6];
        $scope.problem.errorAmount = 1;
        $scope.errorArray = $scope.errorAmounts.slice(0, 1);
        $scope.codeContent = [];
        $scope.errorContent = [];
        $scope.rightContent = [];
    }

    $scope.initProgramming = function () {
        $scope.inputDes = "";
        $scope.outputDes = "";
    }

    $scope.changeModel = function (type) {
        console.log(type);
        $scope.problemForm.submitted = false;
        if (type === 1) {
            $scope.initJudgement();
        } else if (type === 2) {
            $scope.initChoice();
        } else if (type === 3) {
            $scope.initFilling();
        } else if (type === 4) {
            $scope.initCorrecting();
        } else if (type === 5) {
            $scope.initProgramming();
        }
    }

    $scope.updateOptionArray = function (i) {
        $scope.optionArray = 'ABCDEFG'.slice(0, i).split('');
    }

    $scope.updateBlankArray = function (i) {
        $scope.blankArray = $scope.blankAmounts.slice(0, i);
    }

    $scope.updateErrorArray = function (i) {
        $scope.errorArray = $scope.errorAmounts.slice(0, i);
    }

    $scope.submit = function () {
        $scope.problemForm.submitted = true;

        let files = $('#input-21')[0].files;
        console.log($scope.problemForm)
        if (!$scope.problemForm.$valid) {
            layer.msg('请输入必填项！', {icon: 0})
            console.log('error', $scope.problemForm.$error);
        } else {
            let problem = constant.problemTemplate();
            if (files.length > 0) {
                console.log('handle pic');
                // console.log($scope.problemForm['optionContent[A]'].$invalid)
                let formData = new FormData();

                $.each(files, function (index, content) {
                    formData.append(index, content)
                });
                APIService.pictureUpload(formData).then(function (res) {
                    if (res.data.httpStatus === 200) {
                        problem.pictureList = '';
                        $.each(res.data.nums, function (index, content) {
                            problem.pictureList += content + ' ';
                        })
                        problem.pictureList.trim();
                        formProcesor(problem);
                    }
                });
            } else {
                console.log('no pic');
                formProcesor(problem);
            }

        }
    }

    function formProcesor(problem) {
        problem.title = $scope.title;
        problem.description = $scope.description;
        problem.problemType = $scope.problemType;
        if ($scope.problemType === 1) {
            problem.rightOption = $scope.problem.judge;
        } else if ($scope.problemType === 2) {
            problem.standardAnswer = '';
            problem.rightOption = $scope.problem.rightOption;
            problem.blankAmount = $scope.problem.optionAmount
            for (let i = 0; i < problem.blankAmount; i++) {
                problem.standardAnswer += $scope.optionContent[$scope.optionArray[i]] + '\n/********************/\n';
            }
        } else if ($scope.problemType === 3) {
            console.log($scope.codeContent, $scope.blankContent);
            problem.codeContent = '';
            problem.standardAnswer = '';
            problem.blankAmount = $scope.problem.blankAmount;
            for (let i = 0; i < problem.blankAmount; i++) {
                problem.codeContent += $scope.codeContent[i] + '\n/********************/\n';
                problem.standardAnswer += $scope.blankContent[i] + '\n/********************/\n';
            }
            problem.codeContent += $scope.codeContent[problem.blankAmount] + '\n/********************/\n';

        } else if ($scope.problemType === 4) {
            problem.codeContent = '';
            problem.standardAnswer = '';
            problem.errorContent = '';
            problem.blankAmount = $scope.problem.errorAmount;
            for (let i = 0; i < problem.blankAmount; i++) {
                problem.codeContent += $scope.codeContent[i] + '\n/********************/\n';
                problem.standardAnswer += $scope.rightContent[i] + '\n/********************/\n';
                problem.errorContent += $scope.errorContent[i] + '\n/********************/\n';
            }
            problem.codeContent += $scope.codeContent[problem.blankAmount] + '\n/********************/\n';
        } else if ($scope.problemType === 5) {
            problem.inputDes = $scope.problem.inputDes;
            problem.outputDes = $scope.problem.outputDes;
        }


        APIService.newProblemDic(problem);
        layer.msg($scope.oprationType + '成功', {icon: 1});
        // constant.back();
        console.log(problem);
    }
})
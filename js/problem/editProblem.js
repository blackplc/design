"use strict"
var editProblem = angular.module('editProblem', ['STORAGE']);
editProblem.controller('editProblemCtrl', function ($scope, APIService, storage, $q) {
    $scope.initData = function () {
        $scope.problem = {};
        APIService.getCategoryList().then(function (res) {
            if (res.data != null) {
                $scope.categoryList = res.data.categoryList;
            }
        });
        $scope.courseList = [
            {'no': 1, 'name': 'c1'},
            {'no': 2, 'name': 'c2'},
            {'no': 3, 'name': 'c3'},
        ];
        $scope.param = JSON.parse(sessionStorage.getItem('editProblemParam'));
        if ($scope.param.type === 'new') {
            $scope.oprationType = '新建';
            //题目类型初始化
            $scope.problemType = 1;
            $scope.course = $scope.courseList[0].no;
            //判断题参数init
            $scope.initJudgement();

            initImages();

        } else if ($scope.param.type === 'update') {
            $scope.oprationType = '更新'
            APIService.getProblemDic($scope.param.problem.id).then(function (res) {
                if (res.data != null) {

                    $scope.param.problem = res.data;
                    //题目类型初始化
                    console.log($scope.param.problem);
                    var message = "asdasd\n/***/\naassasad";
                    // console.log(message,message.split('/***/'));
                    // console.log($scope.param.problem.standardAnswer.split("/********************/"));;
                    $scope.course = $scope.param.problem.courseNo;
                    $scope.category = $scope.param.problem.category;
                    $scope.problemType = $scope.param.problem.problemType;
                    $scope.title = $scope.param.problem.title;
                    $scope.description = $scope.param.problem.description;
                    if ($scope.param.problem.pictureList !== null && $scope.param.problem.pictureList.trim() != '') {
                        console.log($scope.param.problem.pictureList);
                        APIService.getPictureList($scope.param.problem.pictureList.trim().replace(/\s/g, ',')).then(function (res) {
                            if (res.data != null) {
                                initImages(res.data.pictureList);
                                console.log(res.data);
                            }
                        })
                    } else {
                        initImages();
                    }


                    let codeList;
                    let rightList;
                    if ($scope.param.problem.codeContent) {
                        codeList = $scope.param.problem.codeContent.split("\n/********************/\n");
                    }
                    if ($scope.param.problem.standardAnswer) {
                        rightList = $scope.param.problem.standardAnswer.split("\n/********************/\n");
                    }
                    switch ($scope.problemType) {
                        case 1:
                            $scope.initJudgement($scope.param.problem.rightOption);
                            break;
                        case 2:
                            let optionList = $scope.param.problem.standardAnswer.split("\n/********************/\n");
                            $scope.initChoice($scope.param.problem.blankAmount, optionList, $scope.param.problem.rightOption);
                            break;
                        case 3:
                            $scope.initFilling($scope.param.problem.blankAmount, codeList, rightList);
                            break;
                        case 4:
                            let errorList = $scope.param.problem.errorContent.split("\n/********************/\n");
                            $scope.initCorrecting($scope.param.problem.blankAmount, codeList, errorList, rightList);
                            break;
                        case 5:
                            $scope.initProgramming($scope.param.problem.inputDes, $scope.param.problem.outputDes);
                            break;

                    }
                }

            })
        }

        $scope.navbar.title = $scope.oprationType + '问题';
        $scope.submitContent = '确认' + $scope.oprationType;

        $scope.problemTypes = constant.problemTypes;

        $('#input-21').on('filepreremove', function(event, id, index) {
            console.log('id = ' + id + ', index = ' + index);
        });

        $('#input-21').on('fileremoved', function(event, id, index) {
            console.log('removed :  id = ' + id + ', index = ' + index);
        });

        $('#input-21').on('filedeleted', function(event, key) {
            console.log('deleted : Key = ' + key);
        });

        $('#input-21').on('filebeforedelete', function(event, key,data) {
            console.log(data.obj);
            $.ajax({
                url: constant.baseUrl+constant.picture+'/delete?pictureId='+data.obj.id+'&problemId='+$scope.param.problem.id,
                type: 'POST',
                headers:{
                    'user-id':sessionStorage.userId,
                    'request-token':sessionStorage.token
                },
                success:function (res,str) {
                    console.log(res, str);
                    location.reload();
                }
            });

        });
    }

    $scope.bindingCategory = function (category) {
        $scope.category = category;
    }

    $scope.initJudgement = function (judge) {
        $scope.judgeArray = [
            {val: 'Y', dis: '是'},
            {val: 'N', dis: '否'}];
        $scope.problem.judge = judge ? judge : 'Y';
    }

    $scope.initChoice = function (amount, optionList, right) {
        $scope.optionAmounts = [1, 2, 3, 4, 5, 6];
        $scope.problem.optionAmount = amount ? amount : 4;
        $scope.optionArray = 'ABCDEFG'.slice(0, $scope.problem.optionAmount).split('');
        $scope.optionContent = optionList ? optionList : [];
        $scope.problem.rightOption = right ? right : 'A';
    }

    $scope.initFilling = function (amount, codeList, blankList) {
        $scope.blankAmounts = [1, 2, 3, 4, 5, 6];
        $scope.problem.blankAmount = amount ? amount : 1;
        $scope.blankArray = $scope.blankAmounts.slice(0, $scope.problem.blankAmount);
        $scope.codeContent = codeList ? codeList : [];
        $scope.blankContent = blankList ? blankList : [];
    }

    $scope.initCorrecting = function (amount, codeList, errorList, rightList) {
        $scope.errorAmounts = [1, 2, 3, 4, 5, 6];
        $scope.problem.errorAmount = amount ? amount : 1;
        $scope.errorArray = $scope.errorAmounts.slice(0, $scope.problem.errorAmount);
        $scope.codeContent = codeList ? codeList : [];
        $scope.errorContent = errorList ? errorList : [];
        $scope.rightContent = rightList ? rightList : [];
    }

    $scope.initProgramming = function (inputDes, outputDes) {
        $scope.problem.inputDes = inputDes ? inputDes : "";
        $scope.problem.outputDes = outputDes ? outputDes : "";
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
                    problem.pictureList = res.data.pictureList;
                    formProcesor(problem);
                });
            } else {
                console.log('no pic');
                formProcesor(problem);

            }

        }
    }

    function initImages(pictureList) {
        if (pictureList == null || pictureList === undefined){
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
        }else{
            let pictures = [];
            let pictureConfig = [];
            $.each(pictureList, function (index, obj) {
                pictures.push(constant.pictureBaseUrl + obj.randomName);
                pictureConfig.push({caption:obj.subbmitName,url:1,key:obj.id,extra:{obj}});
            });
            console.log(pictureConfig,pictures);
            $("#input-21").fileinput({
                overwriteInitial: false,
                language: 'zh',
                initialPreview: pictures,
                initialPreviewAsData: true,
                initialPreviewConfig: pictureConfig,
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
    }

    function formProcesor(problem) {
        problem.title = $scope.title;
        problem.description = $scope.description;
        problem.problemType = $scope.problemType;
        problem.courseNo = $scope.course;
        problem.category = $scope.category;
        if ($scope.problemType === 1) {
            problem.rightOption = $scope.problem.judge;
        } else if ($scope.problemType === 2) {
            console.log()
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

        if ($scope.param.type === 'update') {
            problem.id = $scope.param.problem.id;
            APIService.updateProblemDic(problem);
        } else {
            APIService.newProblemDic(problem);
        }
        layer.msg($scope.oprationType + '成功', {icon: 1});
        // constant.back();
        console.log(problem);
    }
})
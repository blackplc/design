"use strict"
var editProblem = angular.module('editProblem',['OJ']);
editProblem.controller('editProblemCtrl',function ($scope, APIService) {
    $scope.initData = function () {

        $scope.param = JSON.parse(sessionStorage.editProblemParam);
        // $("#input").fileinput({showCaption: false}); //输入框部件只显示选择文件按钮，隐藏标题
        $("#input-21").fileinput({
            language: 'zh',
            previewFileType: "image",
            browseClass: "btn btn-primary",
            browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
            // showRemove: false,
            // showClose: false,
            showUpload: false,
            showUploadedThumbs: false,
            initialCaption: "选择图片上传（可一次选多张）",

            removeClass: "btn btn-danger",
            // removeLabel: "Delete",
            removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> ",
            // uploadClass: "btn btn-info upload",
            // uploadLabel: "Upload",
            // uploadIcon: "<i class=\"glyphicon glyphicon-upload\"></i> "
        });
        // $(".upload").click(alert('!'))
        $scope.problemTypes = constant.problemTypes;

        if($scope.param.type === 'new'){
            $scope.pageTitle = '新建问题';
            $scope.submitContent = '确认新建';
            //题目类型初始化
            $scope.problemType = constant.problemTypes[0];
            //判断题参数init
            $scope.initJudgement();
        } else if($scope.param.type === 'update'){
            $scope.pageTitle = '更新问题';
            $scope.submitContent = '确认更新';
            //题目类型初始化
            $scope.problemType = constant.problemTypes[$scope.param.problem.problemType - 1];
            $scope.title = $scope.param.problem.title;
            $scope.description = $scope.param.problem.description;
        }



    }

    $scope.initJudgement = function () {
        $scope.judge = 'yes'
    }

    $scope.initChoice = function () {
        $scope.optionAmounts = [1,2,3,4,5,6];
        $scope.optionAmount = 4;
        $scope.optionArray = 'ABCDEFG'.slice(0,4).split('');
        $scope.optionContent = [];
        $scope.rightOption = 'A'
    }
    
    $scope.initFilling = function () {
        $scope.blankAmounts = [1,2,3,4,5,6];
        $scope.blankAmount = 1;
        $scope.blankArray = $scope.blankAmounts.slice(0,1);
        $scope.codeContent = [];
        $scope.blankContent = [];
    }

    $scope.initCorrecting = function () {
        $scope.errorAmounts = [1,2,3,4,5,6];
        $scope.errorAmount = 1;
        $scope.errorArray = $scope.errorAmounts.slice(0,1);
        $scope.codeContent = [];
        $scope.errorContent = [];
        $scope.rightContent = [];
    }

    $scope.initProgramming = function () {
        $scope.inputDes = "";
        $scope.outputDes = "";
    }

    $scope.changeModel = function (type) {
        $scope.problemForm.submitted = false;
        if(type.no == 1){
            $scope.initJudgement();
        }else if(type.no == 2){
            $scope.initChoice();
        }else if(type.no == 3){
            $scope.initFilling();
        }else if(type.no == 4){
            $scope.initCorrecting();
        }else if(type.no == 5){
            $scope.initProgramming();
        }
    }

    $scope.updateOptionArray = function(i){
        $scope.optionArray = 'ABCDEFG'.slice(0,i).split('');
    }

    $scope.updateBlankArray = function (i) {
        $scope.blankArray = $scope.blankAmounts.slice(0,i);
    }

    $scope.updateErrorArray = function (i) {
        $scope.errorArray = $scope.errorAmounts.slice(0,i);
    }

    $scope.submit = function () {
        // 先调用图片的组件的update方法（post参数写在url上），等后台返回保存后的图片序号后再用图片序号提交其他数据
        // console.log($scope.optionContent['B'])
        console.log($scope.problemForm)
        // console.log($scope.problemForm.optionAmount.$invalid)
        // console.log($scope.problemForm['optionContent[A]'].$invalid)
        $scope.problemForm.submitted = true;
        if(!$scope.problemForm.$valid){
            layer.msg('请输入必填项！')
            console.log('error',$scope.problemForm.$error);
        }else{
            console.log('correct',$scope.problemForm.$error);
        }
    }
})
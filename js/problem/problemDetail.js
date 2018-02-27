var problemDetail = angular.module('problemDetail',[]);
problemDetail.controller('problemDetailCtrl',function ($scope, APIService) {
    $scope.initData = function () {
        $scope.navbar.title = '问题详情';
        $scope.problem = {
            title:'求平均分',
            description:'在很多比赛中，有多位评委，对选手的表现进行打分。我们规定，选手的得分为去掉最高的和最低的分数后求得的平均分。',
            inputDes:'在第一行包含1个整数n（3 <= n <= 20)，第二行包括n个整数ai(1<=ai<=50,1<=i<=n)，每个整数都有一个空格隔开',
            outputDes:'输出求得的平均分(精确到小数点后两位) ，并在输出结果后换行',
            input:'5\n1 2 3 4 5',
            output:'3.00'
        }
    }

    $scope.reset = function () {
        $scope.code = "";
    }

    $scope.submit = function () {
        console.log($scope.code)
    }
})
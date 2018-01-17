var main = angular.module('main',['OJ']);
main.controller('mainCtrl',function ($scope, APIService) {
    $scope.initData = function () {
        $scope.username = sessionStorage.getItem('username');
        $scope.class = JSON.parse(sessionStorage.getItem('class'));
        if($scope.class == null){
            $scope.class = {};
            $scope.class.name = '请选择班级';
        }
        $scope.classList = JSON.parse(sessionStorage.classList);

    }
    
    $scope.ui = function () {
        
    }

    $scope.chooseClass = function (clz) {
        $scope.class = clz;
        sessionStorage.setItem('class',JSON.stringify(clz));
        goto_view('main/'+clz.name+'/problemList');
    }

    $scope.jump = function (word) {
        if(word == 'problem'){
            var clz = JSON.parse(sessionStorage.getItem('class'));
            if(clz == null){
                layer.msg('请先选择班级！');
            }else{
                goto_view('main/'+clz.name+'/problemList')
            }

        }
    }
})
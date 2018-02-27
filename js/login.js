myapp.controller('loginCtrl',['$scope','APIService','$state',function ($scope, APIService, $state) {
    $scope.initData = function () {
        $('#background').css('background','url("./img/landscape.jpg")');
    }
    $scope.login = function () {
        if($scope.username == '' || $scope.username == null){
            layer.msg('请输入帐号！')
            return;
        }
        if($scope.password == '' || $scope.password == null){
            layer.msg('请输入密码！')
            return;
        }
        loading();
        APIService.login($scope.username,$scope.password).then(function (res) {
            if(res.data != null) {
                closeloading();
                layer.msg('登录成功');
                sessionStorage.nav = '';
                $state.go('main')
            }
        });

    }
    $scope.keydown = function (e) {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13 || code == 108) {
            $scope.login();
            return false;
        }
        return true;
    }
}])
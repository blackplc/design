var OJ = angular.module("OJ",[]);
OJ.factory('APIService',function ($http) {
    var service = {
        token: sessionStorage.getItem('token'),
        userId: sessionStorage.getItem('userId')
    }
    service.get = function (url) {
        return $http({
            method: 'GET',
            url: url,
            headers: {
                "Authorization": service.token,
                "user-id": service.userId
            }
        })
    };
    service.post = function (url, data) {
        return $http({
            method: 'POST',
            url: url,
            data: data,
            headers: {
                "Authorization": service.token,
                "user-id": service.userId
            }
        })
    };
    service.put = function (url, data) {
        return $http({
            method: 'PUT',
            url: url,
            data: data,
            headers: {
                "Authorization": service.token,
                "user-id": service.userId
            }
        })
    };
    service.patch = function (url, data) {
        return $http({
            method: 'PATCH',
            url: url,
            data: data,
            headers: {
                "Authorization": service.token,
                "user-id": service.userId
            }
        })
    };
    service.delete = function (url) {
        return $http({
            method: 'DELETE',
            url: url,
            headers: {
                "Authorization": service.token,
                "user-id": service.userId
            }
        })
    };
    service.login = function (username, password) {
        var res = {};
        var classList = [{
            name:'c语言',
            id:123456
        },{
            name:'d',
            id:654321
        }]
        sessionStorage.setItem('username',username);
        sessionStorage.setItem('classList',JSON.stringify(classList));
        res.data = {};
        res.data.http_status = 200;
        return new Promise(function (resolve, reject) {
            resolve(res);
        });
    }
    return service;
})
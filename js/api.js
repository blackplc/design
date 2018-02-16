let OJ = angular.module("OJ", []);
OJ.factory('APIService', function ($http) {
    let service = {
        token: sessionStorage.token,
        userId: sessionStorage.userId
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
    service.stateChange = function (fromState, toState) {
        console.log(arguments);
        // return service.get(constant.localUrl + '/state/stateChange?' +)
    }
    service.login = function (username, password) {
        let res = {};
        let classList = [{
            name: 'c语言',
            id: 123456
        }, {
            name: 'd',
            id: 654321
        }]
        sessionStorage.username = username;
        sessionStorage.classList = JSON.stringify(classList);
        res.data = {};
        res.data.http_status = 200;
        return new Promise(function (resolve, reject) {
            resolve(res);
        });
    }
    return service;
})
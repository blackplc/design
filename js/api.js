let OJ = angular.module("OJ", []);
OJ.factory('APIService', function ($http) {
    let service = {
        token: sessionStorage.getItem('token'),
        userId: sessionStorage.getItem('userId')
    }
    service.get = function (url) {
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'request-token': service.token,
                'user-id': service.userId
            }
        })
    };
    service.post = function (url, data) {
        return $http({
            method: 'POST',
            url: url,
            data: data,
            headers: {
                "request-token": service.token,
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
                "request-token": service.token,
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
                "request-token": service.token,
                "user-id": service.userId
            }
        })
    };
    service.delete = function (url) {
        return $http({
            method: 'DELETE',
            url: url,
            headers: {
                "request-token": service.token,
                "user-id": service.userId
            }
        })
    };
    service.pictureUpload = function (picObj) {
        return $http({
            url: constant.baseUrl+'/problemDic/newPicture',
            method: 'POST',
            headers: {
                'Content-Type': undefined,
                "request-token": service.token,
                "user-id": service.userId
            },
            transformRequest: function() {
                return picObj;
            }
        })
        // $.ajax({
        //     url: constant.baseUrl+constant.picUploadUrl,
        //     type: 'POST',
        //     cache: false,
        //     data: picObj,
        //     processData: false,
        //     contentType: false,
        //     headers:{
        //         'user-id':service.userId,
        //         'request-token':service.token
        //     },
        //     success:function (res,str) {
        //         console.log(res, str);
        //         return res;
        //     }
        // })

        // return service.post(constant.baseUrl+constant.picUploadUrl,picObj);
    }
    service.newProblemDic = function (data) {
        return service.post(constant.baseUrl+'/problemDic/newProblemDic',data);
    }
    service.stateChange = function (fromState, toState) {
        console.log(service.token, service.userId);
        return service.get(constant.baseUrl + '/track/stateChange?fromState='+fromState+'&toState='+toState,);
    }
    service.login = function (username, password) {
        // var password = hex_md5(password);
        var data = {
            password: password,
            userName:username
        };
        return $http.post(constant.baseUrl + '/user/login',data).then(function (res) {
            if (res.data.httpStatus === 200) {
                service.userId = res.data.user.id;
                service.token = res.data.token;
                sessionStorage.userId =  res.data.user.id;
                sessionStorage.token = res.data.token;

                let classList = [{
                    name: 'c语言',
                    id: 123456
                }, {
                    name: 'd',
                    id: 654321
                }];
                sessionStorage.username = res.data.user.userName;
                sessionStorage.classList = JSON.stringify(classList);
            }
            return res;
        })
    }
    return service;
})
OJ.config(function($httpProvider) {
    // $httpProvider.defaults.headers.common = {
    //     "Content-Type": 'application/json'
    // };

    // status一般为200，之后再解析data中的httpCode

    $httpProvider.defaults.headers.common = {
        // "Content-Type": 'application/json'
    };
    $httpProvider.defaults.transformRequest = function (value) {
        return JSON.stringify(value);
    };

    //手动处理response会覆盖angularJs默认的处理器，所以得把data parse一遍
    $httpProvider.defaults.transformResponse = function (data, headersGetter, status) {

        if(headersGetter('Content-Type') === 'application/json;charset=UTF-8') {
            data = JSON.parse(data);
            console.log(data);
            if (data.httpStatus === undefined || data.httpStatus === null) {
                data.httpStatus = 200;
            } else if (data.httpStatus === 400) {
                if (data.httpCode === 'token.error' || data.httpCode === 'head.userId.illegal') {
                    layer.msg("登录信息过时，请重新登录！");
                    constant.goto_view('login');
                }else{
                    layer.msg(data.message)
                }
            } else if(data.httpStatus === 500){
                layer.msg("服务器内部错误，请联系老师或管理员处理！")
            }
        }
        return data;
    };
});
"use strict";
var myapp = angular.module('gP', ['ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'editHomework', 'homeworkDetail', 'main', 'login', 'problemList', 'problemDetail', 'addProblem', 'editProblem', 'homeworkList']);
function config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'view/login.html'
    }).state('main', {
        url: '/main',
        templateUrl: 'view/main.html',
        params:{title:'作业系统'}
        // controller: 'mainCtrl'
    }).state('main.problemList', {
        url: '/problemList',
        templateUrl: 'view/problem/problemList.html',
        params:{title:'问题列表'}
    }).state('main.problemDetail', {
        url: '/problemDetail',
        templateUrl: 'view/problem/problemDetail.html',
        params:{title:'问题详情'}
    }).state('main.addProblem', {
        url: '/addProblem',
        templateUrl: 'view/problem/addProblem.html',
        params:{title:'添加问题'}
    }).state('main.editProblem', {
        url: '/editProblem',
        templateUrl: 'view/problem/editProblem.html'
    }).state('main.homeworkList', {
        url: '/homeworkList',
        templateUrl: 'view/homework/homeworkList.html',
        params:{title:'作业列表'}
    }).state('main.homeworkDetail', {
        url: '/homeworkDetail',
        templateUrl: 'view/homework/homeworkDetail.html',
        params:{title:'作业详情'}
    }).state('main.editHomework', {
        url: '/editHomework',
        templateUrl: 'view/homework/editHomework.html'
    })
    $urlRouterProvider.otherwise('/login');
}
// function run($rootScope, $log) {
//     $rootScope.$on('$routeChangeSuccess',function(event, current, previous){
//         alert('!');
//     });
//
//     $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
//         alert('@')
//     });
// }
myapp.config(config);
myapp.run((function ($rootScope, $location,APIService) {
    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
        if(toState.name !== 'login'){
            console.log(APIService.stateChange(fromState.name, toState.name));
        }
        console.log(evt, toState, toParams, fromState, fromParams, $location)
    });
}));
myapp.filter('homeworkState',function () {
    return constant.fliter.homeworkState;
}).filter('toProblemType',function () {
    return constant.fliter.problemType;
})

var index;
function loading() {
    index = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
}
function closeloading() {
    layer.close(index);
}
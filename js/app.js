"use strict";
var myapp = angular.module('gP',['ui.router','ngAnimate', 'ngTouch','ui.bootstrap','main', 'login','problemList','problem','addProblem','newProblem','OJ']);
function config($stateProvider, $urlRouterProvider){
    $stateProvider.state('login',{
        url:'/login',
        templateUrl: 'view/login.html'
    }).state('main',{
        url:'/main',
        templateUrl: 'view/main.html',
        controller:'mainCtrl'
    }).state('main.problemList',{
        url:'/:className/problemList',
        templateUrl: 'view/problemList.html'
    }).state('main.problem',{
        url:'/:className/problem',
        templateUrl: 'view/problem.html'
    }).state('main.addProblem',{
        url:'/addProblem',
        templateUrl:'view/addProblem.html'
    }).state('main.newProblem',{
        url:'/newProblem',
        templateUrl:'view/newProblem.html'
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
myapp.run((function($rootScope, $location) {         $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {    console.log(evt, toState, toParams, fromState, fromParams,$location)     });     }));

var index;
function loading() {
    index = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
}
function closeloading() {
    layer.close(index);
}
function goto_view(v) {
    var baseUrl = window.location.href;
    baseUrl = (baseUrl.indexOf('#') > 0 ? baseUrl.substr(0, baseUrl.indexOf('#')) : baseUrl);
    window.location.href = baseUrl + '#!/' + v;
}
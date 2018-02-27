"use strict"
let STORAGE = angular.module("STORAGE",[]);
STORAGE.factory('storage', function (APIService) {
    let storage = {};

    storage.getCategoryList = function () {
        return new Promise(function (resolve, reject) {
            let categoryList = sessionStorage.getItem('categoryList');
            if(categoryList == null || categoryList === undefined){
                APIService.getCategoryList().then(function (res) {
                        categoryList = res.data.categoryList;
                        sessionStorage.categoryList = categoryList;
                        resolve(categoryList);
                });
            }else{
                resolve(categoryList)
            }
        })
    }

    return storage;
})
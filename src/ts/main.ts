//for typescript compiler
import * as angular from 'angular'
import User from './User';


var u = new User("Max");
console.log(u.username);
var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {
    $scope.products = ["Milk", "Bread", "Cheese"];
});
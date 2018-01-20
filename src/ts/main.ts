"use strict";

import * as angular from 'angular';
import {StateProvider} from '@uirouter/angularjs';
import {toggleDirective} from './directives/toggle';
import * as filter from './filters/helper';

const app = angular.module('app', ['ui.router']);

app.filter('currencySymbol', filter.currencySymbolFilter);
app.filter('unsafe', filter.unsafeFilter);
app.filter('betOdd', filter.betOddFilter);

app.directive('ahToggle', toggleDirective);

app.controller("myCtrl", function($scope) {
	$scope.products = ["Milk", "Bread", "Cheese"];
});

app.config(['$stateProvider', function($stateProvider: StateProvider) {

}]);

"use strict";

import * as angular from 'angular';
//import uiRouter from '@uirouter/angularjs';
//import {StateProvider} from '@uirouter/angularjs';
import 'angular-animate';
import 'angular-cookies';
import 'angular-route';
import 'angular-sanitize';
import 'angular-toastr';
import 'angular-touch';
import 'ng-notify';
import 'ngstorage';
import 'pikaday-angular';
import 'v-accordion';

import * as filter from './filters/helper';
import {toggleDirective} from './directives/toggle';

const app = angular.module('app', [
	'ngRoute', 'ngLocale', 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngTouch', 'ngStorage',
	'vAccordion', 'toastr', 'pikaday'
]);

app.filter('currencySymbol', filter.currencySymbolFilter);
app.filter('unsafe', filter.unsafeFilter);
app.filter('betOdd', filter.betOddFilter);

app.directive('ahToggle', toggleDirective);

app.controller("myCtrl", function($scope) {
	$scope.products = ["Milk", "Bread", "Cheese"];
});

app.config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
}]);

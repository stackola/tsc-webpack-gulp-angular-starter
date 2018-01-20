"use strict";

import * as angular from 'angular'

export const Filters: ng.IModule = angular.module('app.filters');
export const Directives: ng.IModule = angular.module('app.filters');
export const Controllers: ng.IModule = angular.module('app.controllers');
export const Services: ng.IModule = angular.module('app.services');

export interface IHash {
	[details: string] : string;
}

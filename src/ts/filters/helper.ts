'use strict';
import * as ng from 'angular'
import {IHash} from '../common';

export let currencySymbolFilter = [function()
{
	const currencySymbols: IHash = {
		'USD': '$', // US Dollar
		'EUR': '€', // Euro
		'CRC': '₡', // Costa Rican Colón
		'GBP': '£', // British Pound Sterling
		'ILS': '₪', // Israeli New Sheqel
		'INR': '₹', // Indian Rupee
		'JPY': '¥', // Japanese Yen
		'KRW': '₩', // South Korean Won
		'NGN': '₦', // Nigerian Naira
		'PHP': '₱', // Philippine Peso
		'PLN': 'zł', // Polish Zloty
		'PYG': '₲', // Paraguayan Guarani
		'THB': '฿', // Thai Baht
		'UAH': '₴', // Ukrainian Hryvnia
		'VND': '₫' // Vietnamese Dong
	};
	return function (input: string)
	{
		return currencySymbols[input] || input;
	}
}];

/*
Filters.filter('translate', ['locale', function (locale) {
	return function (input, path) {
		if (!input) {
			return '?empty?';
		}
		return (path ? locale.translate(path, input) : locale.translate(input)) || input;
	}
}]);
*/

export let unsafeFilter = ['$sce', ($sce: ng.ISCEService) => {
	return (val: string) => {
		return $sce.trustAsHtml(val);
	};
}];

export let betOddFilter = [function()
{
	return (val: string) => {
		return val;
	};
}];

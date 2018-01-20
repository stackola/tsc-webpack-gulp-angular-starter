"use strict";

import * as angular from 'angular'
//import {Directives} from '../app';

export interface IToggleScope extends ng.IScope {
	setBody(element: ng.IAugmentedJQuery, attributes: ng.IAttributes): void;
	toggle(): void;
	toggleIfExpanded(): void;
	toggleIfCollapsed(): void;
}

toggleDirective.$inject = [];

export function toggleDirective(): ng.IDirective {
	return {
		replace: false,
		restrict: 'A',

		link: {
			pre: function preLink(scope: IToggleScope, element, attributes) {
				/**
				 * Fetch and set definitions from attributes in the prelink phase so they are available to postlink directives
				 */
				attributes.body = (!attributes.body) ? '1' : attributes.body;
				attributes.handle = (!attributes.handle) ? '0' : attributes.handle;
				attributes.duration = (!attributes.duration) ? '0.25s' : attributes.duration;
				attributes.easing = (!attributes.easing) ? 'cubic-bezier(0.01, 0.85, 0.99, 1.01)' : attributes.easing;
				attributes.expanded = (!attributes.expanded) ? element.hasClass('open') : attributes.expanded;
				/**
				 * Store the toggleable body as reference and add some style initial attributes
				 */
				if (attributes.body === 'this') {
					scope.setBody(element, attributes);
				} else {
					//console.log(element.children());
					scope.setBody(angular.element(element.children()[attributes.body]), attributes);
				}
				/**
				 * If the element should be initial toggled do so
				 */
				if (attributes.expanded) {
					scope.toggle();
				}
				/**
				 * Add a handle for a chevron...
				 */
				//element.find('header').append(angular.element('<div class="handle"></div>'));
				//console.log(element.html());
			},
			post: function postLink(scope: IToggleScope, element, attributes) {
				/**
				 * Toggle the state use the first child or the specified handle.
				 */
				angular.element(element.children()[attributes.handle]).on('click', function (e) {
					scope.toggle();
					return false;
				});
				//console.log(element.children()[attributes.handle]);
			}
		},

		controller: ['$scope', '$element', function ($scope: IToggleScope, $element) {

			/**
			 * Set expanded by default to false.
			 * @type {boolean}
			 * @private
			 */
			let expanded: boolean = false;

			/**
			 * This is the element that holds the content expose it to the scope.
			 * @type {null}
			 * @private
			 */
			let toggleBody: ng.IAugmentedJQuery = null;

			/**
			 * Set the body to toggle.
			 * @param el
			 * @param attributes
			 */
			$scope.setBody = function (el: ng.IAugmentedJQuery, attributes: ng.IAttributes) {
				/**
				 * Store a reference to the element
				 */
				toggleBody = el;
				/**
				 * Set initial style attributes
				 */
				toggleBody.css({
					'overflow': 'hidden',
					'height': '0',
					'transitionProperty': 'height',
					'transitionDuration': attributes.duration,
					'transitionTimingFunction': attributes.easing,
					'max-height': 'none'
				});
			};

			$scope.toggleIfExpanded = function () {
				if (expanded) {
					$scope.toggle();
				}
			};

			$scope.toggleIfCollapsed = function () {
				if (!expanded) {
					$scope.toggle();
				}
			};

			/**
			 * Toggle the body.
			 */
			$scope.toggle = function () {
				/**
				 * Toggle is called somehow from a controller and the link phase is not triggered yet.
				 * Add a class 'open'.
				 */
				if (toggleBody === null) {
					//$element.addClass('open');
				}
				else {
					if (!expanded) {
						let y = widgetHeight();
						toggleBody.css({
							'height': y + 'px'
						});
						$element.addClass('open');
					}
					else {
						toggleBody.css({
							'height': 0 + 'px'
						});
						$element.removeClass('open');
					}
					expanded = !expanded;
				}
			};

			/**
			 * Get the height of the first child element - it should be one child hopefully.
			 * @return {number}
			 */
			function widgetHeight() {
				//return self.$toggleBody[0].offsetHeight;
				return (<HTMLElement>toggleBody[0].firstElementChild).offsetHeight;
			}

			/**
			 * Not the best Solution but ok.
			 * We monitor for the first child in a widgetBody - it should be one child hopefully.
			 */
			$scope.$watch(
				widgetHeight,
				function (newValue: number, oldValue: number) {
					if (newValue != oldValue && expanded) {
						/**
						 * reset height only if the element is not hidden
						 */
						if ($element[0].offsetParent !== null) {
							toggleBody.css({
								'height': newValue + 'px'
							});
						}
					}
				}
			);
		}]
	};
}

//angular.module('app.directives').directive('ahToggle', toggleDirective);
//Directives.directive('ahToggle', toggleDirective);

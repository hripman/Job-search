angular.module("myApp",['myApp.controllers', 'ngRoute']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/home', {templateUrl: 'partials/home.html', controller: 'homeController'}).
			otherwise({redirectTo: '/home'});
	}])
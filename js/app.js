angular.module('myApp', ['myApp.controllers','myApp.directives', 'myApp.services', 'ngRoute']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/home', {templateUrl: 'partials/home.html', controller: 'homeController'}).
			when('/resume', {templateUrl: 'partials/resume.html', controller: 'resumeController'}).
			when('/find', {templateUrl: 'partials/find.html', controller: 'findController'});
			// otherwise({redirectTo: '/home'});
	}]);
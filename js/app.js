angular.module('myApp', ['myApp.controllers','myApp.directives', 'myApp.services', 'ngMockE2E', 'ngRoute'])
.config(['$routeProvider', function ($routeProvider, $locationProvider) {		$routeProvider.
			when('/home', {templateUrl: 'partials/home.html', controller: 'homeController'}).
			when('/resume', {templateUrl: 'partials/resume.html', controller: 'resumeController'}).
			when('/find', {templateUrl: 'partials/find.html', controller: 'findController'}).
			otherwise({redirectTo: '/home'});
	}])
	.run(function ($httpBackend,resumeData) {
		$httpBackend.whenGET('/resumes').respond(function(method,url, data) {
			var resumes = resumeData.getAllResumes();
			return [200, resumes, {}];
		});
		$httpBackend.whenGET(/\/resumes\/search\/\d+/).respond(function(method,url, data) {
			var resumes = resumeData.find();
			return [200, resumes, {}];
		});
		 $httpBackend.whenGET(/partials\/.*/).passThrough();

	});
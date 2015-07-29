angular.module('myApp', ['myApp.controllers','myApp.directives', 'myApp.services', 'flow', 'ngMockE2E', 'ngRoute'])
.config(['$routeProvider', function ($routeProvider, $locationProvider) {		$routeProvider.
			when('/home', {templateUrl: 'partials/home.html', controller: 'homeController'}).
			when('/resume', {templateUrl: 'partials/resume.html', controller: 'resumeController', logInRequired:true}).
			when('/find', {templateUrl: 'partials/find.html', controller: 'findController'}).
			when('/account/login', {templateUrl: 'partials/login.html', controller: 'loginController'}).
			when('/account/register', {templateUrl: 'partials/register.html', controller: 'registerController'}).
			when('/employer/job', {templateUrl: 'partials/job.html', controller: 'jobController', logInRequired:true}).
			when('/home/:id', {templateUrl: 'partials/account.html', controller: 'accountController', logInRequired:true}).
			when('/job/?', {templateUrl: 'partials/jobView.html', controller: 'jobViewController'}).

			otherwise({redirectTo: '/home'});
	}]).
	config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
        target: '/upload',
        permanentErrors:[404, 500, 501]
    };
    // You can also set default events:
    
	}]).
	run(function ($httpBackend,resumeData, usersData, jobData) {
		$httpBackend.whenGET('/resumes').respond(function(method,url, data) {
			var resumes = resumeData.getAllResumes();
			return [200, resumes, {}];
		});
		$httpBackend.whenGET(/\/resumes\/search\/\?/).respond(function(method,url, data) {
			var key, value;
			var data = url.split('/')[3];
			data = data.slice(1,data.length);
			var params = data.split('&');
			var option = {};

			for(var i=0; i<params.length;++i){
				key = params[i].split('=')[0];
				value = params[i].split('=')[1];
				option[key] = value;
			}
			var result = resumeData.findByData(option);
			return [200, result, {}];
		});
		$httpBackend.whenGET(/\/resumes\/?/).respond(function(method,url,data) {
			var data = url.split('/')[2];
			var id = data.slice(1,data.length);
			var result = resumeData.findOne(id);
			return [201, result, {}];			
		})
		$httpBackend.whenPOST('/resumes').respond(function(method,url,data) {
			var params = angular.fromJson(data);
			var resume = resumeData.add(params);
			return [201,resume, {}];
		});
		$httpBackend.whenPOST('/account/register').respond(function(method, url, data) {
			var params = angular.fromJson(data);
			var user = usersData.createUser(data);
			if(user) {
				return [201, user, {}];
			}
			return [0, {}];

		});
		$httpBackend.whenPOST('/account/login').respond(function(method, url, data) {
			var params = angular.fromJson(data);
			var user = usersData.login(params);
			return [201, user, {}];
		});
		$httpBackend.whenPOST('/employer/job').respond(function(method,url,data) {
			var params = angular.fromJson(data);
			var data = jobData.add(params);
			return [201, data, {}];
		});
		$httpBackend.whenGET(/\/job\/\?/).respond(function(method,url,data) {
			var data = url.split('/')[2];
			data = data.slice(1,data.length);
			var key = data.split('=')[0];
			var value = data.split('=')[1];
			var obj = {};
			obj[key] = value;
			var result = jobData.search(obj);
			return [201, result, {}];
		});
		$httpBackend.whenPOST('/home').respond(function(method,url,data) {
			var user = usersData.findById(data);
			return [201, user, {}];
		});
		$httpBackend.whenPOST(/\/home\/\:/).respond(function(method,url,data) {
			var user = usersData.update(data);
			return [201, user, {}];
		});
		$httpBackend.whenGET('/account/logout').respond(function(method,url, data) {
			return [200, {}];
		})
		 $httpBackend.whenGET(/partials\/.*/).passThrough();

	}).
	run(function($rootScope, auth, session) {
		$rootScope.auth = auth;
		$rootScope.session = session;
	}).
	run(function($location, $rootScope) {
		var previousRouth;
		$rootScope.$on('$routeChangeStart', function(event, nextRouth, currentRouth) {
			if(nextRouth.logInRequired && !$rootScope.auth.isLoggedIn()) {
				previousRouth = $location.path();
				$location.path('/account/login').replace();
			}
			else if(previousRouth && $rootScope.auth.isLoggedIn()) {
				$location.path(previousRouth).replace
				previousRouth = null;
			}

		});
	})
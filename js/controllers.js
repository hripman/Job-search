angular.module("myApp.controllers",[]).
	controller("homeController", function($scope) {

	}).
	controller("resumeController", function($scope, resumeService) {
		var range =[];
		for(var i=1940; i<2030;++i)
			range.push(i);
		$scope.range = range;
		$scope.user = {};
		$scope.save = function() {
			resumeService.addResume($scope.user,'1');
		}
	}).
	controller('findController', function($scope, resumeService) {
		$scope.users = [];
		$scope.search = function() {
			$scope.users = resumeService.search($scope.searchJob,$scope.loc);
		}
	})
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
		$scope.privateNumber = function() {
			$scope.user.number = "private"; //???
		}
	}).
	controller('findController', function($scope, resumeService) {
		$scope.users = [];
		$scope.flag=false;
		$scope.searchResumes = function() {
			$scope.flag = true;
			$scope.users = resumeService.search($scope.searchJob,$scope.loc);
		};
		$scope.$watch('[searchJob, loc]', function(newVal) {
			$scope.flag = false
		})

	})
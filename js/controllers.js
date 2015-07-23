angular.module("myApp.controllers",[]).
	controller("homeController", function($scope) {

	}).
	controller("resumeController", function($scope, resumeService) {
		var range =[];
		for(var i=1940; i<2030;++i)
			range.push(i);
		$scope.range = range;
		$scope.user = {};
		$scope.profileForm =true;
		$scope.educationForm = false;
		$scope.workForm = false;

		$scope.hideProfile = function() {
			$scope.profileForm = false;
			$scope.educationForm = true;

		}

		$scope.hideEducation = function() {
			$scope.educationForm = false;
			$scope.workForm = true;
		}

		$scope.save = function() {
			resumeService.addResume($scope.user,'1');
		}
	
	}).
	controller('findController', function($scope, resumeService) {
		$scope.users = [];
		$scope.flag=false;
		$scope.searchResumes = function() {
			var options = {jobName:$scope.searchJob, city:$scope.loc}
			resumeService.search(options).then(function(response) {
				$scope.users = response.data;
			})
		};
		$scope.$watch('[searchJob, loc]', function(newVal) {
			$scope.flag = false
		})

	})
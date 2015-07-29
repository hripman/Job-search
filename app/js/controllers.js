angular.module("myApp.controllers",['flow']).
	controller('rootController', function($scope, $location, auth){
		$scope.logOut = function() {
			auth.logOut().then(function() {
				$location.path('/home');
			});
		}
	}).
	controller("homeController", ['$scope','$location', 'jobService','auth',
	 function($scope,$location, jobService, auth ) {
		$scope.findJob = function() {
			$location.path('/job/').search({jobTitle: $scope.job});
			
		};
		$scope.toAccount = function() {
			var userId = auth.getCurrentUserId();
			$location.path('/home/'+userId);
		}
	}]).
	controller("resumeController", function($scope, resumeService, auth) {
		var range =[];
		for(var i=1940; i<2030;++i)
			range.push(i);
		$scope.range = range;
		$scope.user = {};
		$scope.resumeView = false;
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
			var id = auth.getCurrentUserId();
			$scope.user['userId'] = id;
			resumeService.saveResume($scope.user).then(function(response) {
				console.log(response.data);
			});
			$scope.resumeView = true;
		};

		$scope.edit = function() {
			$scope.resumeView = false;
			$scope.workForm = false;
			$scope.profileForm =true;

		}
	
	}).
	controller('findController', function($scope, resumeService) {
		$scope.users = [];
		$scope.flag=false;
		$scope.searchJob = '';
		$scope.loc = '';
		$scope.short = true;
		$scope.searchResumes = function() {
			var options = {jobKey:$scope.searchJob, locKey:$scope.loc}
			resumeService.search(options).then(function(response) {
				$scope.users = response.data;
				$scope.flag = true;
			})

		};
		$scope.viewAllResume = function() {
			$scope.users;
			$scope.short = false;
		}
		$scope.$watch('[searchJob, loc]', function(newVal) {
			$scope.flag = false
		})

	}).
	controller('loginController', ['$scope', '$location', 'auth', 
		function($scope, $location, auth) {
			$scope.error = false;
			$scope.createAccount = function(path) {
				$location.path(path);
			}
			$scope.logIn = function() {
				auth.logIn($scope.credentials).then(function(response) {
				if(response.data)
					$location.path('/home/'+response.data.userId);
				else
					$scope.error = true;
				})
			}
	}]).
	controller('registerController',['$location', '$scope', 'registerService',
	 function($location, $scope,registerService) {
		$scope.user = {};
		
		$scope.signUp = function() {

			$scope.easyPass = false;
			$scope.shortPass = false;
			$scope.usedEmail = false;
			
			if($scope.easy == true) {
				$scope.easy = false;
				$scope.easyPass = true;
				return;
			}
			if($scope.min == true) {
				$scope.min = false;
				$scope.shortPass = true;
				return;
			}
			$scope.user['role'] = "user";
			registerService.saveUser($scope.user).then(function(response) {
				$location.path('account/login');
			},function(error){
				$scope.usedEmail = true;
			});
		}
	}]).
	controller('jobController', function($scope,jobService, auth) {
		$scope.minLength = false
		$scope.view = false;
		$scope.save = function() {
			if(!$scope.employer.description) {
				$scope.minLength = true;
				return;
			}
			$scope.minLength = false;
			$scope.view = true;
		};
		$scope.postJob = function() {
			var id = auth.getCurrentUserId();
			$scope.employer['id'] = id;
			jobService.saveJob($scope.employer).then(function(response) {
				console.log(response.data);
			}) 
		};
		$scope.edit = function() {
			$scope.view = false
		}
	}).
	controller('accountController', 
	function($scope, $routeParams, auth,resumeService) {
		$scope.register = false;
		var id = $routeParams.id;
		$scope.noResume = false;
		auth.getUserById(id).then(function(response) {
			$scope.user = response.data;
			$scope.temp = response.data;
		});
		resumeService.searchById(id).then(function(response) {
			$scope.resume = response.data;
			if(!response.data)
				$scope.noResume = true;
		});

		$scope.viewRegister = function() {
			$scope.register = true;
		}
		$scope.save = function() {
			auth.update($scope.user).then(function(response) {
				$scope.register = false;
			})
		}
	}).
	controller('jobViewController', function($scope,$routeParams, jobService) {
		var param = $routeParams;
		$scope.jobs = [];
		jobService.search(param).then(function(response) {
				$scope.jobs = response.data;
			});

	})

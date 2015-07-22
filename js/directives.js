angular.module("myApp.directives",[]).
	directive("resume", function() {
		return {
			restrict: "E",
			scope: true,
			templateUrl: "partials/resumeTemp.html",
			link: function(scope,element, attr) {
				var  endDate = angular.element(document.querySelector('#endDate')),
					 present = angular.element(document.querySelector('#present')),
					 profile = angular.element(document.querySelector('#profile')),
					 education = angular.element(document.querySelector('#education')),
					 work = 	angular.element(document.querySelector('#work'));
					 profLi = angular.element(document.querySelector('#profileLi'));
 					 educLi = angular.element(document.querySelector('#educationLi'));
 					 workLi = angular.element(document.querySelector('#workLi'));



				scope.lockYear = false;
				scope.$watch('lockYear',function(value) {
					
					if(value == false) {
						endDate.removeClass('invisible');
						present.addClass('invisible');
					}
					else {
						endDate.addClass('invisible');
						present.removeClass('invisible');
					}
				});

				element.bind("submit", function(e) {
					if($(e.target).hasClass('profileForm')) {
						profile.addClass('invisible');	
						education.removeClass('invisible');
						profLi.removeClass('activeBorder');
						educLi.addClass('activeBorder');
					}
					if($(e.target).hasClass('educationForm')) {
						education.addClass('invisible');	
						work.removeClass('invisible');
						educLi.removeClass('activeBorder');
						workLi.addClass('activeBorder');
					}
				});
				
			}
 		}
	})
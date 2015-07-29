angular.module("myApp.directives",[]).
	directive('password', function() {
		return {
			restrict: 'E',
			scope: {
				medium:  '=', 
				easy:    '=',
				strong:  '=',
				min   :  '=',
				pass: '='
			},
			template: '<label for="inputPassword">Password</label>'+
			'<input name="password" type="password" class="form-control"id="inputpassword" ng-model="pass" placeholder="Password" required>'+
			'<div ng-show="min">Password is too short, it\'s length must be minimum 6</div>'+
			'<div ng-show="easy">Password strength:Easy <img src="./img/pass1.png">'+
			'</div><div ng-show="medium">Password strength: Medium <img src="./img/pass2.png">'+
			'</div><div ng-show="strong">Password strength: Strong<img src="./img/pass3.png"></div>',

		    link: function(scope,el,attr) {
		    	regEasyLetter = new RegExp('[a-zA-Z]');
		    	regEasyNumber = new RegExp('[0-9]');
		    	regAnyCharacter = new RegExp(/\W/);
		    	scope.$watch('pass',function(val) {
		    		if(val) {
			    		if(scope.pass.length<6) {
			    			scope.min=true;

			    			scope.easy = false;
			    			scope.medium = false;
			    			scope.strong = false;
			    		}
			    		else {
			    			scope.min = false;
			    			if(regEasyNumber.test(scope.pass) || regEasyLetter.test(scope.pass)) {
				    		scope.easy = true;
							scope.medium = false;
				    		scope.strong = false;
					    	}
					    	if(regEasyNumber.test(scope.pass) && 
					    		regEasyLetter.test(scope.pass)) {
					    		scope.medium = true;
								scope.strong = false;
					    		scope.easy = false;
					    	}
					    	if(regEasyNumber.test(scope.pass) && 
					    		regEasyLetter.test(scope.pass) && regAnyCharacter.test(scope.pass)) {
					    		scope.strong = true;
								scope.medium = false;
					    		scope.easy = false;
					    	}
			  	  		}
		    		}
		    		else {
		    			scope.min = false;
		    			scope.easy = false;
		    			scope.medium = false;
		    			scope.strong = false;
		    		}
		    		
		    	})
		    }
		}
	}).
	directive('resumeView', function() {
		return {
			restrict: 'E',
			scope: {
				user: '=',
				out : '@'
			},
			templateUrl : 'partials/resumeView.html',
		}
			
	}).
	directive('registerForm', function() {
		return {
			restrict: 'E',
			scope: {
				user: '=',
				form: '@'
			},
			templateUrl: 'partials/registerForm.html'
		}
	}).
	directive('jobView', function() {
		return {
			restrict:'E',
			scope: {
				employer: '=',
			},
			template: 	"<div><strong>{{employer.jobTitle}}</strong></div>"+
						"<div>{{employer.company}} - {{employer.country}},{{employer.city}}</div>"+
						"<div>{{employer.description}}</div>"+
						"<div ng-show='employer.experience'><strong>Required Experience</strong>"+
						"<div>{{employer.experience}} - {{employer.expYears}}</div>"+
						"</div>"+
						"<div><strong>Required Education Degree</strong>"+
						"<div>{{employer.educationDegree}}</div>"+
						"</div>"+
						"<div ng-show='employer.languages'><strong>Required languages</strong>"+
						"<div>{{employer.languages}}</div>"+
						"</div>"+
						"<div><strong>Contact</strong></div>"+
						"<div>Email - {{employer.email}}</div>"+
						"<div>Phone Number - {{employer.number}}</div>"
		}
	})
	
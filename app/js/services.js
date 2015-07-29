angular.module('myApp.services',[])
	.factory('resumeData',function() {
		this.data = [
			{
				userId:1,
				city: "Yerevan",
				country: "Armenia",
				degree: "Bachelor's",
				email: "hrips12@mail.ru",
				endYear: "2012",
				lastName: "Manukyan",
				name: "Hripsime",
				phone: "098256253",
				phoneNumberPublic: false,
				school: "133",
				skills: "C++ javascript html css",
				startYear: "2001",
				study: "Computer Scince"
				
			},
	
		];

		this.getAllResumes = function() {
			return this.data;
		}
		this.findOne = function(userId) {

			var data = $.grep(this.getAllResumes(), function(el, index) {
				return(el.userId == userId);
			});
			return data[0];
		}
		this.add = function (resume) {
			var ind;
			var data = $.grep(this.getAllResumes(), function(el, index) {
				if(el.userId == resume.userId) {
					ind = index;
					return true;
				}
				else
					return false;

			});
			if(data.length)
				this.data[ind] = resume;
			else
				this.data.push(resume);
			return resume;
		}
		this.findByData = function(options) {
			var data = $.grep(this.getAllResumes(), function(el, index) {
				var result = true
				$.each(options, function(key,value) {
					// var exp = '\b'+value+'\b|\b'+value+',\b|^'+value+'\b|\b'+value+'$\|^'+value+'$';
					if(value) {
						if( el['jobName'] != value && el['company'] != value &&
						    el['city'] != value && el['country'] != value &&
						    el['skills'].indexOf(value) == -1) {
							result = false;
							return false; //skills don't work
						}
					}
				});
				return result;
			});	
			return data;
		}
		return this;
	}).
	factory('jobData', function() {
		this.data = [];
		this.getAllData = function() {
			return this.data;
		};
		this.add = function(job) {
			this.data.push(job);
			return job;
		};
		this.search = function(params) {
			var data = $.grep(this.getAllData(), function(el,index){
				var result = true;
				$.each(params, function(key, value) {
					if(el[key] != value) {
						result = false;
						return false;
					}
				});
				return result;  
			});
			return data;
		}
		return this;
	}).
	factory('usersData', function() {
		this.data = [
			{
				'name': 'Hripsime',
				'lastName': 'Manukyan',
				'email': 'hrips12@mail.ru',
				'password': '123456',
				'role' : 'user',
				'userId':'1'
			
			}
		];
		this.session = null;
		this.getAllUsers = function() {
			return this.data;
		}

		this.getUser = function(userId) {
			var data = $.grep(this.getAllUsers(), function(el,index){
				return el['userId'] == userId;
			});
			return data;
		};
		this.createUser = function(user) {
				
				var id = this.id();
				var user = angular.fromJson(user);
				var data = $.grep(this.getAllUsers(),function(el,index) {
					return el.email == user.email;
				});

				if(!data.length) {
					user.userId = id;
					this.data.push(user);
					return user;
				}
				else {
					return;
				}	
			
		};

		this.setSessionUser = function(user) {
			this.session = user;
			return this;
		};

		this.getSessionUser = function() {
			return this.session
		}

		this.login = function(credentials) {
			var data = $.grep(this.getAllUsers(), function(el, index) {
				return el.email == credentials.email && el.password == credentials.password; 
			});
			return data[0];
		}
		this.findById = function(id) {
			var data = $.grep(this.getAllUsers(), function(el, index) {
				return el.userId == id; 
			});
			return data[0];
		}
		this.update = function(user) {
			var ind;
			var user = angular.fromJson(user);
			var data = $.grep(this.getAllUsers(), function(el, index) {
				if(el.userId == user.userId) {
					ind = index;
					return true;
				}
				else
					return false;
			});
			this.data[ind] = user;
			return user;
		}
		this.id = function() {
			var date = new Date();
			var id = date.getMilliseconds()+"";
			return id;
		}
		return this;
	}).
	factory('resumeService', function ($http) {
		var resumeAPI = {
			getAll: function () {
				return $http.get('/resumes');
			},
			search: function (option) {
				var data="";
				for (var key in option) 
					data += key+'='+option[key]+'&';
				
				data = data.slice(0,data.length-1);
				return $http.get('/resumes/search/?'+data);
			},
			searchById: function(id) {
				return $http.get('/resumes/?'+id)
			},
			saveResume: function(data) {
				return $http.post('/resumes', data);
			}
		}
		return resumeAPI;
	}).
	factory('jobService', function($http) {
		var jobAPI = {
			saveJob: function(data) {
				return $http.post('/employer/job', data);
			},
			search: function(option) {
				var data="";
				for (var key in option)
					data +=key+'='+option[key];

				return $http.get('/job/?'+data);
			}
		};

		return jobAPI;
	}).
	factory('registerService', function($http) {
		var registerAPI = {
			saveUser: function(data) {
				return $http.post('/account/register',data);
			}
		}
		return registerAPI;
	}).
	factory('auth', function($http, session) {
		var authApi = {
			logIn: function(credentials) {
				return $http.post('/account/login', credentials)
					.then(function(response) {
						var user = response.data;
						session.setUser(user);
						return response;
					});
			},
			logOut: function() {
				return $http.get('/account/logout')
					.then(function(response) {
						session.destroy();
					});
			},
			isLoggedIn: function() {
				return session.getUser() != null;
			},
			getCurrentUserId: function() {
				return session.getUser()['userId'];
			},
			getUserById: function(id) {
				return $http.post('/home',id);
			},
			update: function(user) {
				return $http.post('/home/:'+user.userId,user);
			}
		}
		return authApi;
	}).
	factory('session', function(usersData) {
		this.user = angular.fromJson(usersData.getSessionUser());
		this.getUser = function() {
			return this.user;
		};
		this.setUser = function(user) {
			this.user = user;
			usersData.setSessionUser(angular.toJson(user));
			return this;
		};
		this.destroy = function() {
			this.setUser(null);
		};
		return this;
	})				

	
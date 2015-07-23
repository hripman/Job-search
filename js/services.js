angular.module('myApp.services',[])
	.factory('resumeData',function() {
		this.data = [
			{
				userId:1,
				city: "Erevan",
				company: "macadamian",
				country: "Armenia",
				degree: "Bachelor's",
				email: "hrips12@mail.ru",
				endYear: "2012",
				jobName: "js developer",
				lastName: "Manukyan",
				name: "Hripsime",
				phone: "098911915",
				phoneNumberPrivate: true,
				respons: "sdsdass",
				school: "133",
				skills: "C++, javascript, html, css",
				startYear: "2001",
				study: "Computer Scince",
				usedSkills: "sdasdas",
				workCity: "Yerevan",
				workEndYear: "2016",
				workStartYear: "2015"
			}
		];

		this.getAllResumes = function() {
			return this.data;
		}
		this.findOne = function(userId) {
			var data = $.grep(this.getAllResumes(), function(el, index) {
				return(el.userId == userId);
			});
			return data;
		}
		this.find = function(options) {
			var data = $.grep(this.getAllResumes(), function(el, index) {
				var flag = true;
				$.each(options, function(key,value) {
					if(el[key] != value) {
						flag = false;
						return false
					}
					return flag;
				})

			});
		}
		return this;
}).
	factory('resumeService', function ($http) {
		var resumeAPI = {
			getAll: function () {
				return $http.get('/resumes');
			}
		}
		var resumeAPI = {
			search: function (option) {

				return $http.get('/resumes/search/');
			}
		}
		return resumeAPI;
	})	

	
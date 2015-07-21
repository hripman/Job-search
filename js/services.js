angular.module('myApp.services',[])
	.factory('resumeService',function() {
		var resumeAPI = {};
		resumeAPI.resumesList = {};

		resumeAPI.addResume = function(resume,userId) {
			resumeAPI.resumesList[userId] = resume;
		};

		resumeAPI.search = function(work, loc) {
			var userList = [];
			var list = resumeAPI.resumesList;

			for(var key in list) {
					if(work == list[key]['jobName'] 
						 || work == list[key]['company'] 
						 || (list[key]['skills']&& list[key]['skills'].indexOf(work)!=-1 )) {
						if(loc) {
							if(loc == list[key]['city'])
								userList.push(list[key]);
							else
								continue;
						}
						else
							userList.push(list[key]);
					}
			}
			return userList;

		}
		return resumeAPI;
	})
	
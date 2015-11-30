var app = angular.module('instaCollection.services', []);

app.service('services', ['$http', '$location', function($http, $location){

	var pix;
	var currentTag = '';
	
	// $http request to instagram
	this.pictureRequest = function(user, paginate) {
		var start = Date.UTC(2015, 11, 10);
		var end = Date.UTC(2015, 11, 12);
		var tagName = user.hash;

		currentTag = tagName;
		var info = {
			url: 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?MIN_TAG_ID=' + end +'&MAX_TAG_ID=' + start + '&access_token=229640308.1677ed0.4dff4b9c682a4d73986f679cf7517752&callback=JSON_CALLBACK'
		};

		if (paginate) {
			info.url = pix.pagination.next_url;

			// Instagram api route doesn't support jsonp?
			$http({
				method: 'GET',
				url: info.url
			}).success(function(data, status){
				console.log(data)
			}).error(function(data, status){
				console.log(status);
			})
		} else {
			console.log(info.url)
			$http.jsonp(info.url).success(function (data, status) {
				console.log(data)
	      pix = data;
	      if ($location.url() !== '/pictures') {
	        $location.path('/pictures');
	      }
	    }).error(function (data, status) {
	        console.log(data,status);
	    });
		}


	};

	this.loadPictures = function(scope) {
		$scope = scope;
		
		$scope.tag = currentTag;
		$scope.pictures = pix.data;
	};

	this.sendUser = function(user) {
		$http({
			url: '/userinfo',
			method: 'POST',
			data: user
		}).then(function successCallback(response){
			console.log("success", response);
			if (response.data) {
				console.log("here")
				// Reroute to collection page
				$location.path('/landing');
			} else {
				// Stay on page
			}
		}, function errorCallback(response){
			console.log("Err");
		})
	};

	this.addCollection = function(pixInfo) {
		console.log("clicked")
		$http({
			url: '/addCollection',
			method: 'POST',
			data: pixInfo
		}).then(function successCallback(response){
			console.log("Added to Collection", response);
		}, function errorCallback(response){
			console.log("Error adding to collection");
		})
	};

	this.auth = function(cb) {
		$http({
			url: '/auth',
			method: 'GET',
		}).then(function successCallback(response){
			if (response.data.username) {
				cb(response.data.username);
				// return true;
			}	else {
				cb(false);
			}
			return;
		}, function errorCallback(response){
			console.log("Err");
		})
	};

	this.fetchCollection = function(cb) {
		$http({
			method: 'GET',
			url: '/collection'
		}).then(function(result){
			cb(result);
		})
	};


}])
var app = angular.module('instaCollection.services', []);

app.service('services', ['$http', '$location', function($http, $location){

	var tagName = '';
	
	// $http request to instagram
	this.pictureRequest = function(user, paginate, key, cb) {
		var start = Date.UTC(2015, 11, 10);
		var end = Date.UTC(2015, 11, 12);
		var access = key;
		tagName = user.hash;

		var info = {
			url: 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?MIN_TAG_ID=' + end +'&MAX_TAG_ID=' + start + '&access_token=' + access +'&callback=JSON_CALLBACK'
		};

		if (paginate) {
			info.url = pix.pagination.next_url + '&callback=JSON_CALLBACK';
			
			$http({
				method: 'JSONP',
				url: info.url
			}).success(function(data, status){
				sessionStorage.setItem('pix', data);
				cb();
			}).error(function(data, status){
				console.log("error", status);
			})
		} else {
			$http.jsonp(info.url).success(function (data, status) {
	      pix = JSON.stringify(data);
	      sessionStorage.setItem('pix', pix);
	      if ($location.url() !== '/pictures') {
	        $location.path('/pictures');
	      }
	    }).error(function (data, status) {
	        console.log(data,status);
	    });
		}


	};

	this.loadPictures = function(scope) {
		var tempPix = sessionStorage.getItem('pix');
		tempPix = JSON.parse(tempPix);
		$scope = scope;
		
		$scope.tag = tagName;
		// $scope.pictures = pix.data;
		$scope.pictures = tempPix.data;
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
		console.log("clicked", pixInfo)
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
			if (response.data) {
				cb(response.data);
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

	this.removeCollection = function(pic, cb) {
		console.log('pic--->', pic)
		$http({
			method: 'POST',
			url: '/delete',
			data: pic
		}).then(function(result){
			console.log("deleted", result)

			if(result) {
				// update the page 
				cb();
			}
		});
	}


}])
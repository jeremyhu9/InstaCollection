var app = angular.module('instaCollection.pictures', []);

app.controller('pictureCtrl', ['$scope', 'services', '$location', function($scope, services, $location){
	services.auth(function(response) {
		var username = response;
		if (!response.username) {
			$location.path('/login');
		} 
		
		var loadPix = function() {
			services.loadPictures($scope);
		}
		
		loadPix();

		$scope.addCollection = function(pix) {
			var pic = {
				imgurl: pix.images.standard_resolution.url,
				username: username.username,
				link: pix.link,
				uploader: pix.user.username
			};

			services.addCollection(pic);
		
		};

		$scope.loadMore = function() {
			services.pictureRequest(username, true, response.instagramkey, function(){
				console.log('loading')
				loadPix();
			});

		}

		
	});

	
}])
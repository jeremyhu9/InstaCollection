var app = angular.module('instaCollection.pictures', []);

app.controller('pictureCtrl', ['$scope', 'services', '$location', function($scope, services, $location){
		var username = sessionStorage.getItem('user');
		var instagramkey = sessionStorage.getItem('instagramkey');
		
		var loadPix = function() {
			services.loadPictures($scope);
		}
		
		loadPix();

		$scope.addCollection = function(pix) {
			var pic = {
				imgurl: pix.images.standard_resolution.url,
				username: username,
				link: pix.link,
				uploader: pix.user.username
			};

			services.addCollection(pic);
		
		};

		$scope.loadMore = function() {
			services.pictureRequest(username, true, instagramkey, function(){
				console.log('loading')
				loadPix();
			});

		}


	
}])
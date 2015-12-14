var app = angular.module('instaCollection.collection', []);

app.controller('collectionCtrl', ['$scope', 'services', '$location', function($scope, services, $location){
	services.auth(function(response) {
		var username = response.username;
		var fetchPix = function() {
			$scope.username = username;

			services.fetchCollection(function(result){
				var pix = result.data;
				
				$scope.pictures = pix;
			});
		}

		if (!username) {
			$location.path('/login');
		} else {
			
			fetchPix();

			$scope.removeItem = function(pic) {
				console.log(pic)
				//TODO: Make it delete item
				var picInfo = {
					username: pic.username,
					imgurl: pic.imgurl
				}

				services.removeCollection(picInfo, fetchPix);
			};

			$scope.loadMore = function() {
				//TODO: Implement pagination
			}
		}
	});

}]);
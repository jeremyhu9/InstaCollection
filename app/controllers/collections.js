var app = angular.module('instaCollection.collection', []);

app.controller('collectionCtrl', ['$scope', 'services', '$location', function($scope, services, $location){
	services.auth(function(response) {
		var username = response;

		if (!username) {
			$location.path('/login');
		} else {
			$scope.username = username;

			services.fetchCollection(function(result){
				var pix = result.data;
				
				$scope.pictures = pix;
			});

			$scope.removeItem = function() {
				//TODO: Make it delete item
			};

			$scope.loadMore = function() {
				//TODO: Implement pagination
			}
		}
	});

}]);
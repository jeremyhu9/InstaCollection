var app = angular.module('instaCollection.collection', []);

app.controller('collectionCtrl', ['$scope', 'services', '$location', function($scope, services, $location){
	var username = sessionStorage.getItem('user');
	var fetchPix = function() {
		console.log(username)
		$scope.username = username;

		services.fetchCollection(function(result){
			var pix = result.data;
			
			$scope.currentPage = 0;
			$scope.pageSize = 6;
			$scope.pictures = pix;
			$scope.numberOfPages = Math.ceil($scope.pictures.length/$scope.pageSize);
			
		});
	}

		
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
	


}]);
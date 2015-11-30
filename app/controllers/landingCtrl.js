var app = angular.module('instaCollection.landing', []);

app.controller('landingCtrl', ['$scope', 'services', '$location', function($scope, services, $location) {
	services.auth(function(response) {
		if (!response) {
			$location.path('/login');
		} 

		$scope.submit = function(user) {
			services.pictureRequest(user, false, response.instagramkey);
		}

		$scope.viewCollections = function() {
			$location.path('/collections');
		}
		
	});



}])
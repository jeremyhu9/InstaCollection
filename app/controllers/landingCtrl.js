var app = angular.module('instaCollection.landing', []);

app.controller('landingCtrl', ['$scope', 'services', '$location', function($scope, services, $location) {
		var instagramkey = sessionStorage.getItem('instagramkey');
		
		$scope.submit = function(user) {
			services.pictureRequest(user, false, instagramkey);
		}

}])
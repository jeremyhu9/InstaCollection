var app = angular.module('instaCollection.login', []);

app.controller('loginCtrl', ['$scope', 'services', '$location', function($scope, services, $location){
	services.auth(function(response) {
		if (response.username) {
			$location.path('/landing');
		} 
	});

	$scope.submit = function(user) {
		services.sendUser(user);
	}

	$scope.signUp = function() {
		$location.path('/signup');
	}
}]);
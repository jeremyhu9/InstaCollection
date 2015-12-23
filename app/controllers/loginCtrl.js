var app = angular.module('instaCollection.login', []);

app.controller('loginCtrl', ['$scope', 'services', '$location', function($scope, services, $location){
	$scope.submit = function(user) {
		services.sendUser(user);
	}

	$scope.signUp = function() {
		$location.path('/signup');
	}
}]);
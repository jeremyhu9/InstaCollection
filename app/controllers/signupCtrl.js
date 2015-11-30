var app = angular.module('instaCollection.signup', []);

app.controller('signupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.submit = function(user) {
		$http({
			method: 'POST',
			url: '/signup',
			data: user
		}).then(function success(results) {
			console.log(results);
			$location.path('/login');
		}, function error(){
			console.log("Error submitting user info")
		});
	}
}])
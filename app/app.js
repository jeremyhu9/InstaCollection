var app = angular.module('instaCollection', [
	'instaCollection.landing',
	'ui.router',
	'instaCollection.services',
	'instaCollection.pictures',
	'instaCollection.login',
	'instaCollection.signup',
	'instaCollection.collection'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");

	$stateProvider
	  .state('landing', {
	    url : '/landing',
	    controller: 'landingCtrl',
	    templateUrl: '/views/landing.html'
	  })
	  .state('pictures', {
	  	url: '/pictures',
	  	controller: 'pictureCtrl',
	  	templateUrl: 'views/picture.html'
	  })
	  .state('/login', {
	  	url: '/login',
	  	controller: 'loginCtrl',
	  	templateUrl: 'views/login.html'
	  })
	  .state('/collections', {
	  	url: '/collections',
	  	controller: 'collectionCtrl',
	  	templateUrl: 'views/collections.html'
	  })
	  .state('/signup', {
	  	url: '/signup',
	  	controller: 'signupCtrl',
	  	templateUrl: 'views/signup.html'
	  })
	  .state('/logout', {
	  	url: '/logout',
	  	controller: 'logoutCtrl',
	  })

}]);

app.filter('startFrom', function(){
	return function(input, start) {
		if(input) {
			start = +start;
			return input.slice(start);
		}
	}
})

//Checks if user is authenticated when changing routes
app.run(['$rootScope', '$location', function($rootScope, $location){
	$rootScope.$on('$locationChangeStart', function(event){
		console.log("authorization:---->", $rootScope.authorized)
		if (!$rootScope.authorized) {
			$location.path('/login');
		} 
	})
}])
var app = angular.module('instaCollection', [
	'instaCollection.landing',
	'ui.router',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
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

}]);

// Checks if user is authenticated when changing routes
// app.run(['$rootScope', '$location', function($rootScope, $location){
// 	$rootScope.$on('$routeChangeStart', function(event){
// 		console.log("working")
// 		// if (!Auth.isLoggedIn()) {
// 	 //    console.log('DENY');
// 	 //    event.preventDefault();
// 	 //    $location.path('/login');
//   //   }
//   //   else {
//   //     console.log('ALLOW');
//   //     $location.path('/landing');
//   //   }
//   $location.path('/landing');
// 	})
// }])
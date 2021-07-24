angular.
  module('userApp').
  config(['$routeProvider', '$locationProvider',
    function config($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          template: '<balance></balance>'
        }).
        when('/login', {
          template: '<login></login>'
        }).
        when('/register', {
          template: '<register></register>'
        });

      $locationProvider.html5Mode(true);
    }
  ]);
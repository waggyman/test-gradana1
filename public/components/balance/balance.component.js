angular.
  module('userApp').
  component('balance', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'components/balance/balance.template.html',
    controller: function BalanceController($scope, $http, $window) {
      $scope.currentBalance = 1000000;
      $scope.user = $window.localStorage.getItem('user');
      if (!$scope.user) {
        $window.location.href = '/login';
        console.log("EMPTY!");
      }
      $scope.user = JSON.parse($scope.user);
      $scope.histories = [
        {
          value: 200000,
          date: new Date
        },
        {
          value: 200000,
          date: new Date
        },
        {
          value: 200000,
          date: new Date
        }
      ];

      $scope.signout = () => {
        $window.localStorage.clear()
        $window.location.href = '/login'
      }
    }
  });
angular.
  module('userApp').
  component('balance', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'components/balance/balance.template.html',
    controller: function BalanceController($scope, $http, $window) {
      $scope.currentBalance = 1000000;
      $scope.user = $window.localStorage.getItem('user');
      $scope.histories = [];
      if (!$scope.user) {
        $window.location.href = '/login';
        console.log("EMPTY!");
      }


      $http.get('/refresh', {headers: {"x-userinfo": $scope.user}}).then((response) => {
        console.log("RES", response);
        $scope.user = response.data;
        $scope.histories = response.data.histories;
      }, (error) => {
        console.error("ERROR", error)
      });

      $scope.signout = () => {
        $window.localStorage.clear()
        $window.location.href = '/login'
      }
    }
  });
angular.
  module('userApp').
  component('login', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'components/login/login.template.html',
    controller: function LoginController($scope, $http, $window) {
      this.user = {};
      $scope.success = false;
      $scope.error = false;
      // submit
      $scope.submit = (data) => {
        $http.post('/authenticate', data).then((response) => {
          $scope.success = true;

          console.log("RES", response);
          $window.localStorage.setItem('user', JSON.stringify(response.data));
          $window.location.href = '/'
        }, (error) => {
          console.error("ERR", error)
        }).catch(err => {
          console.log(err);
        })
      }
    }
  });
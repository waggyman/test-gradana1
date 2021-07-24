angular.
  module('userApp').
  component('register', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'components/register/register.template.html',
    controller: function RegisterController($scope, $http, $window, $timeout) {
      $scope.user = {};
      $scope.success = false;
      $scope.error = false;
      // submit
      $scope.submit = (data) => {
        $http.post('/store', data).then((response) => {
          // show alert successfully saved
          $scope.success = true;
          console.log("RES", response);
          $window.localStorage.setItem('user', JSON.stringify(response.data));
          $window.location.href = '/'
        }, (error) => {
          if (error.data.errors.length > 0) {
            $scope.user.password = "";
            $scope.error = true;
            $scope.errorMessage = error.data.errors[0].msg;
            $timeout(function() {
              $scope.error = false;
            }, 3000)
          }
          console.error("ERR", error)
        }).catch(err => {
          console.log(err);
        })
      }
    }
  });
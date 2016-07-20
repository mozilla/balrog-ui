angular.module("app").controller("NewRuleScheduledChangeCtrl",
function($scope, $http, $modalInstance, CSRF, Releases, Rules, scheduled_changes, sc) {
  $scope.names = [];
  Releases.getNames().then(function(names) {
    $scope.names = names;
  });
  $scope.channels = [];
  Rules.getChannels().success(function(response) {
    $scope.channels = response.channel;
  });
  $scope.products = [];
  Rules.getProducts().success(function(response) {
    $scope.products = response.product;
  });

  $scope.is_edit = false;
  $scope.scheduled_changes = scheduled_changes;
  $scope.sc = sc;
  $scope.errors = {};
  $scope.saving = false;

  $scope.saveChanges = function() {
    $scope.saving = true;
    $scope.errors = {};
    // TODO: convert sc.when to timestamp value
    CSRF.getToken()
    .then(function(csrf_token) {
      sc = angular.copy($scope.sc);
      Rules.addScheduledChange(sc, csrf_token)
      .success(function(response) {
        $scope.sc.sc_data_version = 1;
        $scope.sc.sc_id = response.sc_id;
        $scope.scheduled_changes.push($scope.sc);
        $modalInstance.close();
      })
      .error(function(response, status) {
        if (typeof response === 'object') {
          $scope.errors = response;
          sweetAlert(
            "Form submission error",
            "See fields highlighted in red.",
            "error"
          );
        }
      })
      .finally(function() {
        $scope.saving = false;
      });
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

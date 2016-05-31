/*global sweetAlert */
angular.module('app').controller('EditRuleScheduledChangeCtrl',
function ($scope, $modalInstance, CSRF, Rules, Releases, sc) {

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

  $scope.is_edit = true;
  $scope.original_sc = sc;
  $scope.sc = angular.copy(sc);
  $scope.errors = {};
  $scope.saving = false;

  $scope.saveChanges = function () {
    $scope.saving = true;

    CSRF.getToken()
    .then(function(csrf_token) {
      Rules.updateScheduledChange($scope.sc.sc_id, $scope.sc, csrf_token)
      .success(function(response) {
        $scope.sc.sc_data_version = response.new_data_version;
        angular.copy($scope.sc, $scope.original_sc);
        $scope.saving = false;
        $modalInstance.close();
      })
      .error(function(response) {
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

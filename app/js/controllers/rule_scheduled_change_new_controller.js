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

  $scope.setWhen = function(newDate) {
    $("#dropdown")[0].classList.remove("open");
    if (newDate <= new Date()) {
      $scope.errors.when = ["Scheduled time cannot be in the past"];
    }
    else {
      $scope.errors.when = null;
    }
  };

  $scope.clearWhen = function () {
    $scope.sc.when = null;
    $scope.errors.when = null;
  };

  $scope.saveChanges = function() {
    $scope.saving = true;

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

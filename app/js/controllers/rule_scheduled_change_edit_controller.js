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
  $scope.calendar_is_open = false;
  $scope.sc_type = "time";

  $scope.toggleType = function(newType) {
    $scope.sc_type = newType;
    $("#btn_telemetry").toggleClass("active");
    $("#btn_time").toggleClass("active");
  };

  $scope.setWhen = function(newDate) {
    if (!newDate) {
      newDate = new Date($("#id_when")[0].value);
      $scope.sc.when = newDate;
    }
    $scope.calendar_is_open = false;
    if (newDate <= new Date()) {
      $scope.errors.when = ["Scheduled time cannot be in the past"];
      $scope.sc.when = $scope.original_sc.when;
    }
    else {
      $scope.errors.when = null;
    }
  };

  $scope.clearWhen = function () {
    $scope.sc.when = null;
    $scope.errors.when = null;
  };

  $scope.saveChanges = function () {
    $scope.saving = true;

    CSRF.getToken()
    .then(function(csrf_token) {
      if ($scope.sc_type === "time") {
        $scope.sc.telemetry_product = null;
        $scope.sc.telemetry_channel = null;
        $scope.sc.telemetry_uptake = null;
      }
      else {
        $scope.sc.when = null;
      }
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

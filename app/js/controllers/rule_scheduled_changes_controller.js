angular.module("app").controller("RuleScheduledChangesController",
function($scope, $routeParams, $location, $timeout, Rules, Search, $modal, $route, Releases) {

  $scope.loading = true;
  $scope.failed = false;

  Rules.getScheduledChanges()
  .success(function(response) {
    $scope.scheduled_changes = response.scheduled_changes;
  })
  .error(function() {
    console.error(arguments);
    $scope.failed = true;
  })
  .finally(function() {
    $scope.loading = false;
  });

  $scope.$watch("ordering_str", function(value) {
    $scope.ordering = value.value.split(",");
  });

  $scope.ordering_options = [
    {
      text: "When",
      value: "when"
    },
    {
      text: "Product, Channel",
      value: "product,channel"
    },
  ];

  $scope.ordering_str = $scope.ordering_options[0];

  $scope.currentPage = 1;
  $scope.pageSize = 10;

  $scope.highlightSearch = Search.highlightSearch;

  $scope.state_filter = [
    {
      text: "Active",
      value: "active",
    },
    {
      text: "Completed",
      value: "complete",
    },
  ];
  $scope.state_str = $scope.state_filter[0];

  $scope.filterBySelect = function(sc) {
    if ($scope.state_str.value === "complete" && sc.complete) {
      return true;
    }
    else if ($scope.state_str.value === "active" && !sc.complete) {
      return true;
    }
    return false;
  };

  $scope.openNewScheduledRuleChangeModal = function() {

    var modalInstance = $modal.open({
      templateUrl: 'rule_scheduled_change_modal.html',
      controller: 'NewRuleScheduledChangeCtrl',
      // size: 'sm',
      resolve: {
        scheduled_changes: function() {
          return $scope.scheduled_changes;
        },
        sc: function() {
          // blank new default rule
          return {
            product: '',
            backgroundRate: 0,
            priority: 0,
            update_type: 'minor',
          };
        }
      }
    });
  };

  $scope.openUpdateModal = function(sc) {
    var modalInstance = $modal.open({
      templateUrl: "rule_scheduled_change_modal.html",
      controller: "EditRuleScheduledChangeCtrl",
      resolve: {
        sc: function() {
          return sc;
        }
      }
    });
  };

  $scope.openDeleteModal = function(sc) {
    var modalInstance = $modal.open({
      templateUrl: "rule_scheduled_change_delete_modal.html",
      controller: "DeleteRuleScheduledChangeCtrl",
      resolve: {
        sc: function() {
          return sc;
        },
        scheduled_changes: function() {
          return $scope.scheduled_changes;
        }
      }
    });
  };
});

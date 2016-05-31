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
});

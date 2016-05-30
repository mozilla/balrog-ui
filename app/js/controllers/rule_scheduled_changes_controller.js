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
});

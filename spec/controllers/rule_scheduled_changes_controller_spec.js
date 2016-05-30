describe("controller: RuleScheduledChangesController", function() {
  beforeEach(function() {
    module("app");
  });

  beforeEach(inject(function($controller, $rootScope, $location, Rules, $httpBackend) {
    this.$location = $location;
    this.$httpBackend = $httpBackend;
    this.scope = $rootScope.$new();
    // this.redirect = spyOn($location, 'path');
    $controller('RuleScheduledChangesController', {
      $scope: this.scope,
      $location: $location,
      Rules: Rules
    });
  }));

  afterEach(function() {
    this.$httpBackend.verifyNoOutstandingRequest();
    this.$httpBackend.verifyNoOutstandingExpectation();
  });

  var sample_sc = {
    "count": 2,
    "scheduled_changes": [
      {
        "sc_id": 1,
        "scheduled_by": "anna",
        "when": 1234,
        "complete": false,
        "telemetry_product": null,
        "telemetry_channel": null,
        "telemetry_uptake": null,
        "data_version": 1,
        "base_rule_id": 2,
        "base_priority": 50,
        "base_mapping": "thebest",
        "base_backgroundRate": 100,
        "base_update_type": "minor",
        "base_product": "Fire",
        "base_version": null,
        "base_channel": "night",
        "base_buildTarget": "win",
        "base_buildID": null,
        "base_locale": null,
        "base_osVersion": null,
        "base_systemCapabilities": null,
        "base_distribution": null,
        "base_distVersion": null,
        "base_headerArchitecture": null,
        "base_comment": null,
        "base_whitelist": null,
        "base_alias": null,
        "base_data_version": 5,
      },
      {
        "sc_id": 2,
        "scheduled_by": "joseph",
        "when": null,
        "complete": false,
        "telemetry_product": "firefox",
        "telemetry_channel": "release",
        "telemetry_uptake": 50000,
        "data_version": 2,
        "base_rule_id": null,
        "base_priority": 100,
        "base_mapping": "firefox-1000.0",
        "base_backgroundRate": 100,
        "base_update_type": "minor",
        "base_product": "Fire",
        "base_version": null,
        "base_channel": "release",
        "base_buildTarget": null,
        "base_buildID": null,
        "base_locale": null,
        "base_osVersion": null,
        "base_systemCapabilities": null,
        "base_distribution": null,
        "base_distVersion": null,
        "base_headerArchitecture": null,
        "base_comment": null,
        "base_whitelist": null,
        "base_alias": null,
        "base_data_version": null,
      },
    ]
  };

  describe("fetching all scheduled changes", function() {
    it("should return all scheduled changes", function() {
      this.$httpBackend.expectGET("/api/scheduled_changes/rules")
      .respond(200, JSON.stringify(sample_sc));
      this.$httpBackend.flush();
      expect(this.scope.scheduled_changes.length).toEqual(2);
      expect(this.scope.scheduled_changes).toEqual(sample_sc.scheduled_changes);
    });
  });
});

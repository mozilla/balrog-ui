angular.module("app").factory('Rules', function($http) {
  // these routes map to stubbed API endpoints in config/server.js
  var service = {
    getRules: function() {
      return $http.get('/api/rules');
    },
    getChannels: function(){
      return $http.get('/api/rules/columns/channel');
    },
    getProducts: function(){
      return $http.get('/api/rules/columns/product');
    },

    getHistory: function(id) {
      return $http.get('/api/rules/' + id + '/revisions');
    },
    getRule: function(id) {
      return $http.get('/api/rules/' + id);
    },
    updateRule: function(id, data, csrf_token) {
      data.csrf_token = csrf_token;
      return $http.put('/api/rules/' + id, data);
    },
    deleteRule: function(id, data, csrf_token) {
      var url = '/api/rules/' + id;
      url += '?data_version=' + data.data_version;
      url += '&csrf_token=' + encodeURIComponent(csrf_token);
      return $http.delete(url);
    },
    addRule: function(data, csrf_token) {
      data.csrf_token = csrf_token;
      return $http.post('/api/rules', data);
    },
    revertRule: function(id, change_id, csrf_token) {
      var data = {change_id: change_id};
      data.csrf_token = csrf_token;
      return $http.post('/api/rules/' + id + '/revisions', data);
    },
  };
  return service;

});

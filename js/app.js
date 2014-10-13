(function() {
  window.PaperChase = angular.module("PaperChase", []);

}).call(this);

(function() {
  var f;

  f = function($scope, VoilaLeService) {
    var _i, _results;
    VoilaLeService.doStuff();
    $scope.myAttr = "attr";
    return $scope.numbers = (function() {
      _results = [];
      for (_i = 1; _i <= 100; _i++){ _results.push(_i); }
      return _results;
    }).apply(this);
  };

  PaperChase.controller("MainCtrl", ["$scope", "VoilaLeService", f]);

}).call(this);

(function() {
  var f;

  f = function($window) {
    console.log("initializing");
    return {
      doStuff: function() {
        return console.log("doing stuff");
      }
    };
  };

  PaperChase.service("VoilaLeService", ["$window", f]);

}).call(this);

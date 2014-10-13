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

(function() {
  describe("Nothing", function() {
    var $scope, ctrl;
    $scope = null;
    ctrl = null;
    beforeEach(function() {
      module("PaperChase");
      return inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        return ctrl = $controller("MainCtrl", {
          $scope: $scope
        });
      });
    });
    it("doesen't do anything", function() {
      return expect($scope.myAttr).toEqual("attr");
    });
    return it("does nothing", function() {
      var match, regex, str;
      expect(true).toEqual(true);
      regex = /((services|controllers)\/(.*))\.coffee/;
      str = "controllers/MainCtrl.coffee";
      return match = regex.exec(str);
    });
  });

}).call(this);

(function() {


}).call(this);

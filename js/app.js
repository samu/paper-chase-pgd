(function() {
  window.PaperChase = angular.module("PaperChase", []);

}).call(this);

(function() {
  var f, knownBeacons;

  knownBeacons = [
    {
      uuid: 'EBEFD083-70A2-47C8-9837-E7B5634DF524',
      identifier: 'ID_1',
      major: 97,
      minor: 97
    }, {
      uuid: 'EBEFD083-70A2-47C8-9837-E7B5634DF524',
      identifier: 'ID_1',
      major: 89,
      minor: 89
    }, {
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      identifier: 'ID_2',
      major: 22691,
      minor: 18317
    }, {
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      identifier: 'ID_2_2',
      major: 2944,
      minor: 41306
    }, {
      uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
      identifier: 'ID_3',
      major: 1628,
      minor: 1339
    }
  ];

  f = function($scope, VoilaLeService, IBeaconService, LogService) {
    var cb1, cb2, cb3, _i, _results;
    VoilaLeService.doStuff();
    $scope.myAttr = "attr";
    $scope.numbers = (function() {
      _results = [];
      for (_i = 1; _i <= 100; _i++){ _results.push(_i); }
      return _results;
    }).apply(this);
    LogService.info("going to call ibeacon service from mainctrl");
    cb1 = function(e) {
      return LogService.info(e);
    };
    cb2 = function(e) {
      return LogService.info(e);
    };
    cb3 = function(e) {
      return LogService.info(e);
    };
    return IBeaconService.initialize(knownBeacons, cb1, cb2, cb3);
  };

  PaperChase.controller("MainCtrl", ["$scope", "VoilaLeService", "IBeaconService", "LogService", f]);

}).call(this);

(function() {
  var createDelegate, f, initializeBeaconRegion;

  createDelegate = function(cb1, cb2, cb3) {
    return new cordova.plugins.locationManager.Delegate().implement({
      didDetermineStateForRegion: function(pluginResult) {
        cb1(pluginResult);
      },
      didStartMonitoringForRegion: function(pluginResult) {
        cb2(pluginResult);
      },
      didRangeBeaconsInRegion: function(pluginResult) {
        cb3(pluginResult);
      }
    });
  };

  initializeBeaconRegion = function(beacon) {
    return new cordova.plugins.locationManager.BeaconRegion(beacon.identifier, beacon.uuid, beacon.major, beacon.minor);
  };

  f = function(LogService) {
    return {
      initialize: function(beaconList, cb1, cb2, cb3) {
        var beacon, beaconRegion, _i, _len;
        if ((typeof cordova !== "undefined" && cordova !== null) && (cordova.plugins != null) && (cordova.plugins.locationManager != null)) {
          LogService.info("initializing ibeacons. list: ");
          LogService.info(beaconList);
          cordova.plugins.locationManager.setDelegate(createDelegate(cb1, cb2, cb3));
          for (_i = 0, _len = beaconList.length; _i < _len; _i++) {
            beacon = beaconList[_i];
            LogService.info("adding ibeacon " + beacon.identifier);
            beaconRegion = initializeBeaconRegion(beacon);
            cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion).fail(console.error).done();
            cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion).fail(console.error).done();
          }
          if (cordova.plugins.locationManager.requestWhenInUseAuthorization) {
            cordova.plugins.locationManager.requestWhenInUseAuthorization();
          }
        } else {
          return LogService.info("nope");
        }
      }
    };
  };

  PaperChase.service("IBeaconService", ["LogService", f]);

}).call(this);

(function() {
  var f;

  f = function($document) {
    return {
      info: function(text) {
        var el;
        el = document.getElementById("info");
        return el.innerHTML = text + "\n" + el.innerHTML;
      }
    };
  };

  PaperChase.service("LogService", ["$document", f]);

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

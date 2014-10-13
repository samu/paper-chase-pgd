knownBeacons = [{
  uuid: 'EBEFD083-70A2-47C8-9837-E7B5634DF524',
  identifier: 'ID_1',
  major: 97,
  minor: 97
} , {
  uuid: 'EBEFD083-70A2-47C8-9837-E7B5634DF524',
  identifier: 'ID_1',
  major: 89,
  minor: 89
} , {
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
  identifier: 'ID_2',
  major: 22691,
  minor: 18317
} , {
  uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
  identifier: 'ID_2_2',
  major: 2944,
  minor: 41306
} , {
  uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
  identifier: 'ID_3',
  major: 1628,
  minor: 1339
}]

niceLog = function(res) {
  console.log("nice log start");
  beacons = res["beacons"];
  for(var i = 0; i < beacons.length; i++) {
    beacon = beacons[i];
    id = beacon["major"];
    console.log("id:", id);
    el = document.getElementById(id + "_status");
    el.innerHTML = beacon["accuracy"] + ";" + beacon["rssi"] + ";" + beacon["proximity"];
  }
  console.log("nice log end");
}

initializeStuff = function() {
  delegate = new cordova.plugins.locationManager.Delegate().implement({
      didDetermineStateForRegion: function (pluginResult) {
        // logToDom(JSON.stringify(pluginResult));
        console.log("1");
      },

      didStartMonitoringForRegion: function (pluginResult) {
        // logToDom(JSON.stringify(pluginResult));
        console.log("2");
      },

      didRangeBeaconsInRegion: function (pluginResult) {
        niceLog(pluginResult);
      }
  });

  cordova.plugins.locationManager.setDelegate(delegate);

  for(var i = 0; i < knownBeacons.length; i++) {
    var knownBeacon = knownBeacons[i];
    // logToDom("initializing beacon: " + JSON.stringify(knownBeacon))
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
      knownBeacon.identifier,
      knownBeacon.uuid,
      knownBeacon.major,
      knownBeacon.minor
    );
    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
                                   .fail(console.error)
                                   .done();

    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
                                   .fail(console.error)
                                   .done();
  }

  cordova.plugins.locationManager.requestWhenInUseAuthorization();
}

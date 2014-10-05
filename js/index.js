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
}]

window.doScroll = false;

toggleScroll = function() {
  window.doScroll = !window.doScroll;
}

logToDom = function (message) {
};

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
  logToDom("before delegate");

  delegate = new cordova.plugins.locationManager.Delegate().implement({
      didDetermineStateForRegion: function (pluginResult) {
        logToDom("yo1");
        logToDom(JSON.stringify(pluginResult));
      },

      didStartMonitoringForRegion: function (pluginResult) {
        logToDom("yo2");
        logToDom(JSON.stringify(pluginResult));
      },

      didRangeBeaconsInRegion: function (pluginResult) {
        logToDom("yo3");
        niceLog(pluginResult);
      }
  });

  cordova.plugins.locationManager.setDelegate(delegate);

  for(var i = 0; i < knownBeacons.length; i++) {
    var knownBeacon = knownBeacons[i];
    logToDom("initializing beacon: " + JSON.stringify(knownBeacon))
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
      knownBeacon.identifier,
      knownBeacon.uuid,
      knownBeacon.major,
      knownBeacon.minor);
    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();

    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
        .fail(console.error)
        .done();
  }
  logToDom("the end");

  cordova.plugins.locationManager.requestWhenInUseAuthorization();
}

var app = {
    initialize: function() {
        this.bindEvents();
        logToDom("hello dom");
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        logToDom("device is ready");
        initializeStuff();
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// Major, Minor


// EBEFD083-70A2-47C8-9837-E7B5634DF524
// 97, 97
// 89, 89

// B9407F30-F5F8-466E-AFF9-25556B57FE6D
// 2944, 41306
// 22691, 18317



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
    // var e = document.createElement('label');
    // e.innerText = message;
    //
    // var br = document.createElement('br');
    // var br2 = document.createElement('br');
    // document.body.appendChild(e);
    // document.body.appendChild(br);
    // document.body.appendChild(br2);
    //
    // if(window.doScroll) {
    //   window.scrollTo(0, window.document.height);
    // }
};

niceLog = function(res) {
  // logToDom("----- START logging result");
  // logToDom("ID: " + res["region"]["identifier"]);
  // beacons = res["beacons"];
  // for(var i = 0; i < beacons.length; i++) {
  //   logToDom("Mi:" + beacons[i]["minor"] + "Ma:" + beacons[i]["major"]);
  //   logToDom("A:" + beacons[i]["accuracy"] + "R:" + beacons[i]["rssi"]);
  // }
  // logToDom("----- END logging result");
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
        // logToDom(pluginResult["beacons"][0]["accuracy"]);
        // logToDom(pluginResult["beacons"][0]["rssi"]);
      },

      didStartMonitoringForRegion: function (pluginResult) {
        logToDom("yo2");
        logToDom(JSON.stringify(pluginResult));
        // logToDom(pluginResult["beacons"][0]["accuracy"]);
        // logToDom(pluginResult["beacons"][0]["rssi"]);
      },

      didRangeBeaconsInRegion: function (pluginResult) {
        logToDom("yo3");
        niceLog(pluginResult);
        // logToDom(JSON.stringify(pluginResult));
        // logToDom("A:"+pluginResult["beacons"][0]["accuracy"]+"R:"+pluginResult["beacons"][0]["rssi"]);
        // logToDom();
      }
  });

  // logToDom("after delegate");
  //
  // var uuid = 'EBEFD083-70A2-47C8-9837-E7B5634DF524';
  // var identifier = 'beaconOnTheMacBooksShelf';
  // var minor = 97;
  // var major = 97;

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
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        logToDom("hello dom");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        logToDom("device is ready");
        initializeStuff();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    vibrate: function() {
      navigator.notification.vibrate( 1000 );
      logToDom("vibrate");
    }


};

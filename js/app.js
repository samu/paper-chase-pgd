var define, requireModule, require, requirejs;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requirejs = require = requireModule = function(name) {
  requirejs._eak_seen = registry;

    if (seen.hasOwnProperty(name)) { return seen[name]; }
    seen[name] = {};

    if (!registry[name]) {
      throw new Error("Could not find module " + name);
    }

    var mod = registry[name],
        deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(resolve(deps[i])));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;

    function resolve(child) {
      if (child.charAt(0) !== '.') { return child; }
      var parts = child.split("/");
      var parentBase = name.split("/").slice(0, -1);

      for (var i=0, l=parts.length; i<l; i++) {
        var part = parts[i];

        if (part === '..') { parentBase.pop(); }
        else if (part === '.') { continue; }
        else { parentBase.push(part); }
      }

      return parentBase.join("/");
    }
  };
})();

;define("appkit/aam",
  ["exports"],
  function(__exports__) {
    "use strict";
    var myOtherMethod;

    myOtherMethod = function() {
      return console.log("myOtherMethod from mod1 called!");
    };

    __exports__.myOtherMethod = myOtherMethod;
  });
;define("appkit/app",
  ["appkit/mod1","appkit/aam"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    console.log("going to require my modules");

    var myMethod = __dependency1__.myMethod;


    var myOtherMethod = __dependency2__.myOtherMethod;


    myMethod();

    myOtherMethod();
  });
;define("appkit/mod1",
  ["exports"],
  function(__exports__) {
    "use strict";
    var myMethod;

    myMethod = function() {
      console.log("my method");
      el = document.getElementById("97_status");
      el.innerHTML = "yep it worked";
      return console.log("myMethod from mod1 called!");
    };

    __exports__.myMethod = myMethod;
  });
;define("appkit/tests/test",
  [],
  function() {
    "use strict";
    describe("Nothing", function() {
      return it("doesen't do anything", function() {
        return console.log("hi");
      });
    });
  });
;define("appkit/tests/testHelper",
  [],
  function() {
    "use strict";
    requireModule("appkit/app");

    requireModule("appkit/tests/test");
  });

var app = {
    initialize: function() {
        this.bindEvents();
        console.log("initialize");
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        requireModule("appkit/app");
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

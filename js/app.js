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
      var el = document.getElementById("97_status");
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

define('data-cache',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DataCache = exports.DataCache = function DataCache() {
    _classCallCheck(this, DataCache);

    this.data = [{ id: 1, title: 'Aurelia Fundamentals' }, { id: 2, title: 'Data-Centric SPAs with BreezeJS' }];
    console.log('DataCache constructor');
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'aurelia-framework'], function (exports, _environment, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    _aureliaFramework.ViewLocator.prototype.convertOriginToViewUrl = function (origin) {
      var moduleId = origin.moduleId;
      var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
      return id.replace('viewmodels', 'views') + '.html';
    };

    aurelia.start().then(function () {
      return aurelia.setRoot('viewmodels/app');
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('viewmodels/app',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);
  };
});
define('viewmodels/event',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Event = exports.Event = function () {
    function Event() {
      _classCallCheck(this, Event);
    }

    Event.prototype.activate = function activate(bindingContext) {
      this.item = bindingContext;
    };

    return Event;
  }();
});
define('viewmodels/events',['exports', './../data-cache', 'aurelia-framework'], function (exports, _dataCache, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Events = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Events = exports.Events = (_dec = (0, _aureliaFramework.inject)(_dataCache.DataCache), _dec(_class = function Events(dataCache) {
    _classCallCheck(this, Events);

    this.events = dataCache.data;
  }) || _class);
});
define('viewmodels/sponsors',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Sponsors = exports.Sponsors = function Sponsors() {
        _classCallCheck(this, Sponsors);
    };
});
define('text!views/app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">Aurelia Fundamentals</a></div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li class=\"active\"><a href=\"#\">Events <span class=\"sr-only\">(current)</span></a></li><li><a href=\"#\">Discussion</a></li><li><a href=\"#\">Job Board</a></li></ul></div></div></nav><div class=\"container-fluid\"><div class=\"col-xs-10\"><compose view-model=\"viewmodels/events\"></compose></div><div class=\"col-xs-2\"><compose view-model=\"viewmodels/sponsors\"></compose></div></div></template>"; });
define('text!views/event.html', ['module'], function(module) { module.exports = "<template><div class=\"bg-success rbox\">${item.id} : ${item.title}</div></template>"; });
define('text!views/events.html', ['module'], function(module) { module.exports = "<template><div repeat.for=\"event of events\"><compose model.bind=\"event\" view-model=\"viewmodels/event\"></compose></div></template>"; });
define('text!views/sponsors.html', ['module'], function(module) { module.exports = "<template>Sponsors</template>"; });
//# sourceMappingURL=app-bundle.js.map
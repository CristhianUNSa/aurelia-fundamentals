define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Aurelia Fundamentals';
      config.map([{ route: ['', 'events'], moduleId: './events/events', name: 'Events', title: 'Events', nav: true }, { route: 'jobs', moduleId: './jobs/jobs', title: 'Jobs', nav: true }, { route: 'discussion', moduleId: './discussion/discussion', title: 'Discussion', nav: true }]);
    };

    return App;
  }();
});
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
define('im-lazy',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ImLazy = exports.ImLazy = function () {
    function ImLazy() {
      _classCallCheck(this, ImLazy);

      console.log('ImLazy constructor');
    }

    ImLazy.prototype.doStuff = function doStuff() {
      console.log('ImLazy but doing stuff');
    };

    return ImLazy;
  }();
});
define('main',['exports', './environment', 'aurelia-framework', './plugin1', './plugin2'], function (exports, _environment, _aureliaFramework, _plugin, _plugin2) {
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
    aurelia.use.transient('SuperPlugIn', _plugin.Plugin1);
    aurelia.use.transient('SuperPlugIn', _plugin2.Plugin2);

    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot('app');
    });
  }
});
define('plugin1',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Plugin1 = exports.Plugin1 = function () {
    function Plugin1() {
      _classCallCheck(this, Plugin1);
    }

    Plugin1.prototype.doPlugInStuff = function doPlugInStuff() {
      console.log('Plugin1 doing stuff');
    };

    return Plugin1;
  }();
});
define('plugin2',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Plugin2 = exports.Plugin2 = function () {
    function Plugin2() {
      _classCallCheck(this, Plugin2);
    }

    Plugin2.prototype.doPlugInStuff = function doPlugInStuff() {
      console.log('Plugin2 doing stuff');
    };

    return Plugin2;
  }();
});
define('discussion/discussion',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Discussion = exports.Discussion = function Discussion() {
    _classCallCheck(this, Discussion);
  };
});
define('events/events',['exports', './../data-cache', 'aurelia-framework', './../im-lazy'], function (exports, _dataCache, _aureliaFramework, _imLazy) {
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

  var Events = exports.Events = (_dec = (0, _aureliaFramework.inject)(_dataCache.DataCache, _aureliaFramework.Lazy.of(_imLazy.ImLazy), _aureliaFramework.All.of('SuperPlugIn')), _dec(_class = function () {
    function Events(dataCache, lazyOfImLazy, plugins) {
      _classCallCheck(this, Events);

      this.events = dataCache.data;
      this.lazyOfImLazy = lazyOfImLazy;

      plugins.forEach(function (plugin) {
        plugin.doPlugInStuff();
      });
    }

    Events.prototype.createAndUseLazy = function createAndUseLazy() {
      console.log('about to use lazy');
      this.lazyOfImLazy().doStuff();
    };

    return Events;
  }()) || _class);
});
define('jobs/jobs',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Jobs = exports.Jobs = function Jobs() {
    _classCallCheck(this, Jobs);
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('sponsors/sponsors',["exports"], function (exports) {
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">Aurelia Fundamentals</a></div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li repeat.for=\"route of router.navigation\" class=\"${route.isActive ? 'active' : ''}\"><a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" href.bind=\"route.href\">${route.title}</a></li></ul></div></div></nav><div class=\"container-fluid\"><div class=\"col-xs-10\"><router-view></router-view></div><div class=\"col-xs-2\"><compose view-model=\"sponsors/sponsors\"></compose></div></div></template>"; });
define('text!discussion/discussion.html', ['module'], function(module) { module.exports = "<template>Discussion</template>"; });
define('text!events/event.html', ['module'], function(module) { module.exports = "<template><div class=\"bg-success rbox\">${event.id} : ${event.title}</div></template>"; });
define('text!events/events.html', ['module'], function(module) { module.exports = "<template><div repeat.for=\"event of events\"><compose model.bind=\"event\" view=\"./event.html\"></compose></div><button type=\"button\" click.trigger=\"createAndUseLazy()\">Use Lazy</button></template>"; });
define('text!jobs/jobs.html', ['module'], function(module) { module.exports = "<template>Jobs</template>"; });
define('text!sponsors/sponsors.html', ['module'], function(module) { module.exports = "<template>Sponsors</template>"; });
//# sourceMappingURL=app-bundle.js.map
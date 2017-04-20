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
define('main',['exports', './environment'], function (exports, _environment) {
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
    aurelia.use.instance('apiRoot', 'http://brianapidemos.azurewebsites.net/CommunityApi/');
    aurelia.use.globalResources('common/dateFormat');
    aurelia.use.standardConfiguration().plugin('aurelia-dialog').plugin('aurelia-validation').feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }
    aurelia.start().then(function () {
      return aurelia.setRoot('shell');
    });
  }
});
define('shell',['exports', 'toastr', 'aurelia-event-aggregator', 'common/NotificationPayload', 'aurelia-framework'], function (exports, _toastr, _aureliaEventAggregator, _NotificationPayload, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(eventAggregator) {
      var _this = this;

      _classCallCheck(this, App);

      this.eventAggregator = eventAggregator;
      this.eventAggregator.subscribe(_NotificationPayload.NotificationPayload, function (payload) {
        _this.notification = payload.time;
      });
    }

    App.prototype.clearNotification = function clearNotification() {
      this.notification = null;
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Aurelia Fundamentals';
      config.addPipelineStep('authorize', NavToastStep);

      config.map([{
        route: ['', 'events'],
        viewPorts: {
          mainContent: { moduleId: './events/events' },
          sideBar: { moduleId: './sideBar/sponsors' }
        },
        name: 'Events',
        title: 'Events',
        nav: true
      }, {
        route: 'jobs',
        name: 'jobs',
        viewPorts: {
          mainContent: { moduleId: './jobs/jobs' },
          sideBar: { moduleId: './sideBar/sponsors' }
        },
        title: 'Jobs',
        nav: true
      }, {
        route: 'discussion',
        viewPorts: {
          mainContent: { moduleId: './discussion/discussion' },
          sideBar: { moduleId: './sideBar/ads' }
        },
        title: 'Discussion',
        nav: true
      }, {
        route: 'eventDetail/:eventId',
        viewPorts: {
          mainContent: { moduleId: './events/eventDetail' },
          sideBar: { moduleId: './sideBar/ads' }
        },
        name: 'eventDetail'
      }, {
        route: 'addJob',
        viewPorts: {
          mainContent: { moduleId: './jobs/addJob' },
          sideBar: { moduleId: './sideBar/sponsors' }
        },
        name: 'addJob'
      }]);
    };

    return App;
  }()) || _class);

  var NavToastStep = function () {
    function NavToastStep() {
      _classCallCheck(this, NavToastStep);
    }

    NavToastStep.prototype.run = function run(navigationInstruction, next) {
      return next().then(function (result) {
        if (result.status === 'canceled') {
          _toastr2.default.error('Navigation cancelled');
        }

        return result;
      });
    };

    return NavToastStep;
  }();
});
define('common/bootstrap-form-renderer',['exports', 'aurelia-validation'], function (exports, _aureliaValidation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BootstrapFormRenderer = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BootstrapFormRenderer = exports.BootstrapFormRenderer = function () {
    function BootstrapFormRenderer() {
      _classCallCheck(this, BootstrapFormRenderer);
    }

    BootstrapFormRenderer.prototype.render = function render(instruction) {
      for (var _iterator = instruction.unrender, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var _ref5 = _ref2;
        var result = _ref5.result,
            elements = _ref5.elements;

        for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref6;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref6 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref6 = _i3.value;
          }

          var element = _ref6;

          this.remove(element, result);
        }
      }

      for (var _iterator2 = instruction.render, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref4 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref4 = _i2.value;
        }

        var _ref7 = _ref4;
        var result = _ref7.result,
            elements = _ref7.elements;

        for (var _iterator4 = elements, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref8;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref8 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref8 = _i4.value;
          }

          var _element = _ref8;

          this.add(_element, result);
        }
      }
    };

    BootstrapFormRenderer.prototype.add = function add(element, result) {
      if (result.valid) {
        return;
      }

      var formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }

      formGroup.classList.add('has-error');

      var message = document.createElement('span');
      message.className = 'help-block validation-message';
      message.textContent = result.message;
      message.id = 'validation-message-' + result.id;
      formGroup.appendChild(message);
    };

    BootstrapFormRenderer.prototype.remove = function remove(element, result) {
      if (result.valid) {
        return;
      }

      var formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }

      var message = formGroup.querySelector('#validation-message-' + result.id);
      if (message) {
        formGroup.removeChild(message);

        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formGroup.classList.remove('has-error');
        }
      }
    };

    return BootstrapFormRenderer;
  }();
});
define('common/dateFormat',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value, format) {
      if (!format) format = 'M/D/YYYY h:mm a';
      return (0, _moment2.default)(value).format(format);
    };

    DateFormatValueConverter.prototype.fromView = function fromView(value) {
      return new Date(value);
    };

    return DateFormatValueConverter;
  }();
});
define('common/nav-bar',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NavBar = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var NavBar = exports.NavBar = (_dec = (0, _aureliaFramework.customElement)('navigation-bar'), _dec(_class = (_class2 = function () {
    function NavBar() {
      _classCallCheck(this, NavBar);

      _initDefineProp(this, 'router', _descriptor, this);
    }

    NavBar.prototype.created = function created(view) {};

    NavBar.prototype.bind = function bind(bidingContext, overrideContext) {};

    NavBar.prototype.unbind = function unbind() {};

    NavBar.prototype.attached = function attached() {};

    NavBar.prototype.detached = function detached() {};

    return NavBar;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('common/NotificationPayload',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NotificationPayload = exports.NotificationPayload = function NotificationPayload(time) {
    _classCallCheck(this, NotificationPayload);

    this.time = time;
  };
});
define('common/speakerImage',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SpeakerImage = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var SpeakerImage = exports.SpeakerImage = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.customAttribute)('speaker-img'), _dec(_class = _dec2(_class = (_class2 = function () {
    function SpeakerImage(element) {
      _classCallCheck(this, SpeakerImage);

      _initDefineProp(this, 'imageName', _descriptor, this);

      _initDefineProp(this, 'isMvp', _descriptor2, this);

      this.element = element;
    }

    SpeakerImage.prototype.imageNameChanged = function imageNameChanged(newValue) {
      this.element.src = 'images/speakers/' + newValue;
    };

    SpeakerImage.prototype.isMvpChanged = function isMvpChanged(newValue) {
      if (newValue) {
        var el = document.createElement('div');
        el.innerHTML = 'MVP';
        el.className = 'watermark';
        this.element.parentNode.insertBefore(el, this.element.nextSibling);
      }
    };

    return SpeakerImage;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'imageName', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'isMvp', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});
define('events/EditDialog',['exports', 'aurelia-dialog', 'aurelia-framework'], function (exports, _aureliaDialog, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EditDialog = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var EditDialog = exports.EditDialog = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
    function EditDialog(dialogController) {
      _classCallCheck(this, EditDialog);

      this.dialogController = dialogController;
    }

    EditDialog.prototype.activate = function activate(event) {
      this.event = event;
    };

    EditDialog.prototype.save = function save() {
      this.dialogController.ok();
    };

    EditDialog.prototype.cancel = function cancel() {
      this.dialogController.cancel();
    };

    return EditDialog;
  }()) || _class);
});
define('events/eventDetail',['exports', 'aurelia-framework', 'services/dataRepository', 'aurelia-dialog', 'events/EditDialog'], function (exports, _aureliaFramework, _dataRepository, _aureliaDialog, _EditDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EventDetail = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var EventDetail = exports.EventDetail = (_dec = (0, _aureliaFramework.inject)(_dataRepository.DataRepository, _aureliaDialog.DialogService), _dec(_class = function () {
    function EventDetail(dataRepository, dialogService) {
      _classCallCheck(this, EventDetail);

      this.dataRepository = dataRepository;
      this.dialogService = dialogService;
    }

    EventDetail.prototype.activate = function activate(params, routeConfig) {
      this.event = this.dataRepository.getEvent(parseInt(params.eventId, 10));
    };

    EventDetail.prototype.editEvent = function editEvent(event) {
      var _this = this;

      var original = JSON.parse(JSON.stringify(event));
      this.dialogService.open({ viewModel: _EditDialog.EditDialog, model: this.event }).then(function (result) {
        if (result.wasCancelled) {
          _this.event.title = original.title;
          _this.event.description = original.description;
        }
      });
    };

    return EventDetail;
  }()) || _class);
});
define('events/events',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Events = exports.Events = function () {
    function Events() {
      _classCallCheck(this, Events);
    }

    Events.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Events';
      config.map([{
        route: ['', 'future'],
        moduleId: 'events/eventsList',
        title: 'Future Events',
        nav: true,
        name: 'future'
      }, {
        route: ['past'],
        moduleId: 'events/eventsList',
        title: 'Past Events',
        nav: true,
        href: 'events/past',
        name: 'past'
      }]);
    };

    return Events;
  }();
});
define('events/eventsList',['exports', './../services/dataRepository', 'aurelia-framework', 'aurelia-router'], function (exports, _dataRepository, _aureliaFramework, _aureliaRouter) {
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

  var Events = exports.Events = (_dec = (0, _aureliaFramework.inject)(_dataRepository.DataRepository, _aureliaRouter.Router), _dec(_class = function () {
    function Events(dataRepository, router) {
      _classCallCheck(this, Events);

      this.dataRepository = dataRepository;
      this.router = router;
    }

    Events.prototype.activate = function activate(params, routeConfig) {
      var _this = this;

      var pastOrFuture = routeConfig.name === '' ? 'future' : routeConfig.name;
      this.dataRepository.getEvents(pastOrFuture).then(function (events) {
        if (params.speaker || params.topic) {
          var filteredResults = [];
          events.forEach(function (item) {
            if (params.speaker && item.speaker.toLowerCase().indexOf(params.speaker.toLowerCase()) >= 0) {
              if (filteredResults.indexOf(item) === -1) filteredResults.push(item);
            }
            if (params.topic && item.topic.toLowerCase().indexOf(params.topic.toLowerCase()) >= 0) {
              if (filteredResults.indexOf(item) === -1) filteredResults.push(item);
            }
          });
          _this.events = filteredResults;
        } else {
          _this.events = events;
        }
        _this.events.forEach(function (item) {
          return item.detailUrl = _this.router.generate('eventDetail', { eventId: item.id });
        });
      });
    };

    Events.prototype.determineActivationStrategy = function determineActivationStrategy() {
      return _aureliaRouter.activationStrategy.invokeLifecycle;
    };

    Events.prototype.goToDiscussion = function goToDiscussion() {
      this.router.navigate('#/discussion');
    };

    return Events;
  }()) || _class);
});
define('events/past',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Past = exports.Past = function Past() {
    _classCallCheck(this, Past);
  };
});
define('discussion/discussion',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function getDiscussionInput() {
    return '';
  }

  function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  var Discussion = exports.Discussion = function () {
    function Discussion() {
      _classCallCheck(this, Discussion);
    }

    Discussion.prototype.activate = function activate() {
      this.discussionInput = getDiscussionInput();
      this.originalInput = cloneObject(this.discussionInput);
    };

    Discussion.prototype.save = function save() {
      this.originalInput = cloneObject(this.discussionInput);
    };

    Discussion.prototype.canDeactivate = function canDeactivate() {
      if (JSON.stringify(cloneObject(this.discussionInput)) !== JSON.stringify(this.originalInput)) {
        if (confirm('Unsaved data, are you sure you want to navigate away?')) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    };

    return Discussion;
  }();
});
define('jobs/addJob',['exports', 'aurelia-framework', 'services/dataRepository', 'aurelia-validation', 'common/bootstrap-form-renderer'], function (exports, _aureliaFramework, _dataRepository, _aureliaValidation, _bootstrapFormRenderer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AddJob = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AddJob = exports.AddJob = (_dec = (0, _aureliaFramework.inject)(_dataRepository.DataRepository, _aureliaValidation.ValidationController), _dec(_class = function () {
    function AddJob(dataRepository, controller) {
      var _this = this;

      _classCallCheck(this, AddJob);

      this.job = { jobType: 'Full Time', jobSkills: [] };
      this.dataRepository = dataRepository;
      this.dataRepository.getStates().then(function (states) {
        _this.states = states;
      });
      this.dataRepository.getJobTypes().then(function (jobTypes) {
        _this.jobTypes = jobTypes;
      });
      this.dataRepository.getJobSkills().then(function (jobSkills) {
        _this.jobSkills = jobSkills;
      });
      this.controller = controller;
      this.controller.validateTrigger = _aureliaValidation.validateTrigger.change;
      this.controller.addRenderer(new _bootstrapFormRenderer.BootstrapFormRenderer());

      _aureliaValidation.ValidationRules.customRule('notCEO', function (value, object) {
        return value.toUpperCase() !== 'CEO';
      }, 'Buen intento, el ${$displayName} no puede ser ${$value}');

      _aureliaValidation.ValidationRules.ensure(function (j) {
        return j.title;
      }).required().minLength(3).satisfiesRule('notCEO').on(this.job);
    }

    AddJob.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
      this.router = navigationInstruction.router;
    };

    AddJob.prototype.save = function save() {
      var _this2 = this;

      if (this.controller.errors && this.controller.errors.length > 0) return;
      if (this.job.needDate) {
        this.job.needDate = new Date(this.job.needDate);
      }
      this.dataRepository.addJob(this.job).then(function (job) {
        return _this2.router.navigateToRoute('jobs');
      });
    };

    return AddJob;
  }()) || _class);
});
define('jobs/jobs',['exports', 'aurelia-framework', './../services/dataRepository'], function (exports, _aureliaFramework, _dataRepository) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Jobs = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Jobs = exports.Jobs = (_dec = (0, _aureliaFramework.inject)(_dataRepository.DataRepository), _dec(_class = function () {
    function Jobs(dataRepository) {
      _classCallCheck(this, Jobs);

      this.dataRepository = dataRepository;
    }

    Jobs.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
      var _this = this;

      this.jobs = [];
      this.router = navigationInstruction.router;
      return this.dataRepository.getJobs().then(function (jobs) {
        console.log(jobs);
        _this.jobs = jobs;
      });
    };

    Jobs.prototype.addJob = function addJob() {
      this.router.navigateToRoute('addJob');
    };

    return Jobs;
  }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/dataRepository',['exports', 'aurelia-framework', './jobsData', 'moment', 'aurelia-http-client', 'aurelia-fetch-client', 'aurelia-event-aggregator', 'common/NotificationPayload'], function (exports, _aureliaFramework, _jobsData, _moment, _aureliaHttpClient, _aureliaFetchClient, _aureliaEventAggregator, _NotificationPayload) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataRepository = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  function filterAndFormat(pastOrFuture, events) {
    var results = JSON.parse(JSON.stringify(events));
    if (pastOrFuture === 'past') {
      results = results.filter(function (item) {
        var itemDateTimeMoment = (0, _moment2.default)(item.dateTime);
        var now = (0, _moment2.default)();
        return itemDateTimeMoment.isBefore(now);
      });
    } else if (pastOrFuture === 'future') {
      results = results.filter(function (item) {
        var itemDateTimeMoment = (0, _moment2.default)(item.dateTime);
        var now = (0, _moment2.default)();
        return itemDateTimeMoment.isAfter(now);
      });
    }
    return results;
  }

  var DataRepository = exports.DataRepository = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _aureliaFetchClient.HttpClient, 'apiRoot', _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function DataRepository(httpClient, httpFetch, apiRoot, eventAggregator) {
      var _this = this;

      _classCallCheck(this, DataRepository);

      this.httpClient = httpClient;
      this.httpFetch = httpFetch;
      this.apiRoot = apiRoot;
      this.eventAggregator = eventAggregator;

      setTimeout(function () {
        return _this.backgroundNotificationReceived(_this.eventAggregator);
      }, 5000);
    }

    DataRepository.prototype.backgroundNotificationReceived = function backgroundNotificationReceived(ea) {
      ea.publish(new _NotificationPayload.NotificationPayload((0, _moment2.default)().format('HH:mm:ss')));
    };

    DataRepository.prototype.getEvents = function getEvents(pastOrFuture) {
      var _this2 = this;

      var promise = new Promise(function (resolve, reject) {
        if (!_this2.events) {
          _this2.httpClient.get(_this2.apiRoot + 'api/Events').then(function (result) {
            var data = JSON.parse(result.response);
            _this2.events = data.sort(function (a, b) {
              return a.dateTime >= b.dateTime ? 1 : -1;
            });
            _this2.events.forEach(function (item) {
              if (item.speaker.toUpperCase() === 'BRIAN NOYES') {
                item.isMvp = true;
                console.log('isMvp');
              }
            }, _this2);
            resolve(filterAndFormat(pastOrFuture, _this2.events));
          });
        } else {
          resolve(filterAndFormat(pastOrFuture, _this2.events));
        }
      });
      return promise;
    };

    DataRepository.prototype.getEvent = function getEvent(eventId) {
      return this.events.find(function (item) {
        return item.id === eventId;
      });
    };

    DataRepository.prototype.getStates = function getStates() {
      var _this3 = this;

      var promise = new Promise(function (resolve, reject) {
        if (!_this3.states) {
          _this3.states = _jobsData.states;
        }
        resolve(_this3.states);
      });
      return promise;
    };

    DataRepository.prototype.getJobTypes = function getJobTypes() {
      var _this4 = this;

      var promise = new Promise(function (resolve, reject) {
        if (!_this4.jobTypes) {
          _this4.jobTypes = _jobsData.jobTypes;
        }
        resolve(_this4.jobTypes);
      });
      return promise;
    };

    DataRepository.prototype.getJobSkills = function getJobSkills() {
      var _this5 = this;

      var promise = new Promise(function (resolve, reject) {
        if (!_this5.jobSkills) {
          _this5.jobSkills = _jobsData.jobSkills;
        }
        resolve(_this5.jobSkills);
      });
      return promise;
    };

    DataRepository.prototype.getJobs = function getJobs() {
      var _this6 = this;

      var promise = new Promise(function (resolve, reject) {
        if (!_this6.jobs) {
          _this6.httpFetch.fetch(_this6.apiRoot + 'api/Jobs').then(function (response) {
            return response.json();
          }).then(function (data) {
            _this6.jobs = data;
            resolve(_this6.jobs);
          }).catch(function (err) {
            return reject(err);
          });
        } else {
          resolve(_this6.jobs);
        }
      });
      return promise;
    };

    DataRepository.prototype.addJob = function addJob(job) {
      var _this7 = this;

      var promise = new Promise(function (resolve, reject) {
        if (!_this7.jobs) {
          _this7.jobs = [];
        }
        _this7.httpFetch.fetch(_this7.apiRoot + 'api/Jobs', {
          method: 'POST',
          body: (0, _aureliaFetchClient.json)(job)
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          _this7.jobs.push(data);
          resolve(data);
        }).catch(function (err) {
          return reject(err);
        });
      });
      return promise;
    };

    return DataRepository;
  }()) || _class);
});
define('services/eventsData',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var eventsData = exports.eventsData = [{
    "id": 124,
    "description": "REST is an architectural style for building HTTP Web API services that is often misunderstood - many people claim to be building RESTful services but do not know the things they need to be doing to truly qualify as a RESTful service. In this session, you will learn the fundamental architectural constraints that define REST and how you can implement those constraints using ASP.NET Web API. You’ll learn what things you need to do to implement the capabilities that all Web API services should do, such as focus on resources, representations, URIs, content-negotiation, HTTP verbs and headers and so on, as well as the concept of hypermedia and how it pertains to RESTful services.",
    "dateTime": "2013-02-26T23:30:00.000Z",
    "title": "Designing RESTful Services with ASP.NET Web API",
    "speaker": "Brian Noyes",
    "image": "BrianNoyes.png"
  }, {
    "id": 131,
    "description": "When modeling your data for an enterprise web application, you may have conflicts within your development team, with other development teams, and also with enterprise architects at your organization. With Code First Migrations, you will have the opportunity to get everyone on the same page by synchronizing your database across various environments.",
    "dateTime": "2013-08-27T22:30:00.000Z",
    "title": "Entity Framework Code First Migrations - Shahed Chowdhuri",
    "speaker": "Shahed Chowdhuri",
    "image": "ShahedChowdhuri.jpg"
  }, {
    "id": 149,
    "description": "The talk discusses the up-and-coming Web Components standards, how they improve web development, how Polymer can help you develop using Web Components today, and whether Web Components enhance (or replace) your favorite web framework.",
    "dateTime": "2015-01-27T23:30:00.000Z",
    "title": "Web Components and Polymer - An Introduction to the Future of Web Applications - Steve Albers",
    "speaker": "Steve Albers",
    "image": "SteveAlbers.jpg"
  }, {
    "id": 151,
    "description": "Does your web application contain common coding mistakes that can lead to security problems? In this session, you can find out! We'll be going over common security vulnerabilities in web applications, such as XSS and CSRF, how attackers use them, and how to protect your web application from these. ",
    "dateTime": "2014-12-16T23:30:00.000Z",
    "title": "Web Application Security - Kevin Jones (MVP)",
    "speaker": "Kevin Jones",
    "image": "KevinJones.png"
  }, {
    "id": 125,
    "description": "When you build a business application, there are a different set of concerns that come in that go beyond quickly throwing together an application and getting it in the marketplace. You need to think more about how to build the application in a way that is maintainable, testable, and easy to evolve over time to suit the business needs. Microsoft patterns and practices has put together guidance on how to do this that you can leverage, called Project Kona. In this session, you will learn straight from a Kona team member what the Kona guidance includes and how to leverage it in your own projects. You'll learn how to set up your application to do MVVM, navigation, and state persistence while still integrating nicely with the WinRT platform and keeping good separating of concerns and loose coupling. You'll see how to manage dependencies, call Web API services, integrate with platform features like Settings charm flyouts, Search, and more.",
    "dateTime": "2013-02-26T23:30:00.000Z",
    "title": "Building Windows Store Line of Business Applications with Kona - Brian Noyes (RD/MVP)",
    "speaker": "Brian Noyes",
    "image": "BrianNoyes.png"
  }, {
    "id": 122,
    "description": "While Cloud Computing offers enormous economic savings, and scalability for large amounts of users and data as well as over large geographic areas, you have to think differently about how to build these applications. Distributed applications are susceptible to a wide variety of outages because you cannot avoid the effects of computer networks and scarce computing resources. Traditional on-premise applications have always been subject to some of these problems, but cloud computing exposes them publicly in ways that cannot be hidden. This talk will explain how to architect and build applications to be resilient under these conditions. It will also explain what aspects of traditional software architecture and design are the same, and which areas must evolve.",
    "dateTime": "2013-01-22T23:30:00.000Z",
    "title": "Architecting for Failure, Cloud Architecture is Different! (Michael Stiefel)",
    "speaker": "Michael Stiefel",
    "image": "MichaelStiefel.jpg"
  }, {
    "id": 127,
    "description": "Have you ever wanted to have statically typed classes in JavaScript while at the same time being able to still enjoy some of the dynamic aspects of the JavaScript language? Have you ever wanted to be able to structure your team’s large JavaScript application code into dynamically loadable modules? Have you ever wanted richer tooling for JavaScript that is closer to what you experience with C# tooling? If you answered YES to these questions, then this is the presentation for you. This demo-heavy session will show numerous features that allow you to quickly and easily write JavaScript code that will run in any browser, host, or OS!",
    "dateTime": "2013-07-23T22:30:00.000Z",
    "title": "Supercharge your JavaScript with TypeScript - Steve Michelotti (MVP)",
    "speaker": "Steve Michelotti",
    "image": "SteveMichelotti.jpg"
  }, {
    "id": 126,
    "description": "Whether you're building apps for the Windows Store, or for phones or tablets, many apps today need a common way to store and access data. In this session, Microsoft Technical Evangelist G. Andrew Duthie will provide an overview of different tools for building robust back-end REST-style services that can be leveraged across multiple platforms, including solutions based on WCF Data Services, ASP.NET Web API, and the new Windows Azure Mobile Services.  Learn how you can quickly and easily get a back-end data store and services up and running, so you can spend more time on building a fantastic Windows Store or other mobile app.",
    "dateTime": "2013-03-26T22:30:00.000Z",
    "title": "Building Back-end Services for Windows Store Apps - G. Andrew Duthie (Microsoft)",
    "speaker": "G. Andrew Duthie",
    "image": "GAndrewDuthie.jpg"
  }, {
    "id": 128,
    "description": "In this talk I will show you each of the 4 major code frameworks from Microsoft in ASP.Net (WebForms, MVC, WebAPI, and SignalR -- what Microsoft refers to as 'One ASP.Net') and put together a sample web application that uses each of these frameworks in a cohesive solution.  Our discussion will define the benefits and drawbacks of each framework, leading into a live coding session of our sample project.  You will learn to craft simpler, faster, and more testable solutions.",
    "dateTime": "2013-04-23T22:30:00.000Z",
    "title": "Diversified Asp.Net - One Web Project - 4 Asp.Net Frameworks - Jeff Fritz (Telerik)",
    "speaker": "Jeff Fritz",
    "image": "JeffFritz.jpg"
  }, {
    "id": 129,
    "description": "As a web developer today, the choices of technologies and open source libraries are overwhelming.  It’s impossible to keep up with all of them, but there is a short list that every web developer should be familiar with.  This presentation will get you started on compiling your developer ‘toolbox’.  We’ll talk about core technologies like Entity Framework, WCF Data Services as well as open source libraries such as jQuery, Knockout.js,. data.js, css frameworks, etc and how to use them to build cutting edge web projects.  ",
    "dateTime": "2013-06-25T22:30:00.000Z",
    "title": "The Web Developer's Toolkit - Steve Fabian (MVP)",
    "speaker": "Steve Fabian",
    "image": "SteveFabian.jpg"
  }, {
    "id": 130,
    "description": "Node.js is an amazing technology that is growing by leaps and bounds.  Many web developers already have an understanding of the fundamentals of JavaScript, but their knowledge is strictly confined to the browser.  WIth node.js, developers are exposed to a whole new world by introducing JavaScript as a first class language for server-side applications.  In this talk, we'll take a structured look at node.js from a .NET developers perspective.  We'll discuss what a .NET developer needs to know get started with node.js, and hopefully we'll expand your horizons!  ",
    "dateTime": "2013-05-28T22:30:00.000Z",
    "title": "node for .NET Developers - Kevin Griffin (MVP)",
    "speaker": "Kevin Griffin",
    "image": "KevinGriffin.jpg"
  }, {
    "id": 136,
    "description": "Time IS money - ask Amazon.com.  The performance of your site impacts everything from revenue and customer satisfaction to bounce rate and search engine ranking.  And as much as 80% of your customer's load time does not appear in your web logs!   In this session we argue about what &quot;web performance&quot; means, look at ways it can be measured, and go through examples of the principles, best practices and design decisions that give your site maximum web performance.  ",
    "dateTime": "2014-01-28T23:30:00.000Z",
    "title": "Maximum Web Performance - Steve Albers",
    "speaker": "Steve Albers",
    "image": "SteveAlbers.jpg"
  }, {
    "id": 137,
    "description": "It seems all you ever hear about in web development these days is building Single Page Applications (SPAs). But where do you start? Which framework should you use? AngularJS and DurandalJS are both “best of breed” SPA frameworks – how do you select which one is right for your project? This demo-heavy presentation will cover the major aspects of both of these incredible frameworks. It will include: understanding the structure, building screens, routing, working with data, extensibility, and more! Along the way, we’ll make direct comparisons when relevant, while building a better understanding of the nature of SPA applications.  ",
    "dateTime": "2014-02-25T23:30:00.000Z",
    "title": "AngularJS vs DurandalJS - Steve Michelotti (MVP)",
    "speaker": "Steve Michelotti",
    "image": "SteveMichelotti.jpg"
  }, {
    "id": 138,
    "description": "When dealing with systems that must be resilient, self-healing, and highly-available, you can't just manually flip switches to keep the system online. That plan does not scale, and time would be better spent working on the next set of features. Automating your most common operations, such as deployment, service provisioning, and recovery actions can help you consistently manage your Windows Azure solutions, as well as save you time. Come to this session to learn how to use PowerShell to make your life easier and prepare for worst case scenarios on solutions of any size.",
    "dateTime": "2014-04-22T22:30:00.000Z",
    "title": "Automating Windows Azure with PowerShell - Mike Wood (MVP)",
    "speaker": "Mike Wood",
    "image": "MikeWood.jpg"
  }, {
    "id": 140,
    "description": "Learn how to develop native apps for Windows 8, Windows Phone, iOS and Android all with C#!  Get introduced to the many benefits of cross platform mobile development with C# and how Xamarin makes this possible on iOS and Android right from within Visual Studio.  This talk will walk you through building a native app on multiple platforms using Xamarin and show you some key patterns and practices to successfully writing C# code that can be shared across multiple platforms.",
    "dateTime": "2014-05-27T22:30:00.000Z",
    "title": "Cross Platform Mobile Dev with C# - Ed Snider",
    "speaker": "Ed Snider",
    "image": "EdSnider.jpg"
  }, {
    "id": 141,
    "description": "Learn how to develop native apps for Windows 8, Windows Phone, iOS and Android all with C#! Get introduced to the many benefits of cross platform mobile development with C# and how Xamarin makes this possible on iOS and Android right from within Visual Studio. This talk will walk you through building a native app on multiple platforms using Xamarin and show you some key patterns and practices to successfully writing C# code that can be shared across multiple platforms.",
    "dateTime": "2014-05-27T22:30:00.000Z",
    "title": "Cross Platform Mobile Dev with C# - Ed Snider",
    "speaker": "Ed Snider",
    "image": "EdSnider.jpg"
  }, {
    "id": 142,
    "description": "SignalR introduces a paradigm-shift in building web sites.  Real-time two way communication opens up endless possibilities in building web solutions,  This talk will introduce you to the SignalR framework, how to install, configure and use it to build dynamic applications across browser, desktop and mobile applications.",
    "dateTime": "2014-06-24T22:30:00.000Z",
    "title": "Calling Back to the Client with SignalR - Steve Fabian (MVP)",
    "speaker": "Steve Fabian",
    "image": "SteveFabian.jpg"
  }, {
    "id": 144,
    "description": "For the past 15 years, ASP.NET applications have worked pretty much the same way. In order to deploy a new application, you need to have IIS up and running with corresponding .NET dependencies installed.  Recently at TechEd 2014, the ASP.NET announced the next generation of ASP.NET applications that remove the dependency on IIS. We're talking self-hosted ASP.NET projects! We're talking ASP.NET projects that run off a thumb drive. We're talking ASP.NET projects that run on Mac and Linux. In this talk, we'll take a look at some of the latest bits to come out of Redmond and how your development experience is going to change over the next several years.",
    "dateTime": "2014-07-22T22:30:00.000Z",
    "title": "ASP.NET - The vNext Generation - Kevin Griffin (MVP)",
    "speaker": "Kevin Griffin",
    "image": "KevinGriffin.jpg"
  }, {
    "id": 145,
    "description": "Have you ever wanted a way to teach your kid to code? For that matter, have you ever wanted to simply be able to explain to your kid what you do for a living? Putting things in a context that a kid can understand is not as easy as it sounds. If you are someone curious about these concepts, this is a “can’t miss” presentation that will be co-presented by Justin Michelotti (6th grader) and his father. Bring your kid with you to CapArea.NET for this fun and educational session. We will show tools you may not have been aware of like SmallBasic and Kodu – we’ll even throw in a little Visual Studio. Concepts such as variables, conditionals, loops, and functions will be covered while we introduce object oriented concepts without any of the confusing words. Kids are not required for entry!",
    "dateTime": "2014-08-26T22:30:00.000Z",
    "title": "Special Event - Teach Your Kids to Code! (Bring your kids!) - Steve Michelotti (MVP)",
    "speaker": "Steve Michelotti",
    "image": "SteveMichelotti.jpg"
  }, {
    "id": 150,
    "description": "The Ionic Framework is a tremendous step forward for quickly building Cordova-based mobile apps. Built on top of AngularJS, developers are able to leverage all of their pre-existing AngularJS skills when working with the Ionic Framework, considered by many to be the &quot;Bootstrap for mobile.&quot; In this presentation, we will see how to quickly get up and running with an Ionic app in seconds. We will then cover navigation and routing, followed by demonstrations of all the primary Ionic components. We will also cover data and caching for offline functionality, as well as mapping and providing driving directions. We will finish with a review of ngCordova to easily access native device features such as the camera, barcode scanner, and more. By the end of the presentation, you'll be able to start building your own mobile apps using the Ionic Framework and AngularJS!",
    "dateTime": "2015-03-24T22:30:00.000Z",
    "title": "Building Mobile apps with the Ionic framework and AngularJS - Steve Michelotti (MVP)",
    "speaker": "Steve Michelotti",
    "image": "SteveMichelotti.jpg"
  }, {
    "id": 153,
    "description": "IoT, short for the Internet of Things, is a frequently-heard buzzword lately, with more and more vendors looking for ways to make money by Internet-enabling their devices. But one of the tricky aspects of IoT is choosing just how these devices, which are often small and low-powered, communicate. Some devices use WiFi, but that can be overkill for a device with only simple communication needs, not to mention providing another potential attack surface in your network. Other options include Bluetooth, and good old serial communications, or a combination of these options.   In this session, you'll learn about many of the available options for communicating between microcontroller-driven devices and PCs or internet-based services, including Microsoft Azure-based services. You'll see examples of reading sensor information and using a phone or PC to control devices remotely. A range of hardware will be included, from .NET Microframework boards programmed with Visual Studio, to Arduino-compatible devices and even devices running JavaScript. Expect blinky lights, motors, and whatever other fun demo hardware happens to be on-hand.",
    "dateTime": "2015-02-24T23:30:00.000Z",
    "title": "Communicating with the Internet of Things - G. Andrew Duthie",
    "speaker": "G. Andrew Duthie",
    "image": "GAndrewDuthie.jpg"
  }, {
    "id": 156,
    "description": "At the Build 2015 conference, Microsoft unveiled the Universal Windows Platform - a single API that developers can target for building applications for desktop, mobile, Xbox, and IoT targets using the Windows 10 OS. In this talk, you will get an overview of what it means to target all these platforms through Windows 10, and a quick intro to the programming model for it. You will learn how to use XAML and C# to target desktop, tablets, and phones in Windows 10, as well as learning about the other ways of getting apps onto the platform, including using HTML/JS, wrapping Android apps, and recompiling iOS apps.",
    "dateTime": "2015-06-23T22:30:00.000Z",
    "title": "Building Windows 10 UWP Apps - Brian Noyes (RD/MVP)",
    "speaker": "Brian Noyes",
    "image": "BrianNoyes.png"
  }, {
    "id": 158,
    "description": "Earlier this year, Microsoft announced the new Azure App Service. This new service has a lot of features, many of which are evolutions of the Azure Website and Azure Mobile Service offerings, which have been renamed to Web Apps and Mobile Apps, respectively. Additionally, Azure App Service adds two new offerings, Logic Apps, which are essentially workflows that can be developed visually or using a JSON-based syntax, as well as API Apps, which you can use to create and modify connectors that are used as the building blocks for Logic Apps.  In this session, consultant G. Andrew Duthie will walk through the four major pillars of Azure App Service, demonstrating how you can build end-to-end experiences for your users that encompass websites and powerful mobile apps, combined with a workflow that leverages third-party services like Twitter and Twilio to easily add useful functionality.",
    "dateTime": "2015-08-25T22:30:00.000Z",
    "title": "Build Great Websites and Apps with Azure App Service - G. Andrew Duthie",
    "speaker": "G. Andrew Duthie",
    "image": "GAndrewDuthie.jpg"
  }, {
    "id": 159,
    "description": "In recent years companies and developers have become more interested in functional programming, as result of this increase in requests, mainstream languages have begun to introduce functional concepts and characteristics as part of their native ecosystem. If you are a .NET developer, F# can be a valuable tool to have at your disposal to solve today’s most relevant issues.  F# is a great functional first language with full support for Object Oriented Programming.  One of the biggest advantages of using F# is that it assures your code is bug-free and ready for concurrency without changing your code base.   In this talk, I will give an intro to Functional Programming and F# features for C# developers, illustrating with code samples why you should care, where it is useful and how to start using it today.  You will walk away with an understanding that Functional Programing is a paradigm that can be adopted to solve specific problems and mixed with other paradigms such as Object Oriented and Imperative programs. Achieving success often comes down to finding the right tool for the job.",
    "dateTime": "2015-09-22T22:30:00.000Z",
    "title": "Functional F# Programming in .NET - A success story - Riccardo Terrell",
    "speaker": "Riccardo Terrell",
    "image": "RiccardoTerrell.jpg"
  }, {
    "id": 155,
    "description": "Tools like Grunt, Gulp, and Bower help developers create and manage modern web applications and are often mentioned as a given when talking about client JavaScript frameworks like Angular, Knockout, or Aurelia.  Learn how to use these tools to ramp up your web projects and how Microsoft is integrating them into the Visual Studio environment.",
    "dateTime": "2015-04-28T22:30:00.000Z",
    "title": "Web development with Grunt, Gulp, Bower, and more - Steve Albers",
    "speaker": "Steve Albers",
    "image": "SteveAlbers.jpg"
  }, {
    "id": 135,
    "description": "Ever thought about building a game? Facing the holiday break and wondering what you are going to do with all that free time? If you’ve got HTML and JavaScript skills, you’re well on your way to building the next bestseller game. In this fun presentation, Microsoft Technical Evangelist G. Andrew Duthie will show you how you can build fun games using HTML and JavaScript, along with useful libraries such as CreateJS, and even publish those games to the Windows Store. Given that it’s December, there might even be snowballs involved!  ",
    "dateTime": "2013-12-17T23:30:00.000Z",
    "title": "Developing Games for the Windows Store with HTML5 and JavaScript - G. Andrew Duthie",
    "speaker": "G. Andrew Duthie",
    "image": "GAndrewDuthie.jpg"
  }, {
    "id": 147,
    "description": "Angular is all the rage these days, but if you are a traditional ASP.NET developer or even a smart client desktop developer, you may not know where to start or how Angular compares to what you have already been doing. This session will cover the architecture of an Angular app, making comparisons to ASP.NET Web Forms and MVC as well as smart client desktop development. You'll learn about the primary building blocks of an Angular app, including dependency injection, modules, controllers, directives, and services and how to put them together right. You'll learn about the MV* structuring of an Angular app and what the differences are between making that * a true Controller vs a ViewModel. Overall you will learn the key concepts you need to get you up and running and make you successful as an Angular developer.",
    "dateTime": "2014-09-23T22:30:00.000Z",
    "title": "AngularJS Jumpstart - Brian Noyes (MVP/RD)",
    "speaker": "Brian Noyes",
    "image": "BrianNoyes.png"
  }, {
    "id": 170,
    "description": "ASP.NET 5 introduces some great new capabilities, the ability to host on multiple server platforms, and a number of new tools that you will want to get familiar with. Come join Microsoft Senior Technical Evangelist Shahed Chowdhuri at Caparea.net to learn about the future of ASP.NET 5, MVC 6 and Web API.",
    "dateTime": "2015-10-27T22:30:00.000Z",
    "title": "ASP.NET 5-The Future of Web Apps - Shahed Chowdhuri",
    "speaker": "Shahed Chowdhuri",
    "image": "ShahedChowdhuri.png"
  }, {
    "id": 171,
    "description": "Does your ASP.NET application run slowly? Don't worry, you are not alone. Over the past 15 years, ASP.NET has grown to make some of the most mundane web development tasks non-issues. Applications are rapidly built and deployed, but often there is not any time to evaluate the performance indications you might be missing. Sometimes the smallest tweak to an application can have the largest effect. In this presentation, you will learn about 20 'quick wins' for almost instantly making your ASP.NET applications more performant. Some of these tips are so simple, you could push them live into production before the talk is over.",
    "dateTime": "2015-11-17T23:30:00.000Z",
    "title": "ASP.NET Quick Wins - 20 Tips and Tricks for Better Performance - Kevin Griffin",
    "speaker": "Kevin Griffin",
    "image": "KevinGriffin.png"
  }, {
    "id": 172,
    "description": "Aurelia is a full featured client JavaScript framework for building Single Page Apps (SPAs). In this session you will learn how to get started building applications with it. You'll see how to get your app configured and bootstrapped, how to implement the MVVM pattern with it, how to do data binding, how to leverage routing and navigation, call services and more.",
    "dateTime": "2015-12-25T23:30:00.000Z",
    "title": "Getting Started with Aurelia - Brian Noyes (RD/MVP)",
    "speaker": "Brian Noyes",
    "image": "BrianNoyes.png"
  }, {
    "id": 173,
    "description": "Node.js is an amazing technology that is growing by leaps and bounds.  Many web developers already have an understanding of the fundamentals of JavaScript, but their knowledge is strictly confined to the browser.  WIth node.js, developers are exposed to a whole new world by introducing JavaScript as a first class language for server-side applications.  In this talk, we'll take a structured look at node.js from a .NET developers perspective.  We'll discuss what a .NET developer needs to know get started with node.js, and hopefully we'll expand your horizons!",
    "dateTime": "2016-01-26T23:30:00.000Z",
    "title": "Getting Started with NodeJS - Kevin Griffin (MVP)",
    "speaker": "Kevin Griffin",
    "image": "KevinGriffin.jpg"
  }];
});
define('services/jobsData',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var jobsData = exports.jobsData = [{ title: "Senior .NET programmer needed", location: { city: "Alexandria", state: "VA" }, jobSkills: [".NET", "C#"], jobType: "Full Time", needDate: new Date("2016/01/16"), description: "Top notch senior .NET programmer needed for highly competetive environment. We eat our young. Come join us and rejoice in giving up any semblance of a personal life you may have once had. 30 years .NET experience required." }, { title: "COBOL Migration Engineer", location: { city: "Chicago", state: "IL" }, jobSkills: ["COBOL", "JavaScript", "HTML"], jobType: "Contract", needDate: new Date("2016/04/01"), description: "Business critical enterprise expert system application needs to be migrated from mainframe COBOL to HTML JavaScript. It took us 10 years to develop this code, so we figure we can migrate it all to web technologies in about 6 months. After that we will keep you busy building mind numbing internal departmental web portals." }];

  var jobTypes = exports.jobTypes = ["Full Time", "Contract", "Contract-To-Hire"];

  var jobSkills = exports.jobSkills = [".NET", "C#", "JavaScript", "HTML", "Scrum", "SQL Server", "NoSQL", "Microsoft Azure", "XAML", "Java", "NodeJS", "COBOL"];

  var states = exports.states = [{
    "name": "Alabama",
    "abbreviation": "AL"
  }, {
    "name": "Alaska",
    "abbreviation": "AK"
  }, {
    "name": "Arizona",
    "abbreviation": "AZ"
  }, {
    "name": "Arkansas",
    "abbreviation": "AR"
  }, {
    "name": "California",
    "abbreviation": "CA"
  }, {
    "name": "Colorado",
    "abbreviation": "CO"
  }, {
    "name": "Connecticut",
    "abbreviation": "CT"
  }, {
    "name": "Delaware",
    "abbreviation": "DE"
  }, {
    "name": "Florida",
    "abbreviation": "FL"
  }, {
    "name": "Georgia",
    "abbreviation": "GA"
  }, {
    "name": "Hawaii",
    "abbreviation": "HI"
  }, {
    "name": "Idaho",
    "abbreviation": "ID"
  }, {
    "name": "Illinois",
    "abbreviation": "IL"
  }, {
    "name": "Indiana",
    "abbreviation": "IN"
  }, {
    "name": "Iowa",
    "abbreviation": "IA"
  }, {
    "name": "Kansas",
    "abbreviation": "KS"
  }, {
    "name": "Kentucky",
    "abbreviation": "KY"
  }, {
    "name": "Louisiana",
    "abbreviation": "LA"
  }, {
    "name": "Maine",
    "abbreviation": "ME"
  }, {
    "name": "Maryland",
    "abbreviation": "MD"
  }, {
    "name": "Massachusetts",
    "abbreviation": "MA"
  }, {
    "name": "Michigan",
    "abbreviation": "MI"
  }, {
    "name": "Minnesota",
    "abbreviation": "MN"
  }, {
    "name": "Mississippi",
    "abbreviation": "MS"
  }, {
    "name": "Missouri",
    "abbreviation": "MO"
  }, {
    "name": "Montana",
    "abbreviation": "MT"
  }, {
    "name": "Nebraska",
    "abbreviation": "NE"
  }, {
    "name": "Nevada",
    "abbreviation": "NV"
  }, {
    "name": "New Hampshire",
    "abbreviation": "NH"
  }, {
    "name": "New Jersey",
    "abbreviation": "NJ"
  }, {
    "name": "New Mexico",
    "abbreviation": "NM"
  }, {
    "name": "New York",
    "abbreviation": "NY"
  }, {
    "name": "North Carolina",
    "abbreviation": "NC"
  }, {
    "name": "North Dakota",
    "abbreviation": "ND"
  }, {
    "name": "Ohio",
    "abbreviation": "OH"
  }, {
    "name": "Oklahoma",
    "abbreviation": "OK"
  }, {
    "name": "Oregon",
    "abbreviation": "OR"
  }, {
    "name": "Pennsylvania",
    "abbreviation": "PA"
  }, {
    "name": "Rhode Island",
    "abbreviation": "RI"
  }, {
    "name": "South Carolina",
    "abbreviation": "SC"
  }, {
    "name": "South Dakota",
    "abbreviation": "SD"
  }, {
    "name": "Tennessee",
    "abbreviation": "TN"
  }, {
    "name": "Texas",
    "abbreviation": "TX"
  }, {
    "name": "Utah",
    "abbreviation": "UT"
  }, {
    "name": "Vermont",
    "abbreviation": "VT"
  }, {
    "name": "Virginia",
    "abbreviation": "VA"
  }, {
    "name": "Washington",
    "abbreviation": "WA"
  }, {
    "name": "West Virginia",
    "abbreviation": "WV"
  }, {
    "name": "Wisconsin",
    "abbreviation": "WI"
  }, {
    "name": "Wyoming",
    "abbreviation": "WY"
  }];
});
define('sideBar/ads',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Ads = exports.Ads = function Ads() {
    _classCallCheck(this, Ads);
  };
});
define('sideBar/sponsors',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Sponsors = undefined;

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _class;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Sponsors = exports.Sponsors = function () {
    function Sponsors() {
      _classCallCheck(this, Sponsors);

      this.message = 'Sponsors';
      this.mapCollection = new window.Map();
      this.mapCollection.set('a', 'Alpha');
      this.mapCollection.set('b', 'Beta');
      this.mapCollection.set('c', 'Charlie');
      this.mapCollection.set('d', 'Delta');

      this.styleString = 'background: red';
      this.styleObject = {
        background: 'green'
      };
      this.person = new Person();
    }

    Sponsors.prototype.doSomething = function doSomething(foo, event) {
      console.log(foo, event);
    };

    return Sponsors;
  }();

  var Person = (_dec = (0, _aureliaFramework.computedFrom)('firstName', 'lastName'), (_class = function () {
    function Person() {
      _classCallCheck(this, Person);

      this.firstName = 'Cristhian';
      this.lastName = 'Valencia';
    }

    _createClass(Person, [{
      key: 'fullName',
      get: function get() {
        return this.firstName + ' ' + this.lastName;
      }
    }]);

    return Person;
  }(), (_applyDecoratedDescriptor(_class.prototype, 'fullName', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'fullName'), _class.prototype)), _class));
});
define('text!shell.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"toastr/build/toastr.min.css\"></require><require from=\"common/nav-bar\"></require><navigation-bar router.bind=\"router\"><template replace-part=\"logo\"><div>Aurelia Fundamentals</div></template></navigation-bar><div class=\"container\"><div style=\"background:#90ee90\" show.bind=\"notification\" click.delegate=\"clearNotification()\">Notification received: ${notification}</div><div class=\"col-xs-10\"><router-view name=\"mainContent\"></router-view></div><div class=\"col-xs-2\"><router-view name=\"sideBar\"></router-view></div></div></template>"; });
define('text!common/nav-bar.html', ['module'], function(module) { module.exports = "<template><nav class=\"navbar navbar-default\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\"><template replaceable part=\"logo\"></template></a></div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li repeat.for=\"route of router.navigation\" class=\"${route.isActive ? 'active' : ''}\"><a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" href.bind=\"route.href\">${route.title}</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li><i class=\"fa fa-cog fa-spin fa-3x\" style=\"margin:0 auto\" if.bind=\"router.isNavigating\"></i></li></ul></div></div></nav></template>"; });
define('text!discussion/discussion.html', ['module'], function(module) { module.exports = "<template>Discussion input: <input type=\"text\" value.bind=\"discussionInput\"><br><button type=\"button\" click.delegate=\"save()\">Save</button></template>"; });
define('text!events/EditDialog.html', ['module'], function(module) { module.exports = "<template><ai-dialog><ai-dialog-header><h3>Edit Event</h3></ai-dialog-header><ai-dialog-body><div class=\"form-group\"><label for=\"title\">Title</label><input type=\"text\" value.bind=\"event.title\" class=\"form-control\" id=\"title\" placeholder=\"Title\"></div><div class=\"form-group\"><label for=\"description\">Description</label><br><textarea id=\"description\" name=\"description\" value.bind=\"event.description\" rows=\"4\" cols=\"50\"></textarea></div></ai-dialog-body><ai-dialog-footer><button type=\"button\" class=\"btn btn-primary\" click.delegate=\"save()\">Save</button> <button type=\"button\" class=\"btn btn-default\" click.delegate=\"cancel()\">Cancel</button></ai-dialog-footer></ai-dialog></template>"; });
define('text!events/event.html', ['module'], function(module) { module.exports = "<template><div class=\"bg-success rbox\"><table><tr><td><a href.bind=\"event.detailUrl\"><h3 textcontent.bind=\"event.title\"></h3></a></td></tr><tr><td><h5>${event.dateTime | dateFormat}</h5></td></tr><tr><td innerhtml.bind=\"event.description | sanitizeHTML\"></td></tr></table><div textcontent.two-way=\"event.description\" contenteditable=\"true\"></div></div></template>"; });
define('text!events/eventDetail.html', ['module'], function(module) { module.exports = "<template><require from=\"common/speakerImage\"></require><div class=\"row\"><div class=\"col-md-3\"><img speaker-img=\"image-name.bind: event.image; is-mvp.bind: event.isMvp\" style=\"width:100%\"></div><div class=\"col-md-11\"><h3>${event.title}</h3><h5>${event.dateTime | dateFormat}</h5><button click.delegate=\"editEvent(event)\">Edit</button></div></div><div class=\"row\"><div class=\"col-m-12\">${event.description}</div></div></template>"; });
define('text!events/events.html', ['module'], function(module) { module.exports = "<template><style type=\"text/css\">.nav-tabs li a{font-size:20px}</style><ul class=\"nav nav-tabs\"><li repeat.for=\"route of router.navigation\" class=\"${route.isActive ? 'active' : '' }\"><a href.bind=\"route.href\">${route.title}</a></li></ul><router-view></router-view></template>"; });
define('text!events/eventsList.html', ['module'], function(module) { module.exports = "<template><div repeat.for=\"event of events\"><compose model.bind=\"event\" view=\"./event.html\"></compose></div><button type=\"button\" click.trigger=\"goToDiscussion()\">Go to discussion</button></template>"; });
define('text!events/past.html', ['module'], function(module) { module.exports = "<template>Past Events</template>"; });
define('text!jobs/addJob.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"save()\"><div class=\"form-group\"><label for=\"title\">Title</label><input type=\"text\" value.bind=\"job.title & validate\" class=\"form-control\" id=\"title\" placeholder=\"Title\"></div><div class=\"form-group\"><label for=\"description\">Description</label><textarea value.bind=\"job.description\" class=\"form-control\" id=\"description\" placeholder=\"Description\" rows=\"5\"></textarea></div><div class=\"form-group\"><label for=\"needDate\">Need Date</label><input type=\"text\" id=\"needDate\" value.bind=\"job.needDate | dateFormat : 'MM/YYYY' & updateTrigger:'blur'\" placeholder=\"Need Date\"></div><div class=\"form-group\"><label for=\"jobType\">Job Type:</label><label repeat.for=\"jobType of jobTypes\"><input type=\"radio\" name=\"jobType\" value.bind=\"jobType\" checked.bind=\"$parent.job.jobType\"> ${jobType}</label></div><div class=\"form-group\"><label>Job Skills:</label><label repeat.for=\"jobSkill of jobSkills\"><input type=\"checkbox\" value.bind=\"jobSkill\" checked.bind=\"$parent.job.jobSkills\"> ${jobSkill}</label></div><div class=\"form-group\"><label for=\"city\">City</label><input type=\"text\" id=\"city\" value.bind=\"job.location.city\" placeholder=\"City\"></div><div class=\"form-group\"><label for=\"state\">State</label><select id=\"state\" value.bind=\"job.location.state\"><option>Select State</option><option repeat.for=\"state of states\" model.bind=\"state.abbreviation\">${state.name} (${state.abbreviation})</option></select></div><button type=\"submit\" class=\"btn btn-primary\">Save</button><ul if.bind=\"controller.errors\"><li repeat.for=\"error of controller.errors\" style=\"color:red\">${error.message}</li></ul></form></template>"; });
define('text!jobs/jobs.html', ['module'], function(module) { module.exports = "<template><h3>Job Listings</h3><button type=\"button\" click.delegate=\"addJob()\"><img src=\"images/Add-New.png\"></button><table class=\"table table-striped\"><thead><tr><th>Title</th><th>Need Date</th><th>Location</th><th>Technologies</th></tr></thead><tbody><tr repeat.for=\"job of jobs\"><td>${job.title}</td><td>${job.needDate | dateFormat : 'MM/YYYY'}</td><td>${job.location.city},${job.location.state}</td><td>${job.jobSkills.join(', ')}</td></tr></tbody></table></template>"; });
define('text!sideBar/ads.html', ['module'], function(module) { module.exports = "<template>Ads</template>"; });
define('text!sideBar/sponsors.html', ['module'], function(module) { module.exports = "<template><div textcontent.one-way=\"message\"></div><button type=\"button\" click.trigger=\"doSomething(message, $event)\">Click me</button> <input type=\"text\" ref=\"input1\" placeholder=\"Search with debounce 200\"><div style.bind=\"styleString\">${input1.value & debounce: 200}</div><p style.bind=\"styleObject\" repeat.for=\"[key, value] of mapCollection\">${key} - ${value}</p><input type=\"text\" value.bind=\"person.firstName\"> <input type=\"text\" value.bind=\"person.lastName\"> ${person.fullName}</template>"; });
//# sourceMappingURL=app-bundle.js.map
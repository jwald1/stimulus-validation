(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stimulus'), require('validate.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'stimulus', 'validate.js'], factory) :
  (global = global || self, factory(global.StimulusValidation = {}, global.Stimulus, global.Validate));
}(this, function (exports, stimulus, Validate) { 'use strict';

  Validate = Validate && Validate.hasOwnProperty('default') ? Validate['default'] : Validate;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) { descriptor.writable = true; }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
    if (staticProps) { _defineProperties(Constructor, staticProps); }
    return Constructor;
  }

  var createClass = _createClass;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) { setPrototypeOf(subClass, superClass); }
  }

  var inherits = _inherits;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) { return arr; }
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) { break; }
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) { _i["return"](); }
      } finally {
        if (_d) { throw _e; }
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  var Attribute =
  /*#__PURE__*/
  function () {
    function Attribute(attribute, el, validators) {
      classCallCheck(this, Attribute);

      this.attribute = attribute;
      this.el = el;
      this.validators = validators;
    }

    createClass(Attribute, [{
      key: "value",
      get: function get() {
        return this.el.type === "checkbox" ? this.el.checked : this.el.value;
      }
    }, {
      key: "validationMethods",
      get: function get() {
        var _this = this;

        var result = [];
        Object.entries(this.validators).forEach(function (_ref) {
          var _ref2 = slicedToArray(_ref, 2),
              methodName = _ref2[0],
              attributes = _ref2[1].attributes;

          if (attributes.includes(_this.attribute)) {
            result.push(methodName);
          }
        });
        return result;
      }
    }]);

    return Attribute;
  }();

  function attributeFromElement(el) {
    var value = el.dataset.attr;
    attributeNotFound(value);
    value = value.split(".")[1];
    attributeNotFound(value);
    return value;
  }

  function attributeNotFound(value) {
    if (!value) {
      throw new Error("We can't find attribute name. Please add data-attr");
    }
  }

  var Attributes =
  /*#__PURE__*/
  function () {
    function Attributes(controller) {
      classCallCheck(this, Attributes);

      this.controller = controller;
      this.dataMap = new Map();
      this.createAttributesMap();
    }

    createClass(Attributes, [{
      key: "get",
      value: function get(attribute) {
        return this.dataMap.get(attribute);
      }
    }, {
      key: "createAttributesMap",
      value: function createAttributesMap() {
        var _this = this;

        this.validationElements.forEach(function (el) {
          var attrName = attributeFromElement(el);

          _this.add(attrName, el);
        });
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.createAttributesMap();
      }
    }, {
      key: "has",
      value: function has(value) {
        return this.dataMap.has(value);
      }
    }, {
      key: "add",
      value: function add(attrName, el) {
        var validators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.validators;
        var attribute = new Attribute(attrName, el, validators);
        this.dataMap.set(attrName, attribute);
        return attribute;
      }
    }, {
      key: "forEach",
      value: function forEach() {
        var _this$dataMap;

        return (_this$dataMap = this.dataMap).forEach.apply(_this$dataMap, arguments);
      }
    }, {
      key: "size",
      get: function get() {
        return this.dataMap.size;
      }
    }, {
      key: "validationElements",
      get: function get() {
        return this.element.querySelectorAll("[data-attr^=\"".concat(this.identifier, ".\"]"));
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.controller.identifier;
      }
    }, {
      key: "element",
      get: function get() {
        return this.controller.element;
      }
    }, {
      key: "validators",
      get: function get() {
        return this.controller.constructor.validators;
      }
    }]);

    return Attributes;
  }();

  var Errors =
  /*#__PURE__*/
  function () {
    function Errors() {
      classCallCheck(this, Errors);

      this.dataMap = new Map();
    }

    createClass(Errors, [{
      key: "clear",
      value: function clear() {
        return this.dataMap.clear();
      }
    }, {
      key: "hasAny",
      value: function hasAny() {
        return !!this.size;
      }
    }, {
      key: "has",
      value: function has(attribute) {
        return this.dataMap.has(attribute);
      }
    }, {
      key: "get",
      value: function get(attribute) {
        return this.dataMap.get(attribute);
      }
    }, {
      key: "add",
      value: function add(attribute, message) {
        var attributesMessages = this.dataMap.get(attribute) || [];
        attributesMessages.push(message);
        this.dataMap.set(attribute, attributesMessages);
      }
    }, {
      key: "clearAttribute",
      value: function clearAttribute(attribute) {
        this.dataMap.delete(attribute);
      }
    }, {
      key: "forEach",
      value: function forEach() {
        var _this$dataMap;

        return (_this$dataMap = this.dataMap).forEach.apply(_this$dataMap, arguments);
      }
    }, {
      key: "size",
      get: function get() {
        var arrayOfmessages = Array.from(this.dataMap.values());
        return arrayOfmessages.reduce(function (total, messages) {
          return total += messages.length;
        }, 0);
      }
    }]);

    return Errors;
  }();

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); }
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  var Validator =
  /*#__PURE__*/
  function () {
    function Validator(controller) {
      classCallCheck(this, Validator);

      this.controller = controller;
    }

    createClass(Validator, [{
      key: "run",
      value: function run(attribute) {
        this.errors.clearAttribute(attribute);
        this.validateRule(attribute);
        this.invokeValidationMethods(attribute);
      }
    }, {
      key: "validateRule",
      value: function validateRule(attribute) {
        var _this$constructor,
            _this = this;

        var params = this.validatejsParams(attribute);

        if (!params) {
          return;
        }

        var messages = (_this$constructor = this.constructor).validatejs.apply(_this$constructor, toConsumableArray(params));

        if (messages) {
          messages[attribute].forEach(function (message) {
            return _this.errors.add(attribute, message);
          });
        }
      }
    }, {
      key: "invokeValidationMethods",
      value: function invokeValidationMethods(attribute) {
        var _this2 = this;

        var _this$attributes$get = this.attributes.get(attribute),
            el = _this$attributes$get.el,
            value = _this$attributes$get.value,
            validationMethods = _this$attributes$get.validationMethods;

        validationMethods.forEach(function (methodName) {
          var method = _this2.controller[methodName];

          if (!method) {
            throw new Error("".concat(methodName, " is not defined"));
          }

          method.call(_this2.controller, {
            attr: attribute,
            value: value,
            el: el
          });
        });
      }
    }, {
      key: "validatejsParams",
      value: function validatejsParams(attribute) {
        var rule = this.rules[attribute];

        if (!rule) {
          return;
        }

        var _this$attributes$get2 = this.attributes.get(attribute),
            value = _this$attributes$get2.value;

        return [defineProperty({}, attribute, value), defineProperty({}, attribute, this.rules[attribute])];
      }
    }, {
      key: "rules",
      get: function get() {
        return this.controller.constructor.rules;
      }
    }, {
      key: "errors",
      get: function get() {
        return this.controller.errors;
      }
    }, {
      key: "attributes",
      get: function get() {
        return this.controller.attributes;
      }
    }], [{
      key: "validatejs",
      get: function get() {
        return Validate;
      }
    }]);

    return Validator;
  }();

  var ValidationController =
  /*#__PURE__*/
  function (_Controller) {
    inherits(ValidationController, _Controller);

    function ValidationController() {
      classCallCheck(this, ValidationController);

      return possibleConstructorReturn(this, getPrototypeOf(ValidationController).apply(this, arguments));
    }

    createClass(ValidationController, [{
      key: "connect",
      // overwirde in subclass
      // overwirde in subclass
      value: function connect() {
        this.errors = new Errors();
        this.attributes = new Attributes(this);
        this._validator = new Validator(this);
      }
    }, {
      key: "validate",
      value: function validate(event) {
        var el = event.currentTarget;
        var attribute = attributeFromElement(el);

        if (!this.attributes.has(attribute)) {
          this.attributes.add(attribute, el);
        }

        var _this$attributes$get = this.attributes.get(attribute),
            value = _this$attributes$get.value;

        this.runValidator(attribute);
        this.afterValidate({
          el: el,
          attr: attribute,
          value: value
        });
      }
    }, {
      key: "afterValidate",
      value: function afterValidate(attribute) {// overwirde in subclass
      }
    }, {
      key: "afterValidateAll",
      value: function afterValidateAll(event) {// overwirde in subclass
      }
    }, {
      key: "runValidator",
      value: function runValidator(attribute) {
        this._validator.run(attribute);
      }
    }, {
      key: "validateAll",
      value: function validateAll(event) {
        var _this = this;

        this.attributes.refresh();
        this.errors.clear();
        this.attributes.forEach(function (_ref, attribute) {
          var el = _ref.el,
              value = _ref.value;

          _this.runValidator(attribute);

          if (_this.errors.hasAny()) {
            event.preventDefault();
          }

          _this.afterValidate({
            el: el,
            attr: attribute,
            value: value
          });
        });
        this.afterValidateAll(event);
      }
    }, {
      key: "validatejs",
      get: function get() {
        return Validator.validatejs;
      }
    }], [{
      key: "validatejs",
      get: function get() {
        return Validator.validatejs;
      }
    }]);

    return ValidationController;
  }(stimulus.Controller);

  defineProperty(ValidationController, "rules", {});

  defineProperty(ValidationController, "validators", []);

  exports.ValidationController = ValidationController;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=validation-controller.umd.js.map

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/responsive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swiperMode = void 0;

var swiperMode = function swiperMode() {
  var swiper = Swiper;
  var init = false;
  var desktop = window.matchMedia('(min-width: 1025px)');
  var tablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');

  if (!desktop.matches) {
    if (!init) {
      init = true;
      swiper = new Swiper('.swiper', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        },
        sliderPerView: 1,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }
      });
      var cardCheck = document.querySelectorAll('.card__todo');
      cardCheck.forEach(function (card) {
        card.addEventListener('touchmove', function (event) {
          swiper.slideNext(4000, false);
        });
      });
    }
  } else if (tablet.matches) {
    $('.swiper').addClass("disabled");
    init = false;
  } else if (desktop.matches) {
    $('.swiper').addClass("disabled");
    init = false;
  }

  return swiper;
};

exports.swiperMode = swiperMode;
},{}],"js/createCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = void 0;

var createTodo = function createTodo(todoTitle, todoDescription, todoImg, todoUser, todoId) {
  var todoCase = document.createElement("div");
  todoCase.className = "card__todo";
  var cardTop = document.createElement("div");
  cardTop.className = "card_top";
  var todoTitleHead = document.createElement("h3");
  todoTitleHead.className = "card__todo-title title4";
  var todoTitleText = document.createTextNode(todoTitle);
  var todoDate = document.createElement("div");
  var date = new Date().toLocaleTimeString();
  todoDate.className = "card__todo-title";
  var todoDescriptionCard = document.createElement("div");
  todoDescriptionCard.className = "todo-description";
  var todoDescriptionText = document.createTextNode(todoDescription);
  todoCase.append(cardTop);
  cardTop.append(todoTitleHead);
  todoTitleHead.append(todoTitleText);
  cardTop.append(todoDate);
  todoDate.append(date);
  todoDescriptionCard.append(todoDescriptionText);
  todoCase.append(todoDescriptionCard);
  var cardBottom = document.createElement("div");
  cardBottom.className = "card_bottom";
  var user = document.createElement("div");
  user.className = "user";
  var todoAuthor = document.createElement("img");
  todoAuthor.className = "card__todo-author";
  var imgAtr = document.createAttribute('src');
  imgAtr.value = todoImg;
  todoAuthor.setAttributeNode(imgAtr);
  var todoUserName = document.createElement("p");
  var todoUserNameText = document.createTextNode(todoUser);
  todoUserName.className = "todo__user-name";
  var cardEdit = document.createElement("div");
  cardEdit.className = "card__todo-btns";
  var linkEdit = document.createElement("a");
  linkEdit.className = "card__todo-edit";
  var linkEditPicture = document.createElement("i");
  linkEditPicture.className = "edit icon";
  linkEditPicture.dataset.type = 'edit-card';
  var linkDelete = document.createElement("a");
  linkDelete.className = "card__todo-delete";
  var linkDeletePicture = document.createElement("i");
  linkDeletePicture.className = "trash alternate icon";
  linkDeletePicture.dataset.type = 'delete-one';
  todoCase.append(cardBottom);
  cardBottom.append(user);
  user.append(todoAuthor);
  user.append(todoUserName);
  cardBottom.append(cardEdit);
  cardEdit.append(linkEdit);
  cardEdit.append(linkDelete);
  linkEdit.append(linkEditPicture);
  linkDelete.append(linkDeletePicture);
  todoUserName.append(todoUserNameText);
  todoCase.dataset.trelloId = todoId;
  todoCase.setAttribute('id', 'todo-id');
  return todoCase;
};

exports.createTodo = createTodo;
},{}],"js/usersGenerate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userName = exports.userAvatarEdit = exports.userAvatar = exports.randomNum = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var randomNum = Math.floor(Math.random() * 6) + 1;
exports.randomNum = randomNum;

var userName = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, users;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('https://jsonplaceholder.typicode.com/users');

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            return _context.abrupt("return", users = _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userName() {
    return _ref.apply(this, arguments);
  };
}();

exports.userName = userName;

var userAvatar = function userAvatar(randomNum) {
  var mainDiv = document.getElementById('menu');
  var div = document.createElement('div');
  div.className = 'item';
  var divAtr = document.createAttribute('data-value');
  div.setAttributeNode(divAtr);
  var todoImg = document.createElement("img");
  todoImg.className = "ui mini avatar image";
  var imgAtr = document.createAttribute('src');
  imgAtr.value = "https://avatars.dicebear.com/api/bottts/".concat(randomNum, ".svg");
  todoImg.setAttributeNode(imgAtr);
  div.append(todoImg);
  mainDiv.append(div);
  return div;
};

exports.userAvatar = userAvatar;

var userAvatarEdit = function userAvatarEdit(randomNum) {
  var editDiv = document.getElementById('menu-edit');
  var divEdit = document.createElement('div');
  divEdit.className = 'item';
  var divAtrEdit = document.createAttribute('data-value');
  divEdit.setAttributeNode(divAtrEdit);
  var todoImgEdit = document.createElement("img");
  todoImgEdit.className = "ui mini avatar image";
  var imgEditAtr = document.createAttribute('src');
  imgEditAtr.value = "https://avatars.dicebear.com/api/bottts/".concat(randomNum, ".svg");
  todoImgEdit.setAttributeNode(imgEditAtr);
  divEdit.append(todoImgEdit);
  editDiv.append(divEdit);
  return divEdit;
};

exports.userAvatarEdit = userAvatarEdit;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _responsive = require("./responsive.js");

var _createCard = require("./createCard.js");

var _usersGenerate = require("./usersGenerate.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// on load
window.addEventListener('load', function () {
  (0, _responsive.swiperMode)();
});
/* On Resize*/

window.addEventListener('resize', function () {
  (0, _responsive.swiperMode)();
}); // Generate Avatars for modals

for (var i = 0; i < 6; i++) {
  (0, _usersGenerate.userAvatar)(i);
  (0, _usersGenerate.userAvatarEdit)(i);
} // Generate user name for modals


var userArr = document.getElementById('menu').children;
var userArrEdit = document.getElementById('menu-edit').children;
(0, _usersGenerate.userName)().then(function (users) {
  var newArr = users.map(function (user) {
    return user.name;
  });
  var data;

  for (var _i = 0; _i < userArr.length; _i++) {
    data = newArr[_i].split(' ').join('_');

    if (data.includes('.')) {
      data = data.split('.').join('_');
    }

    userArr[_i].dataset.value = data;
    userArrEdit[_i].dataset.value = data;

    userArr[_i].append(newArr[_i]);

    userArrEdit[_i].append(newArr[_i]);
  }
});
var storage = {
  getDataByKey: function getDataByKey(key) {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return [];
    }
  },
  pushDataByKey: function pushDataByKey(key, data) {
    var dataByKey = this.getDataByKey(key);
    dataByKey = [].concat(_toConsumableArray(dataByKey), [data]);
    localStorage.setItem(key, JSON.stringify(dataByKey));
  }
};
var todos = [];
var inProgressColumn = document.querySelector('.dashboard__cards-inProgress');
var cardTodoColumn = document.querySelector('.dashboard__cards-todo');
var doneColumn = document.querySelector('.dashboard__cards-done');

var checkTodos = function checkTodos() {
  var cards = storage.getDataByKey('cards');

  if (cards) {
    todos = [].concat(_toConsumableArray(todos), _toConsumableArray(cards.map(function (card) {
      return new TodoConstructor(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId, card.todoColumn);
    })));
  }

  var _iterator = _createForOfIteratorHelper(cards),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var card = _step.value;

      if (+card.todoColumn === +cardTodoColumn.dataset.columnId) {
        cardTodoColumn.append((0, _createCard.createTodo)(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId, card.todoColumn));
      } else if (+card.todoColumn === +inProgressColumn.dataset.columnId) {
        inProgressColumn.append((0, _createCard.createTodo)(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId, card.todoColumn));
      } else if (+card.todoColumn === +doneColumn.dataset.columnId) {
        doneColumn.append((0, _createCard.createTodo)(card.todoTitle, card.todoDescription, card.todoImg, card.todoUser, card.todoId, card.todoColumn));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}; // DragNDrop


var containerTdo = document.querySelector('.dashboard__cards-todo');
var containerInProgress = document.querySelector('.dashboard__cards-inProgress');
var containerDone = document.querySelector('.dashboard__cards-done');
var root = document.getElementById('root');
var drake = dragula([containerTdo, containerInProgress, containerDone]);
drake.on('drop', function (el, target, source, sibling) {
  if (target === containerInProgress && target.children.length >= 6) {
    $('.ui.modal.pop-up__inprogress').modal({
      blurring: true
    }, {
      observeChanges: true
    }).modal('show');
  }

  var _iterator2 = _createForOfIteratorHelper(todos),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var todo = _step2.value;

      if (+todo.todoId === +el.dataset.trelloId) {
        todo.todoColumn = target.dataset.columnId;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  localStorage.setItem('cards', JSON.stringify(todos));
}); // Search

var searchModul = document.querySelectorAll('.search__box');
searchModul.forEach(function (it) {
  it.addEventListener('keyup', function (event) {
    var searchModul = event.target;
    var todosArr = document.querySelectorAll('.card__todo');
    var input = searchModul.value;
    input = input.toLowerCase();

    var _iterator3 = _createForOfIteratorHelper(todosArr),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var item = _step3.value;

        if (!item.textContent.toLowerCase().includes(input)) {
          item.style.display = 'none';
        } else {
          item.style.display = 'block';
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  });
}); //Add New card

var TodoConstructor = function TodoConstructor(todoTitle, todoDescription, todoImg, todoUser, todoId, todoColumn) {
  this.todoTitle = todoTitle;
  this.todoDescription = todoDescription;
  this.todoImg = todoImg;
  this.todoUser = todoUser;
  this.todoId = todoId;
  this.todoColumn = todoColumn;
}; //Get access


var approveBtn = document.getElementById("approveBtn");
var cardTodo = document.getElementById("todoCase");
var inputTitle = document.getElementById('inputTitle');
var inputDescription = document.getElementById('inputDescription'); // Open add todo modal

var btnAdd = document.getElementById('btn-add');
btnAdd.addEventListener('click', function () {
  inputTitle.value = '';
  inputDescription.value = '';
  $('#modal_add').modal({
    blurring: true
  }, {
    allowMultiple: true
  }).modal('show').modal({
    onApprove: function onApprove() {
      $('#form-add').submit();
      return false;
    }
  });
  var formSettings = {
    onSuccess: function onSuccess() {
      $('.modal').modal('hide');
    }
  };
  $('#form-add').form(formSettings);
  $('.ui.dropdown').dropdown('restore defaults');
}); //Create trello card

approveBtn.addEventListener('click', function () {
  if (inputTitle.value === '' && inputDescription.value === '') {
    $('#form-add').form({
      fields: {
        title: 'empty',
        description: 'empty'
      }
    });
  } else if (inputTitle.value === '') {
    $('#form-add').form({
      fields: {
        title: 'empty'
      }
    });
  } else if (inputDescription.value === '') {
    $('#form-add').form({
      fields: {
        description: 'empty'
      }
    });
  } else {
    var currentUser = $('#selection').dropdown('get value');
    var currentName = currentUser.split(' ').join('_');

    if (currentName.includes('.')) {
      currentName = currentName.split('.').join('_');
    }

    var el = document.querySelector("[data-value = ".concat(currentName, "]"));
    var userImage = el.firstChild;
    var imgAvatar = userImage.src;
    var todoUser = el.textContent;
    var todoId = Date.now();
    var column = "1";
    var todo = new TodoConstructor(inputTitle.value, document.getElementById('inputDescription').value, imgAvatar, todoUser, todoId, column);
    cardTodo.append((0, _createCard.createTodo)(inputTitle.value, document.getElementById('inputDescription').value, imgAvatar, todoUser, todoId, column));
    todos.push(todo);
    storage.pushDataByKey('cards', todo);
  }
}); // Pop ups

checkTodos();
var btnDeleteAll = document.querySelector('.btn__delete');
var btnDeleteConfirm = document.querySelector('.btn--dark');
var dashboardDone = document.querySelector('.dashboard__cards-done');
root.addEventListener('click', function (event) {
  if (event.target.dataset.type === 'delete-one') {
    var trelloId = document.getElementById('todo-id');
    var currentTrello = event.target.closest('.card__todo');

    if (todos.length) {
      todos = todos.filter(function (todo) {
        return +todo.todoId !== +currentTrello.dataset.trelloId;
      });
      currentTrello.remove();
      localStorage.setItem("cards", JSON.stringify(todos));
    } else {
      localStorage.clear();
      trelloId.remove();
    }
  }

  if (event.target.dataset.type === 'edit-card') {
    var _inputTitle = document.getElementById('title-edit');

    var _inputDescription = document.getElementById('desc-edit');

    var editBtn = document.getElementById('editBtn');
    var clicked = event.target.closest('.card__todo');
    var clickedName = clicked.querySelector('.todo__user-name').textContent;
    var currentName = clickedName.split(' ').join('_');

    if (currentName.includes('.')) {
      currentName = currentName.split('.').join('_');
    }

    var dropdownDefault = document.querySelector("[data-value = ".concat(currentName, "]")).firstChild;
    var img = dropdownDefault.src;
    $('#modal_edit').modal({
      blurring: true
    }, {
      allowMultiple: true
    }).modal('show').modal({
      onApprove: function onApprove() {
        $('#form-edit').submit();
        return false;
      }
    });
    var formSettings = {
      onSuccess: function onSuccess() {
        $('#modal_edit').modal('hide');
      }
    };
    $('#form-edit').form(formSettings);
    $('.ui.dropdown').dropdown('set text', "<img class=\"ui mini avatar image\" src= ".concat(img, "> ").concat(clickedName));
    var elCurrent = document.querySelector("[data-value = ".concat(currentName, "]"));
    var changedVal = elCurrent;
    $('#dropdown-edit').dropdown({
      'set value': "".concat(clickedName),
      onChange: function onChange(value1) {
        changedVal = value1;
        console.log(changedVal);
        return changedVal;
      }
    });
    _inputTitle.value = clicked.querySelector('.card__todo-title').textContent;
    _inputDescription.value = clicked.querySelector('.todo-description').textContent;
    var clickedImg = clicked.querySelector('.card__todo-author');
    var clickedUser = clicked.querySelector('.todo__user-name');
    editBtn.addEventListener('click', function () {
      if (_inputTitle.value === '' && _inputDescription.value === '') {
        $('#form-edit').form({
          fields: {
            title: 'empty',
            description: 'empty'
          }
        });
      } else if (_inputTitle.value === '') {
        $('#form-edit').form({
          fields: {
            title: 'empty'
          }
        });
      } else if (_inputDescription.value === '') {
        $('#form-edit').form({
          fields: {
            description: 'empty'
          }
        });
      } else {
        clicked.querySelector('.card__todo-title').textContent = _inputTitle.value;
        clicked.querySelector('.todo-description').textContent = _inputDescription.value;

        if (changedVal !== elCurrent) {
          var extractImg = document.querySelector("[data-value = ".concat(changedVal, "]"));
          clickedImg.src = extractImg.querySelector('.ui.mini.avatar.image').src;
          clickedUser.textContent = extractImg.textContent;
        } else {
          clickedImg.src = elCurrent.querySelector('.ui.mini.avatar.image').src;
          clickedUser.textContent = elCurrent.textContent;
        }

        var _iterator4 = _createForOfIteratorHelper(todos),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var todo = _step4.value;

            if (+todo.todoId === +clicked.dataset.trelloId) {
              todo.todoTitle = _inputTitle.value;
              todo.todoDescription = _inputDescription.value;
              todo.todoImg = clickedImg.src;
              todo.todoUser = clickedUser.textContent;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        localStorage.setItem('cards', JSON.stringify(todos));
      }
    });
  }
});
btnDeleteConfirm.addEventListener("click", function (event) {
  $('.ui.modal.pop-up__delete-all').modal({
    blurring: true
  }).modal('show');
  todos = todos.filter(function (todo) {
    return +todo.todoColumn !== +doneColumn.dataset.columnId;
  });
  dashboardDone.innerHTML = '';
  localStorage.setItem("cards", JSON.stringify(todos));
});
btnDeleteAll.addEventListener("click", function (event) {
  if (containerDone.children.length) {
    $('.ui.modal.pop-up__delete-all').modal({
      blurring: true
    }).modal('show');
  } else {
    return containerDone;
  }
});
},{"./responsive.js":"js/responsive.js","./createCard.js":"js/createCard.js","./usersGenerate.js":"js/usersGenerate.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49309" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map
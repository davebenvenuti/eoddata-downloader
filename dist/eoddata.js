"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _dotenv = require("dotenv");

var _client = require("./client");

var _util = require("./util");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _client.fetchExchangeData)("NASDAQ", (0, _util.yesterday)());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _init.apply(this, arguments);
}

init();
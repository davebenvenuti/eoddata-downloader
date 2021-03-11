"use strict";

var _commander = require("commander");

var _client = require("./client");

var _util = require("./util");

var _package = require("../package.json");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var program = new _commander.Command();
program.version(_package.version);
program.requiredOption('-e, --exchange <exchange>', 'NASDAQ|NYSE').requiredOption('-d --date <YYYYMMDD>', 'a parsable date string').option('-o, --outputFilename <filename>', 'output filename, defaults to STDOUT').option('-v, --verbose', 'more verbose output, defaults to false', false);
program.parse(process.argv);

var _program$opts = program.opts(),
    date = _program$opts.date,
    exchange = _program$opts.exchange,
    outputFilename = _program$opts.outputFilename,
    verbose = _program$opts.verbose;

var parsedDate = (0, _util.parseDateString)(date);

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _client.fetchExchangeData)(exchange, parsedDate, outputFilename, verbose);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _run.apply(this, arguments);
}

run();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchExchangeData = fetchExchangeData;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// MEMBER LOGIN
var DOWNLOAD_URL = "https://eoddata.com/download.aspx";

function login(_x) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
    var browser, username, password, page, _browser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = process.env.EODDATA_USERNAME;
            password = process.env.EODDATA_PASSWORD;
            _context.next = 4;
            return _puppeteer["default"].launch();

          case 4:
            browser = _context.sent;
            _context.next = 7;
            return browser.newPage();

          case 7:
            page = _context.sent;
            _context.prev = 8;
            _context.next = 11;
            return page["goto"](DOWNLOAD_URL);

          case 11:
            _context.next = 13;
            return page.type("input[name*='txtEmail']", username);

          case 13:
            _context.next = 15;
            return page.type("input[name*='txtPassword']", password);

          case 15:
            _context.next = 17;
            return page.click("input[type='submit'][name*='btnLogin']");

          case 17:
            _context.next = 19;
            return verifyLogin(page);

          case 19:
            _context.next = 21;
            return callback(browser, page);

          case 21:
            return _context.abrupt("return", _context.sent);

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](8);
            console.error(_context.t0);
            throw _context.t0;

          case 28:
            _context.prev = 28;
            (_browser = browser) === null || _browser === void 0 ? void 0 : _browser.close();
            return _context.finish(28);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 24, 28, 31]]);
  }));
  return _login.apply(this, arguments);
}

;

function verifyLogin(_x2) {
  return _verifyLogin.apply(this, arguments);
}

function _verifyLogin() {
  _verifyLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(page) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return page.waitForSelector("span[id*='lblName']");

          case 3:
            _context2.next = 9;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            throw new Error("Login failed");

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return _verifyLogin.apply(this, arguments);
}

function formatDateForUrl(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return "".concat(date.getFullYear()).concat(month.toString().padStart(2, "0")).concat(day.toString().padStart(2, "0"));
}

var CSV_FORMAT = "4";

function fetchExchangeDataUrlAndCookies(_x3, _x4) {
  return _fetchExchangeDataUrlAndCookies.apply(this, arguments);
}

function _fetchExchangeDataUrlAndCookies() {
  _fetchExchangeDataUrlAndCookies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(exchange, date) {
    var verbose,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            verbose = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : false;
            return _context5.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return login( /*#__PURE__*/function () {
                          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(browser, page) {
                            var link, hrefHandle, href, url, dateString, _yield$page$_client$s, cookies;

                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    _context3.prev = 0;
                                    if (verbose) console.log("logged in successfully");
                                    _context3.next = 4;
                                    return page["goto"]("https://eoddata.com/download.aspx");

                                  case 4:
                                    _context3.next = 6;
                                    return page.$("a[href*='/data/filedownload.aspx']");

                                  case 6:
                                    link = _context3.sent;
                                    _context3.next = 9;
                                    return link.getProperty('href');

                                  case 9:
                                    hrefHandle = _context3.sent;
                                    _context3.next = 12;
                                    return hrefHandle.jsonValue();

                                  case 12:
                                    href = _context3.sent;
                                    url = new URL(href);
                                    dateString = formatDateForUrl(date);
                                    url.searchParams.set("sd", dateString);
                                    url.searchParams.set("ed", dateString);
                                    url.searchParams.set("e", exchange);
                                    url.searchParams.set("d", CSV_FORMAT);
                                    if (verbose) console.log("Downloading ".concat(url.toString()));
                                    _context3.next = 22;
                                    return page._client.send('Network.getAllCookies');

                                  case 22:
                                    _yield$page$_client$s = _context3.sent;
                                    cookies = _yield$page$_client$s.cookies;
                                    resolve({
                                      url: url.toString(),
                                      cookies: cookies
                                    });
                                    _context3.next = 33;
                                    break;

                                  case 27:
                                    _context3.prev = 27;
                                    _context3.t0 = _context3["catch"](0);
                                    console.error(_context3.t0);
                                    _context3.next = 32;
                                    return page.screenshot({
                                      path: "whoops.png"
                                    });

                                  case 32:
                                    reject(_context3.t0);

                                  case 33:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            }, _callee3, null, [[0, 27]]);
                          }));

                          return function (_x9, _x10) {
                            return _ref3.apply(this, arguments);
                          };
                        }());

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _fetchExchangeDataUrlAndCookies.apply(this, arguments);
}

function cookiesToHeaderString(cookies) {
  return cookies.map(function (_ref) {
    var name = _ref.name,
        value = _ref.value;
    return "".concat(name, "=").concat(value);
  }).join("; ");
}

function fetchExchangeData(_x5, _x6) {
  return _fetchExchangeData.apply(this, arguments);
}

function _fetchExchangeData() {
  _fetchExchangeData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(exchange, date) {
    var outputFilename,
        verbose,
        _yield$fetchExchangeD,
        cookies,
        url,
        _args6 = arguments;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            outputFilename = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : null;
            verbose = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;
            _context6.next = 4;
            return fetchExchangeDataUrlAndCookies(exchange, date, verbose);

          case 4:
            _yield$fetchExchangeD = _context6.sent;
            cookies = _yield$fetchExchangeD.cookies;
            url = _yield$fetchExchangeD.url;
            return _context6.abrupt("return", (0, _nodeFetch["default"])(url, {
              headers: {
                cookie: cookiesToHeaderString(cookies)
              }
            }).then(function (res) {
              var dest = outputFilename ? _fs["default"].createWriteStream(outputFilename) : process.stdout;
              res.body.pipe(dest);
              res.body.on('end', function () {
                return verbose ? console.log("Wrote ".concat(outputFilename)) : null;
              });
            }));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _fetchExchangeData.apply(this, arguments);
}
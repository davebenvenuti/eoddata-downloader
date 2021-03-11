"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yesterday = yesterday;
exports.dayBefore = dayBefore;
exports.failAndExit = failAndExit;
exports.parseDateString = parseDateString;

function yesterday() {
  return dayBefore(new Date());
}

function dayBefore(date) {
  // Dates are mutable in js
  var copy = new Date(date);
  copy.setDate(copy.getDate() - 1);
  return copy;
}

function failAndExit(message) {
  var exitCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  console.error(message);
  process.exit(exitCode);
}

function parseDateString(dateString) {
  if (dateString.match(/^\d{8}$/)) {
    var year = parseInt(dateString.substring(0, 4));
    var month = parseInt(dateString.substring(4, 6));
    var day = parseInt(dateString.substring(6, 8)); // Remember that JS Date objects use a 0-indexed month

    return new Date(year, month - 1, day);
  } else {
    return new Date(dateString);
  }
}
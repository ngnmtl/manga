"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateAgo = parseDateAgo;
exports.resetDateTime = resetDateTime;
exports.trimSpaces = trimSpaces;
exports.toString = toString;
exports.sanitizeUrlProtocol = sanitizeUrlProtocol;

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parseDateAgo(date) {
  var dateWords = date.toLowerCase().split(' ');

  if (dateWords.length === 3) {
    if (dateWords[1].substr(dateWords[1].length - 1) !== 's') {
      dateWords[1] = dateWords[1] + 's';
    }

    var _date = (0, _moment["default"])().subtract(parseInt(dateWords[0]), dateWords[1]);

    _date.millisecond(0).second(0).minute(0).hour(0);

    return _date.toDate();
  }

  return new Date(1970, 0, 1);
}

function resetDateTime(date) {
  var momentDate = (0, _moment["default"])(date);
  momentDate.millisecond(0).second(0).minute(0).hour(0);
  return momentDate.toDate();
}

function trimSpaces(str) {
  if (_lodash["default"].isString(str)) {
    return str.trim().replace(/ +(?= )/g, '');
  }

  return str;
}

function toString(str) {
  return _lodash["default"].toString(str);
}

function sanitizeUrlProtocol(url) {
  if (_lodash["default"].startsWith(url, '//')) {
    return "http:".concat(url);
  }

  return url;
}
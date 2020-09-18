"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chapter = exports.Manga = exports.STATUS_UNKNOWN = exports.STATUS_COMPLETED = exports.STATUS_ONGOING = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var STATUS_ONGOING = 'ongoing';
exports.STATUS_ONGOING = STATUS_ONGOING;
var STATUS_COMPLETED = 'completed';
exports.STATUS_COMPLETED = STATUS_COMPLETED;
var STATUS_UNKNOWN = 'unknown';
exports.STATUS_UNKNOWN = STATUS_UNKNOWN;

var Manga = /*#__PURE__*/function () {
  function Manga() {
    _classCallCheck(this, Manga);

    this.inLibrary = false;
  }

  _createClass(Manga, [{
    key: "generateId",
    value: function generateId() {
      this.id = this.url ? _crypto["default"].createHash('md5').update(this.url).digest('hex') : this.id;
    }
  }, {
    key: "setUrl",
    value: function setUrl(url) {
      this.url = (0, _utils.sanitizeUrlProtocol)((0, _utils.trimSpaces)(url));
    }
  }, {
    key: "setThumbnailUrl",
    value: function setThumbnailUrl(thumbnailUrl) {
      this.thumbnailUrl = (0, _utils.sanitizeUrlProtocol)((0, _utils.trimSpaces)(thumbnailUrl));
    }
  }]);

  return Manga;
}();

exports.Manga = Manga;

var Chapter = /*#__PURE__*/function () {
  function Chapter() {
    _classCallCheck(this, Chapter);
  }

  _createClass(Chapter, [{
    key: "generateId",
    value: function generateId() {
      this.id = this.url ? _crypto["default"].createHash('md5').update(this.url).digest('hex') : this.id;
    }
  }, {
    key: "setUrl",
    value: function setUrl(url) {
      this.url = (0, _utils.sanitizeUrlProtocol)((0, _utils.trimSpaces)(url));
    }
  }]);

  return Chapter;
}();

exports.Chapter = Chapter;
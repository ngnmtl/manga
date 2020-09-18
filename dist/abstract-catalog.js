"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LANGUAGE_EN = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LANGUAGE_EN = 'en';
exports.LANGUAGE_EN = LANGUAGE_EN;

var AbstractCatalog = /*#__PURE__*/function () {
  function AbstractCatalog() {
    _classCallCheck(this, AbstractCatalog);

    this.index = 0;
    this.hasVolumeInfos = false;
  }

  _createClass(AbstractCatalog, [{
    key: "getNextIndex",
    value: function getNextIndex() {
      return this.index++;
    }
  }, {
    key: "popularMangaRequest",
    value: function popularMangaRequest(page) {
      throw new Error('Not implemented');
    }
  }, {
    key: "popularMangaList",
    value: function popularMangaList($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "popularMangaPaginator",
    value: function popularMangaPaginator($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "latestUpdatesRequest",
    value: function latestUpdatesRequest(page) {
      throw new Error('Not implemented');
    }
  }, {
    key: "latestUpdatesList",
    value: function latestUpdatesList($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "latestUpdatesPaginator",
    value: function latestUpdatesPaginator($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "mangaDetail",
    value: function mangaDetail($, manga) {
      throw new Error('Not implemented');
    }
  }, {
    key: "chapterList",
    value: function chapterList($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "chapterListByVolume",
    value: function chapterListByVolume($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "pageList",
    value: function pageList($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "imageUrl",
    value: function imageUrl($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "searchOptions",
    value: function searchOptions(query, page) {
      throw new Error('Not implemented');
    }
  }, {
    key: "search",
    value: function search($) {
      throw new Error('Not implemented');
    }
  }, {
    key: "searchPaginator",
    value: function searchPaginator($) {
      throw new Error('Not implemented');
    }
  }]);

  return AbstractCatalog;
}();

exports["default"] = AbstractCatalog;
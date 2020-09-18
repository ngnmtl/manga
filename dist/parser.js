"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _axios = _interopRequireDefault(require("axios"));

var catalogs = _interopRequireWildcard(require("./source"));

var _chapterRecognition = _interopRequireDefault(require("./chapter-recognition"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var request = require('request');

var http = _axios["default"].create({
  timeout: 20000
});

var Parser = /*#__PURE__*/function () {
  function Parser() {
    _classCallCheck(this, Parser);

    var sources = {};

    _lodash["default"].forEach(catalogs, function (catalog) {
      sources[catalog.catalogName] = catalog;
    });

    this.catalogs = sources;
  }

  _createClass(Parser, [{
    key: "getPopularMangaList",
    value: function getPopularMangaList(catalogName) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var catalog = this.getCatalog(catalogName);
      var options = catalog.popularMangaRequest(page);
      return new _bluebird["default"](function (resolve, reject) {
        http.get(options).then(function (response) {
          var $ = _cheerio["default"].load(response.data);

          try {
            var mangas = catalog.popularMangaList($);
            var paginator = catalog.popularMangaPaginator($);
            resolve(Object.assign({
              mangas: mangas
            }, paginator));
          } catch (error) {
            reject(error);
          }
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: "getLatestUpdatesList",
    value: function getLatestUpdatesList(catalogName) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var catalog = this.getCatalog(catalogName);
      var options = catalog.latestUpdatesRequest(page);
      return new _bluebird["default"](function (resolve, reject) {
        request(options, function (error, response, page) {
          if (error) {
            return reject(error);
          }

          var $ = _cheerio["default"].load(page);

          var mangas;
          var paginator;

          try {
            mangas = catalog.latestUpdatesList($);
          } catch (error) {
            return reject(error);
          }

          try {
            paginator = catalog.latestUpdatesPaginator($);
          } catch (error) {
            return reject(error);
          }

          return resolve(Object.assign({
            mangas: mangas
          }, paginator));
        });
      });
    }
  }, {
    key: "searchManga",
    value: function searchManga(catalogName, query) {
      var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var catalog = this.getCatalog(catalogName);
      var options = catalog.searchOptions(query, page);
      return new _bluebird["default"](function (resolve, reject) {
        request(options, function (error, response, page) {
          if (error) {
            return reject(error);
          }

          var $ = _cheerio["default"].load(page);

          var mangas;
          var paginator;

          try {
            mangas = catalog.search($);
          } catch (error) {
            return reject(error);
          }

          try {
            paginator = catalog.searchPaginator($);
          } catch (error) {
            return reject(error);
          }

          return resolve(Object.assign({
            mangas: mangas
          }, paginator));
        });
      });
    }
  }, {
    key: "getMangaDetail",
    value: function getMangaDetail(catalogName, manga) {
      var catalog = this.getCatalog(catalogName);
      return new _bluebird["default"](function (resolve, reject) {
        request(manga.url, function (error, response, page) {
          if (error) {
            return reject(error);
          }

          var $ = _cheerio["default"].load(page);

          try {
            manga = catalog.mangaDetail($, manga);
          } catch (error) {
            return reject(error);
          }

          resolve(manga);
        });
      });
    }
  }, {
    key: "getChapterList",
    value: function getChapterList(catalogName, manga) {
      var catalog = this.getCatalog(catalogName);
      return new _bluebird["default"](function (resolve, reject) {
        request(manga.url, function (error, response, page) {
          if (error) {
            return reject(error);
          }

          var $ = _cheerio["default"].load(page);

          var chapters;

          try {
            chapters = catalog.chapterList($);
          } catch (error) {
            return reject(error);
          }

          _lodash["default"].forEach(chapters, function (chapter, index) {
            chapters[index] = _chapterRecognition["default"].parseChapterNumber(chapter, manga);
          });

          chapters = _lodash["default"].orderBy(chapters, ['number', 'publishedAt'], ['asc', 'asc']);
          resolve(chapters);
        });
      });
    }
  }, {
    key: "getChapterListByVolumes",
    value: function getChapterListByVolumes(catalogName, manga) {
      var catalog = this.getCatalog(catalogName);

      if (!catalog.hasVolumeInfos) {
        return _bluebird["default"].reject("".concat(catalogName, " does not have volume infos"));
      }

      return new _bluebird["default"](function (resolve, reject) {
        request(manga.url, function (error, response, page) {
          if (error) {
            return reject(error);
          }

          var $ = _cheerio["default"].load(page);

          var volumes;

          try {
            volumes = catalog.chapterListByVolume($);
          } catch (error) {
            return reject(error);
          }

          _lodash["default"].forEach(volumes, function (chapters, volume) {
            _lodash["default"].forEach(chapters, function (chapter, index) {
              chapters[index] = _chapterRecognition["default"].parseChapterNumber(chapter, manga);
            });

            volumes[volume] = _lodash["default"].orderBy(chapters, ['number', 'publishedAt'], ['asc', 'asc']);
          });

          resolve(volumes);
        });
      });
    }
  }, {
    key: "getPageList",
    value: function getPageList(catalogName, chapter) {
      var catalog = this.getCatalog(catalogName);
      return new _bluebird["default"](function (resolve, reject) {
        request(chapter.url, function (error, response, page) {
          if (error) {
            return reject(error);
          }

          var $ = _cheerio["default"].load(page);

          var pages;

          try {
            pages = catalog.pageList($);
          } catch (error) {
            return reject(error);
          }

          return resolve(pages);
        });
      });
    }
  }, {
    key: "getImageURL",
    value: function getImageURL(catalogName, pageURL) {
      var catalog = this.getCatalog(catalogName);
      return new _bluebird["default"](function (resolve, reject) {
        request(pageURL, function (error, response, page) {
          if (error) {
            return reject(error);
          }

          var $ = _cheerio["default"].load(page);

          var imageURL;

          try {
            imageURL = catalog.imageUrl($);
          } catch (error) {
            return reject(error);
          }

          return resolve(imageURL);
        });
      });
    }
  }, {
    key: "getCatalogs",
    value: function getCatalogs() {
      return this.catalogs;
    }
  }, {
    key: "getCatalog",
    value: function getCatalog(catalogName) {
      if (!(catalogName in this.catalogs)) {
        throw new Error('Catalog does not exist');
      }

      return this.catalogs[catalogName];
    }
  }]);

  return Parser;
}();

var _default = new Parser();

exports["default"] = _default;
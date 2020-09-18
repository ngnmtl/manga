"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var _abstractCatalog = _interopRequireWildcard(require("../abstract-catalog"));

var _models = require("../models");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ReadMangaToday = /*#__PURE__*/function (_AbstractCatalog) {
  _inherits(ReadMangaToday, _AbstractCatalog);

  var _super = _createSuper(ReadMangaToday);

  function ReadMangaToday() {
    var _this;

    _classCallCheck(this, ReadMangaToday);

    _this = _super.call(this);
    _this.name = 'ReadMangaToday';
    _this.catalogName = 'readmangatoday';
    _this.baseUrl = 'https://www.readmng.com';
    _this.lang = _abstractCatalog.LANGUAGE_EN;
    return _this;
  }

  _createClass(ReadMangaToday, [{
    key: "popularMangaRequest",
    value: function popularMangaRequest(page) {
      return "".concat(this.baseUrl, "/hot-manga/").concat((0, _utils.toString)(page));
    }
  }, {
    key: "popularMangaList",
    value: function popularMangaList($) {
      var _this2 = this;

      var mangas = [];
      var provider = this;
      $('div.hot-manga > div.style-list > div.box').each(function (i, elem) {
        var manga = _this2.extractMangaSummary($, elem, provider.getNextIndex());

        mangas.push(manga);
      });
      return mangas;
    }
  }, {
    key: "popularMangaPaginator",
    value: function popularMangaPaginator($) {
      var pagination = $('div.hot-manga > ul.pagination > li > a:contains(»)');
      var nextPage = null;

      if (pagination.length) {
        nextPage = pagination.attr('href').match(/hot-manga\/(\d+)/);

        if (nextPage && nextPage.length) {
          nextPage = parseInt(nextPage[1]);
        }
      }

      return {
        hasNext: Boolean(pagination.length),
        nextUrl: pagination.attr('href'),
        nextPage: nextPage
      };
    }
  }, {
    key: "latestUpdatesRequest",
    value: function latestUpdatesRequest(page) {
      return "".concat(this.baseUrl, "/latest-releases/").concat((0, _utils.toString)(page));
    }
  }, {
    key: "latestUpdatesList",
    value: function latestUpdatesList($) {
      var _this3 = this;

      var mangas = [];
      $('div.hot-manga > div.style-grid > div.box').each(function (i, elem) {
        var manga = _this3.extractMangaSummary($, elem, Infinity);

        mangas.push(manga);
      });
      return mangas;
    }
  }, {
    key: "latestUpdatesPaginator",
    value: function latestUpdatesPaginator($) {
      var pagination = $('div.hot-manga > ul.pagination > li > a:contains(»)');
      var nextPage = null;

      if (pagination.length) {
        nextPage = pagination.attr('href').match(/latest-releases\/(\d+)/);

        if (nextPage && nextPage.length) {
          nextPage = parseInt(nextPage[1]);
        }
      }

      return {
        hasNext: Boolean(pagination.length),
        nextUrl: pagination.attr('href'),
        nextPage: nextPage
      };
    }
  }, {
    key: "mangaDetail",
    value: function mangaDetail($, manga) {
      var container = $('div.content-list').first();
      manga.author = (0, _utils.trimSpaces)(container.find('ul.cast-list li.director > ul a').text());
      manga.artist = (0, _utils.trimSpaces)(container.find('ul.cast-list li:not(.director) > ul a').text());
      manga.genre = (0, _utils.trimSpaces)(container.find('dl.dl-horizontal > dd').eq(2).text());
      manga.description = (0, _utils.trimSpaces)(container.find('li.movie-detail').text());
      manga.status = this.parseStatus((0, _utils.trimSpaces)(container.find('dl.dl-horizontal > dd').eq(1).text()));
      manga.setThumbnailUrl(container.find('img.img-responsive').attr('src'));
      manga.detailsFetched = true;
      return manga;
    }
  }, {
    key: "parseStatus",
    value: function parseStatus(status) {
      if (status.indexOf('Ongoing') > -1) {
        return _models.STATUS_ONGOING;
      } else if (status.indexOf('Completed') > -1) {
        return _models.STATUS_COMPLETED;
      }

      return _models.STATUS_UNKNOWN;
    }
  }, {
    key: "chapterList",
    value: function chapterList($) {
      var chapters = [];
      $('ul.chp_lst > li').each(function (i, elem) {
        var chapter = new _models.Chapter();
        chapter.setUrl($(elem).find('a').first().attr('href'));
        chapter.title = (0, _utils.trimSpaces)($(elem).find('a').first().find('span.val').text());
        chapter.publishedAt = (0, _utils.parseDateAgo)((0, _utils.trimSpaces)($(elem).find('span.dte').first().text()));
        chapter.generateId();
        chapters.push(chapter);
      });
      return chapters;
    }
  }, {
    key: "pageList",
    value: function pageList($) {
      var pages = [];
      var options = $('ul.list-switcher-2 > li > select.jump-menu').first().find('option');
      options.each(function (i, elem) {
        var page = $(elem).attr('value');
        pages.push((0, _utils.sanitizeUrlProtocol)(page));
      });
      return pages;
    }
  }, {
    key: "imageUrl",
    value: function imageUrl($) {
      return $('img#chapter_img').first().attr('src');
    }
  }, {
    key: "searchOptions",
    value: function searchOptions(query, page) {
      return {
        url: "".concat(this.baseUrl, "/service/advanced_search"),
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        form: {
          type: 'all',
          status: 'both',
          'manga-name': query
        }
      };
    }
  }, {
    key: "search",
    value: function search($) {
      var _this4 = this;

      var mangas = [];
      $('div.style-list > div.box').each(function (i, elem) {
        var manga = _this4.extractMangaSummary($, elem, Infinity);

        mangas.push(manga);
      });
      return mangas;
    }
  }, {
    key: "searchPaginator",
    value: function searchPaginator($) {
      return {
        hasNext: false,
        nextUrl: null,
        nextPage: null
      };
    }
  }, {
    key: "extractMangaSummary",
    value: function extractMangaSummary($, elem, catalogId) {
      var manga = new _models.Manga();
      var link = $(elem).find('div.title > h2 > a');
      manga.setUrl(link.attr('href'));
      manga.title = (0, _utils.trimSpaces)(link.attr('title'));
      manga.setThumbnailUrl($(elem).find('img').attr('src'));
      manga.catalogId = catalogId;
      manga.catalog = this.catalogName;
      manga.generateId();
      return manga;
    }
  }]);

  return ReadMangaToday;
}(_abstractCatalog["default"]);

var _default = new ReadMangaToday();

exports["default"] = _default;
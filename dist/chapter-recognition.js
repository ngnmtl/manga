"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require('lodash');

var ChapterRecognition = {};
var basic = /ch\.([0-9]+)(\.[0-9]+)?(\.?[a-z]+)?/;
var occurrence = /([0-9]+)(\.[0-9]+)?(\.?[a-z]+)?/g;
var withoutManga = /^([0-9]+)(\.[0-9]+)?(\.?[a-z]+)?/;
var unwanted = /(?:(v|ver|vol|version|volume|season).?[0-9]+)/g;
var unwantedWhiteSpace = /(\s)(extra|special|omake)/g;

ChapterRecognition.parseChapterNumber = function (chapter, manga) {
  if (chapter.number === -2 || chapter.number > -1) {
    return chapter;
  } // Get chapter title with lower case


  var title = chapter.title.toLowerCase();
  var matches; // Remove comma's from chapter.

  title = title.replace(',', '.'); // Remove unwanted white spaces.

  title = title.replace(unwantedWhiteSpace, '$2'); // Remove unwanted tags.

  title = title.replace(unwanted, ''); // Check base case ch.xx

  matches = basic.exec(title);

  if (matches) {
    return updateChapter(matches, chapter);
  } // Check one number occurrence.


  matches = [];
  var m;

  do {
    m = occurrence.exec(title);

    if (m) {
      matches.push(m);
    }
  } while (m);

  if (matches.length === 1) {
    return updateChapter(matches[0], chapter);
  }

  if (manga && manga.title) {
    // Remove manga title from chapter title.
    var titleWithoutManga = title.replace(manga.title.toLowerCase(), '').trim(); // Check if first value is number after title remove.

    matches = withoutManga.exec(titleWithoutManga);

    if (matches) {
      return updateChapter(matches, chapter);
    } // Take the first number encountered.


    matches = occurrence.exec(titleWithoutManga);

    if (matches) {
      return updateChapter(matches, chapter);
    }
  }

  chapter.number = -2;
  return chapter;
};

function updateChapter(matches, chapter) {
  var initial = parseFloat(matches[1]);
  var subChapterDecimal = matches[2];
  var subChapterAlpha = matches[3];
  var addition = checkForDecimal(subChapterDecimal, subChapterAlpha);
  chapter.number = initial + addition;
  return chapter;
}

function checkForDecimal(decimal, alpha) {
  if (!_.isUndefined(decimal) && !_.isNull(decimal)) {
    return parseFloat(decimal);
  }

  if (!_.isUndefined(alpha) && !_.isNull(alpha)) {
    if (alpha.includes('extra')) {
      return 0.99;
    }

    if (alpha.includes('omake')) {
      return 0.98;
    }

    if (alpha.includes('special')) {
      return 0.97;
    }

    if (alpha[0] === '.') {
      // Take value after (.)
      return parseAlphaPostFix(alpha[1]);
    } else {
      return parseAlphaPostFix(alpha[0]);
    }
  }

  return 0.0;
}

function parseAlphaPostFix(alpha) {
  return parseFloat('0.' + (alpha.charCodeAt(0) - 96));
}

var _default = ChapterRecognition;
exports["default"] = _default;
import _ from 'lodash';
import Promise from 'bluebird';
import cheerio from 'cheerio';
import axios from 'axios';
let request = require('request');
import * as catalogs from './source';
import ChapterRecognition from './chapter-recognition';

const http = axios.create({
    timeout: 20000
});
class Parser {
    constructor() {
        let sources = {};
        _.forEach(catalogs, (catalog) => {
            sources[catalog.catalogName] = catalog;
        });
        this.catalogs = sources;
    }

    getPopularMangaList(catalogName, page = null) {
        const catalog = this.getCatalog(catalogName);
        const options = catalog.popularMangaRequest(page);
        return new Promise((resolve, reject) => {
            http
                .get(options)
                .then(response => {
                const $ = cheerio.load(response.data);
                try {
                    const mangas = catalog.popularMangaList($);
                    const paginator = catalog.popularMangaPaginator($);
                    resolve(Object.assign({ mangas }, paginator));
                }
                catch (error) {
                    reject(error);
                }
            })
                .catch(error => {
                reject(error);
            });
        });
    }

    getLatestUpdatesList(catalogName, page = null) {
        const catalog = this.getCatalog(catalogName);
        let options = catalog.latestUpdatesRequest(page);
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, page) {
                if (error) {
                    return reject(error);
                }
                let $ = cheerio.load(page);
                let mangas;
                let paginator;
                try {
                    mangas = catalog.latestUpdatesList($);
                }
                catch (error) {
                    return reject(error);
                }
                try {
                    paginator = catalog.latestUpdatesPaginator($);
                }
                catch (error) {
                    return reject(error);
                }
                return resolve(Object.assign({ mangas }, paginator));
            });
        });
    }

    searchManga(catalogName, query, page = null) {
        const catalog = this.getCatalog(catalogName);
        const options = catalog.searchOptions(query, page);
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, page) {
                if (error) {
                    return reject(error);
                }
                let $ = cheerio.load(page);
                let mangas;
                let paginator;
                try {
                    mangas = catalog.search($);
                }
                catch (error) {
                    return reject(error);
                }
                try {
                    paginator = catalog.searchPaginator($);
                }
                catch (error) {
                    return reject(error);
                }
                return resolve(Object.assign({ mangas }, paginator));
            });
        });
    }

    getMangaDetail(catalogName, manga) {
        const catalog = this.getCatalog(catalogName);
        return new Promise(function (resolve, reject) {
            request(manga.url, function (error, response, page) {
                if (error) {
                    return reject(error);
                }
                let $ = cheerio.load(page);
                try {
                    manga = catalog.mangaDetail($, manga);
                }
                catch (error) {
                    return reject(error);
                }
                resolve(manga);
            });
        });
    }

    getChapterList(catalogName, manga) {
        const catalog = this.getCatalog(catalogName);
        return new Promise(function (resolve, reject) {
            request(manga.url, function (error, response, page) {
                if (error) {
                    return reject(error);
                }
                let $ = cheerio.load(page);
                let chapters;
                try {
                    chapters = catalog.chapterList($);
                }
                catch (error) {
                    return reject(error);
                }
                _.forEach(chapters, (chapter, index) => {
                    chapters[index] = ChapterRecognition.parseChapterNumber(chapter, manga);
                });
                chapters = _.orderBy(chapters, ['number', 'publishedAt'], ['asc', 'asc']);
                resolve(chapters);
            });
        });
    }

    getChapterListByVolumes(catalogName, manga) {
        const catalog = this.getCatalog(catalogName);
        if (!catalog.hasVolumeInfos) {
            return Promise.reject(`${catalogName} does not have volume infos`);
        }
        return new Promise(function (resolve, reject) {
            request(manga.url, function (error, response, page) {
                if (error) {
                    return reject(error);
                }
                let $ = cheerio.load(page);
                let volumes;
                try {
                    volumes = catalog.chapterListByVolume($);
                }
                catch (error) {
                    return reject(error);
                }
                _.forEach(volumes, (chapters, volume) => {
                    _.forEach(chapters, (chapter, index) => {
                        chapters[index] = ChapterRecognition.parseChapterNumber(chapter, manga);
                    });
                    volumes[volume] = _.orderBy(chapters, ['number', 'publishedAt'], ['asc', 'asc']);
                });
                resolve(volumes);
            });
        });
    }

    getPageList(catalogName, chapter) {
        const catalog = this.getCatalog(catalogName);
        return new Promise((resolve, reject) => {
            request(chapter.url, (error, response, page) => {
                if (error) {
                    return reject(error);
                }
                let $ = cheerio.load(page);
                let pages;
                try {
                    pages = catalog.pageList($);
                }
                catch (error) {
                    return reject(error);
                }
                return resolve(pages);
            });
        });
    }

    getImageURL(catalogName, pageURL) {
        const catalog = this.getCatalog(catalogName);
        return new Promise((resolve, reject) => {
            request(pageURL, (error, response, page) => {
                if (error) {
                    return reject(error);
                }
                let $ = cheerio.load(page);
                let imageURL;
                try {
                    imageURL = catalog.imageUrl($);
                }
                catch (error) {
                    return reject(error);
                }
                return resolve(imageURL);
            });
        });
    }

    getCatalogs() {
        return this.catalogs;
    }

    getCatalog(catalogName) {
        if (!(catalogName in this.catalogs)) {
            throw new Error('Catalog does not exist');
        }
        return this.catalogs[catalogName];
    }
}
export default new Parser();
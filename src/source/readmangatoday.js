import { parseDateAgo, trimSpaces, toString, sanitizeUrlProtocol } from '../utils';
import AbstractCatalog, { LANGUAGE_EN } from '../abstract-catalog';
import { Chapter, Manga, STATUS_ONGOING, STATUS_COMPLETED, STATUS_UNKNOWN } from '../models';
class ReadMangaToday extends AbstractCatalog {
    constructor() {
        super();
        this.name = 'ReadMangaToday';
        this.catalogName = 'readmangatoday';
        this.baseUrl = 'https://www.readmng.com';
        this.lang = LANGUAGE_EN;
    }

    popularMangaRequest(page) {
        return `${this.baseUrl}/hot-manga/${toString(page)}`;
    }

    popularMangaList($) {
        let mangas = [];
        let provider = this;
        $('div.hot-manga > div.style-list > div.box').each((i, elem) => {
            let manga = this.extractMangaSummary($, elem, provider.getNextIndex());
            mangas.push(manga);
        });
        return mangas;
    }

    popularMangaPaginator($) {
        let pagination = $('div.hot-manga > ul.pagination > li > a:contains(»)');
        let nextPage = null;
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

    latestUpdatesRequest(page) {
        return `${this.baseUrl}/latest-releases/${toString(page)}`;
    }

    latestUpdatesList($) {
        let mangas = [];
        $('div.hot-manga > div.style-grid > div.box').each((i, elem) => {
            let manga = this.extractMangaSummary($, elem, Infinity);
            mangas.push(manga);
        });
        return mangas;
    }

    latestUpdatesPaginator($) {
        let pagination = $('div.hot-manga > ul.pagination > li > a:contains(»)');
        let nextPage = null;
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

    mangaDetail($, manga) {
        let container = $('div.content-list').first();
        manga.author = trimSpaces(container.find('ul.cast-list li.director > ul a').text());
        manga.artist = trimSpaces(container.find('ul.cast-list li:not(.director) > ul a').text());
        manga.genre = trimSpaces(container
            .find('dl.dl-horizontal > dd')
            .eq(2)
            .text());
        manga.description = trimSpaces(container.find('li.movie-detail').text());
        manga.status = this.parseStatus(trimSpaces(container
            .find('dl.dl-horizontal > dd')
            .eq(1)
            .text()));
        manga.setThumbnailUrl(container.find('img.img-responsive').attr('src'));
        manga.detailsFetched = true;
        return manga;
    }

    parseStatus(status) {
        if (status.indexOf('Ongoing') > -1) {
            return STATUS_ONGOING;
        }
        else if (status.indexOf('Completed') > -1) {
            return STATUS_COMPLETED;
        }
        return STATUS_UNKNOWN;
    }

    chapterList($) {
        let chapters = [];
        $('ul.chp_lst > li').each((i, elem) => {
            let chapter = new Chapter();
            chapter.setUrl($(elem)
                .find('a')
                .first()
                .attr('href'));
            chapter.title = trimSpaces($(elem)
                .find('a')
                .first()
                .find('span.val')
                .text());
            chapter.publishedAt = parseDateAgo(trimSpaces($(elem)
                .find('span.dte')
                .first()
                .text()));
            chapter.generateId();
            chapters.push(chapter);
        });
        return chapters;
    }

    pageList($) {
        let pages = [];
        let options = $('ul.list-switcher-2 > li > select.jump-menu')
            .first()
            .find('option');
        options.each((i, elem) => {
            let page = $(elem).attr('value');
            pages.push(sanitizeUrlProtocol(page));
        });
        return pages;
    }

    imageUrl($) {
        return $('img#chapter_img')
            .first()
            .attr('src');
    }

    searchOptions(query, page) {
        return {
            url: `${this.baseUrl}/service/advanced_search`,
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

    search($) {
        let mangas = [];
        $('div.style-list > div.box').each((i, elem) => {
            let manga = this.extractMangaSummary($, elem, Infinity);
            mangas.push(manga);
        });
        return mangas;
    }

    searchPaginator($) {
        return {
            hasNext: false,
            nextUrl: null,
            nextPage: null
        };
    }

    extractMangaSummary($, elem, catalogId) {
        let manga = new Manga();
        let link = $(elem).find('div.title > h2 > a');
        manga.setUrl(link.attr('href'));
        manga.title = trimSpaces(link.attr('title'));
        manga.setThumbnailUrl($(elem)
            .find('img')
            .attr('src'));
        manga.catalogId = catalogId;
        manga.catalog = this.catalogName;
        manga.generateId();
        return manga;
    }
}
export default new ReadMangaToday();
 
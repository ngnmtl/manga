export const LANGUAGE_EN = 'en';
export default class AbstractCatalog {
    constructor() {
        this.index = 0;
        this.hasVolumeInfos = false;
    }

    getNextIndex() {
        return this.index++;
    }

    popularMangaRequest(page) {
        throw new Error('Not implemented');
    }

    popularMangaList($) {
        throw new Error('Not implemented');
    }

    popularMangaPaginator($) {
        throw new Error('Not implemented');
    }

    latestUpdatesRequest(page) {
        throw new Error('Not implemented');
    }

    latestUpdatesList($) {
        throw new Error('Not implemented');
    }

    latestUpdatesPaginator($) {
        throw new Error('Not implemented');
    }

    mangaDetail($, manga) {
        throw new Error('Not implemented');
    }

    chapterList($) {
        throw new Error('Not implemented');
    }

    chapterListByVolume($) {
        throw new Error('Not implemented');
    }

    pageList($) {
        throw new Error('Not implemented');
    }

    imageUrl($) {
        throw new Error('Not implemented');
    }

    searchOptions(query, page) {
        throw new Error('Not implemented');
    }

    search($) {
        throw new Error('Not implemented');
    }

    searchPaginator($) {
        throw new Error('Not implemented');
    }
}
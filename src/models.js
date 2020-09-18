import crypto from 'crypto';
import { sanitizeUrlProtocol, trimSpaces } from './utils';
export const STATUS_ONGOING = 'ongoing';
export const STATUS_COMPLETED = 'completed';
export const STATUS_UNKNOWN = 'unknown';
export class Manga {
    constructor() {
        this.inLibrary = false;
    }
    generateId() {
        this.id = this.url
            ? crypto
                .createHash('md5')
                .update(this.url)
                .digest('hex')
            : this.id;
    }
    setUrl(url) {
        this.url = sanitizeUrlProtocol(trimSpaces(url));
    }
    setThumbnailUrl(thumbnailUrl) {
        this.thumbnailUrl = sanitizeUrlProtocol(trimSpaces(thumbnailUrl));
    }
}
export class Chapter {
    generateId() {
        this.id = this.url
            ? crypto
                .createHash('md5')
                .update(this.url)
                .digest('hex')
            : this.id;
    }
    setUrl(url) {
        this.url = sanitizeUrlProtocol(trimSpaces(url));
    }
}
 
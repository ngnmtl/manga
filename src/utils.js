import moment from 'moment';
import _ from 'lodash';

export function parseDateAgo(date) {
    let dateWords = date.toLowerCase().split(' ');
    if (dateWords.length === 3) {
        if (dateWords[1].substr(dateWords[1].length - 1) !== 's') {
            dateWords[1] = dateWords[1] + 's';
        }
        let date = moment().subtract(parseInt(dateWords[0]), dateWords[1]);
        date
            .millisecond(0)
            .second(0)
            .minute(0)
            .hour(0);
        return date.toDate();
    }
    return new Date(1970, 0, 1);
}
export function resetDateTime(date) {
    let momentDate = moment(date);
    momentDate
        .millisecond(0)
        .second(0)
        .minute(0)
        .hour(0);
    return momentDate.toDate();
}

export function trimSpaces(str) {
    if (_.isString(str)) {
        return str.trim().replace(/ +(?= )/g, '');
    }
    return str;
}

export function toString(str) {
    return _.toString(str);
}
export function sanitizeUrlProtocol(url) {
    if (_.startsWith(url, '//')) {
        return `http:${url}`;
    }
    return url;
}
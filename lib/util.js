'use strict';

function buildRelUrl(from, to) {
    let urlArr = [],
        fromArr = from.split('/'),
        toArr = to.split('/'),
        fromFilename = fromArr.pop(),
        toFilename = toArr.pop(),
        i = fromArr.length - 1;

    while (i >= 0) {
        if (fromArr[i] === toArr[i]) {
            fromArr.splice(i, 1);
            toArr.splice(i, 1);
        }

        i--;
    }

    for (i = 0; i < fromArr.length; i++) {
        urlArr.push('..');
    }

    urlArr = urlArr.concat(toArr, toFilename);

    return urlArr.join('/');
}

module.exports = {buildRelUrl};

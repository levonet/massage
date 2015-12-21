'use strict';

let fs = require('fs'),
    path = require('path'),
    url = require('url'),
    marked = require('marked'),
    mkdirp = require('mkdirp'),
    yamljs = require('yamljs'),

    buildRelUrl = require('./lib/util').buildRelUrl,
    config = {};

try {
    config = yamljs.load('site.yml');
} catch(e) {
    console.log('WARN: no site.yml found');
}

let theme = config.theme || 'simple',
    template = require(path.join(__dirname, 'themes', theme, './template')),

    pages = config.pages || [], // TODO: support glob
    filesBasenames = pages.map(page => path.basename(page.source)),
    urlToSlugMap = pages.reduce((prev, page) => {
        prev[path.basename(page.source)] = page.slug;
        return prev;
    }, {}),

    renderer = new marked.Renderer(),
    link = renderer.link;

function getSlugUrl(url) {
    var urlArr = url.split('/'),
        filename = urlArr.pop();

    urlArr.push(urlToSlugMap[filename] ?
        (urlToSlugMap[filename] + '.html') :
        filename.replace('.md', '.html'));

    return urlArr.join('/');
}

renderer.link = (href, title, text) => {
    if (filesBasenames.indexOf(path.basename(href)) > -1) {
        href = url.resolve(config.outputDir, getSlugUrl(href));
    }

    return link.call(renderer, href, title, text);
};

marked.setOptions({renderer});

pages.forEach(page => {
    let file = page.source;

    fs.readFile(file, 'utf8', (err, md) => {
        if (err) throw new Error(err);

        mkdirp.sync(path.join(config.outputDir, path.dirname(file)));

        let html = marked(md),
            htmlFilename = path.join(config.outputDir, getSlugUrl(file));

        let title = page.title || page.slug || path.basename(file).replace('.md', '');

        fs.writeFileSync(htmlFilename, template({
            title: title + ' / ' + config.siteName,
            files: pages.map(page => ({
                href: getSlugUrl(buildRelUrl(file, page.source)),
                text: page.title || page.slug || path.basename(page.source).replace('.md', '')
            })),
            description: page.description || config.description || '',
            content: html
        }));
    });
});

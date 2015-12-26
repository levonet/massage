module.exports = (context) =>
`<!doctype html>
<html>
<head>
    <meta charset="utf8">
    <title>${ context.title }</title>
    <meta name="description" content="${ context.description }">
    <link rel="shortcut icon" type="image/x-icon" href="${ context.relPathToRoot }favicon.ico">
    <style>
        html {
            font-family: sans-serif;
            line-height: 1.5;
        }

        .page {
            padding: 40px 20%;
        }

        .page_slug_index {
            padding: 140px 20% 40px;
            background: url(logo.svg) 50% 30px no-repeat;
            background-size: 80px;
        }

        .nav {
            list-style: none;
            padding: 0;
        }

        .nav__item {
            display: inline-block;
            margin-right: 7px;
        }
    </style>
</head>
<body class="page page_slug_${ context.slug }">
    <ul class="nav">
        ${ context.files.map(file => '<li class="nav__item"><a href="' + file.href + '" class="link">' + file.text + '</a></li>').join('\n') }
    </ul>
    ${ context.content }
</body>
</html>`

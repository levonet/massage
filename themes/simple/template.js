module.exports = (context) =>
`<!doctype html>
<html>
<head>
    <meta charset="utf8">
    <title>${ context.title }</title>
    <meta name="description" content="${ context.description }">
    <style>
        html {
            font-family: sans-serif;
            line-height: 1.5;
        }

        .page {
            padding: 40px 20%;
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
<body class="page">
    <h1>♊︎</h1>
    <ul class="nav">
        ${ context.files.map(file => '<li class="nav__item"><a href="' + file.href + '" class="link">' + file.text + '</a></li>').join('\n') }
    </ul>
    ${ context.content }
</body>
</html>`

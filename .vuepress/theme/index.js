const path = require('path')

module.exports = {
	plugins: [
        'seo',
        'disqus',
    ],
    enhanceAppFiles: [
        path.resolve(__dirname, 'articles.js'),
        path.resolve(__dirname, 'search.js'),
    ]
}
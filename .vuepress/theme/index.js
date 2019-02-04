const path = require('path')

module.exports = {
	plugins: [
        'seo',
        path.resolve(__dirname, 'plugin-disqus.js'),
    ],
    enhanceAppFiles: [
        path.resolve(__dirname, 'articles.js'),
        path.resolve(__dirname, 'search.js'),
    ]
}
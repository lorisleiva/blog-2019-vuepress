const path = require('path')

module.exports = {
	plugins: [
        'seo',
    ],
    enhanceAppFiles: [
        path.resolve(__dirname, 'search.js'),
    ]
}
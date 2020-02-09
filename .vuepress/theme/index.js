const path = require('path')

module.exports = {
	plugins: {
        '@vuepress/google-analytics': { ga: 'UA-100767601-5' },
        '@vuepress/blog': {
            directories: [
                // {
                //     id: 'articles',
                //     dirname: 'articles',
                //     path: '/',
                //     layout: 'HomeLayout',
                //     itemLayout: 'ArticleLayout',
                // },
            ],
            frontmatters: [
              {
                id: 'tag',
                keys: ['tags'],
                path: '/tag/',
                layout: 'TagsLayout',
                scopeLayout: 'TagLayout'
              },
            ],
        },
        'seo': true,
        'disqus': true,
    },
    enhanceAppFiles: [
        path.resolve(__dirname, 'articles.js'),
        path.resolve(__dirname, 'search.js'),
    ]
}

module.exports = {
	title: 'Loris Leiva',
	dest: './public',
	themeConfig: {
		domain: 'https://lorisleiva.com',
		repo: 'https://github.com/lorisleiva/blog', // TODO: Not used yet
		nav: [ '/', '/cv/', '/persona/' ],
		author: {
			name: 'Loris Leiva',
			twitter: '@lorismatic',
		},
	},
	head: [
		// TODO: Favicons, manifests, etc.
		// TODO: ['script', { type: 'application/ld+json' }, JSON.stringify({})],
    ],
    postcss: {
        plugins: [
            require('tailwindcss')('./tailwind.js'),
            require('autoprefixer'),
        ]
    }
}
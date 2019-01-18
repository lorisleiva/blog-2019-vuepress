module.exports = {
	title: 'Loris Leiva',
	dest: './public',
	themeConfig: {
		domain: 'https://lorisleiva.com',
		repo: 'https://github.com/lorisleiva/blog',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'CV', link: '/cv/' },
			{ text: 'Persona', link: '/persona/' },
		],
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
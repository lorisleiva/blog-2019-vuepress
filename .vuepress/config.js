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
		user: {
            //
		}
	},
	plugins: [
        //
	],
	head: [
        //
    ],
    postcss: {
        plugins: [
            require('tailwindcss')('./tailwind.js'),
            require('autoprefixer'),
        ]
    }
}
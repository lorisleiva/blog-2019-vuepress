---
permalink: redesigning-my-blog-using-vuepress-and-tailwindcss
image: /covers/redesigning-my-blog-using-vuepress-and-tailwindcss.jpg
description: Moving away from a traditional database blog, I explain why and how I moved to this new stack.
tags: [ 'Vuepress', 'Tailwind', 'Vue Lab' ]
date: 2019-05-05T09:17:00Z
---
# Redesigning my blog using Vuepress and TailwindCSS

A few months ago I updated my blog to move away from Ghost (a blogging platform with a minimalistic interface) and use Vuepress instead.

I didn’t have any particular complains about Ghost but I wanted more control over my blog without too much hassle. Ghost was also taking care of renewing my SSH certificates but the CRON job suddenly decided not to do its job anymore. That’s when I thought, "Right! Let’s take control of my blog again."

![cover](/covers/redesigning-my-blog-using-vuepress-and-tailwindcss.jpg)

## Why Vuepress?
I am a real Vue fanboy and having the ability to use some Vue components directly in my markdown files is incredibly useful.

I also wanted to write articles using static files so that 100% of my blog would be open source (instead of having the content of my blog in a database somewhere). This is a non-negligible advantage for a teaching platform. Also, people can fix my typos.

## Why TailwindCSS?
I mean, do we even need to ask that question anymore? I’ve been designing applications with TailwindCSS ever since it was available and I love it every day a little more. It makes me a happy developer and a proud designer.

It may seem like an emotional decision but honestly, there is enough documentation out there to convince you about the technical and semantical level.

## Architecture of a Vuepress blog
All the content of your blog (markdown files, images used in articles, etc.) can be arranged however you like.

In my case, I have two folders `pages` and `articles` at the root of my repository. These folders do not contain one markdown file per page but rather one folder per page that contains only one markdown file named `index.md`. This arrangement allows me to group all images and resources related to a page or article with the article itself so everything is in one place.

```
├── .vuepress
├── LICENSE
├── README.md
├── articles
│   ├── ...
│   ├── 20180806 Laravel deployment using GitLab's pipelines
│   ├── 20180912 Google Calendar Sync
│   ├── 20180916 Google Calendar Sync 2
│   ├── 20180930 Google Calendar Sync 3
│   ├── 20190211 Introducing Javel
│   └── 20190321 Laravel pagination with TailwindCSS
│       ├── index.md
│       ├── pagination.png
│       ├── pagination_1.png
│       ├── pagination_2.png
│       ├── pagination_3.png
│       ├── pagination_4.png
│       ├── pagination_5.png
│       └── pagination_6.png
├── package-lock.json
├── package.json
├── pages
└── tailwind.js
```

All the rest of the Vuepress application is located in a `.vuepress` folder. That includes the layout of your application, Vue components, global assets, custom styling, settings, plugin registration, etc.

```
├── .vuepress
│   ├── config.js
│   ├── public
│   └── theme
│       ├── articles.js
│       ├── assets
│       ├── components
│       ├── global-components
│       ├── index.js
│       ├── layouts
│       ├── search.js
│       ├── styles
│       └── utils.js
└── ...
```

## How to use TailwindCSS with Vuepress?

Laughably simple. Vuepress already has a `postcss` option on their `config.js` file. All you need to do after installing TailwindCSS (via npm) is to add it as a postcss plugin.

```js
// .vuepress/config.js
module.exports = {
    // ...
    postcss: {
        plugins: [
            require('tailwindcss')('./tailwind.js'),
            require('autoprefixer'),
        ]
    }
}
```

## Vuepress plugins 

Vuepress can be extended at length via its plugin system. There are already quite a few useful core plugins available like `google-analytics`.

It is also very simple to create your own plugins. Not necessarily to create a new open source package but simply to clean up your application of some logic you can isolate somewhere else. Kind of like a service class.

For example, I created a file `articles.js` that computes which articles should be featured on the front page and provides a global computed property called `$featuredArticles`. I also created a file called `search.js` whose responsibility is to provide a global `$search` method that will return all articles matching your query.

Finally, I created (and extracted to their own repository) two plugins that I thought other people might benefit from. The first one is called `seo` and takes as much data available from your configuration file and your articles to set up all the metadata you need for sharing to social media.

<GithubButton url="https://github.com/lorisleiva/vuepress-plugin-seo" title="SEO Plugin on GitHub"></GithubButton>

The second one is called `disqus` and simply registers a global `Disqus` component that you can, for example, insert in your article layout.

<GithubButton url="https://github.com/lorisleiva/vuepress-plugin-disqus" title="Disqus Plugin on GitHub"></GithubButton>

All of these plugins are registered in the configuration file of my theme like so.

```js
// .vuepress/theme/index.js
module.exports = {
    plugins: {
        '@vuepress/google-analytics': { ga: 'UA-100767601-5' },
        'seo': true,
        'disqus': true,
    },
    enhanceAppFiles: [
        path.resolve(__dirname, 'articles.js'),
        path.resolve(__dirname, 'search.js'),
    ]
}
```

## Conclusion

Taking back control of my blog using Vuepress and TailwindCSS was a lot of fun and I recommend that stack to anyone who’s not afraid of spending a bit of time to experiment with a design that will match their audience best.

During that process, I created lots of cool components that would deserve a dedicated tutorial each. For example, the animated gradient bar at the very top of my blog. All of these tutorials are on my To-Do list but in the meantime feel free to scavenge my blog’s repository which is public as from today. 🎉

<GithubButton url="https://github.com/lorisleiva/blog" title="See this blog on GitHub"></GithubButton>
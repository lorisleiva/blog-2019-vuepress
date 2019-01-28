export default ({ Vue }) => {
    Vue.mixin({
        computed: {
            $articles () {
                return this.$site.pages
                    .filter(isArticle)
                    .sort(sortByDate)
            },
            $featuredArticles () {
                const { featuredArticles, minimumFeaturedArticles } = this.$themeConfig
                let featured = fetchPagesInArray(this.$articles, featuredArticles)

                if (featured.length < minimumFeaturedArticles) {
                    let moreFeatured = this.$articles
                        .filter(page => ! featured.includes(page))
                        .slice(0, minimumFeaturedArticles - featured.length)
                    featured.push(...moreFeatured)
                }

                return featured
            },
            $otherArticles () {
                return this.$articles.filter(page => ! this.$featuredArticles.includes(page))
            }
        }
    })
}

function isArticle (article) {
    return article.regularPath.startsWith('/articles/')
        && article.regularPath !== '/articles/'
}

function sortByDate (a, b) {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}

function fetchPagesInArray (pages, keys) {
    return pages
        .filter(page => keys.includes(page.path))
        .sort((a, b) => keys.indexOf(a.path) - keys.indexOf(b.path))
}
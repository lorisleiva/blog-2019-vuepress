export default ({ Vue }) => {
    Vue.mixin({
        computed: {
            $articles () {
                return this.$site.pages
                    .filter(isArticle)
                    .sort(sortByDate)
            },
            $featuredArticles () {
                return this.$articles.slice(0, 6)
            },
            $otherArticles () {
                return this.$articles.slice(6)
            }
        }
    })
}

function isArticle (article) {
    return article.regularPath.startsWith('/articles/')
        && article.regularPath !== '/articles/'
}

function sortByDate(a, b) {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}
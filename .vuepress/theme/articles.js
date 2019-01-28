import { isArticle, sortByDate, fetchPagesInArray, excludePages } from '@theme/utils'

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
                    let moreFeatured = excludePages(this.$articles, featured)
                        .slice(0, minimumFeaturedArticles - featured.length)
                    featured.push(...moreFeatured)
                }

                return featured
            },
            $otherArticles () {
                return excludePages(this.$articles, this.$featuredArticles)
            }
        }
    })
}
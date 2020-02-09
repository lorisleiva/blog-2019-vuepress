export default ({ Vue }) => {
    Vue.mixin({
        methods: {
            $search (query, maxSuggestions = 5) {
                query = query.trim().toLowerCase()
                const { pages } = this.$site
                const results = []
                const matchPage = page => page.frontmatter.searchableTitle.toLowerCase().indexOf(query) > -1
                const matchHeader = header => header.title && header.title.toLowerCase().indexOf(query) > -1

                for (let i = 0; i < pages.length; i++) {
                    if (maxSuggestions && results.length >= maxSuggestions) break
                    results.push(...searchPage(pages[i], matchPage, matchHeader))
                }

                return maxSuggestions ? results.slice(0, maxSuggestions) : results
            }
        }
    })
}

function searchPage (page, matchPage, matchHeader) {
    if (matchPage(page)) return [page]
    if (! page.headers) return []

    return page.headers
        .filter(header => matchHeader(header))
        .map(header => Object.assign({}, page, { header, path: `${page.path}#${header.slug}` }))
}

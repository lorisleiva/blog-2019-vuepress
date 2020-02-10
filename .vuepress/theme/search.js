export default ({ Vue }) => {
    Vue.mixin({
        methods: {
            $search (query, maxSuggestions = 5) {
                query = query.trim().toLowerCase()
                const pages = this.$site.pages.filter(page => page.isSearchable)
                const results = []

                for (let i = 0; i < pages.length; i++) {
                    if (maxSuggestions && results.length >= maxSuggestions) break
                    results.push(...searchPage(pages[i], query))
                }

                return maxSuggestions ? results.slice(0, maxSuggestions) : results
            }
        }
    })
}

function searchPage (page, query) {
    if (matchPage(page, query)) return [page]
    if (! page.headers) return []

    return page.headers
        .filter(header => matchHeader(header, query))
        .map(header => Object.assign({}, page, { header, path: `${page.path}#${header.slug}` }))
}

function matchPage(page, query) {
    return page.searchableTitle.toLowerCase().indexOf(query) > -1
}

function matchHeader(header, query) {
    return header.title && header.title.toLowerCase().indexOf(query) > -1
}

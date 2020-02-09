module.exports = {
    extendPageData (page) {
        ensurePageHasFrontmatter(page)
        classify(page)
        setTitle(page)
        setSearchableTitle(page)
        setIcon(page)
        setIsoDate(page)
    }
}

function ensurePageHasFrontmatter(page) {
    if (! page.frontmatter) {
        page.frontmatter = {}
    }
}

function classify(page) {
    page.isArticle = page.regularPath.startsWith('/articles/') && page.regularPath !== '/articles/'
    page.isTag = page.regularPath.startsWith('/tag/')
}

function setTitle(page) {
    page.title = page.title 
        || (page.path === '/tag/' && 'Tags')
        || page.frontmatter.title
}

function setSearchableTitle(page) {
    page.searchableTitle = page.frontmatter.searchableTitle || page.title
}

function setIcon(page) {
    page.icon = page.frontmatter.icon 
        || (page.isArticle && 'news')
        || (page.isTag && 'tag')
        || 'document'
}

function setIsoDate(page) {
    page.isoDate = page.frontmatter.date
}

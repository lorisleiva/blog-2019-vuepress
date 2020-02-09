module.exports = () => {
    return {
        extendPageData (page) {
            ensurePageHasFrontmatter(page)
            setSearchableTitle(page)
            setIcon(page)
        }
    }
}

function ensurePageHasFrontmatter(page) {
    if (! page.frontmatter) {
        page.frontmatter = {}
    }
}

function setSearchableTitle(page) {
    page.frontmatter.searchableTitle = page.frontmatter.searchableTitle 
        || (page.path === '/tag/' && 'Tags')
        || page.frontmatter.title 
        || page.title
}

function setIcon(page) {
    page.frontmatter.icon = page.frontmatter.icon 
        || (isArticle(page) && 'news')
        || (isTag(page) && 'tag')
        || 'document'
}

function isArticle (page) {
    return page.regularPath.startsWith('/articles/')
        && page.regularPath !== '/articles/'
}

function isTag (page) {
    return page.regularPath.startsWith('/tag/')
}

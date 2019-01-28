export const isArticle = page => {
    return page.regularPath.startsWith('/articles/')
        && page.regularPath !== '/articles/'
}

export const sortByDate = (a, b) => 
    new Date(b.frontmatter.date) - new Date(a.frontmatter.date)

export const fetchPagesInArray = (pages, keys) => pages
    .filter(page => keys.includes(page.path))
    .sort((a, b) => keys.indexOf(a.path) - keys.indexOf(b.path))

export const excludePages = (pages, pagesToExclude) =>
    pages.filter(page => ! pagesToExclude.includes(page))
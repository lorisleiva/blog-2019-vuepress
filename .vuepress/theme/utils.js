import moment from "moment"

export const sortByDate = (a, b) => new Date(b.isoDate) - new Date(a.isoDate)

export const fetchPagesInArray = (pages, keys) => pages
    .filter(page => keys.includes(page.path))
    .sort((a, b) => keys.indexOf(a.path) - keys.indexOf(b.path))

export const excludePages = (pages, pagesToExclude) =>
    pages.filter(page => ! pagesToExclude.includes(page))

export const randomElement = arr =>
    arr[Math.floor(Math.random() * arr.length)]

export const randomElements = ([...arr], n = 1) => {
    let m = arr.length
    while (m) {
        const i = Math.floor(Math.random() * m--)
        const temp = arr[i]
        arr[i] = arr[m]
        arr[m] = temp
    }
    return arr.slice(0, n)
}

export const relativeDate = date => moment(date).fromNow()
export const formatDate = date => moment(date).format('lll')

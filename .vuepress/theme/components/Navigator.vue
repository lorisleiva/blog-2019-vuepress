<template>
    <div class="relative">

        <!-- Standalone button -->
        <div class="group p-3 rounded-full shadow hover:shadow-md cursor-pointer" @click="toggle">
            <svg class="w-8 h-8 block flex-no-shrink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <defs>
                    <linearGradient id="header-first-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stop-color="#EE7752"/>
                        <stop offset="100%" stop-color="#E73C7E"/>
                    </linearGradient>
                    <linearGradient id="header-second-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stop-color="#23A6D5"/>
                        <stop offset="100%" stop-color="#23D5AB"/>
                    </linearGradient>
                </defs>
                <path class="text-grey-dark fill-current group-hover:fill-header-second-gradient" d="M14 12h5l3 3-3 3h-5v4h-4v-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6v-1h4v1z"/>
                <path class="text-grey-darker fill-current group-hover:fill-header-first-gradient" d="M10 4a2 2 0 1 1 4 0h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5L2 7l3-3h5z"/>
            </svg>
        </div>

        <!-- Search menu -->
        <div v-show="openned" class="absolute pin-t pin-r shadow-md rounded-lg bg-grey-lighter opacity-100 p-4 -mr-5 -mt-3 min-w-400">
            
            <!-- Search fields -->
            <div class="flex items-center rounded bg-white mb-4">
                <input 
                    v-model="query"
                    ref="searchField"
                    type="text" 
                    placeholder="Search..."
                    class="flex-1 bg-transparent rounded-l text-xl pl-4 leading-normal focus:outline-none"
                >
                <div class="group rounded-r px-4 py-2 cursor-pointer" @click="toggle">
                    <svg class="w-8 h-8 block flex-no-shrink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path class="text-grey-dark fill-current group-hover:fill-header-second-gradient" d="M14 12h5l3 3-3 3h-5v4h-4v-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6v-1h4v1z"/>
                        <path class="text-grey-darker fill-current group-hover:fill-header-first-gradient" d="M10 4a2 2 0 1 1 4 0h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5L2 7l3-3h5z"/>
                    </svg>
                </div>
            </div>

            <!-- Results -->
            <div 
                v-for="page in suggestions" 
                class="flex px-4 py-2 text-lg font-semibold text-grey-darker hover:bg-grey-light rounded cursor-pointer"
            >
                <div class="mr-2">📄</div>
                <div>
                    <div v-text="page.title"></div>
                    <span v-if="page.header" class="header">&gt; {{ page.header.title }}</span>
                </div>
            </div>

            <!-- No results -->
            <div 
                v-if="query && suggestions.length === 0"
                class="p-6 text-center text-grey-dark"
            >
                Sorry, couldn't find that one...
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        maxSuggestions: { default: 5 },
    },
    data () {
        return {
            openned: false,
            query: '',
            menu: [],
        }
    },
    methods: {
        toggle () {
            this.openned = ! this.openned
            this.query = ''

            if (this.openned) {
                this.$nextTick(() => {
                    this.$refs.searchField.focus()
                })
            }
        },
        initMenu () {
            const menuPaths = this.$site.themeConfig.nav
            this.menu = this.$site.pages
                .filter(page => menuPaths.includes(page.path))
                .sort((a, b) => menuPaths.indexOf(a.path) - menuPaths.indexOf(b.path))
        },
        search () {
            const query = this.query.trim().toLowerCase()
            const match = x => x.title && x.title.toLowerCase().indexOf(query) > -1
            const { pages } = this.$site
            const results = []

            for (let i = 0; i < pages.length; i++) {
                if (results.length >= this.maxSuggestions) break
                results.push(...this.searchPage(pages[i], match, match))
            }

            return results
        },
        searchPage (page, matchPage, matchHeader) {
            if (matchPage(page)) return [page]
            if (! page.headers) return []
            
            return page.headers
                .filter(header => matchHeader(header))
                .map(header => Object.assign({}, page, { header, path: `${page.path}#${header.slug}` }))
        },
    },
    computed: {
        suggestions () {
            return this.query.trim() ? this.search() : this.menu
        }
    },
    mounted () {
        this.initMenu()
    }
}
</script>
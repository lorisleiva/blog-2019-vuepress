<template>
    <div class="fixed inset-0 z-40 flex items-start h-full" v-if="openned">
        <div class="absolute inset-0 bg-white opacity-90" @click="close"></div>
        <div class="relative mx-auto mt-32 w-full max-w-xl">

            <div class="border border-gray-300 shadow-xl rounded-lg">
                <input
                    ref="input"
                    type="text" 
                    class="bg-white rounded-t-lg px-4 text-black w-full text-5xl leading-normal focus:outline-none"
                    placeholder="Search..."
                    v-model="query"
                    @keydown.enter="go($event)"
                    @keydown.esc="close"
                    @keydown.up.prevent="move(-1)"
                    @keydown.down.prevent="move(1)"
                >

                <div class="bg-gray-100 border-t border-gray-300 rounded-b-lg p-4" @mouseleave="unfocus">
                    <a 
                        v-for="(page, index) in suggestions"
                        :key="page.key + (page.header ? `_${page.header.slug}` : '')"
                        class="flex px-4 py-2 text-lg font-semibold text-gray-600 hover:text-gray-600 rounded cursor-pointer border-0"
                        :class="index === focused ? 'bg-topaz' : ''"
                        :href="page.path"
                        @click="go($event, index)"
                        @mouseenter="focus(index)"
                    >
                        <Icon
                            class="w-5 h-5 mr-3 mt-2px"
                            :icon="iconForPage(page)" 
                            :primary="index === focused ? 'text-white' : 'text-gray-600'"
                            :secondary="index === focused ? 'text-gray-400' : 'text-gray-800'"
                        ></Icon>
                        <div :class="index === focused ? 'text-white' : ''">
                            <div v-text="page.title"></div>
                            <span v-if="page.header" class="text-sm">&rightarrow;&nbsp;{{ page.header.title }}</span>
                        </div>
                    </a>

                    <!-- No results -->
                    <div 
                        v-if="query && suggestions.length === 0"
                        class="p-6 text-center text-gray-600"
                        v-text="`No results...`"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchPagesInArray, isArticle } from '@theme/utils'

export default {
    data () {
        return {
            openned: true,
            focused: 0,
            query: '',
        }
    },
    computed: {
        suggestions () {
            this.focused = 0
            return this.query.trim() ? this.$search(this.query, 6) : this.menu
        },
        menu () {
            return fetchPagesInArray(this.$site.pages, this.$site.themeConfig.nav)
        },
    },
    methods: {
        open () {
            this.openned = true
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },
        close () {
            this.openned = false
            this.reset()
        },
        go (event, index) {
            // Allow cmd+click to open a new tab.
            if (event.metaKey) return
            event.preventDefault()

            // Find page for index and push to router.
            index = typeof index === 'undefined' ? this.focused : index
            if (typeof this.suggestions[index] === 'undefined') return
            this.$router.push(this.suggestions[index].path)
            this.reset()
        },
        reset () {
            this.focused = 0
            this.query = ''
        },
        move (velocity) {
            this.focused += velocity
            if (this.focused < 0) this.focused = this.suggestions.length - 1
            if (this.focused >= this.suggestions.length) this.focused = 0
        },
        focus (index) {
            this.focused = index
        },
        unfocus () {
            this.focused = -1
        },
        iconForPage (page) {
            if (!! page.frontmatter.icon) return page.frontmatter.icon
            if (isArticle(page)) return 'news'
            return 'document'
        }
    },
    created() {
        const keyboardHandler = e => {
            if (e.key === '/' && ! this.openned) {
                e.preventDefault()
                this.open()
            }
            if (e.key === 'Escape' || e.key === 'Esc') {
                this.close()
            }
        }
        document.addEventListener('keydown', keyboardHandler)
        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('keydown', keyboardHandler)
        })
    },
}
</script>

<template>
    <div class="fixed w-full z-navigator">
        <div class="container flex justify-end">
            <OnClickOutside :do="() => this.openned && this.toggle()">
                <div class="relative mt-10 sm:mt-16 md:mt-24 mr-4 md:mr-2 lg:-mr-16 xl:-mr-32">
                    <NavigatorButton @click="toggle"></NavigatorButton>
                    <div
                        v-show="openned"
                        class="absolute pin-t pin-r shadow-md rounded-lg bg-grey-lighter p-4 -mr-5 -mt-3 w-navigator-sm sm:w-navigator"
                    >
                        <NavigatorInput
                            ref="input"
                            v-model="query"
                        ></NavigatorInput>
                        <NavigatorResults
                            :query="query"
                            :focused="focused"
                            :suggestions="suggestions"
                        ></NavigatorResults>
                    </div>
                </div>
            </OnClickOutside>
        </div>
    </div>
</template>

<script>
import { fetchPagesInArray } from '@theme/utils'
import OnClickOutside from './OnClickOutside'
import NavigatorButton from './NavigatorButton'
import NavigatorInput from './NavigatorInput'
import NavigatorResults from './NavigatorResults'

export default {
    components: { OnClickOutside, NavigatorButton, NavigatorInput, NavigatorResults },
    provide () {
        return {
            toggle: this.toggle,
            go: this.go,
            move: this.move,
            focus: this.focus,
            unfocus: this.unfocus,
        }
    },
    data () {
        return {
            openned: false,
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
        toggle () {
            this.openned = ! this.openned
            this.openned
                ? this.$nextTick(() => this.$refs.input.focus())
                : this.reset()
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
            this.openned = false
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
    },
}
</script>
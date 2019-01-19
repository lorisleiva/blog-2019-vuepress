<template>
    <OnClickOutside :do="() => this.openned && this.toggle()">
        <div class="relative">
            <NavigatorButton @click="toggle"></NavigatorButton>
            <div
                v-show="openned"
                class="absolute pin-t pin-r shadow-md rounded-lg bg-grey-lighter p-4 -mr-5 -mt-3 min-w-450"
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
</template>

<script>
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
            const menuPaths = this.$site.themeConfig.nav
            return this.$site.pages
                .filter(page => menuPaths.includes(page.path))
                .sort((a, b) => menuPaths.indexOf(a.path) - menuPaths.indexOf(b.path))
        },
    },
    methods: {
        toggle () {
            this.openned = ! this.openned
            this.openned
                ? this.$nextTick(() => this.$refs.input.focus())
                : this.reset()
        },
        go (index) {
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
        dummy () {
            console.log('click outside')
        }
    },
}
</script>
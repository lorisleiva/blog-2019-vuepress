<template>
    <div>
        <Moveable>
            <div class="navigator fixed z-30" slot-scope="{ dragged }">
                <OnClickOutside :do="() => this.openned && this.toggle()">
                    <div class="relative">
                        <NavigatorButton @click="toggle(dragged)"></NavigatorButton>
                        <div
                            v-show="openned"
                            class="hidden sm:block absolute pin-t pin-r shadow-md rounded-lg bg-gray-300 p-4 -mr-5 -mt-3 w-navigator"
                        >
                            <NavigatorInput
                                ref="input"
                                v-model="query"
                                :dragged="dragged"
                            ></NavigatorInput>
                            <NavigatorResults
                                :query="query"
                                :focused="focused"
                                :suggestions="suggestions"
                                :dragged="dragged"
                            ></NavigatorResults>
                        </div>
                    </div>
                </OnClickOutside>
            </div>
        </Moveable>
        <div
            v-show="openned"
            class="sm:hidden shadow-md fixed pin-t pin-x bg-gray-300 p-4 pt-6 z-navigator"
        >
            <NavigatorInput
                ref="inputMobile"
                v-model="query"
                :dragged="false"
            ></NavigatorInput>
            <NavigatorResults
                :query="query"
                :focused="focused"
                :suggestions="suggestions"
                :dragged="false"
            ></NavigatorResults>
        </div>
    </div>
</template>

<script>
import { fetchPagesInArray } from '@theme/utils'
import Moveable from './Moveable'
import OnClickOutside from './OnClickOutside'
import NavigatorButton from './NavigatorButton'
import NavigatorInput from './NavigatorInput'
import NavigatorResults from './NavigatorResults'

export default {
    components: { Moveable, OnClickOutside, NavigatorButton, NavigatorInput, NavigatorResults },
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
        dummyClick () { console.log('dummyClick') },
        toggle (dragged) {
            if (dragged) return
            this.openned = ! this.openned
            if (! this.openned) return this.reset()
            this.$nextTick(() => {
                this.$refs.input.focus()
                this.$refs.inputMobile.focus()
            })
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

<style lang="stylus">
.navigator
    bottom 50px
    right 50px
    @media sm
        bottom auto
        top 80px
        right 50px
    @media md
        right calc(((100vw - 768px) / 2) + 50px)
    @media lg
        right calc(((100vw - 768px) / 2) - 60px)
    @media xl
        right calc(((100vw - 768px) / 2) - 80px)
</style>
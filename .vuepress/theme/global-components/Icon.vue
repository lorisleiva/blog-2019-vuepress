<template>
    <div class="w-4 h-4" v-html="svg"></div>
</template>

<script>
export default {
    props: {
        icon: String,
        primary: {
            type: String,
            default: 'text-grey-dark fill-current',
        },
        secondary: {
            type: String,
            default: 'text-grey-darker fill-current',
        },
    },
    computed: {
        svg () {
            return require(`!svg-inline-loader!../assets/icons/icon-${this.icon}.svg`)
        },
    },
    methods: {
        proxyClasses (key) {
            this.$el.getElementsByClassName(key)[0].classList = `${key} fill-current ${this[key]}`
        }
    },
    watch: {
        primary () { this.proxyClasses('primary') },
        secondary () { this.proxyClasses('secondary') },
    },
    mounted () {
        this.proxyClasses('primary')
        this.proxyClasses('secondary')
    }
}
</script>
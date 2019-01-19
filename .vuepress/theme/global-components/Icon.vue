<template>
    <div v-html="svg"></div>
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
            const elements = this.$el.getElementsByClassName(key)
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList = `${key} fill-current ${this[key]}`
            }
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
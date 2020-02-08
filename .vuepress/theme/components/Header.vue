<template>
    <div class="py-16">
        <div class="container">
            <div class="text-gray-800 font-serif text-4xl md:text-5xl font-semibold leading-tight" v-text="title"></div>
            <div class="text-gray-800 font-serif text-xl md:text-2xl font-medium" v-if="subtitle" v-text="subtitle"></div>
        </div>
    </div>
</template>

<script>
import Navigator from './Navigator'

export default {
    components: { Navigator },
    computed: {
        title () {
            return this.$page.title
        },
        subtitle () {
            return this.$page.frontmatter.subtitle
        },
    }
}
</script>

<template>
    <div>
        <GradientBar></GradientBar>
        <div class="container my-16">
            <div class="font-serif text-5xl font-semibold leading-tight" v-text="title"></div>
            <div class="font-serif text-2xl font-medium" v-if="subtitle" v-text="subtitle"></div>
        </div>
    </div>
</template>

<script>
import GradientBar from './GradientBar'

export default {
    components: { GradientBar },
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

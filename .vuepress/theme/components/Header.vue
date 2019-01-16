<template>
    <div>
        <GradientBar></GradientBar>
        <div class="max-w-md my-16 mx-auto">
            <div class="font-serif text-5xl font-semibold" v-text="title"></div>
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

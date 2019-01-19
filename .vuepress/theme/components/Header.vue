<template>
    <div>
        <Navigator></Navigator>
        <GradientBar></GradientBar>
        <div class="container my-16">
            <div class="text-black font-serif text-4xl md:text-5xl font-semibold leading-tight" v-text="title"></div>
            <div class="text-black font-serif text-xl md:text-2xl font-medium" v-if="subtitle" v-text="subtitle"></div>
        </div>
    </div>
</template>

<script>
import GradientBar from './GradientBar'
import Navigator from './Navigator'

export default {
    components: { GradientBar, Navigator },
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

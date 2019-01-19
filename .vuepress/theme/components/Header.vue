<template>
    <div>
        <GradientBar></GradientBar>
        <div class="container flex items-center my-16">
            <div class="flex-1">
                <div class="text-black font-serif text-4xl md:text-5xl font-semibold leading-tight" v-text="title"></div>
                <div class="text-black font-serif text-xl md:text-2xl font-medium" v-if="subtitle" v-text="subtitle"></div>
            </div>
            <div class="pl-24">
                <Navigator></Navigator>
            </div>
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

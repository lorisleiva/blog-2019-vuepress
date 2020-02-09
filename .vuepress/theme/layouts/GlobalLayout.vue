<template>
    <div class="xl:px-4">
        <!-- Animated background. -->
        <AnimatedGradient class="fixed inset-0" />

        <!-- Search and navigation menu. -->
        <Navigator ref="navigator" />

        <!-- Page. -->
        <div class="relative w-full max-w-screen-xl mx-auto mt-4 xl:my-8 xl:rounded-lg overflow-hidden shadow-lg">
            <div class="group menu-button" @click="$refs.navigator.open()">
                <Icon icon="menu" class="w-6 sm:w-8" secondary="text-gray-500 group-hover:text-white" />
            </div>
            <component :is="layout" />
            <div class="p-8 bg-white-50p">
                <Footer />
            </div>
        </div>
    </div>
</template>

<script>
import { isArticle } from '@theme/utils'
import AnimatedGradient from '@theme/components/AnimatedGradient'
import Navigator from '@theme/components/Navigator'
import Footer from '@theme/components/Footer'

// Available layouts.
import HomeLayout from '@theme/layouts/HomeLayout'
import ArticleLayout from '@theme/layouts/ArticleLayout'
import Layout from '@theme/layouts/Layout'

export default {
    components: { AnimatedGradient, Navigator, Footer, HomeLayout, ArticleLayout, Layout },
    computed: {
        layout () {
            if (! this.$page.path) return 'Layout' // TODO 404.vue
            if (this.$page.path === '/') return 'HomeLayout'
            if (isArticle(this.$page)) return 'ArticleLayout'
            return 'Layout'
        }
    },
}
</script>

<style lang="stylus">
corner-triangle(size, paddingTop, paddingRight)
    width size
    height size
    border-style solid
    border-width 0 size*2 size*2 0
    border-color transparent theme('colors.gray.800') transparent transparent
    position absolute
    top 0
    right 0
    cursor pointer
    > div
        position absolute
        top paddingTop
        right paddingRight - (size * 2)

.menu-button
    corner-triangle(30px, 4px, 6px)
    @media sm
        corner-triangle(40px, 5px, 8px)
</style>

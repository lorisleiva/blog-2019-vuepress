<template>
    <div class="xl:px-4">
        <!-- Animated background. -->
        <AnimatedGradient class="fixed inset-0" />

        <!-- Search and navigation menu. -->
        <Navigator ref="navigator" />

        <!-- Page. -->
        <div class="relative w-full max-w-screen-xl mx-auto mt-4 xl:my-8 xl:rounded-lg overflow-hidden shadow-lg">
            <MenuButton @click="$refs.navigator.open()" />
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
import MenuButton from '@theme/components/MenuButton'
import Footer from '@theme/components/Footer'

// Available layouts.
import HomeLayout from '@theme/layouts/HomeLayout'
import ArticleLayout from '@theme/layouts/ArticleLayout'
import Layout from '@theme/layouts/Layout'

export default {
    components: { AnimatedGradient, Navigator, MenuButton, Footer, HomeLayout, ArticleLayout, Layout },
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

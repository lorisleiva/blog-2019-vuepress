<template>
    <div class="xl:px-4">
        <!-- Animated background. -->
        <AnimatedGradient class="fixed inset-0" />

        <!-- Search and navigation menu. -->
        <Navigator ref="navigator" />

        <!-- Page. -->
        <div class="relative w-full max-w-screen-xl mx-auto mt-4 xl:my-8 xl:rounded-lg overflow-hidden shadow-lg">
            <MenuButton @click="$refs.navigator.open()" />
            <div class="flex flex-col">
                <component :is="layout" />
            </div>
            <div class="p-8 bg-white-50p">
                <Footer />
            </div>
        </div>
    </div>
</template>

<script>
import AnimatedGradient from '@theme/components/AnimatedGradient'
import Navigator from '@theme/components/Navigator'
import MenuButton from '@theme/components/MenuButton'
import Footer from '@theme/components/Footer'

// Available layouts.
import Article from '@theme/layouts/Article'
import ArticlesAll from '@theme/layouts/ArticlesAll'
import ArticlesPaginated from '@theme/layouts/ArticlesPaginated'
import Home from '@theme/layouts/Home'
import Layout from '@theme/layouts/Layout'
import Tags from '@theme/layouts/Tags'

export default {
    components: { AnimatedGradient, Navigator, MenuButton, Footer, Article, ArticlesAll, ArticlesPaginated, Home, Layout, Tags },
    computed: {
        layout () {
            if (! this.$page.path) return 'Layout' // TODO 404.vue
            if (this.$frontmatter.layout) return this.$frontmatter.layout
            if (this.$page.isArticle) return 'Article'
            return 'Layout'
        }
    },
}
</script>

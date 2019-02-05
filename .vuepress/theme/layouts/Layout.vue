<template>
    <div class="theme-container">
        <Header />
        <component :is="layout" />
        <Footer />
    </div>
</template>

<script>
import { isArticle } from '@theme/utils'
import Header from '@theme/components/Header'
import Footer from '@theme/components/Footer'

// Available layouts.
import HomeLayout from '@theme/layouts/HomeLayout'
import ArticleLayout from '@theme/layouts/ArticleLayout'
import BasicLayout from '@theme/layouts/BasicLayout'

export default {
    components: { Header, Footer, HomeLayout, ArticleLayout, BasicLayout },
    computed: {
        layout () {
            if (this.$page.path === '/') return 'HomeLayout'
            if (isArticle(this.$page)) return 'ArticleLayout'
            return 'BasicLayout'
        }
    },
}
</script>
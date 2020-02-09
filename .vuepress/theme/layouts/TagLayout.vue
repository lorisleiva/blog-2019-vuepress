<template>
    <div class="bg-white">
        <Header :subtitle="subtitle" xl />
        <ArticleGrid :articles="articles" />
    </div>
</template>

<script>
import Header from '@theme/components/Header'
import ArticleGrid from '@theme/components/ArticleGrid'

export default {
    components: { Header, ArticleGrid },
    computed: {
        articles () {
            // TODO: Make nice grid for all tags
            // TODO: add two most popular tags as cards + other cars in navigator (before search input)
            // TODO: Group series of articles?
            return this.$pagination.pages
        },
        subtitle () {
            if (this.$pagination && this.$pagination.paginationIndex > 0) {
                return `Page ${this.$pagination.paginationIndex + 1}`
            }
        },
    },
}
</script>

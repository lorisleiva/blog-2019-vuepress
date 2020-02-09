<template>
    <div class="bg-white">
        <Header xl />
        <ArticleGrid :articles="articles" />
    </div>
</template>

<script>
import { sortByDate } from '@theme/utils'
import Header from '@theme/components/Header'
import ArticleGrid from '@theme/components/ArticleGrid'

export default {
    components: { Header, ArticleGrid },
    computed: {
        articles () {
            // TODO: Before pagination?
            // TODO: Make sure pagination pages are not searchable (page.isSearchable = false)
            // TODO: Make nice grid for all tags
            // TODO: add two most popular tags as cards + other cars in navigator (before search input)
            // TODO: Group series of articles?
            return this.$currentTag.pages.sort(sortByDate)
        },
    },
}
</script>

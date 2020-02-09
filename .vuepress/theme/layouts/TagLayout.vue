<template>
    <div class="bg-white">
        <Header no-home xl />
        <ArticleGrid :articles="$currentTag.pages" />
    </div>
</template>

<script>
import Header from '@theme/components/Header'
import ArticleGrid from '@theme/components/ArticleGrid'

export default {
    components: { Header, ArticleGrid },
}
</script>

<template>
    <div class="bg-white">
        <div class="container-xl">
            <Header no-home />
            <ArticleGrid :articles="$featuredArticles" />
        </div>
    </div>
</template>

<script>
import Header from '@theme/components/Header'
import ArticleGrid from '@theme/components/ArticleGrid'

export default {
    components: { Header, ArticleGrid },
}
</script>

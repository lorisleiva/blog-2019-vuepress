<template>
    <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mx-12 lg:mx-20 pb-16">
            <ArticleCard 
                v-for="(article, index) in $featuredArticles" 
                :key="article.key"
                :article="article"
                :class="index === 0 ? 'sm:col-span-2' : ''"
                :featured="index === 0"
            />
        </div>
    </div>
</template>

<script>
import ArticleCard from '@theme/components/ArticleCard'
import ArticleList from '@theme/components/ArticleList'

export default {
    components: { ArticleCard, ArticleList },
}
</script>

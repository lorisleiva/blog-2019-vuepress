<template>
    <div class="bg-white">
        <header class="mx-6 sm:mx-12 lg:mx-20 py-16 text-gray-800 font-serif">
            <div class="text-4xl md:text-5xl font-semibold leading-tight" v-text="$page.title"></div>
            <div class="text-xl md:text-2xl font-medium" v-text="$page.frontmatter.subtitle"></div>
        </header>
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mx-6 sm:mx-12 lg:mx-20 pb-16">
            <ArticleCard 
                v-for="(article, index) in $featuredArticles" 
                :key="article.key"
                :article="article"
                :class="index === 0 ? 'sm:col-span-2' : ''"
                :featured="index === 0"
            />
        </section>
    </div>
</template>

<script>
import ArticleCard from '@theme/components/ArticleCard'
import ArticleList from '@theme/components/ArticleList'

export default {
    components: { ArticleCard, ArticleList },
}
</script>

<template>
    <div>
        <div class="container lg:max-w-lg xl:max-w-xl mb-16"> 
            <div class="flex flex-wrap -mx-5">
                <ArticleCard 
                    v-for="article in $featuredArticles" 
                    :key="article.key"
                    :article="article"
                    class="mx-5 mb-6 sm:mb-10"
                    highlight-every-third
                />
            </div>
        </div>
        <div class="container">
            <h2>More articles</h2>
        </div>
        <ArticleList 
            class="mb-16"
            :articles="$otherArticles"
        />
    </div>
</template>

<script>
import ArticleCard from '@theme/components/ArticleCard'
import ArticleList from '@theme/components/ArticleList'

export default {
    components: { ArticleCard, ArticleList },
}
</script>
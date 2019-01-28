<template>
    <div class="theme-container">
        <Header/>
        <div class="container lg:max-w-lg xl:max-w-xl"> 
            <div class="flex flex-wrap -mx-5">
                <ArticleCard 
                    v-for="article in $featuredArticles" 
                    :key="article.key"
                    :article="article"
                    class="mx-5 mb-6 sm:mb-10"
                />
            </div>
        </div>
        <div class="container">
            <ArticleList :articles="$otherArticles"/>
        </div>
    </div>
</template>

<script>
import Header from '@theme/components/Header'
import ArticleCard from '@theme/components/ArticleCard'
import ArticleList from '@theme/components/ArticleList'

export default {
    components: { Header, ArticleCard, ArticleList },
}
</script>

<style src="@theme/styles" lang="stylus"></style>
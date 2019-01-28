<template>
    <div class="theme-container">
        <Header/>
        <div class="container lg:max-w-lg xl:max-w-xl"> 
            <ArticleCards :articles="$featuredArticles"/>
        </div>
        <div class="container">
            <ArticleList :articles="$otherArticles"/>
        </div>
    </div>
</template>

<script>
import Header from '@theme/components/Header'
import ArticleCards from '@theme/components/ArticleCards'
import ArticleList from '@theme/components/ArticleList'

export default {
    components: { Header, ArticleCards, ArticleList },
}
</script>

<style src="@theme/styles" lang="stylus"></style>
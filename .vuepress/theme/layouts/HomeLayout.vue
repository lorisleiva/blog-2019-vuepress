<template>
    <div class="theme-container">
        <Header/>
        <div class="container lg:max-w-lg xl:max-w-xl"> 
            <ArticleCards :articles="articles"/>
        </div>
    </div>
</template>

<script>
import Header from '@theme/components/Header'
import ArticleCards from '@theme/components/ArticleCards'

export default {
    components: { Header, ArticleCards },
    computed: {
        articles () {
            return this.$site.pages.filter(article => {
                return article.regularPath.startsWith('/articles/')
                    && article.regularPath !== '/articles/'
            })
        }
    }
}
</script>

<style src="@theme/styles" lang="stylus"></style>
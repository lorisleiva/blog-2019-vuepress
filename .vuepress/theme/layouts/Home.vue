<template>
    <div class="bg-white">
        <div class="container-xl">
            <Header no-home />
            <ArticleGrid :articles="$featuredArticles" />
            <div class="flex flex-col sm:flex-row items-center justify-center mb-16">
                <a href="#" @click.prevent="$parent.$refs.navigator.open()">Search</a>
                <div class="px-4 py-2">❀</div>
                <router-link to="/tag/">Browse by tags</router-link>
                <div class="px-4 py-2">❀</div>
                <router-link to="/articles/">List all articles</router-link>
            </div>
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

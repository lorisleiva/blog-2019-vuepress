<template>
    <div class="bg-white">
        <div class="container mb-16">
            <Header />
            <Content />
            <router-link :to="article.path" v-for="article in $articles" :key="article.key" class="m-0 block hover:bg-blackrock hover:text-white px-4 py-2 rounded-lg cursor-pointer border-0">
                <div class="text-sm uppercase tracking-wider text-gray-500 font-semibold" v-text="relativeDate(article)"></div>
                <div class="text-lg" v-text="article.title"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { relativeDate } from '@theme/utils'
import Header from '@theme/components/Header'

export default {
    components: { Header },
    methods: {
        relativeDate (article) {
            return relativeDate(article.isoDate)
        }
    }
}
</script>

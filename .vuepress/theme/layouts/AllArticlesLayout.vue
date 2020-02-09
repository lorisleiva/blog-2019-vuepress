<template>
    <div class="bg-white">
        <Header />
        <Content />
        <div class="container flex flex-col pb-16">
            <router-link :to="article.path" v-for="article in $articles" :key="article.key" class="m-0 flex hover:bg-gray-200 hover:text-gray-800 px-4 py-2 rounded-lg cursor-pointer border-0">
                <div>
                    <div class="text-sm uppercase tracking-wider text-gray-600 font-semibold" v-text="dateOf(article)"></div>
                    <div class="text-lg" v-text="article.title"></div>
                </div>
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
        dateOf (article) {
            return relativeDate(article.frontmatter.date)
        }
    }
}
</script>

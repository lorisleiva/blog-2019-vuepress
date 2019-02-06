<template>
    <div>
        <FloatingHeader />
        <div class="container mb-8">
            <ArticleMetaData />
        </div>
        <Content />
        <div class="bg-topaz mb-16 mt-8 py-8">
            <div class="container">
                <SubscribeForm />
            </div>
        </div>
        <div class="container">
            <ClientOnly>
                <Disqus 
                    shortname="loris-leiva" 
                    :title="$page.title"
                    :identifier="disqusIdentifier" 
                    :url="disqusUrl"
                />
            </ClientOnly>
        </div>
        <div class="bg-grey-lighter mt-16">
            <div class="container py-4 sm:py-8">
                <h2>Related articles</h2>
                <div class="flex flex-wrap -mx-5">
                    <ArticleCard 
                        v-for="article in relatedArticles" 
                        :key="article.key"
                        :article="article"
                        class="mx-5 mb-8"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { randomElements, excludePages } from '@theme/utils'
import FloatingHeader from '@theme/components/FloatingHeader'
import ArticleMetaData from '@theme/components/ArticleMetaData'
import SubscribeForm from '@theme/components/SubscribeForm'
import ArticleCard from '@theme/components/ArticleCard'

export default {
    components: { FloatingHeader, ArticleMetaData, SubscribeForm, ArticleCard },
    computed: {
        disqusIdentifier () {
            return this.$page.frontmatter.disqus || this.$page.path
        },
        disqusUrl () {
            return this.$themeConfig.domain + this.$page.path
        },
        relatedArticles () {
            const tags = this.$page.frontmatter.tags || []
            const relatedArticles = this.$articles
                .filter(a => (a.frontmatter.tags || []).some(tag => tags.includes(tag)))

            return randomElements(excludePages(relatedArticles, [this.$page]), 2)
        }
    }
}
</script>
<template>
    <div>
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
            <div class="container pt-16 pb-8">
                <div class="flex flex-wrap -mx-5">
                    <ArticleCard 
                        v-for="article in $featuredArticles.slice(0, 2)" 
                        :key="article.key"
                        :article="article"
                        class="mx-5 mb-6 sm:mb-10"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SubscribeForm from '@theme/components/SubscribeForm'
import ArticleMetaData from '@theme/components/ArticleMetaData'
import ArticleCard from '@theme/components/ArticleCard'

export default {
    components: { SubscribeForm, ArticleMetaData, ArticleCard },
    computed: {
        disqusIdentifier () {
            return this.$page.frontmatter.disqus || this.$page.path
        },
        disqusUrl () {
            return this.$themeConfig.domain + this.$page.path
        },
    }
}
</script>
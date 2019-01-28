<template>
    <div class="flex flex-wrap -mx-5">
        <a 
            class="article-card relative flex flex-col mx-5 mb-6 sm:mb-10 rounded-lg shadow-xl hover:shadow-2xl min-h-article-card border-0"
            v-for="article in articles"
            :href="article.path"
        >
            <figure>
                <div 
                    class="h-48 rounded-t-lg bg-no-repeat bg-cover bg-center" 
                    :style="`background-image: url(${article.frontmatter.image})`"
                ></div>
            </figure>
            <main class="flex flex-1 flex-col p-6">
                <header>
                    <div 
                        class="uppercase tracking-wide text-grey-dark text-sm font-semibold" 
                        v-text="article.frontmatter.tags[0]"
                    ></div>
                    <div 
                        class="font-sans text-2xl mb-4 border-0 leading-tight text-black font-semibold" 
                        v-text="article.title"
                    ></div>
                </header>
                <section
                    class="font-content text-lg text-grey-darker" 
                    v-text="article.frontmatter.description"
                ></section>
            </main>
            <div v-if="article.frontmatter.ribbon" :class="getRibbonClassFor(article)">
                <span v-text="article.frontmatter.ribbon"></span>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    props: ['articles'],
    methods: {
        getRibbonClassFor (article) {
            switch (article.frontmatter.ribbon) {
                case 'popular': return 'ribbon river'
                case 'new': return 'ribbon topaz'     
                default: return ''
            }
        }
    }
}
</script>

<style lang="stylus">
.article-card
    flex 1 1 300px
    transition all 0.5s ease
    &:hover
        transition all 0.4s ease
        transform translate3D(0, -1px, 0) scale(1.02)

@media md
    .article-card:nth-child(3n+1)
        flex 1 1 100%
        flex-direction row
        figure
            flex 1 1 auto
            > div
                border-bottom-left-radius config('borderRadius.lg')
                border-top-right-radius 0
                width 100%
                height 100%
        main
            flex 0 1 357px
            padding 30px 40px
            h2
                font-size config('textSizes.3xl')
            section
                font-size config('textSizes.xl')
                line-height 1.55
</style>

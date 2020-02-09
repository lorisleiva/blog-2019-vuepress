<template>
    <router-link 
        class="article-card relative flex flex-col rounded-lg z-10 cursor-pointer" style="min-height: 16rem;"
        :class="featured ? 'border-0' : 'border border-gray-300'"
        :to="article.path"
    >
        <figure
            class="relative bg-cover bg-center overflow-hidden" 
            :class="featured ? 'h-full min-h-72 rounded-lg' : 'h-48 rounded-t-lg'"
            :style="`background-image: url(${article.frontmatter.image})`"
        >
            <div v-if="featured" class="absolute inset-x-0 bottom-0 p-6 pt-20 text-white" style="background-image: linear-gradient(to top, rgba(74, 85, 104,.4) 40%, rgba(0,0,0,0) 100%)">
                <div 
                    class="uppercase tracking-wider text-xs font-semibold mb-2" 
                    v-text="article.frontmatter.tags[0]"
                ></div>
                <div 
                    class="font-sans text-2xl border-0 leading-tight font-semibold" 
                    v-text="article.title"
                ></div>
            </div>
        </figure>
        <main class="flex flex-1 flex-col bg-white rounded-b-lg p-6" v-if="! featured">
            <header>
                <div 
                    class="uppercase tracking-wider text-gray-500 text-xs font-semibold mb-2" 
                    v-text="article.frontmatter.tags[0]"
                ></div>
                <div 
                    class="font-sans text-lg border-0 leading-tight text-black font-semibold mb-2" 
                    v-text="article.title"
                ></div>
            </header>
            <section
                class="font-sans text-gray-600" 
                v-text="article.frontmatter.description"
            ></section>
        </main>
        <div v-if="article.frontmatter.ribbon" :class="ribbonClass">
            <span v-text="article.frontmatter.ribbon"></span>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        article: Object,
        featured: Boolean,
    },
    computed: {
        ribbonClass () {
            switch (this.article.frontmatter.ribbon) {
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
    transition all 0.4s ease
    &:hover
        transform translate3D(0, -1px, 0) scale(1.02)
    &:before 
        content ""
        position absolute
        top 10px
        right 10px
        bottom 0
        left 10px
        border-radius 10px
        box-shadow 0 10px 10px rgba(0,0,0,0.08),0 0 0 transparent
        transition all .25s cubic-bezier(.02,.01,.47,1)
        z-index -1
    &:hover:before
        box-shadow 0 4px 60px 0 rgba(0,0,0,0.2),0 0 0 transparent

</style>

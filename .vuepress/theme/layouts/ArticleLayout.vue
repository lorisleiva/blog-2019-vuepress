<template>
    <div>
        <Content />
        <div class="container">
            <Disqus 
                shortname="loris-leiva" 
                :title="$page.title"
                :identifier="disqusIdentifier" 
                :url="disqusUrl"
            />
        </div>
    </div>
</template>

<script>
export default {
    components: {},
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
<template>
    <div>
        <Content />
        <div class="container">
            <Disqus shortname="loris-leiva" :identifier="disqusIdentifier" :title="$page.title" />
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    computed: {
        disqusIdentifier () {
            return this.$page.frontmatter.disqus || this.$page.path
        }
    }
}
</script>
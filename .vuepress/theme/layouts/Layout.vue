<template>
    <div class="theme-container">
        <Header></Header>
        <Content/>
    </div>
</template>

<script>
import Header from '@theme/components/Header'

export default {
    components: { Header },
    computed: {
        layout () {
            if (this.$page.regularPath.startsWith('/articles')) {
                return 'ArticleLayout'
            }
            return this.$page.frontmatter.use || 'PageLayout'
        }
    }
}
</script>

<style src="@theme/styles" lang="stylus"></style>
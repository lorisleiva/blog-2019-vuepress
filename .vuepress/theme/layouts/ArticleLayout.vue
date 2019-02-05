<template>
    <div>
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
    </div>
</template>

<script>
import SubscribeForm from '@theme/components/SubscribeForm'

export default {
    components: { SubscribeForm },
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
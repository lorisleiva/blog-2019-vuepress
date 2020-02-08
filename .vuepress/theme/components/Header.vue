<template>
    <div class="py-16">
        <div class="container">
            <router-link tag="button" to="/" class="group flex items-center text-gray-600 mb-2 focus:outline-none">
                <Icon icon="arrow-thin-left-circle" class="w-6 h-6 mr-1" primary="text-white" secondary="group-hover:text-gray-900"></Icon>
                <div class="uppercase tracking-wider font-semibold text-sm group-hover:text-gray-900">Home</div>
            </router-link>
            <div class="text-gray-800 font-serif text-4xl md:text-5xl font-semibold leading-tight" v-text="title"></div>
            <div class="text-gray-800 font-serif text-xl md:text-2xl font-medium" v-if="subtitle" v-text="subtitle"></div>
        </div>
    </div>
</template>

<script>
import Navigator from './Navigator'

export default {
    components: { Navigator },
    computed: {
        title () {
            return this.$page.title
        },
        subtitle () {
            return this.$page.frontmatter.subtitle
        },
    }
}
</script>

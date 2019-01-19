<template>
    <div @mouseleave="$parent.unfocus">
        <div 
            v-for="(page, index) in suggestions"
            :key="page.key + (page.header ? `_${page.header.slug}` : '')"
            class="flex px-4 py-2 text-lg font-semibold text-grey-darker rounded cursor-pointer"
            :class="index === focused ? 'bg-topaz' : ''"
            @click="$parent.go(index)"
            @mouseenter="$parent.focus(index)"
        >
            <Icon
                class="w-5 h-5 mr-3 mt-2px"
                :icon="iconForPage(page)" 
                :primary="index === focused ? 'text-white' : 'text-grey-dark'"
                :secondary="index === focused ? 'text-grey-light' : 'text-grey-darkest'"
            ></Icon>
            <div :class="index === focused ? 'text-white' : ''">
                <div v-text="page.title"></div>
                <span v-if="page.header" class="text-sm">&rightarrow;&nbsp;{{ page.header.title }}</span>
            </div>
        </div>

        <!-- No results -->
        <div 
            v-if="query && suggestions.length === 0"
            class="p-6 text-center text-grey-dark"
            v-text="`I'm Old Gregg...`"
        ></div>
    </div>
</template>

<script>
export default {
    props: ['suggestions', 'query', 'focused'],
    methods: {
        iconForPage (page) {
            if (page.frontmatter.icon) return page.frontmatter.icon
            if (page.regularPath.startsWith('/articles')) return 'news'
            return 'document'
        }
    }
}
</script>

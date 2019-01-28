<template>
    <div>
        <a
            v-for="article in articles"
            :key="article.key"
            :href="article.path"
            class="block py-6 hover:bg-grey-lightest border-b border-t border-transparent hover:border-grey hover:text-black"
        >
            <div class="container">
                <div 
                    class="font-sans text-2xl font-semibold mb-1"
                    v-text="article.title"
                ></div>
                <div 
                    class="font-content text-grey-darker"
                    v-text="article.frontmatter.description"
                ></div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    props: ['articles'],
}
</script>
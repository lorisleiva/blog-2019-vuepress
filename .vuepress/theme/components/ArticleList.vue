<template>
    <div>
        <router-link
            v-for="article in articles"
            :key="article.key"
            :to="article.path"
            class="block py-6 hover:bg-gray-400 border-b border-t border-transparent hover:border-gray-500 hover:text-black"
        >
            <div class="container">
                <div 
                    class="font-sans text-2xl font-semibold mb-1"
                    v-text="article.title"
                ></div>
                <div 
                    class="font-content text-gray-600"
                    v-text="article.frontmatter.description"
                ></div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['articles'],
}
</script>
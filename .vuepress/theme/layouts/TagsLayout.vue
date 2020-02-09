<template>
    <div class="bg-white">
        <div class="container">
            <Header title="Tags" />
            <div class="flex flex-col mb-16">
                <router-link :to="tag.path" v-for="tag in $frontmatterKey.list" :key="tag.name" class="m-0 flex hover:bg-gray-200 hover:text-gray-800 px-4 py-2 rounded-lg cursor-pointer border-0">
                    <div>
                        <div class="text-sm uppercase tracking-wider text-gray-600 font-semibold" v-text="tag.pages.length"></div>
                        <div class="text-lg" v-text="tag.name"></div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@theme/components/Header'

export default {
    components: { Header },
}
</script>

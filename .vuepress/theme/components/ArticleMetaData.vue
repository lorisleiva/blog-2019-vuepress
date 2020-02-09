<template>
    <div class="flex flex-col sm:flex-row sm:items-center text-gray-600 font-semibold bg-gray-100 border-t border-b border-gray-500 px-4 py-2 overflow-hidden">
        <div class="flex flex-no-shrink items-center mb-2 sm:mb-0 sm:mr-6">
            <Icon icon="calendar" class="w-5 h-5 flex-no-shrink" primary="text-gray-500" secondary="text-gray-600"></Icon>
            <div class="ml-2 flex-no-shrink" v-text="new Date($page.isoDate).toLocaleDateString('en-GB')"></div>
        </div>
        <div class="flex flex-no-shrink items-center">
            <Icon icon="tag" class="w-5 h-5 flex-no-shrink" primary="text-gray-500" secondary="text-gray-100"></Icon>
            <div class="ml-2 flex-no-shrink" v-for="tag in $page.frontmatter.tags" v-text="`${tag}`"></div>
        </div>
    </div>
</template>

<script>
export default {
    //
}
</script>

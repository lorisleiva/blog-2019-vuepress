<template>
    <div class="flex items-center container-xl text-xl my-16" v-if="$pagination">
        <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink" class="flex">
            <Icon icon="arrow-thin-left-circle" class="w-6 h-6 mr-1" primary="text-transparent" secondary="group-hover:text-gray-900"></Icon>
            {{ $pagination.prevText }}
        </router-link>
        <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink" class="flex items-center ml-auto">
            {{ $pagination.nextText }}
            <Icon icon="arrow-thin-right-circle" class="w-6 h-6 ml-1" primary="text-transparent" secondary="group-hover:text-gray-900"></Icon>
        </router-link>
    </div>
</template>

<script>
export default {
    //
}
</script>

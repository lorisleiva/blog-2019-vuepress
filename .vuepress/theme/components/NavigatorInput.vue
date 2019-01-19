<template>
    <div class="flex items-center rounded bg-white mb-4">
        <input 
            :value="value"
            @input="$emit('input', $event.target.value)"
            ref="input"
            type="text" 
            placeholder="Search..."
            class="flex-1 bg-transparent rounded-l text-xl pl-4 leading-normal focus:outline-none"
            @keydown.enter="go()"
            @keydown.up.prevent="move(-1)"
            @keydown.down.prevent="move(1)"
        >
        <div class="group rounded-r px-4 py-2 cursor-pointer" @click="toggle">
            <svg class="w-8 h-8 block flex-no-shrink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path class="text-grey-dark fill-current group-hover:fill-header-second-gradient" d="M14 12h5l3 3-3 3h-5v4h-4v-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6v-1h4v1z"/>
                <path class="text-grey-darker fill-current group-hover:fill-header-first-gradient" d="M10 4a2 2 0 1 1 4 0h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5L2 7l3-3h5z"/>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
    inject: ['go', 'move', 'toggle'],
    methods: {
        focus () {
            this.$refs.input.focus()
        }
    }
}
</script>

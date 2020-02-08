<template>
    <div class="group p-3 bg-white rounded-full shadow hover:shadow-md cursor-pointer" @click="$emit('click')">
        <svg class="w-8 h-8 block flex-no-shrink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
                <linearGradient id="header-first-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stop-color="#EE7752"/>
                    <stop offset="100%" stop-color="#E73C7E"/>
                </linearGradient>
                <linearGradient id="header-second-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stop-color="#23A6D5"/>
                    <stop offset="100%" stop-color="#23D5AB"/>
                </linearGradient>
            </defs>
            <path class="text-gray-600 fill-current group-hover:fill-header-second-gradient" d="M14 12h5l3 3-3 3h-5v4h-4v-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6v-1h4v1z"/>
            <path class="text-gray-600 fill-current group-hover:fill-header-first-gradient" d="M10 4a2 2 0 1 1 4 0h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5L2 7l3-3h5z"/>
        </svg>
    </div>
</template>

<script>
export default {
    //
}
</script>

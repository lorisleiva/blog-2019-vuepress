<template>
    <div class="flex flex-wrap font-sans text-xs sm:text-sm md:text-base">
        <div
            v-for="skill in skills" :key="skill.body"
            class="flex items-center border rounded-full h-6 sm:h-8 px-3 mr-3 mb-3"
            :class="classesFor(skill.theme)"
        >
            <Icon class="w-3 md:w-4 mr-2 mt-1" v-if="skill.icon" :icon="skill.icon"></Icon>
            <div v-text="skill.body"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['skills'],
    methods: {
        classesFor (theme) {
            switch (theme) {
                case 'category':
                    return 'border-transparent bg-gray-300 text-gray-600 text-xs md:text-sm font-semibold uppercase tracking-wide'

                case 'highlighted':
                    return 'border-transparent bg-topaz text-white'
            
                default:
                    return 'text-gray-800 md:text-gray-600'
            }
        }
    }
}
</script>


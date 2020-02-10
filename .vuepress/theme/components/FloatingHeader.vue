<template>
    <div class="floating-header fixed w-full max-w-screen-xl mx-auto inset-x-0 top-0 pt-2 pb-3 sm:pt-3 sm:pb-4 shadow z-20" :class="{ 'active': isVisible }">
        <div class="container-lg">
            <div class="flex items-center">

                <!-- Home and Title -->
                <div class="flex-1 flex items-center">
                    <router-link to="/" class="block border-0">
                        <icon icon="home" class="w-5 h-5" />
                    </router-link>
                    <div 
                        v-text="$page.title" 
                        class="flex-1 font-serif font-medium ml-3 mr-4 w-5 h-5 truncate"
                    ></div>
                </div>

                <!-- Share section -->
                <div class="hidden sm:flex items-center">
                    <div class="uppercase tracking-wide text-sm font-semibold text-gray-600 mr-3">
                        share
                    </div>
                    <a 
                        class="block border-0 leading-tight text-gray-600 hover:text-blue-400 mr-2"
                        :href="`https://twitter.com/share?text=${encodedTitle}&amp;url=${absoluteUrl}`"
                        onclick="window.open(this.href, 'share-twitter', 'width=550,height=235');return false;"
                    >
                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>            
                    </a>
                    <a
                        class="block border-0 leading-tight text-gray-600 hover:text-blue-600"
                        :href="`https://www.facebook.com/sharer/sharer.php?u=${absoluteUrl}`"
                        onclick="window.open(this.href, 'share-facebook','width=580,height=296');return false;"
                    >
                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512"><path d="M215.8 85H264V3.6C255.7 2.5 227.1 0 193.8 0 124.3 0 76.7 42.4 76.7 120.3V192H0v91h76.7v229h94V283h73.6l11.7-91h-85.3v-62.7c0-26.3 7.3-44.3 45.1-44.3z"/></svg>
                    </a>
                </div>
            </div>
        </div>
        <AnimatedGradient :progress="progress" class="absolute inset-x-0 bottom-0 h-1" />
    </div>
</template>

<script>
import AnimatedGradient from '@theme/components/AnimatedGradient'

export default {
    components: { AnimatedGradient },
    data () {
        return {
            progressValue: 0,
            progressMax: 0,
        }
    },
    computed: {
        progress () {
            if (this.progressMax === 0) return 0
            const percent = Math.floor(this.progressValue / this.progressMax * 1000) / 10
            return Math.min(percent, 100)
        },
        isVisible () {
            return this.progressValue >= 200
        },
        absoluteUrl () {
            return this.$themeConfig.domain + this.$page.path
        },
        encodedTitle () {
            return encodeURIComponent(this.$page.title)
        },
    },
    methods: {
        update () {
            const content = document.querySelector('.content__default')
            const progressValue = window.scrollY
            const progressMax = content.scrollHeight + content.offsetTop - window.innerHeight
            this.progressMax = progressMax
            this.progressValue = progressValue
        },
    },
    mounted () {
        this.update()
        window.addEventListener('scroll', this.update, { passive: true })
        window.addEventListener('resize', this.update, false)
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.update)
        window.removeEventListener('resize', this.update)
    },
}
</script>

<style lang="stylus">
.floating-header
    visibility hidden
    background rgba(255,255,255,0.95)
    transition all 500ms cubic-bezier(0.19, 1, 0.22, 1)
    transform translate3d(0, -120%, 0)
    &.active
        visibility visible
        transition all 500ms cubic-bezier(0.22, 1, 0.27, 1)
        transform translate3d(0, 0, 0)
</style>

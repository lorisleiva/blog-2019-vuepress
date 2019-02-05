<template>
    <form 
        method="post" 
        action="https://lorisleiva.us17.list-manage.com/subscribe/post?u=75fd667401723eb751037f151&amp;id=544f57c6d7"  
        name="mc-embedded-subscribe-form"
        id="mc-embedded-subscribe-form" 
        target="_blank" 
        novalidate
    >
        <div style="position: absolute; left: -5000px;" aria-hidden="true">
            <input type="text" name="b_75fd667401723eb751037f151_544f57c6d7" tabindex="-1" value="">
        </div>

        <div class="flex justify-center">
            <div class="flex w-full max-w-sm rounded-lg shadow-md">
                <input 
                    class="flex-1 p-3 rounded-l-lg border-2 border-white bg-white"
                    type="email" 
                    name="EMAIL" 
                    id="mce-EMAIL" 
                    :placeholder="placeholder" 
                    required
                >
                <button 
                    class="w-28 rounded-r-lg border-2 border-l-0 border-white text-white tracking-wide uppercase"
                    :class="{ 'text-2xl': submitHovered }"
                    type="submit" 
                    id="mc-embedded-subscribe"
                    v-text="submitText"
                    @mouseenter="submitHovered = true"
                    @mouseleave="submitHovered = false"
                ></button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        placeholder: { default: '🤖 Updates for humans..' },
        submitButton: { default: 'Subscribe' },
        submitEmojis: { default: () => [ '💌', '🎁', '🥳', '😘', '🙌', '👋', '👀', '🐼', '⛄️', '🎂', '🤖', '🦄', '🦋', '🍺', '🚀', '💡', '💎', '🛎', '🎉', '📦', '📚', '📨', '🥑', '🍪' ] },
    },
    data () {
        return {
            submitHovered: false,
        }
    },
    computed: {
        submitText () {
            return this.submitHovered
                ? this.submitEmojis[Math.floor(Math.random() * this.submitEmojis.length)]
                : this.submitButton
        }
    },
}
</script>

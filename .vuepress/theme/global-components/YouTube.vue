<template>
    <p>
        <iframe 
            :src="url" 
            class="bleeding-out-of-container youtube-iframe"
            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen
        ></iframe>
    </p>
</template>

<script>
export default {
    props: {
        url: { required: true },
    }
}
</script>

<style lang="stylus">
.youtube-iframe
    height 300px
    @media sm
        height 500px
</style>

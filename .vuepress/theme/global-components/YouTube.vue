<template>
    <p>
        <iframe 
            :src="url" width="560" height="396"
            class="youtube-iframe bleeding-out-of-container"
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
    @media lg
        height 506px
    @media xl
        height 585px
</style>

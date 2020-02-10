<template>
    <div class="mb-8">
        <div class="bleed-out-of-container relative" style="padding-top: 56.25%;">
            <iframe 
                :src="url" width="560" height="315"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen
            ></iframe>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        url: { required: true },
    }
}
</script>

<style lang="stylus" scoped>
iframe
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
</style>

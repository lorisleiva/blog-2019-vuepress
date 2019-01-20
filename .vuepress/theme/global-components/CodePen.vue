<template>
    <p>
        <iframe 
            class="mb-8 bleeding-out-of-container" 
            :height="height" 
            :title="title" 
            :src="`//codepen.io/${author}/embed/${id}/?height=${height}&theme-id=light&default-tab=result&embed-version=2`" 
            scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true"
        >
            See the Pen <a :href="`https://codepen.io/${author}/pen/${id}/`" v-text="title"></a> 
            by <a :href="`https://codepen.io/${author}`" v-text="`@${author}`"></a> 
            on <a href="https://codepen.io">CodePen</a>.
        </iframe>
    </p>
</template>

<script>
export default {
    props: {
        id: { required: true },
        title: { required: true },
        height: { default: '400' },
        author: { default: 'lorisleiva' }
    }
}
</script>

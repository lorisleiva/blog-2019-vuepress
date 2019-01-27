<template>
    <div class="theme-container">
        <Header></Header>
        <Content/>
    </div>
</template>

<script>
import Header from '@theme/components/Header'

export default {
    components: { Header },
}
</script>

<style src="@theme/styles" lang="stylus"></style>
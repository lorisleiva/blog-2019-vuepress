<template>
    <div class="theme-container">
        <Header></Header>
        <Content/>
    </div>
</template>

<script>
import Header from '../components/Header'

export default {
    components: { Header },
}
</script>

<style src="prismjs/themes/prism-okaidia.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>
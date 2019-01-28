<template>
    <ul>
        <li v-for="article in articles">
            {{ article.title }}
        </li>
    </ul>
</template>

<script>
export default {
    props: ['articles'],
}
</script>

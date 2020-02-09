<template>
    <div class="group menu-button" @click="$emit('click')">
        <Icon icon="menu" class="w-6 sm:w-8" secondary="text-gray-500 group-hover:text-white" />
    </div>
</template>

<script>
export default {
    //
}
</script>

<style lang="stylus">
corner-triangle(size, paddingTop, paddingRight)
    width size
    height size
    border-style solid
    border-width 0 size*2 size*2 0
    border-color transparent theme('colors.gray.800') transparent transparent
    position absolute
    top 0
    right 0
    cursor pointer
    > div
        position absolute
        top paddingTop
        right paddingRight - (size * 2)

.menu-button
    corner-triangle(30px, 4px, 6px)
    @media sm
        corner-triangle(40px, 5px, 8px)
</style>

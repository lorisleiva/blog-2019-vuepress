<script>
export default {
    props: ['do'],
    mounted () {
        const listener = ({ target }) => {
            if (this.$el === target || this.$el.contains(target)) return
            this.do()
        }
        document.addEventListener('click', listener)
        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('click', listener)
        })
    },
    render () {
        return this.$slots.default[0]
    },
}
</script>
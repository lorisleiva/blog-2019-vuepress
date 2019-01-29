<script>
export default {
    functional: true,
    render (h, context) {
        const slot = context.slots().default[0]
        const vm = slot.context

        let active = false
        let currentX
        let currentY
        let initialX
        let initialY
        let xOffset = 0
        let yOffset = 0

        const dragStart = e => {
            const dimension = e.type === 'touchmove' ? e.touches[0] : e
            initialX = dimension.clientX - xOffset
            initialY = dimension.clientY - yOffset
            active = true
        }

        const dragEnd = e => {
            initialX = currentX
            initialY = currentY
            active = false
        }

        const drag = e => {
            if (! active) return
            e.preventDefault()
            const dimension = e.type === 'touchmove' ? e.touches[0] : e
            currentX = dimension.clientX - initialX
            currentY = dimension.clientY - initialY
            xOffset = currentX
            yOffset = currentY
            vm.$el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
        }

        vm.$on('hook:mounted', () => {
            vm.$el.addEventListener('touchstart', dragStart)
            vm.$el.addEventListener('touchend', dragEnd)
            vm.$el.addEventListener('touchmove', drag)
            vm.$el.addEventListener('mousedown', dragStart)
            vm.$el.addEventListener('mouseup', dragEnd)
            vm.$el.addEventListener('mousemove', drag)
        })

        vm.$on('hook:beforeDestroy', () => {
            vm.$el.addEventListener('touchstart', dragStart)
            vm.$el.addEventListener('touchend', dragEnd)
            vm.$el.addEventListener('touchmove', drag)
            vm.$el.addEventListener('mousedown', dragStart)
            vm.$el.addEventListener('mouseup', dragEnd)
            vm.$el.addEventListener('mousemove', drag)
        })

        return slot
    }
}
</script>

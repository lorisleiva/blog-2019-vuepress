<script>
export default {
    functional: true,
    render (h, context) {
        const slot = context.slots().default[0]
        const vm = slot.context
        let currentX = 0, currentY = 0, previousX, previousY

        const dragStart = e => {
            previousX = cursorPosition(e).x - currentX
            previousY = cursorPosition(e).y - currentY
            setDocumentEvents(e, drag, dragEnd)
        }

        const drag = e => {
            e.preventDefault()
            currentX = cursorPosition(e).x - previousX
            currentY = cursorPosition(e).y - previousY
            vm.$el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
        }

        const dragEnd = e => setDocumentEvents(e, null, null)

        vm.$on('hook:mounted', () => {
            vm.$el.addEventListener('touchstart', dragStart)
            vm.$el.addEventListener('mousedown', dragStart)
        })

        vm.$on('hook:beforeDestroy', () => {
            vm.$el.addEventListener('touchstart', dragStart)
            vm.$el.addEventListener('mousedown', dragStart)
        })

        return slot
    }
}

function cursorPosition(event) {
    const position = event.type === 'touchmove' ? event.touches[0] : event
    return { x: position.clientX, y: position.clientY }
}

function setDocumentEvents(event, drag, dragEnd) {
    document[event.type === 'touchmove' ? 'ontouchmove' : 'onmousemove'] = drag
    document[event.type === 'touchmove' ? 'ontouchend' : 'onmouseup'] = dragEnd
}
</script>

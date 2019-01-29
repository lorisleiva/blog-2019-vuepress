<script>
export default {
    render () {
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
            this.$el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
        }

        const dragEnd = e => setDocumentEvents(e, null, null)

        this.$on('hook:mounted', () => {
            this.$el.addEventListener('touchstart', dragStart)
            this.$el.addEventListener('mousedown', dragStart)
        })

        this.$on('hook:beforeDestroy', () => {
            this.$el.addEventListener('touchstart', dragStart)
            this.$el.addEventListener('mousedown', dragStart)
        })

        return this.$slots.default[0]
    }
}

function cursorPosition(event) {
    const position = event.type === 'touchmove' ? event.touches[0] : event
    return { x: position.clientX, y: position.clientY }
}

function setDocumentEvents(event, drag, dragEnd) {
    document.ontouchmove = drag
    document.onmousemove = drag
    document.ontouchend = dragEnd
    document.onmouseup = dragEnd
}
</script>

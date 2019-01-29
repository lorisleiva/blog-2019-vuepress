<script>
export default {
    render () {
        let currentX = 0, currentY = 0, initialX, initialY, distance = 0

        const dragStart = e => {
            initialX = cursorPosition(e).x - currentX
            initialY = cursorPosition(e).y - currentY
            setDocumentEvents(e, drag, dragEnd)
        }

        const drag = e => {
            e.preventDefault()
            currentX = cursorPosition(e).x - initialX
            currentY = cursorPosition(e).y - initialY
            this.$el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
        }

        const dragEnd = e => setDocumentEvents(e, null, null)

        this.$on('hook:mounted', () => {
            this.$el.style['touch-action'] = 'none'
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
    const isMobile = ['touchmove', 'touchstart'].includes(event.type)
    const position = isMobile ? event.touches[0] : event
    return { x: position.clientX, y: position.clientY }
}

function setDocumentEvents(event, drag, dragEnd) {
    document.ontouchmove = drag
    document.onmousemove = drag
    document.ontouchend = dragEnd
    document.onmouseup = dragEnd
}
</script>

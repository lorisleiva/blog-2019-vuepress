<script>
export default {
    data () {
        return {
            distance: 0,
        }
    },
    computed: {
        dragged () {
            return this.distance >= 5
        }
    },
    render () {
        let currentX = 0, currentY = 0, initialX, initialY
        let startX, startY

        const dragStart = e => {
            const { x, y } = cursorPosition(e)
            initialX = x - currentX
            initialY = y - currentY
            this.distance = 0
            startX = x
            startY = y
            setDocumentEvents(e, drag, dragEnd)
        }

        const drag = e => {
            e.preventDefault()
            const { x, y } = cursorPosition(e)
            currentX = x - initialX
            currentY = y - initialY
            this.distance = Math.hypot(startX - x, startY - y)
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

        return this.$scopedSlots.default
            ? this.$scopedSlots.default({ distance: this.distance, dragged: this.dragged })
            : this.$slots.default[0]
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

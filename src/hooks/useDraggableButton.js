import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useDraggableButton(buttonRef, { size = 48, margin = 8, minY = 70 } = {}) {
  const pos = ref({ x: -1, y: -1 })
  const posRef = { x: -1, y: -1 }
  let rafId = null
  let container = null
  const drag = { started: false, wasDragging: false, offX: 0, offY: 0, rect: null }

  const findContainer = () => buttonRef.value?.closest('.app-container') || null

  const apply = (next) => {
    posRef.x = next.x
    posRef.y = next.y
    pos.value = next
  }

  const handleMove = (event) => {
    if (!drag.started || !drag.rect) return
    const { rect, offX, offY } = drag
    const maxX = rect.width - size - margin
    const maxY = rect.height - size - margin
    const nextX = Math.max(margin, Math.min(maxX, event.clientX - rect.left - offX))
    const nextY = Math.max(minY, Math.min(maxY, event.clientY - rect.top - offY))

    if (Math.abs(nextX - posRef.x) > 2 || Math.abs(nextY - posRef.y) > 2) drag.wasDragging = true
    posRef.x = nextX
    posRef.y = nextY
    if (rafId == null) {
      rafId = requestAnimationFrame(() => {
        rafId = null
        pos.value = { x: posRef.x, y: posRef.y }
      })
    }
  }

  const handleUp = () => {
    drag.started = false
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', handleUp)
    if (rafId != null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    pos.value = { x: posRef.x, y: posRef.y }
  }

  const handlePointerDown = (event) => {
    container = findContainer()
    if (!container) return
    const rect = container.getBoundingClientRect()
    drag.started = true
    drag.wasDragging = false
    drag.offX = event.clientX - posRef.x - rect.left
    drag.offY = event.clientY - posRef.y - rect.top
    drag.rect = rect
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    event.preventDefault()
  }

  const consumeDragClick = () => {
    const wasDragging = drag.wasDragging
    drag.wasDragging = false
    return wasDragging
  }

  onMounted(() => {
    container = findContainer()
    if (!container) return
    const rect = container.getBoundingClientRect()
    apply({
      x: rect.width - size - margin,
      y: rect.height - size - minY - margin,
    })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', handleUp)
    if (rafId != null) cancelAnimationFrame(rafId)
  })

  return { pos, handlePointerDown, consumeDragClick }
}

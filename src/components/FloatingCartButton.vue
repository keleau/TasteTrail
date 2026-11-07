<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { useDraggableButton } from '../hooks/useDraggableButton'

defineProps({
  count: { type: Number, required: true },
  open: { type: Boolean, default: false },
  bounce: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle'])
const root = ref(null)
const { pos, handlePointerDown, consumeDragClick } = useDraggableButton(root)

const handleClick = () => {
  if (!consumeDragClick()) emit('toggle')
}
</script>

<template>
  <button
    ref="root"
    data-cart-button
    class="absolute z-[90] w-12 h-12 rounded-full bg-[#E8650A] text-white flex items-center justify-center shadow-lg shadow-[#E8650A]/30 active:scale-90 transition-transform touch-none select-none cursor-grab active:cursor-grabbing"
    :class="[bounce ? 'animate-cart-bounce' : '', open ? 'rotate-45' : '']"
    :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
    :aria-label="`购物车，${count} 件商品`"
    @pointerdown="handlePointerDown"
    @click="handleClick"
  >
    <AppIcon name="cart" :size="20" />
    <span class="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-white text-[#E8650A] text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#E8650A]">
      {{ count }}
    </span>
  </button>
</template>

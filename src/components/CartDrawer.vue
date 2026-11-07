<script setup>
import AppIcon from './AppIcon.vue'
import FallbackImage from './FallbackImage.vue'
import ProductArtwork from './ProductArtwork.vue'

defineProps({
  cart: { type: Array, required: true },
  count: { type: Number, required: true },
  total: { type: Number, required: true },
})

const emit = defineEmits(['close', 'update', 'remove', 'checkout', 'openItem'])

const openItem = (item) => {
  emit('close')
  emit('openItem', item)
}
</script>

<template>
  <div>
    <div class="absolute inset-0 z-[95] bg-black/40 backdrop-blur-sm animate-fade-in" @click="emit('close')" />
    <div class="absolute inset-x-0 bottom-0 z-[96] bg-white rounded-t-3xl max-h-[70%] flex flex-col animate-slide-up" style="bottom: 0">
      <div class="flex items-center justify-between px-5 py-4 border-b border-stone-200">
        <div>
          <p class="font-display text-[18px] font-bold text-stone-900">购物车</p>
          <p class="text-stone-500 text-[11px] mt-0.5">{{ count }} 件商品</p>
        </div>
        <button class="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors" aria-label="关闭购物车" @click="emit('close')">
          <AppIcon name="x" :size="16" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-5 py-3">
        <div v-if="!cart.length" class="py-12 text-center">
          <p class="text-stone-400 text-sm">购物车还是空的</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="entry in cart" :key="entry.item.id" class="flex items-center gap-3 py-2 border-b border-stone-100 last:border-0">
            <button
              class="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden shrink-0"
              :aria-label="`查看${entry.item.cn}`"
              @click="openItem(entry.item)"
            >
              <FallbackImage v-if="entry.item.category === 'dish'" :src="entry.item.img" :alt="entry.item.cn" class="w-full h-full object-cover" />
              <ProductArtwork v-else :item="entry.item" class="w-full h-full" />
            </button>
            <div class="flex-1 min-w-0">
              <p class="font-display text-[13px] font-bold text-stone-900 truncate">{{ entry.item.cn }}</p>
              <p class="text-stone-500 text-[10px] mt-0.5">¥{{ entry.item.price }} / {{ entry.item.unit }}</p>
              <div class="flex items-center gap-2 mt-1.5">
                <button class="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors" aria-label="减少一件" @click="emit('update', entry.item.id, -1)">
                  <AppIcon name="minus" :size="10" />
                </button>
                <span class="font-display text-[13px] font-bold text-stone-900 w-5 text-center">{{ entry.quantity }}</span>
                <button class="w-6 h-6 rounded-full bg-[#E8650A] text-white flex items-center justify-center hover:bg-[#D45A09] transition-colors" aria-label="增加一件" @click="emit('update', entry.item.id, 1)">
                  <AppIcon name="plus" :size="10" />
                </button>
              </div>
            </div>
            <div class="text-right shrink-0">
              <p class="font-display text-[15px] font-black text-[#E8650A]">¥{{ entry.item.price * entry.quantity }}</p>
              <button class="text-stone-400 text-[10px] mt-1 hover:text-stone-600 transition-colors" @click="emit('remove', entry.item.id)">删除</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cart.length" class="px-5 py-4 border-t border-stone-200 bg-[#F3ECE0]/50">
        <div class="flex items-center justify-between mb-3">
          <span class="text-stone-600 text-sm">合计</span>
          <span class="font-display text-[22px] font-black text-[#E8650A]">¥{{ total }}</span>
        </div>
        <button class="w-full py-3.5 bg-[#E8650A] text-white rounded-2xl text-[12px] tracking-[0.3em] font-bold hover:bg-[#D45A09] active:scale-[0.98] transition-all shadow-lg shadow-[#E8650A]/30" @click="emit('checkout')">
          去结算
        </button>
      </div>
    </div>
  </div>
</template>

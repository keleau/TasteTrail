<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  active: { type: String, required: true },
})
const emit = defineEmits(['nav'])

const NAV_ITEMS = [
  { id: 'explore', label: '探索', icon: 'compass' },
  { id: 'today', label: '今日', icon: 'sun' },
  { id: 'cook', label: '厨房', icon: 'pan' },
  { id: 'me', label: '我的', icon: 'book' },
]
</script>

<template>
  <div class="absolute bottom-0 left-0 right-0 glass-nav border-t border-stone-300/50 z-[100]" style="padding-bottom: env(safe-area-inset-bottom)">
    <div class="relative">
      <div
        v-for="(item, index) in NAV_ITEMS"
        :key="`indicator-${item.id}`"
        v-show="active === item.id"
        class="absolute top-0 h-[3px] bg-[#E8650A] rounded-full transition-all duration-500 ease-out"
        :style="{ width: '24px', left: `${index * 25}%`, transform: 'translateX(calc(50% - 12px))', boxShadow: '0 0 16px rgba(232,101,10,0.5)' }"
      />
      <div class="flex">
        <button
          v-for="item in NAV_ITEMS"
          :key="item.id"
          :data-nav="item.id"
          class="flex-1 flex flex-col items-center py-2.5 gap-0.5 relative group"
          @click="emit('nav', item.id)"
        >
          <div :class="active === item.id ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'" class="transition-all duration-300">
            <AppIcon :name="item.icon" :size="22" :stroke="active === item.id ? '#E8650A' : '#8B7355'" />
          </div>
          <span
            class="font-body text-[9px] tracking-widest uppercase transition-colors"
            :class="active === item.id ? 'text-[#E8650A] font-semibold' : 'text-stone-500'"
          >{{ item.label }}</span>
        </button>
      </div>
    </div>
    <div class="h-1" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  meal: { type: Object, required: true },
  showMacros: { type: Boolean, default: false },
})

const stats = computed(() => [
  { value: props.meal.kcal, label: '千卡' },
  { value: props.meal.time, label: '时间' },
  { value: props.meal.difficulty, label: '难度' },
  { value: props.meal.taste.split('·')[0].trim(), label: '口味' },
])

const macroList = [
  { key: 'protein', label: '蛋白质', color: 'text-[#E8650A]' },
  { key: 'carbs', label: '碳水', color: 'text-[#8B6F47]' },
  { key: 'fats', label: '脂肪', color: 'text-[#7A5C3E]' },
]
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-2 text-center">
      <div v-for="stat in stats" :key="stat.label">
        <p class="font-display text-[20px] font-bold text-stone-900 leading-none">{{ stat.value }}</p>
        <p class="text-stone-500 text-[8px] tracking-[0.25em] uppercase mt-1.5">{{ stat.label }}</p>
      </div>
    </div>
    <div v-if="showMacros" class="mt-4 pt-3 border-t border-stone-200 grid grid-cols-3 gap-3 text-center">
      <div v-for="macro in macroList" :key="macro.key">
        <p class="font-display text-[14px] font-bold leading-none" :class="macro.color">{{ meal.macros[macro.key] }}</p>
        <p class="text-stone-500 text-[8px] tracking-[0.2em] uppercase mt-1">{{ macro.label }}</p>
      </div>
    </div>
  </div>
</template>

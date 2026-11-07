<script setup>
import { computed, ref, watch } from 'vue'
import { PLACEHOLDER_IMG } from '../data'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  loading: { type: String, default: undefined },
})

const failed = ref(false)
watch(() => props.src, () => { failed.value = false })
const currentSrc = computed(() => (failed.value ? PLACEHOLDER_IMG : props.src))
</script>

<template>
  <img :src="currentSrc" :alt="alt" :loading="loading" @error="failed = true" />
</template>

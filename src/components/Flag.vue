<template>
  <img v-if="flagUrl" :src="flagUrl" alt="Flag" class="mx-auto h-auto w-64" />
</template>

<script setup lang="ts">
const props = defineProps<{ code: string }>()

const flagUrl = computed(() => {
  if (!props.code) return ''

  return `https://flagcdn.com/256x192/${props.code}.png`
})
</script>

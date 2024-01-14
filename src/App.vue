<template>
  <div
    class="min-h-screen bg-slate-900 font-custom selection:bg-purple-500 selection:text-white"
  >
    <DesktopLayout />
  </div>
</template>

<script setup lang="ts">
import DesktopLayout from '@/layouts/DesktopLayout.vue';

const { handleResize } = useScreen();

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});
onUnmounted(() => window.removeEventListener('resize', handleResize));

// Lang attr - chrome language detection
// watch(
//   selectedLanguage,
//   (newValue) => {
//     if (!newValue || newValue === 'default') return 'en';

//     const [language, region] = newValue.split('-');

//     // Malformed language
//     if (!language || !region) return 'en';

//     const ISOCode = [language, region.toUpperCase()].join('-');

//     document.documentElement.setAttribute('lang', ISOCode);
//   },
//   { immediate: true }
// );
</script>
